import { createElement } from 'react';
import * as Location from 'expo-location';
import { submitReportWithEvidence } from '../../lib/supabase';
import { maxReportPhotos } from '../reports/reportValidation';
import { pickPhoto, type Photo } from './media';
import ReportLocationMap from './ReportLocationMap';
import { formatCoordinates, type Coordinates } from './reportLocation';
import { action, choices, field, required, result, type Controller } from './workflow';

const severityRows = [
  ['Low','242:4800','242:4805','242:4807'], ['Moderate','242:4818','242:4823','242:4825'],
  ['High','242:4827','242:4833','242:4835'], ['Critical','242:4838','242:4843','242:4845'],
];
const speciesRows = [
  ['Green sea turtle','255:720','255:742','255:744'], ['Hawksbill sea turtle','255:746','255:768','255:770'],
  ['Dugong','255:771','255:772','255:774'], ['Not sure','255:785','255:789','255:791'],
];
const wasteRows = [
  ['Plastic','242:4882','242:4883'], ['Fishing gear','242:4891','242:4892'], ['Oil / chemical','242:4894','242:4895'],
  ['Glass','242:4897','242:4898'], ['Metal','242:4900','242:4901'], ['Mixed','242:4903','242:4904'], ['Other','242:4906','242:4907'],
];

