import { Image } from 'expo-image';
import { Pressable, View } from 'react-native';

// BottomAppBar 403:2835 and the four selected variants in the Figma phone frames.
const tabs = [
  {
    id: '403:2759',
    label: 'Map',
    x: 22,
    width: 73,
    iconX: 50,
    pillX: 20,
    pillWidth: 84,
    icon: require('../../../assets/figma/mobile/0b6f6.svg'),
    active: require('../../../assets/figma/mobile/c97f1.svg'),
  },
  {
    id: '258:426',
    label: 'Events',
    x: 95,
    width: 64,
    iconX: 121,
    pillX: 94,
    pillWidth: 123,
    icon: require('../../../assets/figma/mobile/2eca0.svg'),
    active: require('../../../assets/figma/mobile/97536.svg'),
  },
  {
    id: '230:1093',
    label: 'Report',
    x: 159,
    width: 75,
    iconX: 185,
    pillX: 0,
    pillWidth: 0,
    icon: require('../../../assets/figma/mobile/5900e.svg'),
    active: require('../../../assets/figma/mobile/5900e.svg'),
  },
  {
    id: '101:2769',
    label: 'Community',
    x: 234,
    width: 62,
    iconX: 249,
    pillX: 197,
    pillWidth: 113,
    icon: require('../../../assets/figma/mobile/79424.svg'),
    active: require('../../../assets/figma/mobile/0ef57.svg'),
  },
  {
    id: '666:3592',
    label: 'Profile',
    x: 296,
    width: 76,
    iconX: 320,
    pillX: 291,
    pillWidth: 81,
    icon: require('../../../assets/figma/mobile/8137a.svg'),
    active: require('../../../assets/figma/mobile/b1d8e.svg'),
  },
];
const figmaIds: Record<string, string[]> = {
  '403:2759': ['403:2842', '403:2841', '403:2840', '403:2843', '403:2844'],
  '258:426': ['258:512', '258:511', '258:510', '258:513', '258:514'],
  '564:290': ['718:799', '718:798', '718:797', '718:800', '718:801'],
  '230:1093': ['230:4439', '230:4438', '230:4437', '230:4440', '230:4441'],
  '101:2769': ['918:530', '101:2859', '101:2864', '101:2867', '101:2860'],
  '666:3592': ['918:536', '666:3744', '666:3748', '666:3745', '666:3752'],
};
export function OceanTabBar({
  screen,
  scale,
  navigate,
}: {
  screen: string;
  scale: number;
  navigate: (id: string, source: string) => void;
}) {
  const selected = tabs.find((t) => t.id === screen) ?? tabs[1];
  const box = (x: number, y: number, w: number, h: number) => ({
    position: 'absolute' as const,
    left: x * scale,
    top: y * scale,
    width: w * scale,
    height: h * scale,
  });
  return (
    <View testID="ocean-tab-bar" style={{ width: 393 * scale, height: 75 * scale }}>
      <View style={[box(22, 25, 350, 49), { backgroundColor: '#a5e0f2', borderRadius: 18 * scale }]} />
      {selected.pillWidth > 0 && (
        <View
          style={[
            box(selected.pillX, 25, selected.pillWidth, 49),
            { backgroundColor: '#0186a8', borderRadius: 18 * scale },
          ]}
        />
      )}
      <Image
        accessible={false}
        source={require('../../../assets/figma/mobile/db901.svg')}
        contentFit="fill"
        style={box(159, 0, 75, 75)}
      />
      <Image
        accessible={false}
        source={
          selected === tabs[2]
            ? require('../../../assets/figma/mobile/38ce1.svg')
            : require('../../../assets/figma/mobile/19ec0.svg')
        }
        contentFit="fill"
        style={box(164, 6, 65, 65)}
      />
      {tabs.map((tab, i) => {
        const center = i === 2;
        const id = figmaIds[screen]?.[i] ?? 'tab-' + tab.label;
        return (
          <Pressable
            key={tab.id}
            testID={id}
            accessibilityRole="tab"
            accessibilityLabel={tab.label}
            accessibilityState={{ selected: tab === selected }}
            onPress={() => navigate(tab.id, id)}
            style={box(tab.x, center ? 0 : 25, tab.width, center ? 75 : 49)}
          >
            <Image
              accessible={false}
              contentFit="fill"
              source={tab === selected ? tab.active : tab.icon}
              style={box(tab.iconX - tab.x, center ? 27 : 13, 24, 24)}
            />
          </Pressable>
        );
      })}
    </View>
  );
}
