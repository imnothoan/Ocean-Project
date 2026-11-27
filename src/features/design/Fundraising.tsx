import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { Image } from 'expo-image';
import { FlowSection, ListRow, SmallButton, styles, useLiveData } from './live';
import { action, choices, field, type Controller } from './workflow';
import { matchesQuery } from './communityView';
import { exportReport } from './reportFiles';
import { shareText } from './share';
import type { ProjectData } from './useProjectData';

const campaigns = [
  {
    name: 'Protect Phu Quoc Coral Reef',
    category: 'Reefs',
    goal: 20000,
    description: 'Support reef stewardship and the removal of discarded nets.',
    image: require('../../../assets/figma/mobile/8dd33.jpg'),
  },
  {
    name: 'Nha Trang Coastline Cleanup',
    category: 'Cleanups',
    goal: 10000,
    description: 'Support local coastline cleanups and waste sorting.',
    image: require('../../../assets/figma/mobile/c3431.jpg'),
  },
  {
    name: 'Save Coastal Sea Turtle',
    category: 'Wildlife',
    goal: 15000,
    description: 'Support protection of sea turtles and their coastal habitat.',
    image: require('../../../assets/figma/mobile/eaded.jpg'),
  },
];
function selected(name?: string) {
  return campaigns.find((c) => c.name === name) || campaigns[0];
}
export function CampaignList() {
  const { c } = useLiveData();
  const v = c.values;
  const rows = campaigns.filter(
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
          <Image
            source={a.image}
            contentFit="cover"
            style={{ width: '34%', height: 151, borderRadius: 5 }}
          />
          <View style={{ flex: 1, gap: 10 }}>
            <Text style={styles.body}>{a.category}</Text>
            <Text style={styles.title}>{a.name}</Text>
            <Text style={styles.body}>Campaign goal</Text>
            <Text style={styles.title}>{'$' + a.goal.toLocaleString()}</Text>
          </View>
        </Pressable>
      ))}
      {!rows.length && <Text style={styles.body}>No matching campaigns.</Text>}
    </FlowSection>
  );
}
export function CampaignRecords({ view }: { view: 'supporters' | 'updates' | 'impact' }) {
  const { c } = useLiveData();
  const campaign = selected(c.values.campaign);
  const note = {
    supporters: 'The organizer has not published a supporter list.',
    updates: 'No organizer updates have been published for this campaign.',
    impact: 'The organizer has not published verified measurements for this campaign.',
  }[view];
  return (
    <FlowSection top={147}>
      <ListRow title={campaign.name} description={note} />
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
  const campaign = selected(v.campaign);
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
  if (id === '1581:1458') {
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
      '1581:1471': '$' + campaign.goal.toLocaleString(),
      '1581:1479': '',
      '1581:1480': 'Public fundraising totals unavailable',
      '1581:1481': '',
      '1581:1482': '',
      '1581:1487': campaign.category,
      '1581:1488': 'Ocean Project',
      '1581:1489': campaign.name,
    });
    for (const n of ['1581:1477', '1581:1478']) b.hidden.add(n);
  }
  if (id === '1581:1601') {
    Object.assign(b.labels, {
      '1581:1602': campaign.name,
      '1581:1603': 'Campaign goal $' + campaign.goal.toLocaleString(),
      '1581:1606': '',
      '1581:1619': 'Record a pledge for this campaign.',
    });
    b.hidden.add('1581:1605');
  }
  if (id === '1581:1655')
    Object.assign(b.labels, {
      '1581:1659': campaign.name,
      '1581:1660': 'Preferred payment method',
      '1581:1665': 'Payment integration pending',
      '1581:1669': 'Payment integration pending',
      '1581:1673': 'Payment integration pending',
      '1581:1677': 'Payment integration pending',
      '1581:1681': 'Payment integration pending',
    });
  if (id === '1581:1711')
    Object.assign(b.labels, {
      '1581:1715': campaign.name,
      '1581:1718': 'Ocean Project',
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
    const date = new Date(pledge.created_at).toLocaleDateString(),
      amount = '$' + Number(pledge.amount).toFixed(2);
    Object.assign(b.labels, {
      '1581:1993': data.profile.display_name || 'Contributor',
      '1581:1996': pledge.campaign,
      '1581:1998': amount,
      '1581:2000': date,
      '1581:2002': pledge.id,
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
