import type { Session } from '@supabase/supabase-js';
import type { Binding, Field } from './components';

export type Values = Record<string,string>;
export type Controller = {
 id:string; user:Session['user'] | undefined; values:Values;
 setValue:(key:string,value:string)=>void; go:(id:string)=>void; back:()=>void;
 run:(operation:()=>Promise<void>,needsUser?:boolean)=>void; refresh:()=>void;
 binding:Required<Omit<Binding,'navigate'>> & Pick<Binding,'navigate'>;
};
export function field(c:Controller,node:string,key:string,placeholder:string,extra:Partial<Field>={}) {
 c.binding.fields[node]={value:c.values[key] ?? '',update:v=>c.setValue(key,v),placeholder,...extra};
}
export function action(c:Controller,nodes:string[],handler:()=>void) {
 for(const node of nodes)c.binding.actions[node]=handler;
}
export function choices(c:Controller,key:string,options:Record<string,string>,multi=false) {
 for(const [node,value] of Object.entries(options)){
  const selected=(c.values[key] || '').split('|');
  c.binding.actions[node]=()=>c.setValue(key,!multi?value:selected.includes(value)?selected.filter(s=>s!==value).join('|'):[...selected.filter(Boolean),value].join('|'));
  if(selected.includes(value))c.binding.tint[node]='#0186A8';
 }
}
export function required(value:string|undefined,message:string) {
 const text=value?.trim();
 if(!text)throw new Error(message);
 return text;
}
export function result<T>(r:{data:T;error:{message:string}|null}):T {
 if(r.error)throw new Error(r.error.message);
 return r.data;
}
