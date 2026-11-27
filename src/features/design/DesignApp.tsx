import { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, AppState, BackHandler, Linking, Modal, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { AfacadFlux_400Regular,AfacadFlux_500Medium,AfacadFlux_600SemiBold,AfacadFlux_700Bold } from '@expo-google-fonts/afacad-flux';
import { Inter_400Regular,Inter_700Bold } from '@expo-google-fonts/inter';
import { Jomhuria_400Regular } from '@expo-google-fonts/jomhuria';
import { PatrickHand_400Regular } from '@expo-google-fonts/patrick-hand';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../../lib/supabase';
import { AuthScreen } from '../auth/AuthScreen';
import { frames } from './frames';
import { Interaction } from './components';
import { community } from './community';
import { CommunityProvider } from './CommunityContext';
import { review } from './review';
import { reports } from './reports';
import { events } from './events';
import { donations } from './donations';
import { useProjectData } from './useProjectData';
import { action,type Controller,type Values } from './workflow';
import { volunteer,lessons } from './volunteer';
import { additionalBindings } from './interactions';
import { LiveData } from './live';
import { account, guideNames } from './account';
import { EventCalendarScreen } from './screens/EventCalendarScreen';

type FrameId=keyof typeof frames;
function isFrame(id:string):id is FrameId{return Object.prototype.hasOwnProperty.call(frames,id);}
const tabs=new Set(['101:2769','258:426','230:1093','403:2759','666:3592']);
const guarded=new Set(['1335:4347','1335:4104','1335:4216',...lessons,'666:4366','564:290','230:1379','230:2075','230:2052','1249:216','1253:343','1253:427','1253:517','258:792','258:906','258:1135','258:1078','258:1226','258:1279','708:684','700:264','258:1389','564:441','1356:347','1356:310','1581:1920']);
const adminScreens=new Set(['292:4283','292:4198','292:4022','605:523','614:766','689:327','689:426','692:477','692:816','722:6967']);
const receipts=new Set(['1581:1764','1581:1986','230:1402','258:1177','258:1450','1253:517','670:5193']);
const intro:FrameId[]=['949:246','949:253','949:260','949:267','949:276'];
const fonts={AfacadFlux_400Regular,AfacadFlux_500Medium,AfacadFlux_600SemiBold,AfacadFlux_700Bold,Inter_400Regular,Inter_700Bold,Jomhuria_400Regular,PatrickHand_400Regular};

function Navigation(){
  const [loaded,fontError]=useFonts(fonts);
  const [stack,setStack]=useState<FrameId[]>([intro[0]]);
  const id=stack[stack.length-1];
  const insets=useSafeAreaInsets();
  const [session,setSession]=useState<Session|null>(null);
  const [restored,setRestored]=useState(false);
  const [auth,setAuth]=useState(false);
  const [saved,setSaved]=useState(false);
  const pending=useRef<FrameId|null>(null);
  const [notice,setNotice]=useState('');
  const [busy,setBusy]=useState(false);
  const lock=useRef(false);
  const [values,setValues]=useState<Values>({});
  const drafts=useRef<Values>({});
  const currentUser=useRef<string|null>(null);
  const uid=session?.user.id ?? null;
  const {data,error,refresh,loading}=useProjectData(session,values.eventId||'',id==='258:1078');
  useEffect(()=>{if(['258:906','564:290','1356:347','230:1379','292:4022','605:523','1358:343','1335:4216','230:2075'].includes(id))refresh();},[id,refresh]);
  useEffect(()=>{const sub=AppState.addEventListener('change',state=>{if(state==='active')refresh();});return ()=>sub.remove();},[refresh]);
  function setValue(key:string,value:string){
    if(currentUser.current!==uid)return;
    drafts.current={...drafts.current,[key]:value};setValues(drafts.current);
  }
  const open=useCallback((to:FrameId)=>{
    setNotice('');
    if(to==='666:4366'){
      drafts.current=Object.fromEntries(Object.entries(drafts.current).filter(([key])=>!key.startsWith('profile:')));
      setValues(drafts.current);
    }
    setStack(old=>{
      if(tabs.has(to))return [to];
      if(old[old.length-1]===to)return old;
      const index=old.lastIndexOf(to);
      return index>=0?old.slice(0,index+1):[...old,to];
    });
  },[]);
  const back=useCallback(()=>{
    if(busy)return true;
    setNotice('');
    if(saved){setSaved(false);return true;}
    if(auth){setAuth(false);pending.current=null;return true;}
    if(stack.length>1){setStack(v=>v.slice(0,-1));return true;}
    if(id!=='403:2759'){open('403:2759');return true;}
    return false;
  },[auth,busy,saved,stack.length,id,open]);

  useEffect(()=>{const sub=BackHandler.addEventListener('hardwareBackPress',back);return ()=>sub.remove();},[back]);
  useEffect(()=>{
    let active=true;
    const {data:{subscription}}=supabase.auth.onAuthStateChange((_event,next)=>{
      if(!active)return;
      const nextId=next?.user.id??null;
      if(currentUser.current && currentUser.current!==nextId){
        drafts.current={};setValues({});setStack(['403:2759']);setNotice('');setSaved(false);pending.current=null;
      }
      currentUser.current=nextId;setSession(next);setRestored(true);
      if(next)setAuth(false);
    });
    supabase.auth.getSession().then(({error})=>{if(active && error){setNotice(error.message);setRestored(true);}}).catch(e=>{if(active){setNotice(String(e));setRestored(true);}});
    const foreground=(state:string)=>{if(Platform.OS!=='web'){if(state==='active')supabase.auth.startAutoRefresh();else supabase.auth.stopAutoRefresh();}};
    foreground(AppState.currentState || 'active');
    const sub=AppState.addEventListener('change',foreground);
    return ()=>{active=false;subscription.unsubscribe();sub.remove();if(Platform.OS!=='web')supabase.auth.stopAutoRefresh();};
  },[]);
  const introIndex=intro.indexOf(id);
  useEffect(()=>{if(introIndex<0||!loaded)return;const t=setTimeout(()=>setStack([intro[introIndex+1]||'403:2759']),introIndex===4?450:180);return ()=>clearTimeout(t);},[introIndex,loaded]);

  function go(to:string){
    if(currentUser.current!==uid)return;
    if(to==='back'){back();return;}
    if(!isFrame(to))return;
    if((guarded.has(to)||adminScreens.has(to))&&!session){pending.current=to;setAuth(true);return;}
    if(adminScreens.has(to)&&session?.user.app_metadata?.role!=='admin'){setNotice('Trang quản trị dành cho tài khoản được cấp quyền.');return;}
    const v=drafts.current;
    if(to==='1253:517' && !data.reports.some(r=>r.id===v.reportId && r.status==='resolved')){setNotice('Báo cáo đang chờ người phụ trách xác nhận xử lý.');return;}
    if(to==='1581:1986' && !data.pledges.some(p=>p.id===v.pledgeId && p.status==='confirmed')){setNotice('Chứng nhận được cấp sau khi thanh toán được xác nhận.');return;}
    if((to==='258:1450'||to==='258:1177') && (!v.eventId || !(v.checkedEvent===v.eventId || data.checkins.some(row=>row.event_id===v.eventId)))){setNotice('Cần điểm danh sự kiện trước khi mở chứng nhận.');return;}
    open(to);
  }
  const navigateRef=useRef(go);
  navigateRef.current=go;
  useEffect(()=>{
    if(session && pending.current){const dest=pending.current;pending.current=null;navigateRef.current(dest);}
  },[uid,session]);
  useEffect(()=>{
    if(!restored)return;
    function handle(url:string|null|undefined){
      const m=url?.match(/(?:frame\/|[?&]frame=)(\d+)[-:](\d+)/);
      if(!m)return;
      const to=m[1]+':'+m[2];
      if(!receipts.has(to))navigateRef.current(to);
    }
    let active=true;
    Linking.getInitialURL().then(url=>{if(active)handle(url);});
    const sub=Linking.addEventListener('url',e=>handle(e.url));return ()=>{active=false;sub.remove();};
  },[restored]);
  function run(task:()=>Promise<void>,needsUser=false){
    if(lock.current || currentUser.current!==uid)return;
    if(needsUser&&!session){setAuth(true);return;}
    lock.current=true;setBusy(true);setNotice('');
    Promise.resolve().then(task).catch(e=>{if(currentUser.current===uid)setNotice(e?.message||'Không thể thực hiện. Thử lại sau.');})
      .finally(()=>{lock.current=false;setBusy(false);});
  }
  const c:Controller={id,user:session?.user,values,setValue,go,back,run,refresh,binding:{navigate:go,labels:{},fields:{},actions:{},images:{},replacements:{},tint:{},hidden:new Set()}};
  community(c,data.items,data.profile);
  reports(c,data.reports,data.notifications);
  events(c,data.events,data.registrations,data.messages,data.checkins,data.recaps);
  donations(c,data.pledges);
  additionalBindings(c,data,setAuth,setNotice);
  review(c,data.reports);
  volunteer(c,data);
  account(c,data,()=>setAuth(true));
  if(id==='666:3592')action(c,['721:360'],()=>session?setSaved(true):setAuth(true));
  if(fontError)return <View style={styles.center}><Text>{fontError.message}</Text></View>;
  if(!loaded||!restored)return <View style={styles.center}><ActivityIndicator color="#3DAEBC"/></View>;
  if(auth)return <View style={{flex:1,paddingTop:insets.top}}><AuthScreen onAuthenticated={()=>setAuth(false)} onBack={()=>{pending.current=null;setAuth(false);}}/></View>;
  const Screen=frames[id];
  return <View style={styles.app}><StatusBar style="dark"/><Interaction.Provider value={c.binding}>
    <LiveData.Provider value={{c,data,loading}}><CommunityProvider controller={c} items={data.items} profile={data.profile}>
      {id==='258:614' ? <EventCalendarScreen events={data.events} onSelectEvent={eventId=>{setValue('eventId',eventId);go('258:735');}}/> : <Screen/>}
    </CommunityProvider></LiveData.Provider>
    </Interaction.Provider>
    {loading && !busy && introIndex<0 && <View pointerEvents="none" style={[styles.loading,{top:insets.top+2}]}><ActivityIndicator size="small" accessibilityLabel="Đang tải dữ liệu"/></View>}
    {busy && <View style={styles.busy} accessibilityLabel="Đang lưu"><ActivityIndicator color="#3DAEBC"/></View>}
    {!!(notice||error) && <Pressable accessibilityRole="button" accessibilityLiveRegion="polite" style={[styles.notice,{top:insets.top+4}]} onPress={()=>notice?setNotice(''):refresh()}>
      <Text style={styles.feedback}>{notice||error}{notice?'  ×':' · Thử lại'}</Text>
    </Pressable>}
    <Modal visible={saved} transparent animationType="fade" onRequestClose={()=>setSaved(false)}>
      <View style={styles.scrim}><View style={styles.dialog}>
        <Text style={styles.title}>My saved guides</Text>
        {data.saved.length===0 && <Text>Save a guide while reading to find it here.</Text>}
        {data.saved.map(frame=><Pressable key={frame} accessibilityRole="button" onPress={()=>{setSaved(false);go(frame);}}><Text style={styles.option}>{guideNames[frame]}</Text></Pressable>)}
        <Pressable accessibilityRole="button" onPress={()=>setSaved(false)}><Text style={styles.option}>Close</Text></Pressable>
      </View></View>
    </Modal>
  </View>;
}
const styles=StyleSheet.create({
  app:{flex:1,backgroundColor:'#fff'},center:{flex:1,alignItems:'center',justifyContent:'center'},busy:{...StyleSheet.absoluteFill,backgroundColor:'rgba(255,255,255,0.45)',justifyContent:'center'},
  loading:{position:'absolute',right:6},notice:{position:'absolute',left:14,right:14,padding:12,borderRadius:12,backgroundColor:'#091727'},feedback:{color:'#fff',fontSize:14},
  scrim:{flex:1,backgroundColor:'#0005',justifyContent:'center',padding:24},dialog:{alignSelf:'center',width:'100%',maxWidth:440,backgroundColor:'#fff',padding:20,borderRadius:18,gap:12},
  title:{fontFamily:'AfacadFlux_700Bold',fontSize:22,color:'#091727'},option:{fontFamily:'AfacadFlux_600SemiBold',fontSize:18,color:'#0186a8',paddingVertical:9}
});
export default function DesignApp(){return <SafeAreaProvider><Navigation/></SafeAreaProvider>;}
