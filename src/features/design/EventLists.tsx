import { useEffect } from 'react';
import { Text,View,TextInput } from 'react-native';
import { useLiveData,FlowSection,ListRow,SmallButton,styles } from './live';
import { sendEventMessage,moderateEventParticipant, type OceanEvent } from '../../lib/supabase';
import { matchesQuery } from './communityView';
import { result } from './workflow';

export function EventList({organizer=false}:{organizer?:boolean}){
  const {c,data,loading}=useLiveData();
  const today=Date.now();
  const registrations=data.registrations.filter(r=>r.owner_id===c.user?.id);
  const list=organizer?data.events.filter(e=>e.owner_id===c.user?.id):data.events.filter(e=>registrations.some(r=>r.event_id===e.id));
  const open=(event:OceanEvent,id:string)=>{c.setValue('eventId',event.id);c.go(id);};
  const group=(title:string,upcoming:boolean)=>{
    const filtered=list.filter(e=>(!e.ended_at && Date.parse(e.event_date)>=today)===upcoming);
    return <><Text style={styles.heading}>{title}</Text>{filtered.map(e=>{
      const reg=registrations.find(r=>r.event_id===e.id);
      const checked=data.checkins.some(r=>r.event_id===e.id);
      return <ListRow key={e.id} title={e.title} description={[new Date(e.event_date).toLocaleString(),e.location,organizer?'':reg?.status].filter(Boolean).join(' · ')}>
        <View style={styles.actions}><SmallButton label={organizer?'Manage event':'View details'} onPress={()=>open(e,organizer?'258:1389':'258:735')}/>
        {reg?.status==='approved' && <><SmallButton label="Checklist" onPress={()=>open(e,'258:842')}/><SmallButton label="Group chat" onPress={()=>open(e,'258:1078')}/></>}
        {reg?.status==='approved' && !checked && <SmallButton label="Check-in" onPress={()=>open(e,'258:1135')}/>}
        {checked && <><SmallButton label="Certificate" onPress={()=>open(e,'258:1450')}/><SmallButton label="Feedback" onPress={()=>open(e,'258:1500')}/></>}
        {!upcoming && <SmallButton label={organizer?'Post recap':'View recap'} onPress={()=>open(e,organizer?'1356:310':'1356:3049')}/>}
        </View></ListRow>;
    })}
    {!filtered.length && <Text style={styles.body}>{loading?'Loading events…':'No events here yet.'}</Text>}</>;
  };
  return <FlowSection top={124}><View style={styles.actions}>
    <SmallButton label="Calendar" onPress={()=>c.go('258:614')}/>
    <SmallButton label={organizer?'Create event':'Organizer'} onPress={()=>c.go(organizer?'258:1226':'564:290')}/>
  </View>{group(organizer?'Your events':'Your next events',true)}{group('Past activities',false)}</FlowSection>;
}

export function Participants({moderation=false}:{moderation?:boolean}){
  const {c,data,loading}=useLiveData();
  const event=data.events.find(e=>e.id===c.values.eventId);
  const owner=!!c.user && event?.owner_id===c.user.id;
  const people=data.registrations.filter(r=>r.event_id===event?.id && matchesQuery(c.values.participantSearch||'',r.participant_name,r.volunteer_role));
  const approve=(id:string,status:'approved'|'rejected')=>c.run(async()=>{result(await moderateEventParticipant(id,status));c.refresh();},true);
  return <FlowSection top={moderation?226:244}>
    {people.map(p=><ListRow key={p.id} title={p.participant_name} description={[p.volunteer_role,p.status].filter(Boolean).join(' · ')}>
      {moderation && owner && <View style={styles.actions}>{p.status!=='approved' && <SmallButton label="Approve" onPress={()=>approve(p.id,'approved')}/>}
        {p.status!=='rejected' && <SmallButton label="Reject" onPress={()=>approve(p.id,'rejected')}/>}</View>}
    </ListRow>)}
    {!people.length && <Text style={styles.body}>{loading?'Loading participants…':'No participants to display.'}</Text>}
    {!moderation && <View style={styles.actions}><SmallButton label="Open group chat" onPress={()=>c.go('258:1078')}/><SmallButton label="Check-in" onPress={()=>c.go('258:1135')}/></View>}
  </FlowSection>;
}

export function EventConversation(){
  const {c,data}=useLiveData();
  const event=data.events.find(e=>e.id===c.values.eventId);
  const member=!!event && !!c.user && (event.owner_id===c.user.id||data.registrations.some(r=>r.event_id===event.id&&r.owner_id===c.user?.id&&r.status==='approved'));
  const draft='chat:'+event?.id;
  useEffect(()=>{
    if(!member||!event)return;
    const timer=setInterval(c.refresh,15000);
    return ()=>clearInterval(timer);
  },[event?.id,member,c.refresh]);
  const send=()=>c.run(async()=>{
    const body=(c.values[draft]||'').trim();if(!event||!body)throw new Error('Nhập tin nhắn.');
    result(await sendEventMessage(event.id,body));c.setValue(draft,'');c.refresh();
  },true);
  return <FlowSection top={160}>{member ? <>
    {data.messages.filter(m=>m.event_id===event.id).map(m=><ListRow key={m.id} title={m.user_id===c.user?.id?'You':'Participant'} description={m.body}/>)}
    {!data.messages.length && <Text style={styles.body}>No messages yet.</Text>}
    <TextInput maxLength={2000} multiline accessibilityLabel="Message" placeholder="Type a message…" value={c.values[draft]||''} onChangeText={t=>c.setValue(draft,t)} style={[styles.row,styles.body]}/>
    <SmallButton label="Send" onPress={send}/></> : <Text style={styles.body}>The conversation is open to the organizer and approved participants.</Text>}</FlowSection>;
}
