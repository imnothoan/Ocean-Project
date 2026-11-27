import { Linking,Share } from 'react-native';
import * as Location from 'expo-location';
import { action,choices,field,type Controller } from './workflow';
import type { ProjectData } from './useProjectData';
import OceanMap from './OceanMap';
import { mapItems } from './mapResults';
import { parseReportCoordinates,formatCoordinates } from './reportLocation';
import { ReportEvidence } from './ReportEvidence';
import { supabase } from '../../lib/supabase';

export function mapBindings(c:Controller,data:ProjectData){
  const {id,values:v,binding:b}=c;
  if(!['403:2759','292:3681','292:3312','403:3026'].includes(id))return;
  const results=mapItems(data.reports,data.events,v);
  async function origin(){
    const {granted}=await Location.requestForegroundPermissionsAsync();if(!granted)throw new Error('Cho phép vị trí để lọc theo khoảng cách.');
    const point=await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.Balanced});
    c.setValue('mapOrigin',formatCoordinates(point.coords));c.setValue('mapSort','distance');
  }
  if(id==='403:2759'){
    const selected=results.find(item=>item.id===(v.mapKind==='event'?v.eventId:v.reportId))??results[0];
    const places=results.flatMap(r=>{const coordinate=parseReportCoordinates(r.location);return coordinate?[{id:r.id,title:r.title,coordinate}]:[];});
    const details=(key?:string)=>{
      const row=results.find(r=>r.id===key);
      if(!row){c.go('403:2866');return;}
      c.setValue('mapKind',row.kind);c.setValue(row.kind==='report'?'reportId':'eventId',row.id);c.setValue('evidenceIndex','0');
      c.go(row.kind==='report'?'562:828':'258:735');
    };
    b.replacements['403:2773']=<OceanMap places={places} onSelect={details}/>;
    for(const n of ['403:2775','403:2776','403:2777','403:2778','403:2779','403:2780','403:2782','403:2783','403:2784','1417:1018','1417:1002','403:2807'])b.hidden.add(n);
    Object.assign(b.labels,{'403:2765':selected?.title||'Explore the coast','403:2766':selected?.location||'No matching activities','403:2767':selected?new Date(selected.date).toLocaleDateString():'',
      '403:2770':places.length+' mapped activities','403:2816':data.notifications.filter(n=>!n.read_at).length+' alerts','403:2826':v.mapSearch||'Search locations, pollution, wildlife…'});
    if(selected?.photo){
      if(selected.kind==='report')b.replacements['403:2763']=<ReportEvidence path={selected.photo}/>;
      else b.images['403:2763']=supabase.storage.from('event-photos').getPublicUrl(selected.photo).data.publicUrl;
    }else b.hidden.add('403:2763');
    action(c,['403:2760','403:2769'],()=>details(selected?.id));action(c,['403:2840','403:2845'],()=>c.go('230:1093'));
    action(c,['403:2798','403:2800','403:2801'],()=>c.go('292:3312'));action(c,['403:2786','403:2787'],()=>c.run(async()=>{await origin();c.go('403:2866');}));
    action(c,['403:2814','403:2816','403:2817'],()=>c.go('230:2075'));
  }
  if(id==='292:3681'){
    const recent:string[]=JSON.parse(v.recentSearch||'[]');
    const search=(query:string)=>{
      const term=query.trim();c.setValue('mapSearch',term);if(term)c.setValue('recentSearch',JSON.stringify([term,...recent.filter(s=>s!==term)].slice(0,3)));
      c.setValue('listStatus','');c.go('403:2866');
    };
    field(c,'292:3688','mapQuery','Search locations, pollution, wildlife…',{onSubmit:()=>search(v.mapQuery||'')});
    action(c,['292:3687'],()=>search(v.mapQuery||''));
    ['292:3694','292:3695','292:3696'].forEach((n,i)=>{b.labels[n]=recent[i]||'';if(recent[i])action(c,[n],()=>search(recent[i]));});
    action(c,['292:3697'],()=>{c.setValue('recentSearch','[]');c.setValue('mapQuery','');c.setValue('mapSearch','');});
    for(const [node,term] of Object.entries({'292:3712':'Plastic','292:3724':'Cleanup','292:3736':'wildlife','292:3718':'Coral','292:3730':'Oil','292:3703':'Oil','292:3704':'Cleanup'}))action(c,[node],()=>search(term));
  }
  if(id==='292:3312'){
    choices(c,'mapCategories',{'292:3454':'Plastic','292:3396':'Oil','292:3402':'Industrial','292:3403':'Event','292:3407':'wildlife'},true);
    choices(c,'mapSeverity',{'292:3410':'Urgent','292:3413':'Moderate','292:3416':'Low'},true);
    choices(c,'mapStatus',{'292:3420':'reviewing','292:3423':'resolved','292:3426':'submitted'});
    choices(c,'mapDays',{'292:3446':'7','292:3447':'1','292:3448':'30','292:3449':''});
    for(const [node,km] of Object.entries({'292:3429':'1','292:3430':'50','292:3431':'15'}))action(c,[node],()=>c.run(async()=>{if(!v.mapOrigin)await origin();c.setValue('mapRadius',km);}));
    b.labels['292:3390']='Distance radius'+(v.mapRadius?' · '+v.mapRadius+' km':'');b.labels['292:3451']='Show '+results.length+' results';
    action(c,['292:3450','292:3451'],()=>{c.setValue('listStatus','');c.go('403:2866');});
    action(c,['292:3452','292:3453'],()=>{for(const k of ['mapCategories','mapSeverity','mapStatus','mapDays','mapRadius','mapSearch','mapQuery'])c.setValue(k,'');});
  }
  if(id==='403:3026'){
    const row=v.mapKind==='event'?data.events.find(e=>e.id===v.eventId):data.reports.find(r=>r.id===v.reportId);
    const dest=row?.location||'';
    choices(c,'travelMode',{'403:3069':'walking','403:3072':'two-wheeler','403:3075':'driving','403:3078':'bicycling'});
    Object.assign(b.labels,{'403:3051':row?.title||'Choose a destination','403:3088':dest,'403:3064':'','403:3065':'','403:3056':'','403:3059':'','403:3061':'','403:3041':'','403:3044':'','403:3047':'Route provided by Maps'});
    const url='https://www.google.com/maps/dir/?api=1&destination='+encodeURIComponent(dest)+'&travelmode='+(v.travelMode||'driving');
    const check=()=>{if(!dest)throw new Error('Chọn điểm đến trong danh sách.');};
    action(c,['403:3031','403:3038'],()=>c.run(async()=>{check();await Linking.openURL(url);}));
    action(c,['403:3035'],()=>c.run(async()=>{check();await Share.share({message:url});}));
  }
}
