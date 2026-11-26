import * as Picker from 'expo-image-picker';
import { Platform } from 'react-native';
import { File } from 'expo-file-system';
import { randomUUID } from 'expo-crypto';
import { supabase } from '../../lib/supabase';

export type Photo = {uri:string;mime:string};
export async function pickPhoto(camera:boolean):Promise<Photo|null>{
 if(camera && !(await Picker.requestCameraPermissionsAsync()).granted)throw new Error('Cho phép sử dụng camera hoặc chọn ảnh từ thư viện.');
 const options={mediaTypes:['images'] as Picker.MediaType[],quality:0.9};
 const response=camera?await Picker.launchCameraAsync(options):await Picker.launchImageLibraryAsync(options);
 if(response.canceled)return null;
 const photo=response.assets[0];
 const mime=photo.mimeType || (/\.png$/i.test(photo.uri)?'image/png':'image/jpeg');
 if(!['image/jpeg','image/webp','image/png'].includes(mime))throw new Error('Chọn ảnh JPEG, PNG hoặc WebP.');
 if(photo.fileSize && photo.fileSize>10*1024*1024)throw new Error('Mỗi ảnh cần nhỏ hơn 10 MB.');
 return {uri:photo.uri,mime};
}
export async function fileBytes(uri:string):Promise<ArrayBuffer>{
 if(Platform.OS!=='web')return new File(uri).arrayBuffer();
 const response=await fetch(uri);
 if(!response.ok)throw new Error('Không đọc được ảnh đã chọn.');
 return response.arrayBuffer();
}
export async function publishPost(userId:string,body:string,topic:string,location:string,mention:string,photos:Photo[]){
 if(body.trim().length<3 || body.trim().length>2000)throw new Error('Bài viết cần từ 3 đến 2.000 ký tự.');
 const uploaded:string[]=[];
 const id=randomUUID();
 try{
  for(const photo of photos){
   const path=userId+'/'+id+'/'+randomUUID()+'.'+photo.mime.split('/')[1];
   const bytes=await fileBytes(photo.uri);
   if(!bytes.byteLength || bytes.byteLength>10485760)throw new Error('Kích thước ảnh không hợp lệ.');
   const {error}=await supabase.storage.from('community-photos').upload(path,bytes,{contentType:photo.mime});
   if(error)throw error;
   uploaded.push(path);
  }
  const {error}=await supabase.from('community_posts').insert({id,author_id:userId,body:body.trim(),topic,location,mention,photo_paths:uploaded});
  if(error)throw error;
 }catch(error){
  if(uploaded.length){const cleanup=await supabase.storage.from('community-photos').remove(uploaded);if(cleanup.error)throw new Error('Đăng bài thất bại và chưa thể dọn ảnh. '+cleanup.error.message);}
  throw error;
 }
}
