import MapView, { Marker, type LatLng } from 'react-native-maps';
import { StyleSheet } from 'react-native';
export type Place = { id:string; title:string; coordinate:LatLng };
export default function OceanMap({places,onSelect}:{places:Place[];onSelect:(id:string)=>void}) {
 return <MapView accessibilityLabel="Coastal map" style={StyleSheet.absoluteFill} initialRegion={{latitude:16.06,longitude:108.24,latitudeDelta:0.13,longitudeDelta:0.11}}>
  {places.map(p=><Marker key={p.id} coordinate={p.coordinate} title={p.title} onCalloutPress={()=>onSelect(p.id)} />)}
 </MapView>;
}
