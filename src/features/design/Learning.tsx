import { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { supabase } from '../../lib/supabase';
import { action, choices, field, result, type Controller } from './workflow';
import { FlowSection, ListRow, SmallButton, styles, useLiveData } from './live';
import { dayStreak, levelFor, memberActivity } from './activity';
import { badges, badgeProgress } from './badges';
import { BadgeMedal, ProgressTrack } from './BadgeCollection';
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
            new Date(r.date).toLocaleDateString() +
            ' · ' +
            (r.points > 0 ? '+' : '') +
            r.points +
            ' points'
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
        <View
          key={i}
          style={{ flex: 1, height: '100%', justifyContent: 'flex-end', alignItems: 'center' }}
        >
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
export function learning(c: Controller, data: ProjectData) {
  const { id, binding: b, user, values: v } = c;
  if (id in guideNames) {
    const saved = data.saved.includes(id);
    b.labels.guideSave = saved ? '✓ Saved' : 'Save guide';
    action(c, ['guideSave', '682:5575', '682:5577'], () =>
      c.run(async () => {
        if (saved)
          result(
            await supabase.from('saved_guides').delete().eq('user_id', user!.id).eq('frame_id', id),
          );
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
  const completed = data.checkins.length;
  const streak = dayStreak(activity);
  const metrics = data.badgeMetrics ?? {};
  const known = !user || data.badgeMetrics !== null;
  const earned = badges.filter((badge) => badgeProgress(badge, metrics) === badge.target).length;
  if (id === '666:3592') {
    b.replacements['721:374'] = (
      <ProgressTrack fraction={level.fraction} track="rgba(255,255,255,0.23)" fill="#fec968" />
    );
    b.hidden.add('721:375');
    for (const n of ['666:3907', '666:3969']) b.labels[n] = streak + ' days';
    for (const n of ['666:3909', '666:3971', '666:3930', '666:3992']) b.labels[n] = String(completed);
    for (const n of ['666:3918', '666:3980']) b.labels[n] = '—';
    for (const n of ['666:3924', '666:3986'])
      b.labels[n] = String(verified.filter((r) => r.category === 'animal').length);
    for (const n of ['666:3925', '666:3987']) b.labels[n] = 'Wildlife reports';
    Object.assign(b.labels, {
      '721:345': known ? earned + ' earned' : '…',
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
    b.replacements['240:460'] = (
      <ProgressTrack fraction={level.fraction} track="rgba(255,255,255,0.25)" fill="#fec968" />
    );
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
    action(c, ['240:457', '240:458', '240:459', '240:462', 'levelProgressLink'], () => c.go('670:5193'));
    action(c, ['240:501', '240:502', '240:506', '240:507', '759:542'], () => c.go('670:4692'));
  }
  if (id === '218:2549') {
    const filter = v.badgeCategory || 'All';
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
    const visible = badges.filter((badge) => filter === 'All' || badge.category === filter);
    b.replacements['218:2565'] = (
      <ProgressTrack fraction={earned / badges.length} track="rgba(255,255,255,0.25)" fill="#fec968" />
    );
    b.hidden.add('218:2566');
    b.labels['218:2563'] = known ? earned + ' of ' + badges.length + ' badges' : 'Your badges';
    b.labels['218:2564'] = 'Learn, report and attend events to earn badges.';
    b.labels['218:2576'] = known
      ? visible.filter((badge) => badgeProgress(badge, metrics) === badge.target).length + ' earned'
      : '…';
  }
  if (id === '670:4529') {
    const selected = badges.find((badge) => badge.title === v.badgeTitle) ?? badges[2];
    b.labels['670:4545'] = selected.title;
    b.labels['670:4547'] = known
      ? badgeProgress(selected, metrics) === selected.target
        ? 'EARNED'
        : 'IN PROGRESS'
      : '…';
    b.replacements['670:4544'] = <BadgeMedal badge={selected} />;
  }
  if (id === '670:5193') {
    b.replacements['670:5219'] = (
      <ProgressTrack fraction={level.fraction} track="rgba(255,255,255,0.25)" fill="#fec968" />
    );
    b.replacements['670:5245'] = (
      <ProgressTrack fraction={level.fraction} track="rgba(255,255,255,0.25)" fill="#fec968" />
    );
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
      '670:5235': known ? earned + ' earned' : '…',
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
    b.labels['670:5069'] = 'Like or comment · ' + Math.min(3, supported) + ' / 3';
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
