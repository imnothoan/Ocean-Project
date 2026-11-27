import { Pressable, Text, View } from 'react-native';
import { type ReportLocationProps } from './reportLocation';

export default function ReportLocationMap({ location, onLocate }: ReportLocationProps) {
  return <View style={{ flex: 1, backgroundColor: '#eaf8fb', padding: 16, justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ color: '#3f596b', textAlign: 'center' }}>{location || 'Enter a place or use your current location.'}</Text>
    {onLocate && <Pressable accessibilityRole="button" onPress={onLocate} style={{ padding: 10 }}>
      <Text style={{ color: '#0186a8', fontWeight: '600' }}>Use current location</Text>
    </Pressable>}
  </View>;
}
