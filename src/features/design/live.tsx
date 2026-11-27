import { createContext, useContext, type ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import type { Controller } from './workflow';
import type { ProjectData } from './useProjectData';

export const LiveData = createContext<{c:Controller; data:ProjectData; loading:boolean} | null>(null);
export function useLiveData() {
  const state=useContext(LiveData);
  if (!state) throw new Error('Missing project data');
  return state;
}
export function FlowSection({top,padding=20,children}:{top:number;padding?:number;children:ReactNode}) {
  const scale=Math.min(useWindowDimensions().width,600)/393;
  return <View pointerEvents="box-none" style={{marginTop:(top-59)*scale,paddingHorizontal:padding*scale,paddingBottom:12,gap:8}}>{children}</View>;
}
export function ListRow({title,description,onPress,children}:{title:string;description?:string;onPress?:()=>void;children?:ReactNode}){
  const content=<><Text style={styles.title}>{title}</Text>{!!description && <Text style={styles.body}>{description}</Text>}{children}</>;
  return onPress?<Pressable accessibilityRole="button" style={styles.row} onPress={onPress}>{content}</Pressable>:<View style={styles.row}>{content}</View>;
}
export function SmallButton({label,onPress,selected=false}:{label:string;onPress:()=>void;selected?:boolean}) {
  return <Pressable accessibilityRole="button" accessibilityState={{selected}} onPress={onPress} style={[styles.button,selected && styles.selected]}>
    <Text style={[styles.buttonLabel,selected && styles.onSelected]}>{label}</Text></Pressable>;
}
export const styles=StyleSheet.create({
  row:{padding:14,borderWidth:1,borderColor:'#d7e1e6',borderRadius:12,gap:6,backgroundColor:'#fff'},
  title:{fontSize:17,lineHeight:22,color:'#091727',fontFamily:'AfacadFlux_700Bold'},
  body:{fontSize:15,lineHeight:20,color:'#3f596b',fontFamily:'AfacadFlux_400Regular'},
  heading:{fontSize:20,fontFamily:'AfacadFlux_700Bold',color:'#091727',marginTop:12},
  actions:{flexDirection:'row',alignItems:'center',gap:8,flexWrap:'wrap'},
  button:{paddingHorizontal:14,paddingVertical:8,alignSelf:'flex-start',borderRadius:16,backgroundColor:'#edfbff'},
  selected:{backgroundColor:'#0186a8'},buttonLabel:{color:'#075e74',fontFamily:'AfacadFlux_600SemiBold',fontSize:15},onSelected:{color:'#fff'}
});
