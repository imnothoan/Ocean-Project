import {
  supabase,
  updateOwnReport,
  markNotificationRead,
  type OceanReport,
  type OceanNotification,
} from '../../lib/supabase';
import { recordReference } from './share';
import { reportDraft } from './reportDraft';
import { action, choices, field, required, result, type Controller } from './workflow';
import { randomUUID } from 'expo-crypto';
import { fileBytes, pickPhoto } from './media';

export function reports(c: Controller, rows: OceanReport[], notifications: OceanNotification[]) {
  const { id, values: v, binding: b } = c;
  const report = rows.find((r) => r.id === v.reportId);
  reportDraft(c);
  if (id === '230:1402') recordReference(c, '250:412', v.reportId, 'REPORT ID  ');
  if (id === '1249:216') {
    recordReference(c, '1249:233', report?.id || v.reportId);
    b.labels['1249:234'] = report ? new Date(report.created_at).toLocaleString() : '';
    b.labels['1249:236'] = report?.status || 'Submitted';
    b.labels['1249:260'] = 'Updated when reviewed';
  }
  if (id === '230:1379') {
    choices(c, 'historyFilter', { '253:465': 'All', '253:468': 'Pending', '253:471': 'Verified' });
  }
  if (id === '1253:343') {
    b.labels['1253:358'] = report?.id || '—';
    const key = 'reportEdit:' + report?.id + ':';
    const notes = v[key + 'notes'] ?? report?.details?.observation ?? report?.title ?? '';
    const severity = v[key + 'severity'] ?? report?.details?.severity ?? '';
    field(c, '1253:373', key + 'notes', 'Report notes', { value: notes, multiline: true });
    b.labels['1253:374'] = notes.length + ' / 300';
    field(c, '1253:370', key + 'waste', 'Waste type', {
      value: v[key + 'waste'] ?? report?.details?.waste ?? '',
    });
    choices(c, key + 'severity', {
      '1253:361': 'Low',
      '1253:363': 'Moderate',
      '1253:365': 'High',
      '1253:367': 'Critical',
    });
    const save = () =>
      c.run(async () => {
        if (!report || report.owner_id !== c.user?.id || report.status !== 'submitted')
          throw new Error('Chỉ sửa được báo cáo của em trước khi xét duyệt.');
        if (notes.trim().length < 3 || notes.length > 300)
          throw new Error('Nhập mô tả từ 3 đến 300 ký tự.');
        const details = {
          ...report.details,
          observation: notes.trim(),
          severity,
          waste: v[key + 'waste'] ?? report.details?.waste ?? '',
        };
        result(
          await updateOwnReport(report.id, {
            title: report.category === 'animal' ? report.title : notes.trim(),
            location: report.location,
            details,
          }),
        );
        c.refresh();
        c.go('1249:216');
      }, true);
    action(c, ['1253:384', '1253:385'], save);
  }
  if (id === '1253:427') {
    const photoKey = 'followupPhoto:' + report?.id,
      mimeKey = 'followupMime:' + report?.id;
    b.labels['1253:442'] = report?.id || '—';
    field(c, '1253:459', 'followup:' + report?.id, 'Write an update', { multiline: true });
    for (const node of ['1253:498', '1253:499', '1253:511', '1253:512']) {
      if (v[photoKey] && node === '1253:499') b.images[node] = v[photoKey];
      else b.hidden.add(node);
    }
    action(c, ['1253:456'], () =>
      c.run(async () => {
        const f = await pickPhoto(false);
        if (f) {
          c.setValue(photoKey, f.uri);
          c.setValue(mimeKey, f.mime);
        }
      }),
    );
    action(c, ['1253:460', '1253:461'], () =>
      c.run(async () => {
        if (!report || report.owner_id !== c.user?.id)
          throw new Error('Chọn báo cáo của em trong lịch sử.');
        const body = (v['followup:' + report.id] || '').trim();
        if (!body && !v[photoKey]) throw new Error('Thêm ghi chú hoặc ảnh.');
        let path: string | null = null;
        if (v[photoKey]) {
          const mime = v[mimeKey] || 'image/jpeg';
          path = c.user!.id + '/' + report.id + '/' + randomUUID() + '.' + mime.split('/')[1];
          const bytes = await fileBytes(v[photoKey]);
          result(
            await supabase.storage.from('report-evidence').upload(path, bytes, { contentType: mime }),
          );
        }
        const inserted = await supabase
          .from('report_followups')
          .insert({ report_id: report.id, note: body, evidence_path: path });
        if (inserted.error) {
          if (path) result(await supabase.storage.from('report-evidence').remove([path]));
          throw inserted.error;
        }
        c.setValue('followup:' + report.id, '');
        c.setValue(photoKey, '');
        c.refresh();
        c.go('1249:216');
      }, true),
    );
  }
  if (id === '230:2052') {
    const notification = notifications.find((n) => n.id === v.notificationId);
    Object.assign(b.labels, {
      '264:1113': notification?.title || 'No notification selected',
      '264:1114': notification?.body || '',
      '264:1120': 'Report update',
      '264:1121': notification?.body || '',
      '264:1153': report?.location || '—',
      '264:1156': report?.title || '—',
      '264:1159': report?.status || '—',
    });
  }
  if (id === '230:2075') {
    choices(c, 'inboxFilter', { '255:964': 'All', '255:966': 'Unread', '255:968': 'Alerts' });
  }
}
