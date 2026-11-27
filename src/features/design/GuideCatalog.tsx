import { useEffect, useState } from 'react';
import { Linking, Text } from 'react-native';
import { supabase } from '../../lib/supabase';
import { FlowSection, ListRow, SmallButton, styles, useLiveData } from './live';
import { matchesQuery } from './communityView';
import { action, choices, field, type Controller } from './workflow';

type Entry = {
  slug: string;
  title: string;
  categories: string[];
  summary: string;
  detail: string;
  frame_id: string | null;
  source_name: string;
  source_url: string;
};
type Kind = 'waste' | 'species' | 'tips';
function useGuides(kind: Kind) {
  const [rows, setRows] = useState<Entry[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');
    setRows([]);
    supabase
      .from('field_guides')
      .select('slug,title,categories,summary,detail,frame_id,source_name,source_url')
      .eq('kind', kind)
      .order('sort_order')
      .then((response) => {
        if (active) {
          setRows(response.data ?? []);
          setError(response.error?.message ?? '');
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, [kind, attempt]);
  return { rows, error, loading, retry: () => setAttempt((n) => n + 1) };
}
export function GuideSource({ kind, frame, top }: { kind: Kind; frame: string; top: number }) {
  const { c } = useLiveData();
  const { rows, error, retry } = useGuides(kind);
  const item = rows.find((row) => row.frame_id === frame);
  if (!item && !error) return null;
  return (
    <FlowSection top={top}>
      {item ? (
        <SmallButton
          label={'Source · ' + item.source_name}
          onPress={() => c.run(() => Linking.openURL(item.source_url))}
        />
      ) : (
        <SmallButton label="Retry source" onPress={retry} />
      )}
    </FlowSection>
  );
}
export function GuideCatalog({ kind }: { kind: 'waste' | 'species' | 'tips' }) {
  const { c } = useLiveData();
  const [expanded, setExpanded] = useState('');
  const { rows: catalog, error, loading, retry } = useGuides(kind);
  const category = c.values[kind + ':category'] || 'All';
  const entries = catalog.filter(
    (e) =>
      (category === 'All' || e.categories.includes(category)) &&
      matchesQuery(
        c.values[kind + ':search'] || '',
        e.title,
        e.categories.join(' '),
        e.summary,
        e.detail,
      ),
  );
  return (
    <FlowSection top={kind === 'waste' ? 230 : kind === 'species' ? 397 : 355}>
      {kind !== 'waste' && (
        <Text style={styles.heading}>{kind === 'species' ? 'Explore wildlife' : 'Quick tips'}</Text>
      )}
      {entries.map((e) => (
        <ListRow
          key={e.slug}
          title={e.title}
          description={e.summary}
          onPress={() =>
            e.frame_id ? c.go(e.frame_id) : setExpanded(e.title === expanded ? '' : e.title)
          }
        >
          {expanded === e.title && (
            <>
              <Text style={styles.body}>{e.detail}</Text>
              <SmallButton
                label={'Source · ' + e.source_name}
                onPress={() => c.run(() => Linking.openURL(e.source_url))}
              />
            </>
          )}
        </ListRow>
      ))}
      {error ? (
        <SmallButton label="Retry guides" onPress={retry} />
      ) : (
        !entries.length && (
          <Text style={styles.body}>
            {loading ? 'Loading guides…' : 'No matching entries in this collection.'}
          </Text>
        )
      )}
      {kind === 'waste' && <SmallButton label="Sorting quiz" onPress={() => c.go('682:5716')} />}
      {kind === 'tips' && <SmallButton label="Daily missions" onPress={() => c.go('670:5000')} />}
    </FlowSection>
  );
}
export function catalogBindings(c: Controller) {
  if (c.id === '263:2582') field(c, '263:2596', 'waste:search', 'Search an item');
  if (c.id === '272:204') {
    field(c, '272:217', 'species:search', 'Search species or habitat');
    choices(c, 'species:category', {
      '272:219': 'All',
      '272:221': 'Marine',
      '272:223': 'Birds',
      '272:225': 'Mammals',
      '272:227': 'Forest',
    });
    action(c, ['272:240'], () => {
      c.setValue('species:category', 'All');
      c.setValue('species:search', '');
    });
  }
  if (c.id === '682:5379')
    choices(c, 'tips:category', {
      '682:5390': 'All',
      '682:5392': 'Home',
      '682:5394': 'Food',
      '682:5396': 'Travel',
      '682:5398': 'Shopping',
    });
}
