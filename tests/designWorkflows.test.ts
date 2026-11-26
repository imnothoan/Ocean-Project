import { beforeEach,describe,expect,it,vi } from 'vitest';
import { donations } from '../src/features/design/donations';
import { reports } from '../src/features/design/reports';
import { events } from '../src/features/design/events';
import type { Controller } from '../src/features/design/workflow';
vi.mock('react-native',()=>({Share:{share:vi.fn()}}));
vi.mock('expo-location',()=>({}));
vi.mock('expo-crypto',()=>({randomUUID:vi.fn()}));
vi.mock('../src/features/design/media',()=>({}));
const services=vi.hoisted(()=>({createDonation:vi.fn(),submitReportWithEvidence:vi.fn(),recordEventCheckIn:vi.fn(),supabase:{from:vi.fn()}}));
vi.mock('../src/lib/supabase',()=>services);
function harness(id:string,values:Record<string,string>={}){
 let task:Promise<void>=Promise.resolve();
 const c:Controller={id,values,user:{id:'user',email:'test@example.invalid'} as Controller['user'],
   setValue:(k,v)=>{values[k]=v;},go:vi.fn(),back:vi.fn(),refresh:vi.fn(),
   run:fn=>{task=fn();},binding:{navigate:vi.fn(),labels:{},fields:{},actions:{},images:{},tint:{},replacements:{},hidden:new Set()}};
 return {c,click:(id:string)=>{c.binding.actions[id]();return task;}};
}
beforeEach(()=>vi.resetAllMocks());
describe('Native form actions',()=>{
 it('requires a location before advancing the pollution report',async()=>{
  const {c,click}=harness('230:1237');reports(c,[],[]);
  await expect(click('242:4769')).rejects.toThrow();expect(c.go).not.toHaveBeenCalled();
 });
 it('retains the report draft after a rejected submission',async()=>{
  const {c,click}=harness('230:1425',{observation:'Floating plastic',reportLocation:'Beach',severity:'High'});
  services.submitReportWithEvidence.mockResolvedValue({data:null,error:new Error('Offline')});reports(c,[],[]);
  await expect(click('1253:3038')).rejects.toThrow('Offline');expect(c.go).not.toHaveBeenCalled();expect(c.values.observation).toBe('Floating plastic');
 });
 it('uses the persisted report ID when opening the receipt',async()=>{
  services.submitReportWithEvidence.mockResolvedValue({data:{id:'saved-id'},error:null});const {c,click}=harness('230:1425',{observation:'Plastic',reportLocation:'Beach',waste:'Plastic'});
  reports(c,[],[]);await click('1253:3038');expect(c.values.reportId).toBe('saved-id');expect(c.go).toHaveBeenCalledWith('230:1402');
 });
 it('rejects an invalid pledge amount before selecting a provider',async()=>{
  const {c,click}=harness('1581:1601',{amount:'-1'});donations(c,[]);
  await expect(click('1581:1626')).rejects.toThrow();expect(c.go).not.toHaveBeenCalled();
 });
 it('shows a pending pledge after the database confirms it',async()=>{
  services.createDonation.mockResolvedValue({data:{id:'pledge-1'},error:null});const {c,click}=harness('1581:1711',{amount:'5',payment:'MoMo'});
  donations(c,[]);await click('1581:1733');expect(c.values.pledgeId).toBe('pledge-1');expect(c.go).toHaveBeenCalledWith('1581:1764');
  const receipt=harness('1581:1764');donations(receipt.c,[]);expect(receipt.c.binding.labels['1581:1779']).toContain('No payment');
 });
 it('does not confirm a pledge when the network request fails',async()=>{
  services.createDonation.mockResolvedValue({data:null,error:new Error('Unavailable')});const {c,click}=harness('1581:1711',{amount:'5'});
  donations(c,[]);await expect(click('1581:1733')).rejects.toThrow('Unavailable');expect(c.go).not.toHaveBeenCalled();
 });
 it('does not open a check-in certificate after a rejected code',async()=>{
  services.recordEventCheckIn.mockResolvedValue({data:null,error:new Error('Incorrect code')});const {c,click}=harness('258:1135',{eventId:'e1',checkinCode:'wrong'});
  events(c,[{id:'e1',title:'Cleanup',description:'',location:'Beach',event_date:'2026-11-26',capacity:5}],[],[]);
  await expect(click('258:1139')).rejects.toThrow('Incorrect code');expect(c.go).not.toHaveBeenCalled();expect(c.values.checkedEvent).toBeUndefined();
 });
});
