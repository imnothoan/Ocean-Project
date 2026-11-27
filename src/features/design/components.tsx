import React, { createContext, isValidElement, useContext } from 'react';
import { OceanTabBar } from './OceanTabBar';
import { Image } from 'expo-image';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
  type TextStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Box = [number, number, number, number];
type Layer = { node: string; box: Box };
export type Field = {
  onSubmit?: () => void;
  value: string;
  update: (value: string) => void;
  multiline?: boolean;
  placeholder?: string;
  keyboardType?: 'default' | 'numeric' | 'email-address';
};
export type Binding = {
  labels?: Record<string, string>;
  fields?: Record<string, Field>;
  actions?: Record<string, () => void>;
  tint?: Record<string, string>;
  images?: Record<string, string>;
  replacements?: Record<string, React.ReactNode>;
  hidden?: Set<string>;
  navigate: (id: string, source: string) => void;
};
export const Interaction = createContext<Binding>({
  navigate: () => {
    throw new Error('Missing frame navigator');
  },
});
const Geometry = createContext({ scale: 1, offset: 0 });
function usePlacement([x, y, w, h]: Box) {
  const { scale, offset } = useContext(Geometry);
  return {
    position: 'absolute' as const,
    left: x * scale,
    top: (y - offset) * scale,
    width: w * scale,
    height: h * scale,
  };
}
export function Artwork({
  node,
  box,
  source,
  radius = 0,
  content: custom,
  fit = 'fill',
  imageBox,
}: Layer & {
  content?: React.ReactNode;
  source?: number;
  radius?: number;
  fit?: 'cover' | 'fill';
  imageBox?: Box;
}) {
  const style = usePlacement(box);
  const binding = useContext(Interaction);
  const { scale } = useContext(Geometry);
  if (binding.hidden?.has(node)) return null;
  const replacement = custom ?? binding.replacements?.[node];

  const uri = binding.images?.[node];
  const content =
    replacement ??
    (uri || source ? (
      <Image
        source={uri ? { uri } : source}
        accessible={false}
        contentFit={uri ? 'cover' : fit}
        cachePolicy="memory-disk"
        style={
          imageBox && !uri
            ? {
                position: 'absolute',
                left: imageBox[0] * scale,
                top: imageBox[1] * scale,
                width: imageBox[2] * scale,
                height: imageBox[3] * scale,
              }
            : StyleSheet.absoluteFill
        }
      />
    ) : null);
  const action = binding.actions?.[node];
  return action ? (
    <Pressable
      testID={node}
      accessibilityRole="button"
      accessibilityLabel={binding.labels?.[node] || 'Open'}
      onPress={action}
      style={[style, { borderRadius: radius * scale, overflow: 'hidden' }]}
    >
      {content}
    </Pressable>
  ) : (
    <View
      pointerEvents={replacement ? 'auto' : 'none'}
      style={[style, { borderRadius: radius * scale, overflow: 'hidden' }]}
    >
      {content}
    </View>
  );
}
export function Surface({
  node,
  box,
  fill,
  radius = 0,
  stroke,
  shadow,
}: Layer & {
  fill: string;
  radius?: number;
  stroke?: [number, string];
  shadow?: [number, number, number, number, string];
}) {
  const style = usePlacement(box);
  const { scale } = useContext(Geometry);
  const binding = useContext(Interaction);
  if (binding.hidden?.has(node)) return null;
  const surface = [
    style,
    {
      backgroundColor: binding.tint?.[node] || fill,
      borderRadius: radius * scale,
      borderColor: stroke?.[1],
      borderWidth: stroke ? stroke[0] * scale : 0,
      boxShadow: shadow
        ? [
            {
              offsetX: shadow[0] * scale,
              offsetY: shadow[1] * scale,
              blurRadius: shadow[2] * scale,
              spreadDistance: shadow[3] * scale,
              color: shadow[4],
            },
          ]
        : undefined,
    },
  ];
  const action = binding.actions?.[node];
  return action ? (
    <Pressable
      testID={node}
      accessibilityRole="button"
      accessibilityLabel={binding.labels?.[node] || 'Select'}
      onPress={action}
      style={surface}
    />
  ) : (
    <View pointerEvents="none" style={surface} />
  );
}
export function Copy({
  node,
  box,
  text,
  typeStyle,
  runs,
  lines,
}: Layer & {
  text: string;
  typeStyle: TextStyle;
  runs?: [number, number, string | null][];
  lines?: number;
}) {
  const binding = useContext(Interaction);
  const { scale } = useContext(Geometry);
  const position = usePlacement(box);
  if (binding.hidden?.has(node)) return null;
  const label = binding.labels?.[node] ?? text;
  const style: TextStyle = {
    ...typeStyle,
    fontSize: (typeStyle.fontSize || 14) * scale,
    lineHeight: typeStyle.lineHeight ? typeStyle.lineHeight * scale : undefined,
    letterSpacing: (typeStyle.letterSpacing || 0) * scale,
    includeFontPadding: false,
    color: binding.tint?.[node] || typeStyle.color,
  };
  const field = binding.fields?.[node];
  if (field)
    return (
      <TextInput
        testID={node}
        accessibilityLabel={field.placeholder || text}
        value={field.value}
        onChangeText={field.update}
        placeholder={field.placeholder ?? text}
        placeholderTextColor={typeStyle.color}
        onSubmitEditing={field.onSubmit}
        returnKeyType={field.onSubmit ? 'go' : field.multiline ? 'default' : 'done'}
        keyboardType={field.keyboardType}
        multiline={field.multiline}
        allowFontScaling={false}
        style={[
          position,
          style,
          { padding: 0, minHeight: Math.max(position.height, 32 * scale), textAlignVertical: 'top' },
        ]}
      />
    );
  const lineCount =
    lines ??
    Math.max(1, Math.round(box[3] / (typeStyle.lineHeight || (typeStyle.fontSize || 14) * 1.2)));
  const content = (
    <Text
      allowFontScaling={false}
      numberOfLines={lineCount}
      adjustsFontSizeToFit={lineCount === 1}
      minimumFontScale={0.85}
      ellipsizeMode="tail"
      style={style}
    >
      {runs && label === text && !binding.tint?.[node]
        ? runs.map(([start, end, color]) => (
            <Text key={start} style={{ color: color ?? style.color }}>
              {text.slice(start, end)}
            </Text>
          ))
        : label}
    </Text>
  );
  const action = binding.actions?.[node];
  return action ? (
    <Pressable
      testID={node}
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={action}
      hitSlop={5}
      style={[position, { overflow: 'hidden' }]}
    >
      {content}
    </Pressable>
  ) : (
    <View pointerEvents="none" style={[position, { overflow: 'hidden' }]}>
      {content}
    </View>
  );
}
export function Link({ node, box, to, label }: Layer & { to: string; label: string }) {
  const style = usePlacement(box);
  const binding = useContext(Interaction);
  if (binding.hidden?.has(node)) return null;
  return (
    <Pressable
      testID={node}
      accessibilityRole="button"
      accessibilityLabel={binding.labels?.[node] || label}
      hitSlop={{
        left: Math.min(7, Math.max(0, (44 - style.width) / 2)),
        right: Math.min(7, Math.max(0, (44 - style.width) / 2)),
        top: Math.min(7, Math.max(0, (44 - style.height) / 2)),
        bottom: Math.min(7, Math.max(0, (44 - style.height) / 2)),
      }}
      style={style}
      onPress={binding.actions?.[node] || (() => binding.navigate(to, node))}
    />
  );
}
export function Footer(_props: { top: number }) {
  return null;
}
export function Frame({
  id,
  width,
  height,
  background,
  children,
}: {
  id: string;
  width: number;
  height: number;
  background: string;
  children: React.ReactNode;
}) {
  const { navigate } = useContext(Interaction);
  const [keyboardOpen, setKeyboardOpen] = React.useState(Keyboard.isVisible());
  React.useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', () => setKeyboardOpen(true));
    const hide = Keyboard.addListener('keyboardDidHide', () => setKeyboardOpen(false));
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);
  const window = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const scale = Math.min(window.width, 600) / width;
  const all = React.Children.toArray(children);
  const footer = all.find((child) => isValidElement<{ top: number }>(child) && child.type === Footer) as
    React.ReactElement<{ top: number }> | undefined;
  const content = all.filter((child) => child !== footer);
  const logo = id.startsWith('949:');
  const offset = logo ? 0 : 59;
  const bottom = footer?.props.top ?? 818;
  const bodyEnd = height > 852 ? height : bottom;
  return (
    <KeyboardAvoidingView
      testID={'frame-' + id}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{
        flex: 1,
        backgroundColor: background,
        paddingTop: logo ? 0 : insets.top,
        paddingBottom: logo || keyboardOpen ? 0 : insets.bottom + (footer ? 23 * scale : 0),
        alignItems: 'center',
      }}
    >
      <ScrollView
        key={id}
        style={{ width: width * scale, flex: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: Math.max(0, (bodyEnd - offset) * scale) }}
      >
        <Geometry.Provider value={{ scale, offset }}>{content}</Geometry.Provider>
      </ScrollView>
      {footer && !keyboardOpen && <OceanTabBar screen={id} scale={scale} navigate={navigate} />}
    </KeyboardAvoidingView>
  );
}
