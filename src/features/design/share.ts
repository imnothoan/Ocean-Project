import type { Controller } from './workflow';
import { Platform, Share } from 'react-native';

export async function shareText(message: string) {
  if (Platform.OS === 'web' && typeof navigator.share !== 'function') {
    if (!navigator.clipboard) throw new Error('Trình duyệt này chưa hỗ trợ chia sẻ. Hãy mở bằng Expo Go.');
    await navigator.clipboard.writeText(message);
    return 'copied';
  }
  try {
    await Share.share({ message });
  } catch (error) {
    if (!(error instanceof Error && error.name === 'AbortError')) throw error;
  }
  return 'shared';
}

// The Figma ID fields have room for a short reference. Sharing uses the complete stored identifier.
export function recordReference(c: Controller, node: string, id?: string, label = '') {
  c.binding.labels[node] = label + (id ? id.slice(0, 8).toUpperCase() : '—');
  if (id)
    c.binding.actions[node] = () =>
      c.run(async () => {
        await shareText(id);
      });
}
