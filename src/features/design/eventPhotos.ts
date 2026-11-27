import { randomUUID } from 'expo-crypto';
import { supabase } from '../../lib/supabase';
import { fileBytes,type Photo } from './media';
import { result } from './workflow';

export async function withEventPhoto<T>(user:string,photo:Photo|undefined,save:(path:string|null)=>Promise<T>):Promise<T> {
  if(!photo)return save(null);
  const bytes=await fileBytes(photo.uri);
  if(!bytes.byteLength||bytes.byteLength>10485760)throw new Error('Ảnh cần nhỏ hơn 10 MB.');
  const path=user+'/'+randomUUID()+'.'+photo.mime.split('/')[1];
  const bucket=supabase.storage.from('event-photos');
  result(await bucket.upload(path,bytes,{contentType:photo.mime}));
  try{return await save(path);}catch(err){result(await bucket.remove([path]));throw err;}
}
