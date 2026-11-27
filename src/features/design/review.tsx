import { Text } from 'react-native';
import { supabase, type OceanReport } from '../../lib/supabase';
import { ReportEvidence } from './ReportEvidence';
import ReportLocationMap from './ReportLocationMap';
import { action,choices,field,result,type Controller } from './workflow';

export function review(c:Controller, rows:OceanReport[]) {
  const {id,values:v,binding:b}=c;
  const report=rows.find(r=>r.id===v.reportId);
  function photo(node:string,path?:string) {
    if (path) b.replacements[node]=<ReportEvidence path={path}/>;
    else b.hidden.add(node);
  }
  if(id==='292:4022'){
    field(c,'292:4025','modSearch','Search title, ID, or area');
    choices(c,'modSeverity',{'292:4029':'All','292:4030':'Urgent','292:4031':'Moderate'});
  }
  if(id==='562:828' || id==='692:816'){
    const admin=id==='692:816';
    const thumbs=admin?['692:901','692:900','692:899']:['562:859','562:860','562:861','562:862'];
    const evidence=[...(report?.report_evidence||[]).map(e=>e.storage_path),...(report?.report_followups||[]).flatMap(f=>f.evidence_path?[f.evidence_path]:[])];
    const index=Math.min(Math.max(0,Number(v.evidenceIndex)||0),Math.max(evidence.length-1,0));
    const hero=admin?'692:895':'562:863';
    if(!evidence.length)b.replacements[hero]=<Text style={{color:'#3f596b',alignSelf:'center',marginTop:24}}>No photo evidence</Text>;
    else photo(hero,evidence[index]);
    thumbs.forEach((n,i)=>{photo(n,evidence[i]);action(c,[n],()=>c.setValue('evidenceIndex',String(i)));});
    action(c,['562:852'],()=>c.setValue('evidenceIndex',String(Math.max(0,index-1))));
    action(c,['562:855'],()=>c.setValue('evidenceIndex',String(Math.min(evidence.length-1,index+1))));
    if(admin){
      Object.assign(b.labels,{'692:839':report?.title||'Select a report','692:837':'','692:840':report?.location||'','692:846':report?.title||'',
        '692:851':report?.category||'','692:852':report?.status||'','692:855':report?.id||'','692:860':'','692:861':'','692:871':report?.location||'',
        '692:872':'','692:873':'','692:878':evidence.length+' photos','692:881':'Submission details','692:883':'Observed at','692:884':report?.details?.observedAt||'—',
        '692:886':'—','692:889':'—','692:898':report?new Date(report.created_at).toLocaleString():'',
        '692:914':report?.status==='reviewing'?'Resolve':'Accept','692:821':'Reporter updates','692:822':'Latest follow-up',
        '692:825':'Visible to the reporter and review team','692:829':report?.report_followups?.[0]?.note||'No follow-up yet.'});
      b.replacements['692:833']=<ReportLocationMap location={report?.location||''}/>;
      for(const n of ['692:835','692:836','692:867','692:862'])b.hidden.add(n);
      action(c,['692:841'],()=>c.go('403:3026'));
    }else{
      Object.assign(b.labels,{'562:839':report?.details?.observation||report?.title||'Select a report from the map or report history.',
        '562:842':report?.title||'Report details','562:845':report?.details?.severity||'—','562:848':report?.status||'','562:849':report?new Date(report.created_at).toLocaleDateString():''});
      action(c,['562:831','562:832'],()=>{c.setValue('eventPlace',report?.location||'');c.go('258:1226');});
    }
  }
  if(id==='689:327'||id==='689:426'){
    const accept=id==='689:327';
    const next=accept?(report?.status==='reviewing'?'resolved':'reviewing'):'rejected';
    const thumbs=accept?['689:362','689:361','689:360']:['689:461','689:460','689:459'];
    photo(accept?'689:356':'689:455',report?.report_evidence?.[0]?.storage_path);
    thumbs.forEach((n,i)=>photo(n,report?.report_evidence?.[i]?.storage_path));
    if(accept){
      Object.assign(b.labels,{'689:366':report?.title||'','689:367':report?.location||'','689:368':report?.status||'','689:385':next==='resolved'?'Resolve report':'Accept report',
        '689:380':next==='resolved'?'Resolve':'Confirm','689:386':'The reporter will receive your decision.','689:388':'Report','689:390':report?.title||'',
        '689:392':'Decision','689:396':next==='resolved'?'Mark as resolved':'Start review','689:397':'Update status and notify the reporter.'});
      for(const n of ['689:404','689:405']) b.hidden.add(n);
    }else{
      Object.assign(b.labels,{'689:465':report?.title||'','689:466':report?.location||'','689:467':report?.status||'','689:484':'Reason'});
      choices(c,'rejectReason',{'689:489':'Incorrect location','689:497':'Already cleaned','689:505':'Spam or incorrect report','689:513':'Unclear photo'});
    }
    action(c,[accept?'689:379':'689:475',accept?'689:380':'689:476'],()=>c.run(async()=>{
      if(!report)throw new Error('Chọn báo cáo từ danh sách.');
      if(!accept&&!v.rejectReason)throw new Error('Chọn lý do từ chối.');
      result(await supabase.rpc('review_report',{target:report.id,expected_status:report.status,next_status:next,reason:accept?'':v.rejectReason}));
      c.setValue('rejectReason','');c.refresh();c.go('292:4022');
    },true));
  }
  if(id==='1249:216'){
    photo('1249:335',report?.report_evidence?.[0]?.storage_path);
  }
  if(id==='1253:343'){
    ['1253:422','1253:423','1253:425'].forEach((n,i)=>photo(n,report?.report_evidence?.[i]?.storage_path));
    b.labels['1253:375']='ATTACHED PHOTOS ('+(report?.report_evidence?.length||0)+')';
    action(c,['1253:383'],()=>c.go('1253:427'));
  }
  if(id==='1253:427'){
    if(report?.report_evidence?.length){b.hidden.delete('1253:498');photo('1253:498',report.report_evidence[0].storage_path);}
  }
  if(id==='1253:517'){
    const latest=report?.report_followups?.find(f=>f.evidence_path)?.evidence_path;
    photo('1253:591',report?.report_evidence?.[0]?.storage_path);photo('1253:593',latest||undefined);
    const complete=report?.report_status_history?.find(h=>h.status==='resolved');
    Object.assign(b.labels,{'1253:542':'—','1253:545':report?.status||'—','1253:548':complete?new Date(complete.created_at).toLocaleDateString():'—'});
    action(c,['1253:557'],()=>c.go('230:1093'));
  }
}
