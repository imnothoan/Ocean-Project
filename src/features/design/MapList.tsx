import { Text,View } from 'react-native';
import { Image } from 'expo-image';
import { FlowSection,ListRow,SmallButton,styles,useLiveData } from './live';
import { mapItems,type MapItem } from './mapResults';
import { ReportEvidence } from './ReportEvidence';
import { supabase } from '../../lib/supabase';

export function MapList(){
  const {c,data,loading}=useLiveData(),v=c.values;
  const all=mapItems(data.reports,data.events,v);
  const rows=all.filter(r=>!v.listStatus||r.status===v.listStatus);
  function open(row:MapItem,directions=false){
    c.setValue(row.kind==='event'?'eventId':'reportId',row.id);c.setValue('mapKind',row.kind);c.setValue('evidenceIndex','0');
    c.go(directions?'403:3026':row.kind==='event'?'258:735':'562:828');
  }
  return <FlowSection top={155}><View style={styles.actions}>{[['','All'],['submitted','Reported'],['planned','Events'],['resolved','Cleaned up']].map(([key,title])=>
    <SmallButton key={title} label={title+' ('+(key?all.filter(r=>r.status===key).length:all.length)+')'} selected={(v.listStatus||'')===key} onPress={()=>c.setValue('listStatus',key)}/>)}</View>
    {rows.map(r=><ListRow key={r.kind+r.id} title={r.title} description={[r.category,r.location,new Date(r.date).toLocaleDateString(),r.distance==null?'':r.distance.toFixed(1)+' km',r.status].filter(Boolean).join(' · ')}>
      {!!r.photo && <View style={{height:90,borderRadius:8,overflow:'hidden'}}>{r.kind==='report'?<ReportEvidence path={r.photo}/>:<Image style={{flex:1}} source={{uri:supabase.storage.from('event-photos').getPublicUrl(r.photo).data.publicUrl}} contentFit="cover"/>}</View>}
      <View style={styles.actions}><SmallButton label="Get directions" onPress={()=>open(r,true)}/><SmallButton label="View details" selected onPress={()=>open(r)}/></View>
    </ListRow>)}
    {!rows.length && <Text style={styles.body}>{loading?'Loading…':'No matching reports or events.'}</Text>}</FlowSection>;
}
