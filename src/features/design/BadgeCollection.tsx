import { Image } from 'expo-image';
import { Pressable, Text, View, useWindowDimensions } from 'react-native';
import { badges, badgeProgress, type Badge } from './badges';
import { FlowSection, useLiveData } from './live';

const artwork = [
  require('../../../assets/figma/mobile/badge-218-2621.png'),
  require('../../../assets/figma/mobile/89052.svg'),
  require('../../../assets/figma/mobile/badge-218-2624.png'),
  require('../../../assets/figma/mobile/badge-218-2627.png'),
  require('../../../assets/figma/mobile/badge-218-2630.png'),
  require('../../../assets/figma/mobile/c9778.svg'),
];
const ink = '#091727',
  muted = '#7b92a1',
  blue = '#0186a8',
  bold = 'AfacadFlux_700Bold',
  regular = 'AfacadFlux_400Regular';
export function BadgeMedal({ badge }: { badge: Badge }) {
  const glyph = badge.art === 1 || badge.art === 5;
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        borderRadius: 999,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#edfbff',
      }}
    >
      <Image
        accessible={false}
        source={artwork[badge.art]}
        contentFit="contain"
        style={{ width: glyph ? '52%' : '100%', height: glyph ? '52%' : '100%' }}
      />
    </View>
  );
}
export function ProgressTrack({
  fraction,
  track = '#d8e7ea',
  fill = '#43c4d6',
}: {
  fraction: number;
  track?: string;
  fill?: string;
}) {
  const percent = Math.round(Math.max(0, Math.min(1, fraction)) * 100);
  return (
    <View
      accessible
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: percent }}
      style={{ flex: 1, borderRadius: 20, overflow: 'hidden', backgroundColor: track }}
    >
      {fraction > 0 && (
        <View
          style={{
            height: '100%',
            width: `${Math.min(1, fraction) * 100}%`,
            backgroundColor: fill,
            borderRadius: 20,
          }}
        />
      )}
    </View>
  );
}
export function BadgeCollection() {
  const { c, data, loading } = useLiveData();
  const s = Math.min(useWindowDimensions().width, 600) / 393;
  const filter = c.values.badgeCategory || 'All';
  const filtered = badges.filter((b) => filter === 'All' || b.category === filter);
  const available = !c.user || data.badgeMetrics !== null;
  const metrics = data.badgeMetrics ?? {};
  const next = filtered.find((b) => badgeProgress(b, metrics) < b.target);
  function open(b: Badge) {
    c.setValue('badgeTitle', b.title);
    c.go('670:4529');
  }
  return (
    <FlowSection top={325} padding={0}>
      <View style={{ marginLeft: 15 * s, marginRight: 25 * s, gap: 10 * s }}>
        {Array.from({ length: Math.ceil(filtered.length / 2) }, (_, row) => (
          <View key={row} style={{ gap: 9 * s }}>
            {row === 3 && next && available && (
              <Pressable
                accessibilityRole="button"
                onPress={() => open(next)}
                style={{
                  borderWidth: 1,
                  borderColor: '#c9d5de',
                  borderRadius: 14 * s,
                  padding: 14 * s,
                  gap: 7 * s,
                }}
              >
                <Text style={{ fontFamily: bold, color: ink, fontSize: 14 * s }}>
                  Next up · {next.title}
                </Text>
                <Text style={{ fontFamily: regular, color: '#3f596b', fontSize: 12 * s }}>
                  {next.goal}
                </Text>
                <View style={{ height: 6 * s }}>
                  <ProgressTrack fraction={badgeProgress(next, metrics) / next.target} />
                </View>
                <Text style={{ fontFamily: bold, color: blue, fontSize: 12 * s }}>
                  {badgeProgress(next, metrics)} / {next.target}
                </Text>
              </Pressable>
            )}
            <View style={{ flexDirection: 'row', gap: 9 * s, alignItems: 'stretch' }}>
              {filtered.slice(row * 2, row * 2 + 2).map((b) => {
                const earned = badgeProgress(b, metrics) >= b.target;
                return (
                  <Pressable
                    key={b.title}
                    testID={'badge-' + badges.indexOf(b)}
                    accessibilityRole="button"
                    accessibilityLabel={b.title}
                    onPress={() => open(b)}
                    style={{
                      flex: 1,
                      minHeight: 106 * s,
                      backgroundColor: '#fff',
                      borderWidth: 0.9 * s,
                      borderColor: '#c9d5de',
                      borderRadius: 14 * s,
                      padding: 11 * s,
                      justifyContent: 'space-between',
                      gap: 10 * s,
                    }}
                  >
                    <View style={{ flexDirection: 'row', gap: 9 * s, alignItems: 'flex-start' }}>
                      <View style={{ width: 42 * s, height: 42 * s }}>
                        <BadgeMedal badge={b} />
                      </View>
                      <View style={{ flex: 1, gap: 3 * s }}>
                        <Text style={{ fontFamily: bold, fontSize: 14 * s, color: ink }}>{b.title}</Text>
                        <Text style={{ fontFamily: regular, fontSize: 12 * s, color: muted }}>
                          {b.goal}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        backgroundColor: earned ? '#def5eb' : '#eef2f4',
                        alignSelf: 'flex-start',
                        borderRadius: 12 * s,
                        paddingHorizontal: 12 * s,
                        paddingVertical: 2 * s,
                      }}
                    >
                      <Text
                        style={{ fontFamily: bold, fontSize: 12 * s, color: earned ? '#178b72' : muted }}
                      >
                        {available ? (earned ? 'EARNED' : 'LOCKED') : loading ? '…' : 'Unavailable'}
                      </Text>
                    </View>
                  </Pressable>
                );
              })}
              {filtered.length === row * 2 + 1 && <View style={{ flex: 1 }} />}
            </View>
          </View>
        ))}
      </View>
    </FlowSection>
  );
}
export function BadgeDetailBody({ badge }: { badge: Badge }) {
  const { c, data } = useLiveData();
  const s = Math.min(useWindowDimensions().width, 600) / 393;
  const has = !c.user || data.badgeMetrics !== null;
  const current = badgeProgress(badge, data.badgeMetrics ?? {});
  const related = badges
    .filter((b) => b.title !== badge.title && b.category === badge.category)
    .slice(0, 3);
  return (
    <FlowSection top={352}>
      <Text style={{ fontFamily: regular, color: '#3f596b', fontSize: 14 * s }}>{badge.goal}.</Text>
      <Text style={{ fontFamily: bold, color: ink, fontSize: 17 * s, marginTop: 14 * s }}>
        How to earn
      </Text>
      <Pressable
        accessibilityRole="button"
        onPress={() => c.go(badge.route)}
        style={{
          borderColor: '#c9d5de',
          borderWidth: 1,
          borderRadius: 14 * s,
          padding: 14 * s,
          gap: 8 * s,
        }}
      >
        <Text style={{ fontFamily: bold, fontSize: 16 * s, color: ink }}>{badge.goal}</Text>
        <View style={{ height: 7 * s }}>
          <ProgressTrack fraction={current / badge.target} />
        </View>
        <Text style={{ fontFamily: bold, fontSize: 14 * s, color: blue }}>
          {has ? current + ' / ' + badge.target : 'Progress unavailable'} ›
        </Text>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        onPress={() => c.go('218:2549')}
        style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12 * s }}
      >
        <Text style={{ fontFamily: bold, color: ink, fontSize: 17 * s }}>Related badges</Text>
        <Text style={{ fontFamily: bold, color: blue, fontSize: 14 * s }}>View all</Text>
      </Pressable>
      <View style={{ flexDirection: 'row', gap: 8 * s }}>
        {related.map((b) => (
          <Pressable
            key={b.title}
            accessibilityRole="button"
            onPress={() => c.setValue('badgeTitle', b.title)}
            style={{
              flex: 1,
              borderRadius: 12 * s,
              padding: 10 * s,
              gap: 6 * s,
              backgroundColor: '#edfbff',
            }}
          >
            <View style={{ width: 28 * s, height: 28 * s }}>
              <BadgeMedal badge={b} />
            </View>
            <Text style={{ fontFamily: bold, fontSize: 14 * s, color: ink }}>{b.title}</Text>
          </Pressable>
        ))}
      </View>
    </FlowSection>
  );
}
