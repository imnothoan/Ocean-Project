import { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { supabase } from '../../lib/supabase';
import { action, choices, field, result, type Controller } from './workflow';
import { FlowSection, ListRow, SmallButton, styles, useLiveData } from './live';
import { dayStreak, levelFor, memberActivity } from './activity';
import { guideNames } from './account';
import { matchesQuery } from './communityView';
import type { ProjectData } from './useProjectData';

const topics = [
  {
    title: 'Waste sorting',
    detail: 'Know what goes where',
    id: '263:2582',
    icon: require('../../../assets/figma/mobile/0fd9f.svg'),
  },
  {
    title: 'Species library',
    detail: 'Discover local wildlife',
    id: '272:204',
    icon: require('../../../assets/figma/mobile/ff29f.svg'),
  },
  {
    title: 'Green living tips',
    detail: 'Reuse, refill and reduce',
    id: '682:5379',
    icon: require('../../../assets/figma/mobile/0fd9f.svg'),
  },
];
export function KnowledgeTopics() {
  const { c } = useLiveData();
  const list = topics.filter((t) => matchesQuery(c.values.knowledgeQuery || '', t.title, t.detail));
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 8, paddingHorizontal: 20 }}
    >
      {list.map((t) => (
        <Pressable
          accessibilityRole="button"
          key={t.id}
          onPress={() => c.go(t.id)}
          style={{
            width: 172,
            borderRadius: 10,
            backgroundColor: '#e5f6f8',
            justifyContent: 'center',
            padding: 12,
            gap: 8,
          }}
        >
          <View style={styles.actions}>
            <Image source={t.icon} style={{ width: 22, height: 22 }} />
            <Text style={styles.title}>{t.title}</Text>
          </View>
          <Text style={styles.body}>{t.detail}</Text>
        </Pressable>
      ))}
      {!list.length && <Text style={styles.body}>No matching topics.</Text>}
    </ScrollView>
  );
}
export function ActivityHistory({ top = 315 }: { top?: number }) {
  const { c, data, loading } = useLiveData();
  const items = memberActivity(data, c.user?.id);
  return (
    <FlowSection top={top}>
      {items.map((r, i) => (
        <ListRow
          key={r.date + i}
          title={r.title}
          description={
            new Date(r.date).toLocaleDateString() + ' · ' + (r.points > 0 ? '+' : '') + r.points + ' points'
          }
        />
      ))}
      {!items.length && (
        <Text style={styles.body}>{loading ? 'Loading activity…' : 'No points activity yet.'}</Text>
      )}
    </FlowSection>
  );
}
type Ranked = { member_id: string; display_name: string; points: number };
export function Ranking() {
  const { c, data } = useLiveData();
  const [rows, setRows] = useState<Ranked[]>([]);
  const [error, setError] = useState('');
  const [version, setVersion] = useState(0);
  const period = c.values.rankingPeriod || 'all';
  useEffect(() => {
    let active = true;
    setError('');
    if (!c.user) {
      setRows([]);
      return;
    }
    supabase.rpc('ocean_ranking', { period }).then(({ data: rows, error }) => {
      if (active) {
        setRows(rows || []);
        setError(error?.message || '');
      }
    });
    return () => {
      active = false;
    };
  }, [c.user?.id, period, version]);
  const toggle = () =>
    c.run(async () => {
      if (!data.profile.display_name) {
        c.go('666:4366');
        return;
      }
      result(
        await supabase
          .from('ocean_profiles')
          .update({ public_ranking: !data.profile.public_ranking })
          .eq('id', c.user!.id)
          .select('id')
          .single(),
      );
      c.refresh();
      setVersion((v) => v + 1);
    }, true);
  return (
    <FlowSection top={185}>
      <Text style={styles.heading}>Top eco contributors</Text>
      <SmallButton
        label={data.profile.public_ranking ? 'Leave public rankings' : 'Join public rankings'}
        onPress={toggle}
      />
      {error ? (
        <SmallButton label="Retry rankings" onPress={() => setVersion((v) => v + 1)} />
      ) : rows.length ? (
        rows.map((r, i) => (
          <ListRow
            title={i + 1 + '. ' + r.display_name}
            description={r.points + ' earned points'}
            key={r.member_id}
            onPress={() => {
              c.setValue('publicUserId', r.member_id);
              c.go('666:4125');
            }}
          />
        ))
      ) : (
        <Text style={styles.body}>No members ranked for this period.</Text>
      )}
    </FlowSection>
  );
}
export function MonthlyChart() {
  const { data } = useLiveData();
  const year = new Date().getFullYear();
  const amounts = Array.from({ length: 12 }, () => 0);
  for (const metric of data.metrics)
    if (Number(metric.metric_date.slice(0, 4)) === year)
      amounts[Number(metric.metric_date.slice(5, 7)) - 1] += Number(metric.total_kg);
  const max = Math.max(1, ...amounts);
  return (
    <View
      accessibilityLabel="Network waste by month"
      style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end', padding: 3, gap: 3 }}
    >
      {amounts.map((kg, i) => (
        <View key={i} style={{ flex: 1, height: '100%', justifyContent: 'flex-end', alignItems: 'center' }}>
          <Text style={{ fontSize: 8, color: '#37586b' }}>{kg || ''}</Text>
          <View
            style={{
              height: (Math.max(1, (kg / max) * 75) + '%') as `${number}%`,
              width: '70%',
              backgroundColor: '#43c4d6',
            }}
          />
          <Text style={{ fontSize: 10, color: '#37586b' }}>{i + 1}</Text>
        </View>
      ))}
    </View>
  );
}
function ProgressBar({ fraction }: { fraction: number }) {
  return (
    <View style={{ flex: 1, borderRadius: 7, backgroundColor: '#d7ecee', overflow: 'hidden' }}>
      <View
        style={{
          height: '100%',
          backgroundColor: '#35b7ce',
          width: `${Math.max(0, Math.min(1, fraction)) * 100}%`,
        }}
      />
    </View>
  );
}
export function learning(c: Controller, data: ProjectData) {
  const { id, binding: b, user, values: v } = c;
  if (id in guideNames) {
    const saved = data.saved.includes(id);
    b.labels.guideSave = saved ? '✓ Saved' : 'Save guide';
    action(c, ['guideSave', '682:5575', '682:5577'], () =>
      c.run(async () => {
        if (saved)
          result(await supabase.from('saved_guides').delete().eq('user_id', user!.id).eq('frame_id', id));
        else {
          const response = await supabase.from('saved_guides').insert({ frame_id: id });
          if (response.error?.code !== '23505') result(response);
        }
        c.refresh();
      }, true),
    );
  }
  if (id === '682:5569') {
    b.labels['682:5623'] = data.learning.some((a) => a.activity === 'green-guide')
      ? 'Completed'
      : 'Mark as done · +10 pts';
    action(c, ['682:5622', '682:5623'], () =>
      c.run(async () => {
        result(await supabase.rpc('complete_green_guide'));
        c.refresh();
        c.go('682:5379');
      }, true),
    );
  }
  if (id === '244:550') {
    field(c, '244:564', 'knowledgeQuery', 'Search topics');
    action(c, ['1230:541', '244:594', '244:604'], () => c.go('274:297'));
    action(c, ['244:615'], () => c.go('682:5569'));
    action(c, ['244:578'], () => c.setValue('knowledgeQuery', ''));
  }
  if (id === '274:297') action(c, ['274:352'], () => c.go('230:1356'));
  if (id === '269:124') action(c, ['269:179'], () => c.go('403:2759'));
  if (id === '238:299')
    choices(c, 'rankingPeriod', { '238:310': 'week', '238:312': 'month', '238:314': 'all' });
  if (!['666:3592', '263:2756', '240:442', '218:2549', '670:4529', '670:5193', '670:5000'].includes(id))
    return;
  const activity = memberActivity(data, user?.id);
  const xp = data.points + data.claims.reduce((s, x) => s + x.cost, 0),
    level = levelFor(xp);
  const verified = data.reports.filter((r) => r.owner_id === user?.id && r.status === 'resolved');
  const completed = data.checkins.length,
    read = data.learning.length,
    posts = data.postCount;
  const streak = dayStreak(activity);
  const badges = [
    activity.length > 0,
    verified.length >= 3,
    completed >= 3,
    read >= 2,
    streak >= 7,
    posts >= 3,
  ];
  if (id === '666:3592') {
    for (const n of ['666:3907', '666:3969']) b.labels[n] = streak + ' days';
    for (const n of ['666:3909', '666:3971', '666:3930', '666:3992']) b.labels[n] = String(completed);
    for (const n of ['666:3918', '666:3980']) b.labels[n] = '—';
    for (const n of ['666:3924', '666:3986'])
      b.labels[n] = String(verified.filter((r) => r.category === 'animal').length);
    for (const n of ['666:3925', '666:3987']) b.labels[n] = 'Wildlife reports';
    Object.assign(b.labels, {
      '721:345': badges.filter(Boolean).length + ' earned',
      '721:357': data.points >= 300 ? '1 available' : '0 available',
      '721:371': 'LEVEL ' + level.number,
      '721:372': level.name,
      '721:373': xp + ' XP',
      '721:376': level.remaining ? level.remaining + ' XP to next level' : 'Top level',
      '721:274': 'Network waste · ' + new Date().getFullYear(),
      '721:338': 'Level ' + level.number,
      '721:315': 'Wildlife reports',
      '721:316': verified.filter((r) => r.category === 'animal').length + ' verified sightings',
      '721:339': completed + ' event check-ins',
    });
  }
  if (id === '263:2756') {
    const month = new Date().toLocaleDateString(undefined, { month: 'long' });
    b.labels['263:2767'] = String(data.points);
    b.labels['263:2770'] =
      month +
      ' · ' +
      activity
        .filter((r) => r.date.slice(0, 7) === new Date().toISOString().slice(0, 7))
        .reduce((n, x) => n + x.points, 0) +
      ' pts';
  }
  if (id === '240:442') {
    b.replacements['240:460'] = <ProgressBar fraction={level.target ? xp / level.target : 1} />;
    b.hidden.add('240:461');
    Object.assign(b.labels, {
      '240:457': 'Level ' + level.number,
      '240:458': level.name,
      '240:459': xp + ' XP',
      '240:462': level.next ? level.remaining + ' XP to ' + level.next : 'Highest level',
      '240:464': level.number + ' of 6',
      '240:503': 'Class reward',
      '240:505': '300 points',
      '240:509': '',
      '240:511': '',
      '240:513': '',
    });
    ['240:471', '240:477', '240:484', '240:491', '240:498'].forEach(
      (n, i) => (b.labels[n] = level.number === i + 1 ? 'Now' : level.number > i + 1 ? 'Done' : 'Next'),
    );
    action(c, ['240:457', '240:458', '240:459', '240:462', 'levelProgressLink'], () => c.go('670:5193'));
    action(c, ['240:507', '759:542'], () => c.go('670:4692'));
  }
  if (id === '218:2549') {
    const filter = v.badgeCategory || 'All';
    const categories = ['Community', 'Cleanup', 'Cleanup', 'Knowledge', 'Community', 'Community'];
    const tiles = [
      [2577, 2581, 2623],
      [2582, 2586, 2635],
      [2587, 2591, 2626],
      [2592, 2596, 2629],
      [2597, 2601, 2632],
      [2602, 2608, 2611],
    ];
    const chips = ['All', 'Community', 'Cleanup', 'Knowledge'];
    chips.forEach((category, i) => {
      const background = '218:' + (2567 + 2 * i),
        text = '218:' + (2568 + 2 * i);
      const selected = category === filter;
      b.replacements[background] = (
        <View style={{ flex: 1, borderRadius: 16, backgroundColor: selected ? '#0186a8' : '#edfbff' }} />
      );
      b.tint[text] = selected ? '#fff' : '#3f596b';
      b.labels[background] = category;
      action(c, [background, text], () => c.setValue('badgeCategory', category));
    });
    const visible = categories.map((cat, i) => filter === 'All' || cat === filter);
    const destinations = ['263:2756', '230:1379', '670:4529', '244:550', '670:5000', '101:2769'];
    tiles.forEach(([first, last, icon], i) => {
      const nodes = Array.from({ length: last - first + 1 }, (_, index) => '218:' + (first + index)).concat(
        '218:' + icon,
      );
      if (!visible[i]) {
        for (const n of nodes) b.hidden.add(n);
        return;
      }
      action(c, nodes, () => c.go(destinations[i]));
    });
    if (!visible[2]) b.hidden.add('759:535');
    if (filter !== 'All') b.labels['218:2575'] = filter;
    b.replacements['218:2565'] = <ProgressBar fraction={badges.filter(Boolean).length / 6} />;
    b.hidden.add('218:2566');
    b.replacements['218:2617'] = <ProgressBar fraction={Math.min(3, posts) / 3} />;
    b.hidden.add('218:2618');
    Object.assign(b.labels, {
      '218:2563': badges.filter(Boolean).length + ' of 6 badges',
      '218:2576': badges.filter((earned, i) => earned && visible[i]).length + ' earned',
      '218:2583': 'Report Guardian',
      '218:2584': 'Verify 3 reports',
      '218:2594': 'Finish 2 guides',
      '218:2604': 'Community Builder',
      '218:2605': 'Share 3 posts',
      '218:2620': Math.min(3, posts) + ' / 3 posts',
      '218:2564': 'Learn, report and attend events to earn badges.',
    });
    ['218:2581', '218:2586', '218:2591', '218:2596', '218:2601', '218:2607'].forEach(
      (n, i) => (b.labels[n] = badges[i] ? 'EARNED' : 'LOCKED'),
    );
  }
  if (id === '670:4529') {
    action(c, ['670:4576'], () => c.go('218:2549'));
    for (const [n, at] of [
      ['670:4553', 1],
      ['670:4559', 2],
      ['670:4565', 3],
    ] as const)
      if (completed < at) b.hidden.add(n);
    Object.assign(b.labels, {
      '670:4571': String(completed),
      '670:4572': 'events attended',
      '670:4547': completed >= 3 ? 'EARNED' : 'IN PROGRESS',
      '670:4548': 'Attend three community events to earn Team Player.',
      '670:4549': '',
      '670:4556': Math.min(1, completed) + ' / 1',
      '670:4561': 'Attend a second event',
      '670:4562': Math.min(2, completed) + ' / 2',
      '670:4568': Math.min(3, completed) + ' / 3',
      '670:4573': '50 pts',
      '670:4574': 'per check-in',
    });
  }
  if (id === '670:5193') {
    b.replacements['670:5219'] = <ProgressBar fraction={level.target ? xp / level.target : 1} />;
    b.replacements['670:5245'] = <ProgressBar fraction={level.target ? xp / level.target : 1} />;
    b.hidden.add('670:5220');
    b.hidden.add('670:5246');
    action(c, ['670:5228', '670:5229'], () => c.go('670:4692'));
    action(c, ['670:5234', '670:5235'], () => c.go('218:2549'));
    action(c, ['670:5240', '670:5241'], () => c.go('244:550'));
    Object.assign(b.labels, {
      '670:5202': 'Your level',
      '670:5216': 'LEVEL',
      '670:5217': 'Level ' + level.number,
      '670:5218': level.name,
      '670:5228': 'Rewards',
      '670:5229': data.claims.length + ' claimed',
      '670:5234': 'Badges',
      '670:5235': badges.filter(Boolean).length + ' earned',
      '670:5240': 'Guides',
      '670:5241': data.saved.length + ' saved',
      '670:5221': xp + ' XP',
      '670:5222': 'Earned to date',
      '670:5223': 'Your level progress',
      '670:5243': level.next || level.name,
      '670:5244': level.remaining + ' XP to go',
    });
  }
  if (id === '670:5000') {
    const date = new Date().toLocaleDateString(),
      isToday = (d: string) => new Date(d).toLocaleDateString() === date;
    const own = data.reports.filter((r) => r.owner_id === user?.id);
    const supported = data.supportedToday;
    const done = [
      own.some((r) => isToday(r.created_at)),
      data.learning.some((r) => isToday(r.completed_at)),
      supported >= 3,
      data.checkins.some((r) => isToday(r.created_at)),
    ].filter(Boolean).length;
    b.labels['670:5012'] = streak + ' days';
    b.labels['670:5013'] = done + ' of 4 activities complete';
    b.labels['670:5044'] = done + ' / 4 done';
    b.labels['670:5068'] = 'Comment on 3 posts';
    b.labels['670:5069'] = 'Commented today · ' + Math.min(3, supported) + ' / 3';
    b.labels['670:5053'] = 'Report';
    action(c, ['670:5056', '670:5058', '670:5059'], () => c.go('263:2582'));
    action(c, ['670:5071', '670:5072'], () => c.go('101:2769'));
    action(c, ['670:5080', '670:5081'], () => c.go('258:426'));
    action(c, ['670:5053'], () => c.go('230:1093'));
    Object.assign(b.labels, {
      '670:5051': '+30 pts',
      '670:5060': '+10 pts',
      '670:5070': '',
      '670:5079': '+50 pts',
      '670:5089': completed + ' events attended',
      '670:5088': 'Attend a community cleanup',
      '670:5083': 'Your progress',
      '670:5093': '',
    });
  }
}
