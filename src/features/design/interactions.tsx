import { Linking, Share } from 'react-native';
import OceanMap from './OceanMap';
import { supabase } from '../../lib/supabase';
import type { useProjectData } from './useProjectData';
import { action,choices,field,result,type Controller } from './workflow';
type Data=ReturnType<typeof useProjectData>['data'];
export function additionalBindings(c:Controller,data:Data,setAuth:(value:boolean)=>void,notice:(msg:string)=>void){
 const {id,values:v,binding:b}=c;
 const share=(message:string)=>c.run(async()=>{await Share.share({message});});
 if(id==='403:2759'){
  const places=data.reports.flatMap(r=>{const coords=r.location.match(/^(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)$/);if(!coords)return [];
   return [{id:r.id,title:r.title,coordinate:{latitude:Number(coords[1]),longitude:Number(coords[2])}}];});
  b.replacements['403:2773']=<OceanMap places={places} onSelect={report=>{c.setValue('reportId',report);c.go('1249:216');}}/>;
  for(const key of ['403:2775','403:2776','403:2777','403:2778','403:2779','403:2780','403:2782','403:2783','403:2784','1417:1018'])b.hidden.add(key);
  const selected=data.reports.find(r=>r.id===v.reportId)??data.reports[0];
  Object.assign(b.labels,{'403:2765':selected?.title||'Explore the coast','403:2766':selected?.location||'Da Nang, Vietnam','403:2767':selected?new Date(selected.created_at).toLocaleDateString():'','403:2770':places.length+' mapped reports','403:2816':data.notifications.filter(n=>!n.read_at).length+' alerts'});
  action(c,['403:2840','403:2845'],()=>c.go('230:1093'));action(c,['403:2769'],()=>{if(selected){c.setValue('reportId',selected.id);c.go('1249:216');}else c.go('403:2866');});
 }
 if(id==='292:3681'){field(c,'292:3688','mapSearch','Search locations, pollution, wildlife…');}
 if(id==='292:3312'){
  choices(c,'mapCategories',{'292:3454':'Plastic Pollution','292:3396':'Oil Spill','292:3402':'Industrial Waste','292:3403':'Cleanup Event','292:3407':'Marine Life Conservation'},true);
  choices(c,'mapSeverity',{'292:3410':'Urgent','292:3413':'Moderate','292:3416':'Low'},true);
  choices(c,'mapStatus',{'292:3420':'Cleanup Requested','292:3423':'Cleaned Up','292:3426':'Pending'});
 }
 if(id==='403:3026'){
  const dest=data.reports.find(r=>r.id===v.reportId)?.location||'Son Tra Beach, Da Nang, Vietnam';
  const url='https://www.google.com/maps/dir/?api=1&destination='+encodeURIComponent(dest);
  action(c,['403:3031','403:3038'],()=>c.run(async()=>{await Linking.openURL(url);}));action(c,['403:3035'],()=>share(url));
 }
 if(id==='258:516'){choices(c,'eventCategory',{'258:1559':'Cleanup','258:1561':'Education','258:1563':'Conservation'});action(c,['258:592'],()=>{c.setValue('eventCategory','');c.setValue('eventSearch','');c.go('258:426');});}
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
 if(id==='689:327'){
  const report=data.reports.find(r=>r.id===v.reportId);
  b.labels['689:366']=report?.title||'Select a report';b.labels['689:367']=report?.location||'';b.labels['689:368']=report?.title||'';
  action(c,['689:380'],()=>c.run(async()=>{if(!report)throw new Error('Chọn báo cáo trước.');result(await supabase.rpc('moderate_report',{target:report.id,next_status:'reviewing'}));c.refresh();c.go('292:4022');},true));
 }
 if(id==='292:4022'){
  const pending=data.reports.filter(r=>r.status!=='resolved');b.labels['292:4039']=pending.length+' pending reports';
  [['292:4046','292:4047','292:4048'],['749:1140','749:1141','749:1142'],['749:1156','749:1157','749:1158']].forEach(([name,place,gps],i)=>{const r=pending[i];b.labels[name]=r?.title||(!i?'No pending reports':'');b.labels[place]=r?.location||'';b.labels[gps]=r?.status||'';if(r)action(c,[name,place],()=>{c.setValue('reportId',r.id);c.go('689:327');});});
 }
 if(id==='311:1506')action(c,['311:1571'],()=>share(data.metrics.map(m=>m.metric_date+': '+m.total_kg+' kg').join('\n') || 'Ocean Project · No recorded impact yet.'));
 if(id==='1581:1764')action(c,['1581:1776'],()=>share('My Ocean Project pledge: $'+(v.amount||'0')+' (awaiting payment).'));
 if(id==='258:1450')action(c,['258:1472'],()=>share('Ocean Project · Event participation '+(v.eventId||'')));
}
