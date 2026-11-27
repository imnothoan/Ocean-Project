import { Image } from 'expo-image';
import { Text, View, useWindowDimensions } from 'react-native';
import { levelFor, levels } from './activity';
import { useLiveData } from './live';

export function LevelJourney() {
  const { data } = useLiveData();
  const s = Math.min(useWindowDimensions().width, 600) / 393;
  const level = levelFor(data.points + data.claims.reduce((sum, claim) => sum + claim.cost, 0));
  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      {levels.map(([name], i) => {
        const done = i + 1 < level.number,
          current = i + 1 === level.number;
        return (
          <View key={name} style={{ flex: 1, alignItems: 'center', gap: 3 * s }}>
            {i < levels.length - 1 && (
              <View
                style={{
                  position: 'absolute',
                  top: 13 * s,
                  left: '50%',
                  width: '100%',
                  height: 3 * s,
                  backgroundColor: done ? '#43c4d6' : '#d8e5ec',
                }}
              />
            )}
            <View
              style={{ width: 28 * s, height: 28 * s, alignItems: 'center', justifyContent: 'center' }}
            >
              <Image
                source={
                  done || current
                    ? require('../../../assets/figma/mobile/22464.svg')
                    : require('../../../assets/figma/mobile/85a70.svg')
                }
                style={{ width: 28 * s, height: 28 * s, position: 'absolute' }}
              />
              <Image
                source={
                  done
                    ? require('../../../assets/figma/mobile/68ca9.svg')
                    : current
                      ? require('../../../assets/figma/mobile/5482e.svg')
                      : require('../../../assets/figma/mobile/00434.svg')
                }
                contentFit="contain"
                style={{ width: 12 * s, height: 13 * s }}
              />
            </View>
            <Text
              style={{
                fontFamily: current ? 'AfacadFlux_700Bold' : 'AfacadFlux_400Regular',
                color: '#3f596b',
                fontSize: 12 * s,
                textAlign: 'center',
                minHeight: 30 * s,
                lineHeight: 15 * s,
              }}
            >
              {name}
            </Text>
            <Text
              style={{
                fontFamily: 'AfacadFlux_700Bold',
                fontSize: 12 * s,
                color: current ? '#0186a8' : '#7b92a1',
              }}
            >
              {current ? 'Now' : done ? 'Done' : 'Next'}
            </Text>
          </View>
        );
      })}
    </View>
  );
}
