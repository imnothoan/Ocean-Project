import { useCallback,useEffect,useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase,loadReports,loadNotifications,loadEventMessages,loadImpactMetrics,type OceanReport,type OceanEvent,type OceanNotification,type EventMessage,type ImpactMetric } from '../../lib/supabase';
import { fetchFeed,fetchProfile,emptyProfile,type CommunityItem,type Profile } from './data';
import type { Registration } from './events';
import type { Pledge } from './donations';
import { result } from './workflow';

type ProjectData={points:number;saved:string[];items:CommunityItem[];profile:Profile;reports:OceanReport[];events:OceanEvent[];registrations:Registration[];notifications:OceanNotification[];messages:EventMessage[];pledges:Pledge[];metrics:ImpactMetric[]};
const empty:ProjectData={points:0,saved:[],items:[],profile:emptyProfile,reports:[],events:[],registrations:[],notifications:[],messages:[],pledges:[],metrics:[]};
export function useProjectData(session:Session|null,eventId:string,chat:boolean){
 const [data,setData]=useState<ProjectData>(empty);
 const [error,setError]=useState('');const [reload,setReload]=useState(0);
 const refresh=useCallback(()=>setReload(r=>r+1),[]);
 useEffect(()=>{setData(empty);},[session?.user.id]);
 useEffect(()=>{
  let current=true;setError('');
  async function load(){
   const [items,profile,events,metrics,reports,notifications,registrations,pledges,messages,points,saved]=await Promise.all([
    fetchFeed(session),fetchProfile(session),
    supabase.from('events').select('id,title,description,event_date,location,capacity,owner_id').order('event_date').limit(100).then(result),
    loadImpactMetrics().then(result),
    session?loadReports().then(result):[],session?loadNotifications().then(result):[],
    session?supabase.from('event_registrations').select('id,event_id,owner_id,status,participant_name,volunteer_role').limit(200).then(result):[],
    session?supabase.from('donations').select('id,amount,campaign,status,created_at').eq('donor_id',session.user.id).order('created_at',{ascending:false}).then(result):[],
    session&&chat&&eventId?loadEventMessages(eventId).then(result):[],
    session?supabase.rpc('ocean_points').then(result):0,
    session?supabase.from('saved_guides').select('frame_id').eq('user_id',session.user.id).then(result):[]
   ]);
   if(current)setData({points:Number(points)||0,saved:(saved??[]).map(g=>String(g.frame_id)),items,profile,events:events??[],metrics:metrics??[],reports:reports??[],notifications:notifications??[],registrations:registrations??[],pledges:pledges??[],messages:messages??[]});
  }
  load().catch(e=>{if(current)setError(e.message || 'Không thể tải dữ liệu.');});
  return ()=>{current=false;};
 },[session?.user.id,reload,eventId,chat]);
 return {data,error,refresh};
}
