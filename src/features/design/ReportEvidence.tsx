import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import { Image } from 'expo-image';
import { supabase } from '../../lib/supabase';

export function ReportEvidence({ path }: { path: string }) {
  const [attempt, setAttempt] = useState(0);
  const [image, setImage] = useState<{ path: string; url?: string; failed?: boolean }>();
  useEffect(() => {
    let active = true;
    setImage({ path });
    supabase.storage
      .from('report-evidence')
      .createSignedUrl(path, 600)
      .then(({ data, error }) => {
        if (active) setImage({ path, url: data?.signedUrl, failed: Boolean(error) });
      })
      .catch(() => {
        if (active) setImage({ path, failed: true });
      });
    return () => {
      active = false;
    };
  }, [path, attempt]);
  if (image?.path !== path || (!image.url && !image.failed)) return <ActivityIndicator />;
  if (image.failed)
    return (
      <Pressable accessibilityRole="button" onPress={() => setAttempt((v) => v + 1)}>
        <Text>Retry photo</Text>
      </Pressable>
    );
  return (
    <Image
      accessibilityLabel="Report evidence"
      source={{ uri: image.url }}
      contentFit="cover"
      cachePolicy="memory"
      style={StyleSheet.absoluteFill}
      onError={() => setImage({ path, failed: true })}
    />
  );
}
