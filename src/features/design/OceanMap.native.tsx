import { useEffect,useRef,useState } from 'react';
import MapView,{Marker,type LatLng} from 'react-native-maps';
import { StyleSheet } from 'react-native';
export type Place={id:string;title:string;coordinate:LatLng};
export default function OceanMap({places,onSelect}:{places:Place[];onSelect:(id:string)=>void}){
  const ref=useRef<MapView>(null);const [ready,setReady]=useState(false);
  const coords=useRef(places);coords.current=places;
  const signature=places.map(p=>p.coordinate.latitude+','+p.coordinate.longitude).join('|');
  useEffect(()=>{
    if(!ready||!coords.current.length)return;
    const points=coords.current.map(p=>p.coordinate);
    if(points.length===1)ref.current?.animateToRegion({...points[0],latitudeDelta:0.02,longitudeDelta:0.02},200);
    else ref.current?.fitToCoordinates(points,{animated:false,edgePadding:{top:48,left:36,right:36,bottom:48}});
  },[ready,signature]);
  return <MapView ref={ref} accessibilityLabel="Coastal map" onMapReady={()=>setReady(true)} style={StyleSheet.absoluteFill} initialRegion={{latitude:16.06,longitude:108.24,latitudeDelta:0.13,longitudeDelta:0.11}}>
    {places.map(p=><Marker key={p.id} coordinate={p.coordinate} title={p.title} onCalloutPress={()=>onSelect(p.id)}/>)}</MapView>;
}
