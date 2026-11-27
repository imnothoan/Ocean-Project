import { Platform,Share } from 'react-native';

export async function shareText(message:string) {
  if(Platform.OS==='web' && typeof navigator.share!=='function'){
    if(!navigator.clipboard)throw new Error('Trình duyệt này chưa hỗ trợ chia sẻ. Hãy mở bằng Expo Go.');
    await navigator.clipboard.writeText(message);
    return 'copied';
  }
  try {await Share.share({message});} catch(error){if(!(error instanceof Error && error.name==='AbortError'))throw error;}
  return 'shared';
}
