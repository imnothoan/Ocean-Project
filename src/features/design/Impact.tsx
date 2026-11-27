import { Text, View } from 'react-native';
import { FlowSection, ListRow, SmallButton, styles, useLiveData } from './live';
import { Image } from 'expo-image';
import Svg, { Circle } from 'react-native-svg';
import { eventPhotoUrl } from './eventPhotos';
import { action, field, type Controller } from './workflow';
import type { ProjectData } from './useProjectData';
import { levelFor } from './activity';
import { matchesQuery } from './communityView';
import { parseReportCoordinates } from './reportLocation';
import OceanMap from './OceanMap';

function totals(data: ProjectData) {
  return data.metrics.reduce(
    (s, r) => ({
      total: s.total + Number(r.total_kg),
      plastic: s.plastic + Number(r.plastic_kg),
      organic: s.organic + Number(r.organic_kg),
      other: s.other + Number(r.other_kg),
    }),
    { total: 0, plastic: 0, organic: 0, other: 0 },
  );
}
export function coastlines(data: ProjectData) {
  const byArea = new Map<string, { events: number; kg: number; reports: number }>();
  const ensure = (s: string) => {
    const key = s.trim() || 'Unspecified location';
    let area = byArea.get(key);
    if (!area) {
      area = { events: 0, kg: 0, reports: 0 };
      byArea.set(key, area);
    }
    return area;
  };
  for (const e of data.events) ensure(e.location).events++;
  for (const recap of data.recaps) {
    const e = data.events.find((e) => e.id === recap.event_id);
    if (e) ensure(e.location).kg += Number(recap.total_kg || 0);
  }
  for (const r of data.reports) ensure(r.location).reports++;
  return [...byArea.entries()].map(([location, counts]) => ({ location, ...counts }));
}
function AreaMap({ reportsOnly = false }: { reportsOnly?: boolean }) {
  const { c, data } = useLiveData();
  const places = coastlines(data).flatMap((a) => {
    const coordinate = parseReportCoordinates(a.location);
    if (!coordinate || (reportsOnly && !a.reports)) return [];
    return [{ id: a.location, title: a.location + ' · ' + a.reports + ' reports', coordinate }];
  });
  return (
    <View style={{ flex: 1, overflow: 'hidden', borderRadius: 10 }}>
      <OceanMap
        places={places}
        onSelect={(location) => {
          c.setValue('area', location);
          c.go('311:942');
        }}
      />
    </View>
  );
}

const chartColors = ['#706ee7', '#ff928a', '#55c4ae', '#ffae4c'];
function CompositionChart({ shares }: { shares: number[] }) {
  let offset = 0;
  const circumference = 2 * Math.PI * 40;
  return (
    <Svg width="100%" height="100%" viewBox="0 0 100 100" accessibilityLabel="Waste composition">
      <Circle cx={50} cy={50} r={40} stroke="#e5ecef" strokeWidth={14} fill="none" />
      {shares.map((share, i) => {
        if (!share) return null;
        const start = offset;
        const length = circumference * share;
        offset += length;
        return (
          <Circle
            key={chartColors[i]}
            cx={50}
            cy={50}
            r={40}
            fill="none"
            strokeWidth={14}
            stroke={chartColors[i]}
            strokeDasharray={[length, circumference - length]}
            strokeDashoffset={-start}
            rotation={-90}
            origin="50,50"
          />
        );
      })}
    </Svg>
  );
}

function RecapPhotos({ cover, recap }: { cover?: string | null; recap?: string | null }) {
  const photos = [
    [cover, 'Event cover'],
    [recap, 'Recap photo'],
  ].filter(([path]) => path);
  return (
    <View
      style={{
        flexDirection: 'row',
        flex: 1,
        gap: 6,
        alignItems: 'stretch',
        backgroundColor: '#edfbff',
        borderRadius: 10,
        overflow: 'hidden',
      }}
    >
      {photos.length ? (
        photos.map(([path, label]) => (
          <Image
            key={label}
            accessibilityLabel={label!}
            source={{ uri: eventPhotoUrl(path) }}
            contentFit="cover"
            style={{ flex: 1 }}
          />
        ))
      ) : (
        <Text style={[styles.body, { alignSelf: 'center', flex: 1, textAlign: 'center' }]}>
          No event photos yet.
        </Text>
      )}
    </View>
  );
}

