import type { ProjectData } from './useProjectData';
import { localDateKey } from './eventDates';
export type Activity={title:string;date:string;points:number};
export function memberActivity(data:ProjectData,userId?:string):Activity[]{
  if(!userId)return [];
  return [
    ...data.checkins.map(c=>({title:data.events.find(e=>e.id===c.event_id)?.title||'Event check-in',date:c.created_at,points:50})),
    ...data.reports.filter(r=>r.owner_id===userId && r.status==='resolved').map(r=>({title:r.title,date:r.report_status_history?.find(h=>h.status==='resolved')?.created_at||r.created_at,points:30})),
    ...data.learning.map(l=>({title:l.activity==='green-guide'?'Green living guide':'Sorting quiz',date:l.completed_at,points:10})),
    ...data.claims.map(r=>({title:'Class reward',date:r.claimed_at,points:-r.cost}))
  ].sort((a,b)=>b.date.localeCompare(a.date));
}
const levels=[['Seedling',0],['Sprout',100],['Green Friend',500],['Eco Guardian',1500],['Planet Protector',3000],['Ocean Hero',7000]] as const;
export function levelFor(xp:number){
  const index=levels.reduce((last,level,i)=>xp>=level[1]?i:last,0);
  const next=levels[index+1];return {number:index+1,name:levels[index][0],next:next?.[0],target:next?.[1],remaining:next?Math.max(0,next[1]-xp):0};
}
export function dayStreak(activities:Activity[],today=new Date()){
  const days=new Set(activities.filter(x=>x.points>0).map(x=>localDateKey(new Date(x.date))));
  const day=new Date(today);
  if(!days.has(localDateKey(day)))day.setDate(day.getDate()-1);
  let count=0;while(days.has(localDateKey(day))){count++;day.setDate(day.getDate()-1);}return count;
}
