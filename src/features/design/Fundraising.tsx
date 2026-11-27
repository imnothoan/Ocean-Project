import { recordReference } from './share';
import { useEffect, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { Image } from 'expo-image';
import { supabase } from '../../lib/supabase';
import { FlowSection, ListRow, SmallButton, styles, useLiveData } from './live';
import { action, choices, field, type Controller } from './workflow';
import { matchesQuery } from './communityView';
import { exportReport } from './reportFiles';
import { shareText } from './share';
import type { ProjectData } from './useProjectData';

export function CampaignList() {
  const { c, data, loading } = useLiveData();
  const v = c.values;
  const rows = data.campaigns.filter(
    (a) =>
      (!v.fundCategory || v.fundCategory === 'All' || a.category === v.fundCategory) &&
      matchesQuery(v.fundQuery || '', a.name, a.category),
  );
  return (
    <FlowSection top={242}>
      {rows.map((a) => (
        <Pressable
          key={a.name}
          accessibilityRole="button"
          onPress={() => {
            c.setValue('campaignId', a.id);
            c.setValue('campaign', a.name);
            c.go('1581:1458');
          }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            minHeight: 178,
            gap: 14,
            padding: 14,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#c9d5de',
            backgroundColor: '#edfbff',
          }}
        >
          {a.cover_url && (
            <Image
              source={{ uri: a.cover_url }}
              contentFit="cover"
              style={{ width: '34%', height: 151, borderRadius: 5 }}
            />
          )}
          <View style={{ flex: 1, gap: 10 }}>
            <Text style={styles.body}>{a.category}</Text>
            <Text style={styles.title}>{a.name}</Text>
            <Text style={styles.body}>Campaign goal</Text>
            <Text style={styles.title}>{'$' + Number(a.goal_usd).toLocaleString()}</Text>
          </View>
        </Pressable>
      ))}
      {!rows.length && (
        <Text style={styles.body}>
          {loading
            ? 'Loading campaigns…'
            : data.campaigns.length
              ? 'No matching campaigns.'
              : 'No campaigns have been published yet.'}
        </Text>
      )}
    </FlowSection>
  );
}
export function CampaignRecords({ view }: { view: 'supporters' | 'updates' | 'impact' }) {
  const { c, data } = useLiveData();
  const campaign = data.campaigns.find((row) => row.id === c.values.campaignId);
  const [records, setRecords] = useState<{ id: string; title: string; body: string }[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    let active = true;
    setRecords([]);
    setError('');
    if (!campaign || view === 'supporters') {
      setLoading(false);
      return;
    }
    setLoading(true);
    supabase
      .from('campaign_updates')
      .select('id,title,body')
      .eq('campaign_id', campaign.id)
      .eq('kind', view === 'impact' ? 'impact' : 'update')
      .order('published_at', { ascending: false })
      .then((response) => {
        if (active) {
          setRecords(response.data ?? []);
          setError(response.error?.message ?? '');
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, [campaign?.id, view, retry]);
  return (
    <FlowSection top={147}>
      {campaign && <Text style={styles.heading}>{campaign.name}</Text>}
      {records.map((record) => (
        <ListRow key={record.id} title={record.title} description={record.body} />
      ))}
      {!!error && (
        <SmallButton label="Retry loading updates" onPress={() => setRetry((value) => value + 1)} />
      )}
      {!records.length && !error && (
        <Text style={styles.body}>
          {loading
            ? 'Loading…'
            : view === 'supporters'
              ? 'Contributions are private. You can see your own history.'
              : view === 'impact'
                ? 'No impact measurements published yet.'
                : 'No campaign updates published yet.'}
        </Text>
      )}
      <SmallButton label="My contribution history" onPress={() => c.go('1581:1920')} />
      {view === 'impact' && <SmallButton label="Export my activity" onPress={() => c.go('311:1506')} />}
    </FlowSection>
  );
}
export function ContributionList() {
  const { c, data, loading } = useLiveData();
  const [date, setDate] = useState('');
  const period = c.values.pledgePeriod || 'all';
  const rows = data.pledges.filter(
    (p) =>
      period === 'all' ||
      (period === 'year'
        ? p.created_at.slice(0, 4) === String(new Date().getFullYear())
        : !!date && p.created_at.slice(0, 10) === date),
  );
  return (
    <FlowSection top={397}>
      {period === 'date' && (
        <TextInput
          accessibilityLabel="Contribution date"
          placeholder="YYYY-MM-DD"
          value={date}
          onChangeText={setDate}
          style={styles.row}
        />
      )}
      {rows.map((p) => (
        <ListRow
          key={p.id}
          title={p.campaign}
          description={
            new Date(p.created_at).toLocaleDateString() +
            ' · $' +
            Number(p.amount).toFixed(2) +
            ' · ' +
            p.status
          }
        >
          {p.status === 'confirmed' && (
            <SmallButton
              label="Certificate"
              onPress={() => {
                c.setValue('pledgeId', p.id);
                c.go('1581:1986');
              }}
            />
          )}
        </ListRow>
      ))}
      {!rows.length && (
        <Text style={styles.body}>{loading ? 'Loading…' : 'No contributions in this period.'}</Text>
      )}
    </FlowSection>
  );
}
export function fundraising(c: Controller, data: ProjectData) {
  const { id, values: v, binding: b } = c;
  const campaign = data.campaigns.find((row) => row.id === v.campaignId);
  if (id === '258:426') {
    for (const [index, nodes] of [
      ['258:454', '258:455', '258:458', '258:459'],
      ['258:460', '258:461', '258:464', '258:465'],
    ].entries()) {
      const row = data.campaigns[index];
      const [tile, icon, title, sub] = nodes;
      b.labels[title] = row?.name || (!index ? 'No campaigns published' : '');
      b.labels[sub] = row ? row.organizer : '';
      b.hidden.add(icon);
      if (!row && index) b.hidden.add(tile);
      action(c, [tile, title, sub], () => {
        if (row) {
          c.setValue('campaignId', row.id);
          c.setValue('campaign', row.name);
          c.go('1581:1458');
        } else c.go('1581:1359');
      });
    }
  }
  if (id === '1581:1359') {
    choices(c, 'fundCategory', {
      '1581:1404': 'All',
      '1581:1407': 'Cleanups',
      '1581:1410': 'Wildlife',
      '1581:1413': 'Reefs',
    });
    field(c, '1581:1424', 'fundQuery', 'Search campaigns');
    for (const n of ['1581:1415', '1581:1416', '1581:1417', '1581:1420']) b.hidden.add(n);
  }
  if (id === '1581:1458' && campaign) {
    action(c, ['1581:1459', '1581:1461'], () => {
      for (const k of [
        'amount',
        'anonymous',
        'payment',
        'donationNote',
        'lastPledge',
        'pendingPledge',
        'pledgeRequestId',
        'pledgeId',
      ])
        c.setValue(k, '');
      c.go('1581:1601');
    });
    Object.assign(b.labels, {
      '1581:1464': campaign.description,
      '1581:1470': 'Campaign goal',
      '1581:1471': '$' + Number(campaign.goal_usd).toLocaleString(),
      '1581:1479': '',
      '1581:1480': 'Public fundraising totals unavailable',
      '1581:1481': '',
      '1581:1482': '',
      '1581:1487': campaign.category,
      '1581:1488': campaign.organizer,
      '1581:1489': campaign.name,
    });
    if (campaign.cover_url) b.images['1581:1486'] = campaign.cover_url;
    for (const n of ['1581:1477', '1581:1478']) b.hidden.add(n);
  }
  if (id === '1581:1601' && campaign) {
    Object.assign(b.labels, {
      '1581:1602': campaign.name,
      '1581:1603': 'Campaign goal $' + Number(campaign.goal_usd).toLocaleString(),
      '1581:1606': '',
      '1581:1619': 'Record a pledge for this campaign.',
    });
    b.hidden.add('1581:1605');
  }
  if (id === '1581:1655' && campaign)
    Object.assign(b.labels, {
      '1581:1659': campaign.name,
      '1581:1660': 'Preferred payment method',
      '1581:1665': 'Payment integration pending',
      '1581:1669': 'Payment integration pending',
      '1581:1673': 'Payment integration pending',
      '1581:1677': 'Payment integration pending',
      '1581:1681': 'Payment integration pending',
    });
  if (id === '1581:1711' && campaign)
    Object.assign(b.labels, {
      '1581:1715': campaign.name,
      '1581:1718': campaign.organizer,
      '1581:1728': 'Payment status',
      '1581:1729': 'Pending integration',
      '1581:1737': 'Pledge',
      '1581:1743': 'Review pledge',
    });
  if (id === '1581:1920') {
    choices(c, 'pledgePeriod', { '1581:1929': 'all', '1581:1931': 'year', '1581:1933': 'date' });
    b.labels['1581:1933'] = 'Select date';
  }
  if (id === '1581:1986') {
    const pledge = data.pledges.find((p) => p.id === v.pledgeId && p.status === 'confirmed');
    if (!pledge) {
      for (const n of [
        '1581:1993',
        '1581:1996',
        '1581:1998',
        '1581:2000',
        '1581:2002',
        '1581:2005',
        '1581:2007',
      ])
        b.labels[n] = '—';
      b.labels['1581:2003'] = 'Awaiting a confirmed contribution';
      return;
    }
    recordReference(c, '1581:2002', pledge.id);
    const date = new Date(pledge.created_at).toLocaleDateString(),
      amount = '$' + Number(pledge.amount).toFixed(2);
    Object.assign(b.labels, {
      '1581:1993': data.profile.display_name || 'Contributor',
      '1581:1996': pledge.campaign,
      '1581:1998': amount,
      '1581:2000': date,
      '1581:2005': 'Download PDF',
    });
    action(c, ['1581:2004', '1581:2005'], () =>
      c.run(async () =>
        exportReport('PDF', 'Ocean Project · Contribution certificate', [
          [date, pledge.campaign, amount],
          ['', 'Receipt', pledge.id],
        ]),
      ),
    );
    action(c, ['1581:2006', '1581:2007'], () =>
      c.run(async () => {
        await shareText(pledge.campaign + ' · ' + date + ' · ' + amount);
      }),
    );
  }
}
