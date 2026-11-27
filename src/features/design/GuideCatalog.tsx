import { useState } from 'react';
import { Text } from 'react-native';
import { FlowSection, ListRow, SmallButton, styles, useLiveData } from './live';
import { matchesQuery } from './communityView';
import { action, choices, field, type Controller } from './workflow';

type Entry = { title: string; category: string; summary: string; detail: string; route?: string };
const waste: Entry[] = [
  {
    title: 'Paper & cardboard',
    category: 'Paper',
    summary: 'Clean and dry',
    detail: 'Keep paper dry, flatten boxes and follow the local collection rules.',
  },
  {
    title: 'Plastic bottle',
    category: 'Plastic',
    summary: 'Bottles & packaging',
    detail: 'Check the resin mark and local recycling guidance.',
    route: '269:124',
  },
  {
    title: 'Glass',
    category: 'Glass',
    summary: 'Jars & bottles',
    detail: 'Empty containers. Check separately for broken glass, mirrors and cookware.',
  },
  {
    title: 'Metal',
    category: 'Metal',
    summary: 'Cans & foil',
    detail: 'Empty and rinse containers before sorting them under local rules.',
  },
  {
    title: 'Organic waste',
    category: 'Organic',
    summary: 'Food & garden',
    detail: 'Use the accepted food scraps or garden waste collection in your area.',
  },
  {
    title: 'Special waste',
    category: 'Special',
    summary: 'Batteries & bulbs',
    detail: 'Use a designated collection point. Keep batteries and bulbs out of ordinary recycling.',
  },
];
const species: Entry[] = [
  {
    title: 'Green sea turtle',
    category: 'Marine',
    summary: 'Protect nesting beaches',
    detail: 'Tropical and subtropical oceans',
    route: '274:297',
  },
  {
    title: 'Jellyfish',
    category: 'Marine',
    summary: 'Marine wildlife',
    detail: 'Observe from a safe distance. Avoid touching jellyfish, including those on the beach.',
  },
  {
    title: 'Blue whale',
    category: 'Mammals',
    summary: 'Ocean habitat',
    detail: 'Give whales space and follow guidance from local marine conservation teams.',
  },
];
const tips: Entry[] = [
  {
    title: 'Carry a reusable bottle',
    category: 'Food',
    summary: 'Skip single-use plastic every day.',
    detail: 'Carry a bottle and refill it on the go.',
    route: '682:5569',
  },
  {
    title: 'Start a mini compost bin',
    category: 'Home',
    summary: 'Turn kitchen scraps into soil.',
    detail: 'Choose a suitable container and follow your local composting guidance.',
  },
  {
    title: 'Unplug what you don’t use',
    category: 'Home',
    summary: 'Reduce standby power.',
    detail: 'Switch off idle electronics when they can safely be disconnected.',
  },
  {
    title: 'Carry a reusable bag',
    category: 'Shopping',
    summary: 'Prepare for your next shopping trip.',
    detail: 'Keep a sturdy bag near the door or in your backpack.',
  },
  {
    title: 'Refill on the road',
    category: 'Travel',
    summary: 'Pack a bottle for your trip.',
    detail: 'Look for drinking-water refill stations when planning your route.',
  },
];
export function GuideCatalog({ kind }: { kind: 'waste' | 'species' | 'tips' }) {
  const { c } = useLiveData();
  const [expanded, setExpanded] = useState('');
  const catalog = kind === 'waste' ? waste : kind === 'species' ? species : tips;
  const category = c.values[kind + ':category'] || 'All';
  const entries = catalog.filter(
    (e) =>
      (category === 'All' || e.category === category || (kind === 'species' && category === 'Marine')) &&
      matchesQuery(c.values[kind + ':search'] || '', e.title, e.category, e.summary, e.detail),
  );
  return (
    <FlowSection top={kind === 'waste' ? 230 : kind === 'species' ? 397 : 355}>
      {kind !== 'waste' && (
        <Text style={styles.heading}>{kind === 'species' ? 'Explore wildlife' : 'Quick tips'}</Text>
      )}
      {entries.map((e) => (
        <ListRow
          key={e.title}
          title={e.title}
          description={e.summary}
          onPress={() => (e.route ? c.go(e.route) : setExpanded(e.title === expanded ? '' : e.title))}
        >
          {expanded === e.title && <Text style={styles.body}>{e.detail}</Text>}
        </ListRow>
      ))}
      {!entries.length && <Text style={styles.body}>No matching entries in this collection.</Text>}
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
