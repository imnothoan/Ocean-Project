import { Share } from 'react-native';
import { supabase, createEvent, updateEvent, recordEventCheckIn, sendEventMessage, submitEventFeedback, createEventRecap, moderateEventParticipant, type OceanEvent,type EventMessage } from '../../lib/supabase';
import { action, choices,field,required,result,type Controller } from './workflow';

export type Registration = { id:string;event_id:string;owner_id:string;status:string;participant_name:string;volunteer_role:string };
export function events(c:Controller,events:OceanEvent[],registrations:Registration[],messages:EventMessage[]){
 const {id,values:v,binding:b}=c;
 const selected=events.find(e=>e.id===v.eventId) ?? events[0];
 const eid=()=>required(selected?.id,'Chưa có sự kiện. Mở mục tạo sự kiện để đăng một hoạt động mới.');
 const when=(e:OceanEvent|undefined)=>e?new Date(e.event_date).toLocaleString()+' · '+e.location:'';
 const open=(e:OceanEvent|undefined,to:string)=>c.run(async()=>{if(!e)throw new Error('Chưa có sự kiện ở mục này.');c.setValue('eventId',e.id);c.go(to);});
 if(id==='258:426'){
  const query=(v.eventSearch||'').toLowerCase();
  const list=events.filter(e=>[e.location,e.title,e.description].some(s=>s.toLowerCase().includes(query)) && (!v.eventCategory||v.eventCategory==='All'||[e.title,e.description].join(' ').toLowerCase().includes(v.eventCategory.toLowerCase())));
  Object.assign(b.labels,{'258:430':list[0]?.title||'No upcoming events','258:431':when(list[0]),'258:467':list[0]?list[0].capacity+' places':'','258:444':list[1]?.title||'','258:445':when(list[1]),'258:447':'','258:449':list[2]?.title||'','258:450':when(list[2]),'258:452':''});
  action(c,['258:428','258:430'],()=>open(list[0],'258:735'));action(c,['258:444'],()=>open(list[1],'258:735'));action(c,['258:449'],()=>open(list[2],'258:735'));
  choices(c,'eventCategory',{'258:436':'All','258:438':'Cleanup','258:440':'Education','258:442':'Rescues'});
  action(c,['258:432'],()=>c.go('564:290'));
 }
 if(id==='258:516'){field(c,'258:571','eventSearch','Event name or location');}
 if(id==='258:735' || id==='258:792'){
  const key=id==='258:735';
  Object.assign(b.labels,key?{'258:737':selected?.title||'No event selected','258:738':selected?.description||'','258:740':when(selected),'258:741':selected?.location||'','258:743':selected?.description||''}:{'258:795':selected?.title||'No event selected','258:796':when(selected)});
  if(!key){
   field(c,'258:800','participantName','Full name');field(c,'258:803','participantEmail','Email address',{value:v.participantEmail??c.user?.email??'',keyboardType:'email-address'});
   field(c,'258:806','participantPhone','Phone number');choices(c,'role',{'258:809':'Collect waste','258:811':'Sort recyclables','258:813':'Take photos'});
   action(c,['258:814','258:815'],()=>c.run(async()=>{
    const name=required(v.participantName,'Nhập họ tên.');const email=required(v.participantEmail??c.user?.email,'Nhập email.');
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))throw new Error('Email chưa hợp lệ.');
    result(await supabase.from('event_registrations').insert({owner_id:c.user!.id,event_id:eid(),participant_name:name,participant_email:email,phone:v.participantPhone||'',volunteer_role:v.role||'Collect waste'}));
    c.refresh();c.go('258:906');
   },true));
  }
 }
 if(id==='258:906'){
  const reg=registrations.find(r=>r.owner_id===c.user?.id);
  const registered=events.find(e=>e.id===reg?.event_id);
  Object.assign(b.labels,{'258:937':registered?.title||'No registrations yet','258:938':when(registered),'258:940':reg?.status||'','258:957':'','258:949':'','258:951':'','258:918':events[0]?.title||'','258:919':when(events[0]),'258:923':events[1]?.title||'','258:924':when(events[1])});
  action(c,['258:935','258:945'],()=>open(registered,'258:842'));
 }
 if(id==='258:1226'){
  field(c,'258:1235','eventName','Event name');field(c,'258:1254','eventDescription','Goals and activity details…',{multiline:true});choices(c,'activityType',{'258:1239':'Cleanup','258:1241':'Education','258:1243':'Rescues'});
  action(c,['258:1245'],()=>c.run(async()=>{required(v.eventName,'Nhập tên sự kiện.');c.go('258:1279');},true));
 }
 if(id==='258:1279'){
  field(c,'258:1288','eventPlace','Location');field(c,'258:1291','eventDate','YYYY-MM-DD');field(c,'258:1294','eventTime','HH:mm');field(c,'258:1297','duration','Duration');
  action(c,['258:1298'],()=>c.run(async()=>{required(v.eventPlace,'Nhập địa điểm.');if(!Number.isFinite(Date.parse((v.eventDate||'')+'T'+(v.eventTime||'00:00'))))throw new Error('Nhập ngày YYYY-MM-DD và giờ HH:mm.');c.go('708:684');}));
 }
 if(id==='700:264'){
  field(c,'700:273','capacity','Maximum participants',{keyboardType:'numeric'});field(c,'700:301','safety','Safety notes',{multiline:true});
  action(c,['700:284','700:285'],()=>c.run(async()=>{const capacity=Number(v.capacity||0);if(!Number.isSafeInteger(capacity)||capacity<0)throw new Error('Số chỗ cần là số nguyên từ 0 trở lên.');
   const event=result(await createEvent({title:required(v.eventName,'Nhập tên sự kiện.'),location:required(v.eventPlace,'Nhập địa điểm.'),description:[v.activityType,v.eventDescription,v.safety].filter(Boolean).join('\n'),event_date:new Date(v.eventDate+'T'+(v.eventTime||'00:00')).toISOString(),capacity}));
   if(!event)throw new Error('Chưa tạo được sự kiện.');c.setValue('eventId',event.id);c.refresh();c.go('258:1389');
  },true));
 }
 if(id==='258:1389'){
  const people=registrations.filter(r=>r.event_id===selected?.id);
  Object.assign(b.labels,{'258:1391':selected?.title||'No event','258:1392':when(selected),'258:1394':String(people.length),'258:1397':String(people.filter(r=>r.status==='approved').length),'258:1400':String(people.filter(r=>r.status==='pending').length),'258:1416':v['code:'+selected?.id]||'Get check-in code'});
  action(c,['258:1415','258:1416'],()=>c.run(async()=>{const code=result(await supabase.rpc('get_event_checkin_code',{target:eid()}));c.setValue('code:'+eid(),String(code));await Share.share({message:String(code)});},true));
 }
 if(id==='258:1135'){
  b.labels['258:1137']=selected?.title||'';b.labels['258:1138']=when(selected);field(c,'258:1146','checkinCode','Enter the check-in code');
  action(c,['258:1139','258:1140'],()=>c.run(async()=>{result(await recordEventCheckIn(eid(),required(v.checkinCode,'Nhập mã do người tổ chức cung cấp.')));c.setValue('checkedEvent',eid());c.refresh();c.go('258:1177');},true));
 }
 if(id==='258:1078'){
  const shown=messages.filter(m=>m.event_id===selected?.id).slice(-4);b.labels['258:1105']=selected?.title||'';
  [['258:1082','258:1083'],['258:1085','258:1086'],['258:1088','258:1089'],['258:1091','258:1092']].forEach(([who,body],i)=>{b.labels[who]=shown[i]?(shown[i].user_id===c.user?.id?'You':'Participant'):'';b.labels[body]=shown[i]?.body||(!i?'No messages yet':'');});
  const send=()=>c.run(async()=>{result(await sendEventMessage(eid(),required(v.chat,'Nhập tin nhắn.')));c.setValue('chat','');c.refresh();},true);
  field(c,'258:1094','chat','Type a message…',{onSubmit:send});
 }
 if(id==='258:1500'){
  choices(c,'enjoyed',{'258:1506':'Organization','258:1508':'Teamwork','258:1510':'Impact'});choices(c,'again',{'258:1516':'Definitely','258:1518':'Maybe','258:1520':'Next time'});
  field(c,'258:1513','feedback','What made this event memorable?',{multiline:true});
  action(c,['258:1522'],()=>c.run(async()=>{const rating=Number(v.rating);if(!rating)throw new Error('Chọn số sao trước khi gửi.');result(await submitEventFeedback(eid(),rating,v.feedback||'',v.enjoyed||'',v.again||''));c.back();},true));
 }
 if(id==='1356:347'){
  const people=registrations.filter(r=>r.event_id===selected?.id);
  ['1356:402','1356:2615','1356:2627','1356:2639','1356:2651','1356:2663','1356:2675','1356:2687'].forEach((node,i)=>{
    const p=people[i];b.labels[node]=p?.participant_name||(!i?'No participants':'');if(p)action(c,[node],()=>c.setValue('participant',p.id));
  });
  for(const [node,status] of [['1356:416','approved'],['1356:418','rejected']] as const)
   action(c,[node],()=>c.run(async()=>{result(await moderateEventParticipant(required(v.participant,'Chọn người tham gia.'),status));c.refresh();},true));
 }
 if(id==='1356:310'){field(c,'1356:3014','recap','Write your recap',{multiline:true});action(c,['1356:344','1356:345'],()=>c.run(async()=>{result(await createEventRecap(eid(),required(v.recap,'Nhập nội dung tổng kết.')));c.setValue('recap','');c.go('1356:3049');},true));}
 if(id==='564:441'){field(c,'564:464','editEvent','Event name',{value:v.editEvent??selected?.title??''});action(c,['564:454'],()=>c.run(async()=>{result(await updateEvent(eid(),{title:required(v.editEvent??selected?.title,'Nhập tên sự kiện.')}));c.refresh();c.back();},true));}
}
