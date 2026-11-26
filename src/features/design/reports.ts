import * as Location from 'expo-location';
import { supabase, submitReportWithEvidence, updateOwnReport, markNotificationRead, type OceanReport,type OceanNotification } from '../../lib/supabase';
import { action,choices,field,required,result,type Controller } from './workflow';
import { randomUUID } from 'expo-crypto';
import { fileBytes,pickPhoto } from './media';

export function reports(c:Controller,rows:OceanReport[],notifications:OceanNotification[]){
 const {id,values:v,binding:b}=c;
 const report=rows.find(r=>r.id===v.reportId);
 const slots:Record<string,string[]>={'230:1213':['230:4618','242:4655','242:4656','242:4658'],'230:1356':['255:586','255:676','255:673','255:674'],'230:1425':['242:5212','242:5214'],'230:2098':['255:949']};
 (slots[id]||[]).forEach((node,i)=>{if(v.photo && i===0)b.images[node]=v.photo;else b.hidden.add(node);});
 const observation=v.observation||'';
 const location=v.reportLocation||'';
 const category=v.category==='animal'?'animal':'pollution';
 if(id==='230:1093'){
  const begin=(kind:string,to:string)=>{for(const key of ['photo','photoMime','reportLocation','observation','amount','severity','waste','species','reportId'])c.setValue(key,'');c.setValue('category',kind);c.go(to);};
  action(c,['230:2205'],()=>begin('animal','230:1356'));action(c,['230:2160'],()=>begin('pollution','230:1213'));
 }
 if(id==='230:1213' || id==='230:1356'){
  const animal=id==='230:1356';
  const photo=(camera:boolean)=>c.run(async()=>{const f=await pickPhoto(camera);if(f){c.setValue('photo',f.uri);c.setValue('photoMime',f.mime);}});
  action(c,[animal?'255:597':'242:4623'],()=>photo(true));action(c,[animal?'255:604':'242:4630'],()=>photo(false));
  b.labels[animal?'255:607':'242:4633']='PHOTOS ATTACHED ('+(v.photo?1:0)+')';
 }
 if(id==='230:1237'||id==='230:2121'){
  const animal=id==='230:2121';
  field(c,animal?'255:833':'242:4714','reportLocation','Search address or place');
  if(animal){field(c,'255:863','observation','Behavior or notes',{multiline:true});b.labels['255:860']=new Date().toLocaleDateString();}
  else b.labels['242:4753']=location || 'Use current location';
  action(c,['242:4753','255:827'],()=>c.run(async()=>{const {granted}=await Location.requestForegroundPermissionsAsync();if(!granted)throw new Error('Có thể nhập địa điểm khi chưa cấp quyền định vị.');
   const pos=await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.Balanced});c.setValue('reportLocation',pos.coords.latitude.toFixed(5)+', '+pos.coords.longitude.toFixed(5));}));
  action(c,[animal?'255:871':'242:4769'],()=>c.run(async()=>{required(location,'Nhập vị trí hoặc dùng định vị.');c.go(animal?'230:2098':'230:1261');}));
 }
 if(id==='230:2029')choices(c,'species',{'255:742':'Green sea turtle','255:768':'Hawksbill sea turtle','255:772':'Dugong','255:789':'Not sure'});
 if(id==='230:1261')choices(c,'severity',{'242:4805':'Low','242:4823':'Moderate','242:4833':'High','242:4843':'Critical'});
 if(id==='230:1285')choices(c,'waste',{'242:4883':'Plastic','242:4892':'Fishing gear','242:4895':'Oil / chemical','242:4898':'Glass','242:4901':'Metal','242:4904':'Mixed','242:4907':'Other'},true);
 if(id==='230:1333'){
  field(c,'242:4968','observation','What did you observe?',{multiline:true});field(c,'242:4973','amount','Estimated amount');field(c,'242:4978','observedAt','Date / time');
  action(c,['242:4988'],()=>c.run(async()=>{required(observation,'Nhập mô tả trước khi xem lại.');c.go('230:1425');}));
 }
 if(id==='230:1425'||id==='230:2098'){
  Object.assign(b.labels,{'242:5220':v.waste||'—','242:5233':v.waste||'—','242:5223':v.severity||'—','242:5236':v.severity||'—','242:5226':location,'242:5239':location,'242:5210':(v.photo?'1':'0')+' attached photos','255:922':v.photo?'1 photo':'No photo','255:927':v.species||'Not sure','255:930':location,'255:933':v.observedAt||new Date().toLocaleDateString()});
  action(c,['1253:3038','1253:3039','255:944','255:945'],()=>c.run(async()=>{
    const title=category==='animal'?[v.species||'Species sighting',observation].filter(Boolean).join(' — '):observation;
    const saved=result(await submitReportWithEvidence({title,location,category,photoUri:v.photo||undefined,photoMime:v.photoMime,details:{severity:v.severity||'',waste:v.waste||'',amount:v.amount||'',observedAt:v.observedAt||'',species:v.species||''}}));
    if(!saved)throw new Error('Chưa nhận được mã báo cáo từ máy chủ.');
    c.setValue('reportId',saved.id);c.refresh();c.go('230:1402');
  },true));
 }
 if(id==='230:1402')b.labels['250:412']='REPORT ID  '+(v.reportId||'—');
 if(id==='1249:216'){
  b.labels['1249:233']=report?.id||v.reportId||'—';b.labels['1249:234']=report?new Date(report.created_at).toLocaleString():'';
  b.labels['1249:236']=report?.status||'Submitted';b.labels['1249:260']='Updated when reviewed';
 }
 if(id==='230:1379'){
  choices(c,'historyFilter',{'253:465':'All','253:468':'Pending','253:471':'Verified'});
  const list=rows.filter(row=>v.historyFilter==='Pending'?row.status==='submitted':v.historyFilter==='Verified'?row.status==='resolved':true);
  [['255:489','255:490','255:492'],['255:518','255:519','255:521'],['255:544','255:545','255:547']].forEach(([title,place,status],i)=>{
   const row=list[i];b.labels[title]=row?.title??(i===0?'No reports yet':'');b.labels[place]=row?.location??'';b.labels[status]=row?.status??'';
   action(c,[title,place,status,...(i===0?['255:473']:[])],()=>{if(row){c.setValue('reportId',row.id);c.go('1249:216');}});
  });action(c,['255:560'],()=>c.go('230:1093'));
 }
 if(id==='1253:343'){
  b.labels['1253:358']=report?.id || '—';
  field(c,'1253:373','editTitle','Report notes',{value:v.editTitle??report?.title??'',multiline:true});b.labels['1253:374']=(v.editTitle??report?.title??'').length+' / 300';
  const save=()=>c.run(async()=>{if(!report)throw new Error('Chọn báo cáo của em từ lịch sử.');result(await updateOwnReport(report.id,{title:v.editTitle??report.title,location:v.editPlace??report.location}));c.refresh();c.go('1249:216');},true);
  action(c,['1253:384'],save);
 }
 if(id==='1253:427'){
  b.labels['1253:442']=report?.id||'—';field(c,'1253:459','followup','Write an update',{multiline:true});
  for(const node of ['1253:498','1253:499','1253:511','1253:512']){if(v.followupPhoto && node==='1253:499')b.images[node]=v.followupPhoto;else b.hidden.add(node);}
  action(c,['1253:456'],()=>c.run(async()=>{const f=await pickPhoto(false);if(f){c.setValue('followupPhoto',f.uri);c.setValue('followupMime',f.mime);}}));
  action(c,['1253:460','1253:461'],()=>c.run(async()=>{if(!report)throw new Error('Chọn một báo cáo trong lịch sử.');
   const body=(v.followup||'').trim();if(!body && !v.followupPhoto)throw new Error('Thêm ghi chú hoặc ảnh.');
   let path:string|null=null;
   if(v.followupPhoto){const mime=v.followupMime||'image/jpeg';path=c.user!.id+'/'+report.id+'/'+randomUUID()+'.'+mime.split('/')[1];const bytes=await fileBytes(v.followupPhoto);
    result(await supabase.storage.from('report-evidence').upload(path,bytes,{contentType:mime}));}
   const inserted=await supabase.from('report_followups').insert({report_id:report.id,note:body,evidence_path:path});
   if(inserted.error){if(path)result(await supabase.storage.from('report-evidence').remove([path]));throw inserted.error;}
   c.setValue('followup','');c.setValue('followupPhoto','');c.refresh();c.go('1249:216');
  },true));
 }
 if(id==='230:2052'){
  const notification=notifications.find(n=>n.id===v.notificationId);
  Object.assign(b.labels,{'264:1113':notification?.title||'No notification selected','264:1114':notification?.body||'','264:1120':'Report update','264:1121':notification?.body||'','264:1153':report?.location||'—','264:1156':report?.title||'—','264:1159':report?.status||'—'});
 }
 if(id==='230:2075'){
  choices(c,'inboxFilter',{'255:964':'All','255:966':'Unread','255:968':'Alerts'});const list=notifications.filter(n=>v.inboxFilter!=='Unread'||!n.read_at);
  [['255:985','255:986','255:987'],['255:1013','255:1014','255:1015'],['255:1021','255:1022','255:1023'],['255:1028','255:1029','255:1030']].forEach(([title,body,date],i)=>{
   const n=list[i];b.labels[title]=n?.title??(i===0?'No notifications':'');b.labels[body]=n?.body??'';b.labels[date]=n?new Date(n.created_at).toLocaleDateString():'';
   action(c,[title,body,...(i===0?['255:969']:[])],()=>c.run(async()=>{if(!n)return;if(!n.read_at)result(await markNotificationRead(n.id));c.setValue('notificationId',n.id);if(n.report_id)c.setValue('reportId',n.report_id);c.refresh();c.go('230:2052');},true));
  });
 }
}
