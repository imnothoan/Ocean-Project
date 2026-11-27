import { Linking, Share } from 'react-native';
import { mapBindings } from './mapBindings';
import { supabase } from '../../lib/supabase';
import type { useProjectData } from './useProjectData';
import { action,choices,field,result,type Controller } from './workflow';
type Data=ReturnType<typeof useProjectData>['data'];
export function additionalBindings(c:Controller,data:Data,setAuth:(value:boolean)=>void,notice:(msg:string)=>void){
 const {id,values:v,binding:b}=c;
 const share=(message:string)=>c.run(async()=>{await Share.share({message});});
 mapBindings(c,data);
 if(id==='666:3592'){
  b.labels['666:3898']=data.profile.display_name||'Guest';b.labels['666:3959']=data.profile.display_name||'Guest';
  for(const node of ['666:3905','666:3967'])b.labels[node]=String(data.points);
  b.labels['721:365']=data.saved.length+' saved guides';b.labels['721:373']=data.points+' XP';
  for(const node of ['666:3907','666:3969'])b.labels[node]='—';
  for(const node of ['666:3909','666:3971','666:3930','666:3992'])b.labels[node]=String(data.registrations.filter(r=>r.status==='approved').length);
  for(const node of ['666:3903','666:3965'])b.labels[node]='Unranked';
  for(const node of ['666:3980','666:3986'])b.labels[node]='—';
  action(c,['666:3901','666:3963'],()=>c.user?c.go('666:4366'):setAuth(true));
 }
 if(id==='670:5000'){action(c,['670:5072'],()=>c.go('101:2769'));action(c,['670:5081'],()=>c.go('258:426'));action(c,['670:5058','670:5059'],()=>c.go('263:2582'));}
 if(id==='244:550'){action(c,['244:604'],()=>c.go('274:297'));action(c,['244:615'],()=>c.go('682:5569'));}
 if(id==='682:5716'){
  const options={'682:5739':'recycling','682:5746':'general','682:5750':'organic','682:5754':'hazardous'};
  choices(c,'quizAnswer',options);
  b.labels['682:5728']='Sorting quiz';b.labels['682:5730']='PET';b.labels['682:5756']=v.quizAnswer?(v.quizAnswer==='recycling'?'Correct!':'Try again'):'Choose an answer';b.labels['682:5757']=v.quizAnswer==='recycling'?'Rinse the bottle and flatten it before recycling.':'';
  action(c,['682:5759'],()=>c.run(async()=>{if(v.quizAnswer!=='recycling')throw new Error('Chọn đáp án đúng trước khi tiếp tục.');result(await supabase.rpc('complete_sorting_quiz',{answer:v.quizAnswer}));c.setValue('quizAnswer','');c.refresh();c.go('263:2582');},true));
 }
 if(id==='670:4692'){
  b.labels['670:4712']=data.points+' pts';b.labels['670:4716']=Math.max(0,data.points-300)+' pts';b.labels['670:4708']='Class reward';b.labels['670:4709']='Redeem points for an Ocean Project classroom reward.';b.labels['670:4726']='Keep your claim code for the class organizer.';
 }
 if(id==='670:4692')action(c,['670:4737','670:4738'],()=>c.run(async()=>{const code=result(await supabase.rpc('redeem_class_reward'));notice('Mã phần thưởng học tập: '+String(code));c.refresh();},true));
 if(id==='258:1500'){
  ['300:2544','300:2547','258:1536','300:2553','300:2556'].forEach((node,i)=>{action(c,[node],()=>c.setValue('rating',String(i+1)));b.labels[node]='Rate '+(i+1)+' of 5';});b.labels['258:1502']=v.rating?'Your rating: '+v.rating+'/5':'How was your cleanup experience?';
 }
 if(id==='258:842'){
  const nodes=['258:848','258:852','258:856','258:860','258:864'];const items=(v['checklist:'+v.eventId]||'').split('|').filter(Boolean);
  const titles=['Reusable gloves','Reusable water bottle','Sunscreen and a hat','Suitable footwear','Fully charged phone'];
  nodes.forEach((node,i)=>{b.labels[node]=(items.includes(node)?'✓ ':'')+titles[i];action(c,[node],()=>c.setValue('checklist:'+v.eventId,(items.includes(node)?items.filter(n=>n!==node):[...items,node]).join('|')));});
  b.labels['258:866']=items.length+' of 5 items prepared';
 }
 if(id==='311:1506')action(c,['311:1571'],()=>share(data.metrics.map(m=>m.metric_date+': '+m.total_kg+' kg').join('\n') || 'Ocean Project · No recorded impact yet.'));
 if(id==='1581:1764')action(c,['1581:1776'],()=>share('My Ocean Project pledge: $'+(v.amount||'0')+' (awaiting payment).'));
}
