import { useEffect,useRef,useState } from 'react';
import L from 'leaflet';
import './ocean-map.css';
import { Image } from 'expo-image';
import { Pressable,Text } from 'react-native';
export type Place = { id:string; title:string; coordinate:{latitude:number;longitude:number} };

export default function OceanMap({places,onSelect}:{places:Place[];onSelect:(id:string)=>void}){
  const container=useRef<HTMLDivElement>(null);
  const latest=useRef({places,onSelect});latest.current={places,onSelect};
  const signature=places.map(p=>[p.id,p.title,p.coordinate.latitude,p.coordinate.longitude].join('|')).join(';');
  const [failed,setFailed]=useState(false),[attempt,retry]=useState(0);
  useEffect(()=>{
    if(!container.current)return;
    setFailed(false);
    const map=L.map(container.current,{zoomControl:false,attributionControl:true,scrollWheelZoom:false});
    const markers=latest.current.places.map(p=>{
      const point:L.LatLngTuple=[p.coordinate.latitude,p.coordinate.longitude];
      const text=document.createElement('span');text.textContent=p.title;
      L.circleMarker(point,{radius:8,color:'#fff',weight:2,fillColor:'#0186a8',fillOpacity:1}).addTo(map).bindTooltip(text).on('click',()=>latest.current.onSelect(p.id));
      return point;
    });
    if(markers.length)map.fitBounds(L.latLngBounds(markers),{padding:[24,24],maxZoom:15});else map.setView([16.06,108.24],12);
    let loaded=false,active=true;
    const tiles=L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',maxZoom:19});
    tiles.on('tileload',()=>{loaded=true;if(active)setFailed(false);});
    tiles.on('load',()=>{if(active && !loaded)setFailed(true);});tiles.addTo(map);
    L.control.zoom({position:'topleft'}).addTo(map);
    const observer=new ResizeObserver(()=>map.invalidateSize());observer.observe(container.current);
    return ()=>{active=false;observer.disconnect();map.remove();};
  },[signature,attempt]);
  return <div style={{position:'absolute',inset:0,background:'#e6f6f7',overflow:'hidden'}}>
    <div ref={container} aria-label="Coastal activity map" style={{position:'absolute',inset:0,visibility:failed?'hidden':'visible'}}/>
    {failed && <><Image source={require('../../../assets/figma/mobile/61020.png')} contentFit="cover" style={{position:'absolute',top:0,bottom:0,left:0,right:0}}/>
      <Pressable accessibilityRole="button" onPress={()=>retry(n=>n+1)} style={{alignSelf:'flex-start',margin:10,padding:7,backgroundColor:'#fff',borderRadius:8}}><Text>Map preview · Retry live map</Text></Pressable></>}
  </div>;
}
