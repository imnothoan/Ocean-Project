import { useRef, useState, type ComponentRef } from 'react';
import { Text, TextInput, View } from 'react-native';
import { FlowSection, styles, SmallButton, useLiveData } from './live';
import { memberActivity } from './activity';
import { localDateKey } from './eventDates';
import { exportReport } from './reportFiles';
import { shareText } from './share';
import type { ExportRow, ExportFormat } from './reportFileContent';

export function ImpactExport() {
  const { c, data } = useLiveData();
  const [format, setFormat] = useState<ExportFormat>('CSV');
  const [period, setPeriod] = useState('This month');
  const [start, setStart] = useState(''),
    [end, setEnd] = useState('');
  const [sections, setSections] = useState(['Personal activity', 'Network waste', 'Wildlife reports']);
  const ref = useRef<ComponentRef<typeof View>>(null);
  const today = localDateKey(new Date());
  const from =
      period === 'Custom'
        ? start
        : period === 'This year'
          ? today.slice(0, 4) + '-01-01'
          : today.slice(0, 7) + '-01',
    to = period === 'Custom' ? end : today;
  const date = (iso: string) => (iso.length === 10 ? iso : localDateKey(new Date(iso)));
  const rows: ExportRow[] = [];
  if (sections.includes('Personal activity'))
    for (const a of memberActivity(data, c.user?.id))
      rows.push([date(a.date), a.title, a.points + ' pts']);
  if (sections.includes('Network waste'))
    for (const m of data.metrics)
      rows.push([m.metric_date, 'Network waste collected', m.total_kg + ' kg']);
  if (sections.includes('Wildlife reports'))
    for (const r of data.reports.filter((r) => r.owner_id === c.user?.id && r.category === 'animal'))
      rows.push([date(r.created_at), r.title, r.status]);
  const filtered = rows
    .filter((r) => r[0] >= from && r[0] <= to)
    .sort((a, b) => b[0].localeCompare(a[0]));
  const title = 'Ocean Project · Impact report';
  function output(share = false) {
    c.run(async () => {
      const valid = (v: string) =>
        /^\d{4}-\d{2}-\d{2}$/.test(v) &&
        Number.isFinite(Date.parse(v)) &&
        new Date(v).toISOString().slice(0, 10) === v;
      if (!valid(from) || !valid(to) || from > to)
        throw new Error('Nhập khoảng ngày hợp lệ theo YYYY-MM-DD.');
      if (!sections.length) throw new Error('Chọn ít nhất một nhóm dữ liệu.');
      if (share)
        await shareText([title, from + ' – ' + to, ...filtered.map((r) => r.join(' · '))].join('\n'));
      else await exportReport(format, title, filtered, ref);
    });
  }
  return (
    <FlowSection top={134}>
      <Text style={styles.heading}>Select date range</Text>
      <View style={styles.actions}>
        {['This month', 'This year', 'Custom'].map((x) => (
          <SmallButton key={x} label={x} selected={period === x} onPress={() => setPeriod(x)} />
        ))}
      </View>
      {period === 'Custom' && (
        <>
          <TextInput
            accessibilityLabel="Start date"
            placeholder="From YYYY-MM-DD"
            style={styles.row}
            value={start}
            onChangeText={setStart}
          />
          <TextInput
            accessibilityLabel="End date"
            placeholder="To YYYY-MM-DD"
            style={styles.row}
            value={end}
            onChangeText={setEnd}
          />
        </>
      )}
      <Text style={styles.heading}>Choose format</Text>
      <View style={styles.actions}>
        {(['PDF', 'PNG', 'CSV'] as const).map((x) => (
          <SmallButton key={x} label={x} selected={format === x} onPress={() => setFormat(x)} />
        ))}
      </View>
      <Text style={styles.heading}>Select data metrics</Text>
      <View style={styles.actions}>
        {['Personal activity', 'Network waste', 'Wildlife reports'].map((x) => (
          <SmallButton
            key={x}
            label={x}
            selected={sections.includes(x)}
            onPress={() => setSections((s) => (s.includes(x) ? s.filter((v) => v !== x) : [...s, x]))}
          />
        ))}
      </View>
      <View ref={ref} collapsable={false} style={styles.row}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.body}>
          {from} – {to}
        </Text>
        {filtered.map((r, i) => (
          <Text key={i} style={styles.body}>
            {r.join(' · ')}
          </Text>
        ))}
        {!filtered.length && <Text style={styles.body}>No records in this period.</Text>}
      </View>
      <SmallButton label="Generate & Download" onPress={() => output()} />
      <SmallButton label="Share report" onPress={() => output(true)} />
    </FlowSection>
  );
}
