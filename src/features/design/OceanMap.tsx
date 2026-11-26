import { createElement } from 'react';
export type Place = { id:string;title:string;coordinate:{latitude:number;longitude:number} };
export default function OceanMap(_props:{places:Place[];onSelect:(id:string)=>void}){
 return createElement('iframe',{title:'Coastal map',src:'https://www.openstreetmap.org/export/embed.html?bbox=108.16%2C15.99%2C108.32%2C16.13&layer=mapnik',style:{position:'absolute',inset:0,border:0,width:'100%',height:'100%'}});
}
