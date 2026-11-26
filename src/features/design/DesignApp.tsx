import { useCallback,useEffect,useRef,useState } from 'react';
import { ActivityIndicator,AppState,BackHandler,Linking,Platform,Pressable,Share,StyleSheet,Text,View } from 'react-native';
import { SafeAreaProvider,useSafeAreaInsets } from 'react-native-safe-area-context';
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
import { reports } from './reports';
import { events } from './events';
import { donations } from './donations';
import { useProjectData } from './useProjectData';
import { action,type Controller,type Values } from './workflow';
import { additionalBindings } from './interactions';

type FrameId=keyof typeof frames;
function isFrame(id:string):id is FrameId{return Object.prototype.hasOwnProperty.call(frames,id);}
const tabs=['101:2769','258:426','230:1093','403:2759','666:3592'];
const guarded=new Set(['666:4366','230:1379','230:2075','258:906','258:1135','258:1078','258:1226','1356:347','1356:310','1581:1920']);
const adminScreens=new Set(["292:4283", "292:4198", "292:4022", "605:523", "614:766", "689:327", "689:426", "692:477", "692:816", "722:6967"]);
const intro:FrameId[]=['949:246','949:253','949:260','949:267','949:276'];
function Navigation(){
 const [loaded,fontError]=useFonts({AfacadFlux_400Regular,AfacadFlux_500Medium,AfacadFlux_600SemiBold,AfacadFlux_700Bold,Inter_400Regular,Inter_700Bold,Jomhuria_400Regular,PatrickHand_400Regular});
 const [stack,setStack]=useState<FrameId[]>([intro[0]]);
 const id=stack[stack.length-1]; const insets=useSafeAreaInsets();
 const [session,setSession]=useState<Session|null>(null);const [restored,setRestored]=useState(false);
 const [auth,setAuth]=useState(false);const pending=useRef<FrameId|null>(null);
 const [notice,setNotice]=useState('');const [busy,setBusy]=useState(false);const lock=useRef(false);
 const [values,setValues]=useState<Values>({});const setValue=(key:string,value:string)=>setValues(old=>({...old,[key]:value}));
 const {data,error,refresh}=useProjectData(session,values.eventId||'',id==='258:1078');
 const userId=useRef<string|null>(null);
 const open=useCallback((to:FrameId)=>{
  setNotice('');setStack(old=>{if(tabs.includes(to))return [to];if(old[old.length-1]===to)return old;const i=old.lastIndexOf(to);return i>=0?old.slice(0,i+1):[...old,to];});
 },[]);
 const back=useCallback(()=>{setNotice('');if(auth){setAuth(false);pending.current=null;return true;}if(stack.length>1){setStack(v=>v.slice(0,-1));return true;}if(id!=='403:2759'){open('403:2759');return true;}return false;},[auth,stack.length,id,open]);
 useEffect(()=>{const listener=BackHandler.addEventListener('hardwareBackPress',back);return ()=>listener.remove();},[back]);
 useEffect(()=>{
  let active=true;
  const {data:{subscription}}=supabase.auth.onAuthStateChange((_event,next)=>{
   if(!active)return;
   const uid=next?.user.id??null;
   if(userId.current && userId.current!==uid){setValues({});setStack(['403:2759']);}
   userId.current=uid;setSession(next);setRestored(true);
   if(next && pending.current){const dest=pending.current;pending.current=null;open(dest);setAuth(false);}
  });
  supabase.auth.getSession().then(({error})=>{if(active && error){setNotice(error.message);setRestored(true);}}).catch(e=>{if(active){setNotice(String(e));setRestored(true);}});
  const foreground=(state:string)=>{if(Platform.OS!=='web'){if(state==='active')supabase.auth.startAutoRefresh();else supabase.auth.stopAutoRefresh();}};
  foreground(AppState.currentState || 'active');const sub=AppState.addEventListener('change',foreground);
  return ()=>{active=false;subscription.unsubscribe();sub.remove();if(Platform.OS!=='web')supabase.auth.stopAutoRefresh();};
 },[open]);
 const introIndex=intro.indexOf(id);
 useEffect(()=>{if(introIndex<0||!loaded)return;const t=setTimeout(()=>setStack([intro[introIndex+1]||'403:2759']),introIndex===4?450:180);return ()=>clearTimeout(t);},[introIndex,loaded]);
 function go(to:string){
  if(to==='back'){back();return;}
  if(!isFrame(to))return;
  if(adminScreens.has(to)&&session?.user.app_metadata?.role!=='admin'){setNotice('Trang quản trị dành cho tài khoản được cấp quyền.');return;}
  if(to==='1253:517' && !data.reports.some(r=>r.id===values.reportId && r.status==='resolved')){setNotice('Báo cáo đang chờ người phụ trách xác nhận xử lý.');return;}
  if(guarded.has(to)&&!session){pending.current=to;setAuth(true);return;}
  if(to==='1581:1986' && !data.pledges.some(p=>p.status==='confirmed')){setNotice('Chứng nhận được cấp sau khi thanh toán được xác nhận.');return;}
  if(to==='258:1450' && values.checkedEvent!==values.eventId){setNotice('Cần điểm danh sự kiện trước khi mở chứng nhận.');return;}
  open(to);
 }
 function run(task:()=>Promise<void>,needsUser=false){
  if(lock.current)return;
  if(needsUser&&!session){setAuth(true);return;}
  lock.current=true;setBusy(true);setNotice('');
  Promise.resolve().then(task).catch(e=>setNotice(e instanceof Error?e.message:(e?.message||'Không thể thực hiện. Thử lại sau.'))).finally(()=>{lock.current=false;setBusy(false);});
 }
 const c:Controller={id,user:session?.user,values,setValue,go,back,run,refresh,binding:{navigate:go,labels:{},fields:{},actions:{},images:{},replacements:{},tint:{},hidden:new Set()}};
 community(c,data.items,data.profile);reports(c,data.reports,data.notifications);events(c,data.events,data.registrations,data.messages);donations(c,data.pledges);
 additionalBindings(c,data,setAuth,setNotice);
 if(id==='666:3592'){
  const name=data.profile.display_name||session?.user.email?.split('@')[0]||'Guest';
  for(const node of ['666:3898','666:3959'])c.binding.labels[node]=name;
  c.binding.labels['666:3897']=name[0];c.binding.labels['666:3899']=session?'Ocean community member':'Sign in or create an account';
  action(c,['666:3899'],()=>{if(session){run(async()=>{const {error}=await supabase.auth.signOut();if(error)throw error;});}else setAuth(true);});
 }
 useEffect(()=>{function handle(url:string|null|undefined){if(!url)return;const m=url.match(/(?:frame\/|[?&]frame=)(\d+)[-:](\d+)/);if(m){const to=m[1]+':'+m[2];if(isFrame(to)&&!guarded.has(to)&&!adminScreens.has(to)&&!['1581:1764','1581:1986','230:1402','258:1177','258:1450'].includes(to)) open(to);}}
  Linking.getInitialURL().then(handle);const sub=Linking.addEventListener('url',e=>handle(e.url));return ()=>sub.remove();},[open]);
 if(fontError)return <View style={styles.center}><Text>{fontError.message}</Text></View>;
 if(!loaded||!restored)return <View style={styles.center}><ActivityIndicator color="#3DAEBC" /></View>;
 if(auth)return <View style={{flex:1,paddingTop:insets.top}}><AuthScreen onBack={()=>{pending.current=null;setAuth(false);}} /></View>;
 const Screen=frames[id];
 return <View style={styles.app}><StatusBar style="dark"/><Interaction.Provider value={c.binding}><Screen /></Interaction.Provider>
  {busy && <View style={styles.busy} accessibilityLabel="Đang lưu"><ActivityIndicator color="#3DAEBC"/></View>}
  {(notice || error) && <Pressable accessibilityRole="button" accessibilityLiveRegion="polite" style={[styles.notice,{top:insets.top+4}]} onPress={()=>{if(notice)setNotice('');else refresh();}}>
   <Text style={styles.feedback}>{notice||error}{!notice?' · Thử lại':'  ×'}</Text>
  </Pressable>}
 </View>;
}
const styles=StyleSheet.create({app:{flex:1,backgroundColor:'#fff'},center:{flex:1,alignItems:'center',justifyContent:'center'},busy:{...StyleSheet.absoluteFill,backgroundColor:'rgba(255,255,255,0.45)',justifyContent:'center'},notice:{position:'absolute',left:14,right:14,padding:12,borderRadius:12,backgroundColor:'#091727'},feedback:{color:'#fff',fontSize:14}});
export default function DesignApp(){return <SafeAreaProvider><Navigation /></SafeAreaProvider>;}