export function reportDraft(c: Controller) {
  const { id, values: v, binding: b } = c;
  const photos: Photo[] = v.reportPhotos ? JSON.parse(v.reportPhotos) : [];
  const active = Math.min(Number(v.previewPhoto) || 0, Math.max(photos.length - 1, 0));
  const location = v.reportLocation || '';
  const observation = v.observation?.trim() || '';
  if (id === '230:1093') {
    const begin = (animal: boolean) => {
      for (const key of ['reportPhotos','previewPhoto','reportLocation','observation','reportAmount','severity','waste','species','reportId','submittedReport','observedAt']) c.setValue(key, '');
      c.setValue('observedAt', new Date().toLocaleString());
      c.go(animal ? '230:1356' : '230:1213');
    };
    action(c, ['230:2205'], () => begin(true));
    action(c, ['230:2160'], () => begin(false));
  }
  if (id === '230:1213' || id === '230:1356') {
    const animal = id === '230:1356';
    const main = animal ? '255:586' : '230:4618';
    const thumbs = animal ? ['255:676','255:673','255:674'] : ['242:4655','242:4658','242:4656'];
    if (photos[active]) b.images[main] = photos[active].uri;
    else b.hidden.add(main);
    thumbs.forEach((node, index) => {
      if (!photos[index]) { b.hidden.add(node); return; }
      b.labels[node] = 'Preview photo ' + (index + 1);
      b.images[node] = photos[index].uri;
      action(c, [node], () => c.setValue('previewPhoto', String(index)));
    });
    const add = (camera: boolean) => c.run(async () => {
      if (photos.length >= maxReportPhotos) throw new Error('Đã đủ 3 ảnh. Chọn một ảnh và nhấn Remove để thay ảnh.');
      const selected = await pickPhoto(camera);
      if (!selected) return;
      c.setValue('reportPhotos', JSON.stringify([...photos, selected]));
      c.setValue('previewPhoto', String(photos.length));
    });
    action(c, animal ? ['255:593','255:597'] : ['242:4619','242:4623'], () => add(true));
    action(c, animal ? ['255:599','255:604','255:669'] : ['242:4625','242:4630','242:4635'], () => add(false));
    if (!photos.length) b.hidden.add('reportRemovePhoto');
    action(c, ['reportRemovePhoto'], () => {
      c.setValue('reportPhotos', JSON.stringify(photos.filter((_, i) => i !== active)));
      c.setValue('previewPhoto', '0');
    });
    b.labels[animal ? '255:607' : '242:4633'] = 'PHOTOS ATTACHED (' + photos.length + ')';
    b.hidden.add(animal ? '230:1358' : '230:1215');
  }
  if (id === '230:1237' || id === '230:2121') {
    const animal = id === '230:2121';
    const pick = (p: Coordinates) => c.setValue('reportLocation', formatCoordinates(p));
    const locate = () => c.run(async () => {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) throw new Error('Em có thể nhập địa điểm khi chưa cấp quyền định vị.');
      const position = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      pick(position.coords);
    });
    field(c, animal ? '255:833' : '242:4714', 'reportLocation', 'Enter address or coordinates');
    const mapNode = animal ? '255:880' : '242:4741';
    b.replacements[mapNode] = createElement(ReportLocationMap, { location, onPick: pick, onLocate: locate });
    const gps = animal ? '255:828' : '242:4753';
    b.labels[gps] = 'Use current location';
    action(c, [gps], locate);
    if (animal) {
      field(c, '255:863', 'observation', 'Behavior or notes', { multiline: true });
      field(c, '255:860', 'observedAt', 'Sighting date and time');
    } else b.labels['242:4750'] = 'DEVICE LOCATION';
    action(c, [animal ? '255:871' : '242:4769'], () => c.run(async () => {
      if (required(location, 'Nhập địa điểm hoặc dùng định vị.').length < 2) throw new Error('Vị trí cần ít nhất 2 ký tự.');
      c.go(animal ? '230:2098' : '230:1261');
    }));
  }
  if (id === '230:1261' || id === '230:2029') {
    const animal = id === '230:2029';
    const key = animal ? 'species' : 'severity';
    for (const [name, card, label, radio] of animal ? speciesRows : severityRows) {
      const selected = v[key] === name;
      action(c, [card,label], () => c.setValue(key, name));
      b.tint[card] = selected ? '#eaf8fb' : '#ffffff';
      b.tint[radio] = selected ? '#0186a8' : '#e6f3f8';
    }
    b.hidden.add(animal ? '255:745' : '242:4836');
    if (animal) b.labels['255:718'] = v.species || 'Select a species';
    action(c, [animal ? '255:799' : '242:4855'], () => c.run(async () => {
      required(v[key], animal ? 'Chọn một loài hoặc Not sure.' : 'Chọn mức độ ô nhiễm.');
      c.go(animal ? '230:2121' : '230:1285');
    }));
  }
  if (id === '230:1285') {
    const selected = (v.waste || '').split('|').filter(Boolean);
    for (const [name, card, label] of wasteRows) {
      choices(c, 'waste', { [label]: name }, true);
      action(c, [card], b.actions[label]);
      b.tint[card] = selected.includes(name) ? '#43c4d6' : '#ffffff';
    }
    b.labels['242:4925'] = selected.join(', ') || 'Select waste types';
    b.labels['242:4926'] = 'Continue to describe what you observed.';
    action(c, ['242:4909','242:4927'], () => c.run(async () => {
      required(v.waste, 'Chọn ít nhất một loại rác.');
      c.go('230:1333');
    }));
  }
  if (id === '230:1333') {
    field(c, '242:4968', 'observation', 'What did you observe?', { multiline: true });
    field(c, '242:4973', 'reportAmount', 'Estimated amount (optional)');
    field(c, '242:4978', 'observedAt', 'Date / time');
    action(c, ['242:4988'], () => c.run(async () => {
      if (observation.length < 3 || observation.length > 300) throw new Error('Nhập mô tả từ 3 đến 300 ký tự.');
      c.go('230:1425');
    }));
  }
  if (id === '230:1425' || id === '230:2098') {
    const animal = id === '230:2098';
    const slots = animal ? ['255:949'] : ['242:5212','242:5214'];
    slots.forEach((node, index) => { if (photos[index]) b.images[node] = photos[index].uri; else b.hidden.add(node); });
    const waste = (v.waste || '').split('|').filter(Boolean).join(', ') || '—';
    const count = photos.length + (photos.length === 1 ? ' photo attached' : ' photos attached');
    Object.assign(b.labels, {'242:5220':waste,'242:5233':waste,'242:5223':v.severity || '—','242:5236':v.severity || '—','242:5226':location,'242:5239':location,'242:5210':count,'255:922':count,'255:927':v.species || '—','255:930':location,'255:933':v.observedAt || '—'});
    action(c, [animal ? '255:944' : '1253:3038'], () => c.run(async () => {
      if (v.submittedReport) { c.setValue('reportId', v.submittedReport); c.go('230:1402'); return; }
      const title = animal ? required(v.species, 'Chọn loài vừa quan sát.') : observation;
      const details = { observation, severity:v.severity || '', waste:v.waste || '', amount:v.reportAmount || '', observedAt:v.observedAt || '', species:v.species || '' };
      const saved = result(await submitReportWithEvidence({ title, location, category:animal ? 'animal' : 'pollution', photos, details }));
      if (!saved) throw new Error('Chưa nhận được mã báo cáo từ máy chủ.');
      c.setValue('submittedReport', saved.id);
      c.setValue('reportId', saved.id);
      c.refresh();
      c.go('230:1402');
    }, true));
  }
}
