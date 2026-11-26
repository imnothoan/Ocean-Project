import { Share } from 'react-native';
import { supabase } from '../../lib/supabase';
import { action,choices,field,required,result,type Controller } from './workflow';
import type { CommunityItem,Profile } from './data';
import { pickPhoto,publishPost,type Photo } from './media';

export function community(c:Controller,items:CommunityItem[],profile:Profile){
 const {id,values:v,binding:b}=c;
 const item=items.find(i=>i.post.id===v.postId) ?? items[0];
 const author=item?.profile?.display_name || 'Ocean Project';
 const own=profile.display_name || c.user?.email?.split('@')[0] || '';
 const showPosts=(id:string)=>{if(item)c.setValue('postId',item.post.id);c.go(id);};
 const refresh=()=>c.refresh();
 const like=()=>c.run(async()=>{if(!item)throw new Error('Hãy chọn một bài viết.');result(item.liked?await supabase.from('post_likes').delete().eq('post_id',item.post.id).eq('user_id',c.user!.id):await supabase.from('post_likes').insert({post_id:item.post.id,user_id:c.user!.id}));refresh();},true);
 if(id==='101:2769'){
  Object.assign(b.labels,{'101:2792':own.slice(0,2).toUpperCase() || '＋','101:2804':item?author.slice(0,2).toUpperCase():'','101:2805':item?author:'Community',
   '101:2806':item?new Date(item.post.created_at).toLocaleDateString():'','101:2811':item?.post.topic || 'Chưa có bài viết','101:2812':item?.post.body || 'Chia sẻ hoạt động đầu tiên với cộng đồng.',
   '101:2819':String(item?.likes||0),'101:2822':(item?.comments.length||0)+' comments','101:2781':'Together for cleaner shores'});
  const image=item?.post.photo_paths?.[0];
  if(image)b.images['101:2816']=supabase.storage.from('community-photos').getPublicUrl(image).data.publicUrl;
  else b.hidden.add('101:2816');
  action(c,['101:2813','101:2811','101:2822'],()=>item?showPosts('105:2895'):c.go('115:422'));
  action(c,['101:2819'],like);action(c,['101:2836'],()=>c.go('258:426'));
  action(c,['101:2785'],()=>c.go('115:2686'));action(c,['101:2783'],refresh);
 }
 if(id==='105:2895'){
  const path=item?.post.photo_paths?.[0];
  if(path)b.images['105:2918']=supabase.storage.from('community-photos').getPublicUrl(path).data.publicUrl;else b.hidden.add('105:2918');
  Object.assign(b.labels,{'105:2906':author.slice(0,2),'105:2907':author,'105:2908':item?.post.location||'','105:2913':item?.post.topic||'','105:2914':item?.post.body||'',
   '105:2921':(item?.likes||0)+' likes','105:2924':(item?.comments.length||0)+' comments','105:2932':String(item?.comments.length||0)});
  [['105:2935','105:2936','105:2937','105:2938'],['105:2940','105:2941','105:2942','105:2943'],['105:2945','105:2946','105:2947','105:2948']].forEach(([initial,name,date,body],i)=>{
   const comment=item?.comments[i];Object.assign(b.labels,{[initial]:comment?'•':'',[name]:comment?'Community member':'',[date]:comment?new Date(comment.created_at).toLocaleDateString():'',[body]:comment?.body??''});
  });
  field(c,'105:2952','comment','Write a comment…',{onSubmit:()=>c.run(async()=>{if(!item)throw new Error('Chọn một bài viết trước.');result(await supabase.from('post_comments').insert({post_id:item.post.id,body:required(v.comment,'Nhập bình luận.')}));c.setValue('comment','');refresh();},true)});
  action(c,['105:2921'],like); action(c,['105:2924'],()=>c.setValue('comment',v.comment||''));
 }
 if(id==='115:422'){
  const photos:Photo[]=JSON.parse(v.postPhotos||'[]');b.labels['115:447']=own||'Ocean Project';b.labels['115:446']=own.slice(0,1);b.labels['115:455']=photos.length+'/4 photos';
  if(photos[0])b.images['115:459']=photos[0].uri;else b.hidden.add('115:459');
  field(c,'115:451','postBody','What would you like to share?',{multiline:true});field(c,'115:486','postLocation','Add a location');field(c,'115:494','mention','Mention your cleanup team');
  choices(c,'topic',{'115:474':'Beach cleanup','115:476':'Wildlife','115:478':'Zero waste','115:480':'Education'});
  const photo=(camera:boolean)=>c.run(async()=>{if(photos.length>=4)throw new Error('Tối đa 4 ảnh.');const newPhoto=await pickPhoto(camera);if(newPhoto)c.setValue('postPhotos',JSON.stringify([...photos,newPhoto]));});
  action(c,['115:465'],()=>photo(false));action(c,['115:471'],()=>photo(true));action(c,['115:502','115:505'],()=>c.run(async()=>{
   await publishPost(c.user!.id,required(v.postBody,'Nhập nội dung bài viết.'),v.topic||'Beach cleanup',v.postLocation||'',v.mention||'',photos);
   for(const k of ['postBody','postPhotos','postLocation','mention','postId'])c.setValue(k,'');
   refresh();c.go('101:2769');
  },true));
 }
 if(id==='666:4366'){
  for(const [node,key,original] of [['666:4384','display_name',profile.display_name],['666:4387','handle',profile.handle||''],['666:4392','location',profile.location],['666:4395','bio',profile.bio]]){
   field(c,node,key,original || key,{value:v[key] ?? original,multiline:key==='bio'});
  }
  b.labels['666:4397']=(v.bio??profile.bio).length+' / 150';
  choices(c,'interests',{'666:4400':'Beach cleanup','666:4402':'Wildlife','666:4404':'Zero waste','666:4406':'Education','666:4408':'Recycling'},true);
  action(c,['666:4411','666:4412'],()=>c.run(async()=>{const display=required(v.display_name??profile.display_name,'Nhập tên hiển thị.');
   const handle=(v.handle??profile.handle??'').trim().toLowerCase()||null;
   result(await supabase.from('ocean_profiles').upsert({id:c.user!.id,display_name:display,handle,location:v.location??profile.location,bio:v.bio??profile.bio,interests:v.interests===undefined?profile.interests:v.interests.split('|').filter(Boolean)}));
   refresh();c.go('666:3592');
  },true));
 }
 if(id==='666:3173')action(c,['666:3230'],()=>c.run(async()=>{await Share.share({message:item?.post.body || 'BlueCitizen • Ocean Project'});}));
 if(id==='666:2965'){
  field(c,'666:2990','search','Search posts, groups or people');
  const matches=items.filter(x=>[x.post.body,x.post.topic,x.profile?.display_name].some(s=>s?.toLowerCase().includes((v.search||'').toLowerCase())));
  ['666:3007','666:3013','666:3019'].forEach((node,i)=>{const post=matches[i];b.labels[node]=post?.post.body ?? (i===0?'No matching posts':'');if(post)action(c,[node],()=>{c.setValue('postId',post.post.id);c.go('105:2895');});});
  action(c,['666:3004'],()=>c.setValue('search',''));
 }
}