export function AreaList({ overview = false }: { overview?: boolean }) {
  const { c, data, loading } = useLiveData();
  const areas = coastlines(data)
    .filter((a) => matchesQuery(c.values.areaQuery || '', a.location))
    .sort((a, b) => (c.values.areaSort === 'recovered' ? b.kg - a.kg : b.reports - a.reports));
  const pick = (location: string) => {
    c.setValue('area', location);
    c.go('311:942');
  };
  return (
    <FlowSection top={overview ? 139 : 250}>
      {overview && (
        <View style={{ height: 260, borderRadius: 16, overflow: 'hidden' }}>
          <AreaMap />
        </View>
      )}
      <Text style={styles.heading}>{overview ? 'Reported locations' : 'Coastlines'}</Text>
      {areas.map((a) => (
        <ListRow
          key={a.location}
          title={a.location}
          description={a.reports + ' visible reports · ' + a.events + ' events · ' + a.kg + ' kg recorded'}
          onPress={() => pick(a.location)}
        />
      ))}
      {!areas.length && (
        <Text style={styles.body}>{loading ? 'Loading locations…' : 'No locations match.'}</Text>
      )}
    </FlowSection>
  );
}
export function AreaDetail({ compare = false }: { compare?: boolean }) {
  const { c, data } = useLiveData();
  const areas = coastlines(data);
  const selected = areas.find((a) => a.location === c.values.area) ?? areas[0];
  const second = areas.find((a) => a.location === c.values.compareArea && a.location !== selected?.location);
  const card = (a: NonNullable<typeof selected>) => (
    <ListRow
      title={a.location}
      description={a.events + ' events\n' + a.reports + ' visible reports\n' + a.kg + ' kg in event recaps'}
    />
  );
  return (
    <FlowSection top={140}>
      {selected ? card(selected) : <Text style={styles.body}>No area records available.</Text>}
      {second && compare && card(second)}
      {compare ? (
        <>
          <Text style={styles.heading}>Compare with</Text>
          {areas
            .filter((a) => a !== selected)
            .map((a) => (
              <SmallButton
                key={a.location}
                label={a.location}
                selected={a === second}
                onPress={() => c.setValue('compareArea', a.location)}
              />
            ))}
        </>
      ) : (
        <View style={styles.actions}>
          {[
            ['Compare areas', '311:869'],
            ['Waste composition', '311:771'],
            ['Time trends', '311:716'],
            ['Event impact', '311:1159'],
          ].map(([label, id]) => (
            <SmallButton key={id} label={label} onPress={() => c.go(id)} />
          ))}
        </View>
      )}
    </FlowSection>
  );
}
export function Trends() {
  const { data, loading } = useLiveData();
  return (
    <FlowSection top={145}>
      <Text style={styles.heading}>Waste collected over time</Text>
      {data.metrics.map((m) => (
        <ListRow key={m.metric_date} title={m.metric_date} description={m.total_kg + ' kg recorded'} />
      ))}
      {!data.metrics.length && (
        <Text style={styles.body}>{loading ? 'Loading measurements…' : 'No measurements recorded.'}</Text>
      )}
    </FlowSection>
  );
}
export function WasteComposition() {
  const { data } = useLiveData();
  const t = totals(data);
  return (
    <FlowSection top={152}>
      <ListRow title="Total waste collected" description={t.total + ' kg'} />
      {(['plastic', 'organic', 'other'] as const).map((key) => (
        <View key={key} style={styles.row}>
          <Text style={styles.title}>{key[0].toUpperCase() + key.slice(1)}</Text>
          <Text style={styles.body}>
            {t[key]} kg · {t.total ? Math.round((t[key] / t.total) * 100) : 0}%
          </Text>
          <View style={{ height: 8, borderRadius: 8, backgroundColor: '#edfbff' }}>
            <View
              style={{
                height: 8,
                width: (Math.min(100, t.total ? (t[key] / t.total) * 100 : 0) + '%') as `${number}%`,
                borderRadius: 8,
                backgroundColor: '#43c4d6',
              }}
            />
          </View>
        </View>
      ))}
    </FlowSection>
  );
}
export function AdminOverview() {
  const { c, data } = useLiveData();
  const pending = data.reports.filter((r) => r.status === 'submitted' || r.status === 'reviewing');
  const today = new Date().toLocaleDateString();
  const t = totals(data);
  return (
    <FlowSection top={140}>
      <ListRow
        title="New reports today"
        description={String(
          data.reports.filter((r) => new Date(r.created_at).toLocaleDateString() === today).length,
        )}
      />
      <ListRow
        title="Awaiting review"
        description={pending.length + ' reports'}
        onPress={() => c.go('292:4022')}
      />
      <ListRow
        title="Volunteer applications"
        description={data.applications.filter((a) => a.status === 'pending').length + ' pending'}
        onPress={() => c.go('605:523')}
      />
      <ListRow
        title="Active cleanup events"
        description={
          data.events.filter((e) => !e.ended_at && Date.parse(e.event_date) >= Date.now()).length +
          ' upcoming'
        }
      />
      <ListRow
        title="Waste collected"
        description={t.total + ' kg recorded'}
        onPress={() => c.go('292:4198')}
      />
      <Text style={styles.heading}>Recent activity</Text>
      {data.reports.slice(0, 4).map((r) => (
        <ListRow
          key={r.id}
          title={r.title}
          description={r.location + ' · ' + r.status}
          onPress={() => {
            c.setValue('reportId', r.id);
            c.go('692:816');
          }}
        />
      ))}
    </FlowSection>
  );
}
export function AdminFinance() {
  const { c } = useLiveData();
  return (
    <FlowSection top={146}>
      <ListRow
        title="Campaigns"
        description="Public financial totals have not been published."
        onPress={() => c.go('1581:1359')}
      />
      <ListRow
        title="My contribution history"
        description="Pledges and confirmed contributions for your account."
        onPress={() => c.go('1581:1920')}
      />
    </FlowSection>
  );
}
export function impactBindings(c: Controller, data: ProjectData) {
  const { id, binding: b, values: v } = c;
  const total = totals(data);
  if (id === '311:488') {
    const areas = coastlines(data);
    Object.assign(b.labels, {
      '311:4347': 'Coastlines',
      '311:4348': String(areas.length),
      '311:4353': total.total + ' kg',
      '311:4358': String(data.events.length),
      '311:501': 'Latest activities',
    });
    b.replacements['311:4374'] = <AreaMap />;
    for (const n of [
      '311:4394',
      '311:4395',
      '311:4419',
      '311:4399',
      '311:4403',
      '311:4407',
      '311:4411',
      '311:4415',
      '1683:645',
      '1683:646',
      '311:4496',
    ])
      b.hidden.add(n);
    action(c, ['networkMapLink'], () => c.go('311:1093'));
    const recent = data.recaps.slice(0, 2);
    [
      ['311:4427', '311:4428', '311:4429', '311:4445'],
      ['311:4459', '311:4460', '311:4461', '311:4462'],
    ].forEach(([a, b1, d, e], i) => {
      const r = recent[i],
        event = data.events.find((e) => e.id === r?.event_id);
      Object.assign(b.labels, {
        [a]: event?.title || (!i ? 'No recaps yet' : ''),
        [b1]: r ? new Date(r.created_at).toLocaleDateString() : '',
        [d]: event?.location || '',
        [e]: r?.total_kg != null ? r.total_kg + ' kg recorded' : '',
      });
    });
    ['311:4423', '311:4457'].forEach((n, i) => {
      if (!recent[i]) {
        if (i === 1) for (const empty of ['311:4457', '311:4458', '311:4463']) b.hidden.add(empty);
        return;
      }
      action(c, [n], () => {
        c.setValue('eventId', recent[i].event_id);
        c.go('311:1159');
      });
    });
  }
  if (id === '311:579') {
    field(c, '311:688', 'areaQuery', 'Search coastlines');
    b.labels['311:583'] = 'Most reports';
    b.labels['311:584'] = 'Waste collected';
    action(c, ['311:583'], () => c.setValue('areaSort', 'reports'));
    action(c, ['311:584'], () => c.setValue('areaSort', 'recovered'));
  }
  if (id === '311:1159') {
    const r = data.recaps.find((r) => r.event_id === v.eventId) ?? data.recaps[0];
    const event = data.events.find((e) => e.id === r?.event_id);
    b.replacements['323:5664'] = <RecapPhotos cover={event?.cover_path} recap={r?.photo_path} />;
    Object.assign(b.labels, {
      '311:1162': r ? 'Recorded' : 'Awaiting recap',
      '311:1166': event?.title || 'Event impact',
      '323:5684': r?.total_kg != null ? r.total_kg + ' kg' : '—',
      '323:5690': r?.recyclable_kg != null ? r.recyclable_kg + ' kg' : '—',
      '323:5676': '—',
      '323:5697': '—',
      '323:5739': '—',
      '311:1183': 'Event recap',
      '311:1184': r?.body || 'No recap has been recorded.',
    });
  }
  if (id === '311:1280') {
    const own = data.reports.filter((r) => r.owner_id === c.user?.id);
    const wildlife = own.filter((r) => r.category === 'animal');
    const verified = wildlife.filter((r) => r.status === 'resolved').length;
    const level = levelFor(data.points + data.claims.reduce((s, r) => s + r.cost, 0));
    Object.assign(b.labels, {
      '311:1300': 'Wildlife reports',
      '311:1301': String(wildlife.length),
      '335:5886': 'Verified wildlife reports',
      '335:5887': String(verified),
      '311:1308': 'Wildlife reporting',
      '335:5794': '—',
      '335:5800': String(verified),
      '335:5799': 'Verified sightings',
      '335:5804': '—',
      '335:5809': '—',
      '311:1319': level.name,
      '311:1320': 'Earned from recorded activities',
      '323:5784': 'Level ' + level.number,
      '323:5786': data.points + ' pts',
    });
  }
  if (id === '722:6967') {
    b.labels['722:7083'] = data.profile.display_name || 'Moderator';
    b.labels['722:7085'] = 'Administrator';
    action(c, ['727:460', '727:461'], () => {
      c.setValue('applicationStatus', 'approved');
      c.go('605:523');
    });
    action(c, ['727:455', '727:456'], () => {
      c.setValue('applicationStatus', 'pending');
      c.go('605:523');
    });
    b.labels['727:465'] = 'Community profiles';
    action(c, ['727:465'], () => c.go('666:2965'));
  }
  if (id === '292:4198') {
    const pending = data.reports.filter((r) => r.status === 'submitted' || r.status === 'reviewing').length;
    Object.assign(b.labels, {
      '292:4209': 'All locations',
      '292:4212': 'All time',
      '292:4222': 'Open reports',
      '292:4227': 'Resolved',
      '292:4232': 'Reported locations',
      '292:4243': 'Visible reports with coordinates',
      '292:4244': '',
      '292:4218': total.total + ' kg',
      '292:4219': 'Recorded metrics',
      '292:4223': String(pending),
      '292:4228': String(data.reports.filter((r) => r.status === 'resolved').length),
      '292:4229': data.reports.length + ' visible reports',
    });
    const amounts = [
      total.plastic,
      total.organic,
      total.other,
      Math.max(0, total.total - total.plastic - total.organic - total.other),
    ];
    const sum = amounts.reduce((a, b) => a + b, 0);
    const shares = amounts.map((value) => (sum ? value / sum : 0));
    ['Plastics', 'Organic', 'Other', 'Unclassified'].forEach((name, i) => {
      b.labels[['1692:713', '1692:717', '1692:721', '1692:725'][i]] = name;
      b.labels[['1692:714', '1692:718', '1692:722', '1692:726'][i]] = Math.round(shares[i] * 100) + '%';
      b.tint[['1692:715', '1692:719', '1692:723', '1692:727'][i]] = chartColors[i];
    });
    b.hidden.add('292:4248');
    b.hidden.add('292:4249');
    b.replacements['1692:728'] = <CompositionChart shares={shares} />;
    b.replacements['292:4234'] = <AreaMap reportsOnly />;
  }
}
