import { shareText } from './share';
import {
  supabase,
  createEvent,
  updateEvent,
  recordEventCheckIn,
  submitEventFeedback,
  createEventRecap,
  type OceanEvent,
  type EventMessage,
  type EventRecap,
} from '../../lib/supabase';
import { action, choices, field, required, result, type Controller } from './workflow';
import { eventStart, localDateKey, localTime } from './eventDates';
import { pickPhoto, type Photo } from './media';
import { eventPhotoUrl, withEventPhoto } from './eventPhotos';
import { matchesQuery } from './communityView';
import type { Attendance } from './useProjectData';

export type Registration = {
  id: string;
  event_id: string;
  owner_id: string;
  status: string;
  participant_name: string;
  volunteer_role: string;
};
const eventDate = (e?: OceanEvent) => (e ? new Date(e.event_date).toLocaleString() : '');
const draftKeys = [
  'eventName',
  'eventDescription',
  'eventPlace',
  'eventDate',
  'eventTime',
  'activityType',
  'duration',
  'capacity',
  'safety',
  'eventPhoto',
  'bring',
];
const defaultItems = ['Reusable gloves', 'Reusable water bottle', 'Hat / sunscreen'];

export function events(
  c: Controller,
  events: OceanEvent[],
  registrations: Registration[],
  _messages: EventMessage[],
  checkins: Attendance[] = [],
  recaps: EventRecap[] = [],
) {
  const { id, values: v, binding: b } = c;
  const selected = events.find((e) => e.id === v.eventId);
  const eid = () => required(selected?.id, 'Chọn một sự kiện từ danh sách.');
  const attendees = registrations.filter((r) => r.event_id === selected?.id);
  const mine = attendees.find((r) => r.owner_id === c.user?.id);
  const checked = checkins.find((r) => r.event_id === selected?.id);
  const owner = !!selected && !!c.user && selected.owner_id === c.user.id;
  const open = (e: OceanEvent | undefined, to: string) =>
    c.run(async () => {
      if (!e) throw new Error('Chưa có sự kiện ở mục này.');
      c.setValue('eventId', e.id);
      c.go(to);
    });
  const pick = (key: string) =>
    c.run(async () => {
      const p = await pickPhoto(false);
      if (p) c.setValue(key, JSON.stringify(p));
    }, true);
  const getPhoto = (key: string): Photo | undefined => (v[key] ? JSON.parse(v[key]) : undefined);
  if (id === '258:426' || id === '258:516') {
    const now = new Date();
    const list = events.filter((e) => {
      const date = new Date(e.event_date);
      if (e.ended_at || date < now || !matchesQuery(v.eventSearch || '', e.title, e.location, e.description))
        return false;
      if (
        v.eventCategory &&
        v.eventCategory !== 'All' &&
        !matchesQuery(v.eventCategory, e.category, e.title, e.description)
      )
        return false;
      if (v.eventPeriod === 'Today') return date.toDateString() === now.toDateString();
      if (v.eventPeriod === 'Weekend') return [0, 6].includes(date.getDay());
      return (
        v.eventPeriod !== 'This month' ||
        (date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear())
      );
    });
    if (id === '258:426') {
      for (const [i, title, sub, image] of [
        [0, '258:430', '258:431', '258:469'],
        [1, '258:444', '258:445', '258:473'],
        [2, '258:449', '258:450', '258:470'],
      ] as const) {
        const e = list[i];
        b.labels[title] = e?.title || (!i ? 'No upcoming events' : '');
        b.labels[sub] = e ? [eventDate(e), e.location].join(' · ') : '';
        const url = eventPhotoUrl(e?.cover_path);
        if (url) b.images[image] = url;
        if (!e) b.hidden.add(image);
        action(c, [title, sub, image, ...(i === 0 ? ['258:428'] : [])], () => open(e, '258:735'));
      }
      Object.assign(b.labels, {
        '258:467': list[0]?.capacity ? list[0].capacity + ' places' : '',
        '258:447': '',
        '258:452': '',
        '258:459': 'View campaign',
        '258:465': 'View campaign',
        '258:456': '',
        '258:462': '',
        '258:457': '',
        '258:463': '',
      });
      choices(c, 'eventCategory', {
        '258:436': 'All',
        '258:438': 'Cleanup',
        '258:440': 'Education',
        '258:442': 'Rescues',
      });
      action(c, ['eventsCalendar'], () => c.go('258:614'));
      action(c, ['eventsOrganizer'], () => c.go('564:290'));
      action(c, ['eventsMine'], () => c.go('258:906'));
    } else {
      field(c, '258:571', 'eventSearch', 'Event name or location');
      choices(c, 'eventCategory', {
        '258:1559': 'Cleanup',
        '258:1561': 'Education',
        '258:1563': 'Rescues',
      });
      choices(c, 'eventPeriod', {
        '258:1566': 'Today',
        '258:1568': 'Weekend',
        '258:1570': 'This month',
      });
      b.labels['258:594'] = 'Apply (' + list.length + ')';
      for (const n of [
        '258:1571',
        '258:1573',
        '258:1575',
        '258:1577',
        '258:1578',
        '258:1579',
        '258:1583',
        '258:1584',
      ])
        b.hidden.add(n);
      action(c, ['258:592'], () => {
        for (const k of ['eventCategory', 'eventSearch', 'eventPeriod']) c.setValue(k, '');
        c.go('258:426');
      });
    }
  }
  if (id === '564:290') action(c, ['organizerBack'], c.back);
  if (id === '258:735') {
    const closed = !!selected && (!!selected.ended_at || Date.parse(selected.event_date) <= Date.now());
    Object.assign(b.labels, {
      '258:737': selected?.title || 'Select an event',
      '258:738': selected?.category || '',
      '258:740': eventDate(selected),
      '258:741': selected?.location || '',
      '258:743': selected?.description || '',
      '258:746': owner ? 'You' : 'Community organizer',
      '258:747': '',
      '258:748': selected?.capacity ? selected.capacity + ' places' : 'Open capacity',
      '712:755': '',
      '712:759': '',
      '258:752': owner
        ? 'Manage event'
        : checked
          ? 'View certificate'
          : mine
            ? 'My registration'
            : closed
              ? 'View recap'
              : 'Register for event',
    });
    for (const n of ['712:756', '712:757', '258:749', '258:750']) b.hidden.add(n);
    const image = eventPhotoUrl(selected?.cover_path);
    if (image) b.images['258:763'] = image;
    action(c, ['258:751', '258:752'], () =>
      open(
        selected,
        owner ? '258:1389' : checked ? '258:1450' : mine ? '258:906' : closed ? '1356:3049' : '258:792',
      ),
    );
  }
  if (id === '258:792') {
    b.labels['258:795'] = selected?.title || 'Select an event';
    b.labels['258:796'] = eventDate(selected);
    field(c, '258:800', 'participantName', 'Full name');
    field(c, '258:803', 'participantEmail', 'Email address', {
      value: v.participantEmail ?? c.user?.email ?? '',
      keyboardType: 'email-address',
    });
    field(c, '258:806', 'participantPhone', 'Phone (optional)');
    choices(c, 'role', {
      '258:809': 'Collect waste',
      '258:811': 'Sort recyclables',
      '258:813': 'Take photos',
    });
    action(c, ['258:814', '258:815'], () =>
      c.run(async () => {
        const target = eid();
        const name = required(v.participantName, 'Nhập họ tên.');
        const email = required(v.participantEmail ?? c.user?.email, 'Nhập email.');
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Email chưa hợp lệ.');
        if (!mine) {
          const request = await supabase.from('event_registrations').insert({
            owner_id: c.user!.id,
            event_id: target,
            participant_name: name,
            participant_email: email,
            phone: v.participantPhone || '',
            volunteer_role: v.role || 'Collect waste',
          });
          if (request.error?.code === '23505') {
            const existing = result(
              await supabase
                .from('event_registrations')
                .select('id')
                .eq('event_id', target)
                .eq('owner_id', c.user!.id)
                .maybeSingle(),
            );
            if (!existing) throw new Error('Email này đã đăng ký cho sự kiện.');
          } else result(request);
        }
        c.refresh();
        c.go('258:906');
      }, true),
    );
  }
  if (id === '258:1226') {
    field(c, '258:1235', 'eventName', 'Event name');
    field(c, '258:1254', 'eventDescription', 'Goals and activity details…', { multiline: true });
    choices(c, 'activityType', {
      '258:1239': 'Cleanup',
      '258:1241': 'Education',
      '258:1243': 'Rescues',
    });
    action(c, ['258:1237', '258:1256'], () => pick('eventPhoto'));
    const photo = getPhoto('eventPhoto');
    if (photo) b.images['258:1256'] = photo.uri;
    action(c, ['258:1245', '258:1246'], () =>
      c.run(async () => {
        required(v.eventName, 'Nhập tên sự kiện.');
        c.go('258:1279');
      }, true),
    );
  }
  if (id === '258:1279') {
    field(c, '258:1288', 'eventPlace', 'Location');
    field(c, '258:1291', 'eventDate', 'YYYY-MM-DD');
    field(c, '258:1294', 'eventTime', 'HH:mm');
    field(c, '258:1297', 'duration', 'Duration in minutes', { keyboardType: 'numeric' });
    action(c, ['258:1298', '258:1299'], () =>
      c.run(async () => {
        required(v.eventPlace, 'Nhập địa điểm.');
        const start = eventStart(v.eventDate || '', v.eventTime || '');
        if (start.getTime() <= Date.now()) throw new Error('Chọn một thời điểm trong tương lai.');
        if (
          v.duration &&
          (!Number.isInteger(Number(v.duration)) || Number(v.duration) < 1 || Number(v.duration) > 10080)
        )
          throw new Error('Nhập thời lượng từ 1 đến 10.080 phút.');
        c.go('708:684');
      }),
    );
  }
  if (id === '708:684') {
    Object.assign(b.labels, {
      '708:686': 'Event fundraising',
      '708:699': '',
      '708:702': 'Payment collection is not connected. Continue to prepare your event.',
      '708:707': 'You can publish the event without fundraising.',
    });
    for (const n of ['708:689', '708:691', '708:692', '708:694', '708:695', '708:697']) b.hidden.add(n);
  }
  if (id === '700:264') {
    field(c, '700:273', 'capacity', 'Maximum participants', { keyboardType: 'numeric' });
    field(c, '700:301', 'safety', 'Safety notes', { multiline: true });
    const bring = (v.bring ?? defaultItems.join('|')).split('|').filter(Boolean);
    for (const [i, node] of ['700:276', '700:279', '700:282'].entries()) {
      const item = defaultItems[i];
      b.labels[node] = (bring.includes(item) ? '✓ ' : '') + item;
      action(c, [node], () =>
        c.setValue(
          'bring',
          (bring.includes(item) ? bring.filter((s) => s !== item) : [...bring, item]).join('|'),
        ),
      );
    }
    field(c, '700:294', 'extraItem', 'Add an item');
    b.labels['700:285'] = 'Publish event';
    action(c, ['700:284', '700:285'], () =>
      c.run(async () => {
        const capacity = Number(v.capacity || 0);
        if (!Number.isSafeInteger(capacity) || capacity < 0)
          throw new Error('Số chỗ cần là số nguyên từ 0 trở lên.');
        const start = eventStart(v.eventDate || '', v.eventTime || '');
        if (start.getTime() <= Date.now()) throw new Error('Chọn thời điểm trong tương lai.');
        const created = await withEventPhoto(c.user!.id, getPhoto('eventPhoto'), async (path) =>
          result(
            await createEvent({
              title: required(v.eventName, 'Nhập tên sự kiện.'),
              location: required(v.eventPlace, 'Nhập địa điểm.'),
              description: v.eventDescription || '',
              category: v.activityType || 'Cleanup',
              duration_minutes: v.duration ? Number(v.duration) : null,
              safety: v.safety || '',
              preparation: [...new Set([...bring, ...(v.extraItem?.trim() ? [v.extraItem.trim()] : [])])],
              cover_path: path,
              event_date: start.toISOString(),
              capacity,
            }),
          ),
        );
        if (!created) throw new Error('Chưa tạo được sự kiện.');
        for (const key of [...draftKeys, 'extraItem']) c.setValue(key, '');
        c.setValue('eventId', created.id);
        c.refresh();
        c.go('258:1389');
      }, true),
    );
  }
  if (id === '258:1389') {
    Object.assign(b.labels, {
      '258:1391': selected?.title || 'Your event',
      '258:1392': eventDate(selected),
      '258:1394': String(attendees.length),
      '258:1397': String(attendees.filter((r) => r.status === 'approved').length),
      '258:1400': String(attendees.filter((r) => r.status === 'pending').length),
      '258:1416': 'Show QR or share code',
      '258:1418': selected?.ended_at
        ? 'Event ended'
        : v.endConfirm === selected?.id
          ? 'Confirm end event'
          : 'End event',
    });
    action(c, ['258:1394', '258:1397', '258:1399'], () => c.go('1356:347'));
    action(c, ['258:1415', '258:1416'], () =>
      c.run(async () => {
        const code = result(await supabase.rpc('get_event_checkin_code', { target: eid() }));
        c.setValue('code:' + eid(), String(code));
        c.setValue('codeOpen', 'yes');
      }, true),
    );
    action(c, ['258:1418'], () =>
      c.run(async () => {
        if (!owner || selected!.ended_at) return;
        if (v.endConfirm !== selected!.id) {
          c.setValue('endConfirm', selected!.id);
          return;
        }
        result(await updateEvent(eid(), { ended_at: new Date().toISOString() }));
        c.setValue('endConfirm', '');
        c.refresh();
        c.go('564:290');
      }, true),
    );
    action(c, ['1356:2950'], () => {
      if (!selected) return;
      const date = new Date(selected.event_date);
      for (const [key, value] of Object.entries({
        editName: selected.title,
        editDate: localDateKey(date),
        editTime: localTime(date),
        editPlace: selected.location,
        editCapacity: String(selected.capacity),
      }))
        c.setValue(key, value);
      c.go('564:441');
    });
  }
  if (id === '564:441' && selected) {
    const date = new Date(selected.event_date);
    const edit = (node: string, key: string, placeholder: string, fallback: string) =>
      field(c, node, key, placeholder, { value: v[key] ?? fallback });
    edit('564:464', 'editName', 'Event name', selected.title);
    edit('564:468', 'editDate', 'YYYY-MM-DD', localDateKey(date));
    edit('564:476', 'editTime', 'HH:mm', localTime(date));
    edit('564:484', 'editPlace', 'Location', selected.location);
    edit('564:488', 'editCapacity', 'Capacity', String(selected.capacity));
    b.labels['564:480'] = owner ? 'You' : 'Organizer';
    b.labels['564:472'] = selected.duration_minutes ? selected.duration_minutes + ' minutes' : '—';
    b.labels['564:470'] = 'Duration';
    action(c, ['564:454', '564:456'], () =>
      c.run(async () => {
        const capacity = Number(v.editCapacity ?? selected.capacity);
        if (!Number.isInteger(capacity) || capacity < 0) throw new Error('Số chỗ không hợp lệ.');
        result(
          await updateEvent(eid(), {
            title: required(v.editName ?? selected.title, 'Nhập tên sự kiện.'),
            event_date: eventStart(
              v.editDate ?? localDateKey(date),
              v.editTime ?? localTime(date),
            ).toISOString(),
            location: required(v.editPlace ?? selected.location, 'Nhập địa điểm.'),
            capacity,
          }),
        );
        c.refresh();
        c.go('258:1389');
      }, true),
    );
  }
  if (id === '1356:347' || id === '258:978') {
    Object.assign(b.labels, {
      '1356:392': selected?.title || '',
      '1356:393': eventDate(selected),
      '258:980': selected?.title || '',
      '258:981': owner ? attendees.length + ' registrations' : 'Your participation',
    });
    field(c, '258:983', 'participantSearch', 'Search participants');
  }
  if (id === '258:1135') {
    b.labels['258:1137'] = selected?.title || 'Select an event';
    b.labels['258:1138'] = eventDate(selected);
    field(c, '258:1146', 'checkinCode', 'Enter the check-in code');
    action(c, ['258:1139', '258:1140'], () =>
      c.run(async () => {
        const target = eid();
        const attendance = result(
          await recordEventCheckIn(target, required(v.checkinCode, 'Nhập mã do người tổ chức cung cấp.')),
        );
        c.setValue('checkedEvent', target);
        c.setValue('attendanceId', String(attendance));
        c.setValue('checkinCode', '');
        c.refresh();
        c.go('258:1177');
      }, true),
    );
  }
  if (id === '258:1078') b.labels['258:1105'] = selected?.title || 'Group chat';
  if (id === '258:1177' || id === '258:1450') {
    const certificate = checked?.id || (v.checkedEvent === v.eventId ? v.attendanceId : '') || '';
    Object.assign(b.labels, {
      '258:1184': selected?.title || '',
      '258:1185': checked ? new Date(checked.created_at).toLocaleString() : 'Attendance recorded',
      '258:1188': certificate,
      '258:1460': mine?.participant_name || 'Participant',
      '258:1462': selected?.title || '',
      '258:1463': eventDate(selected),
      '258:1467': 'Event organizer',
      '258:1468': certificate,
      '258:1470': 'View my events',
    });
    action(c, ['258:1470'], () => c.go('258:906'));
    action(c, ['258:1472'], () =>
      c.run(async () => {
        await shareText(
          [mine?.participant_name, selected?.title, eventDate(selected), certificate]
            .filter(Boolean)
            .join('\n'),
        );
      }),
    );
  }
  if (id === '258:1500') {
    choices(c, 'enjoyed', { '258:1506': 'Organization', '258:1508': 'Teamwork', '258:1510': 'Impact' });
    choices(c, 'again', { '258:1516': 'Definitely', '258:1518': 'Maybe', '258:1520': 'Next time' });
    field(c, '258:1513', 'feedback', 'What made this event memorable?', { multiline: true });
    action(c, ['258:1522'], () =>
      c.run(async () => {
        const rating = Number(v.rating);
        if (!rating) throw new Error('Chọn số sao trước khi gửi.');
        result(await submitEventFeedback(eid(), rating, v.feedback || '', v.enjoyed || '', v.again || ''));
        c.go('1356:3049');
      }, true),
    );
  }
  if (id === '1356:310') {
    const k = 'recap:' + v.eventId + ':';
    field(c, '1356:3014', k + 'body', 'Write your recap', { multiline: true });
    field(c, '1356:3038', k + 'kg', 'Waste collected (kg)', { keyboardType: 'numeric' });
    field(c, '1356:3041', k + 'recycled', 'Recyclable waste (kg)', { keyboardType: 'numeric' });
    b.labels['1356:2958'] = selected?.title || '';
    b.labels['1356:2959'] = eventDate(selected);
    b.labels['1356:3043'] = String(attendees.filter((r) => r.status === 'approved').length);
    b.labels['1356:3045'] = selected?.duration_minutes ? String(selected.duration_minutes / 60) : '—';
    b.labels['1356:3016'] = (v[k + 'body'] || '').length + ' / 1000';
    action(c, ['1356:3009', '1356:3010'], () => pick(k + 'photo'));
    const photo = getPhoto(k + 'photo');
    if (photo) b.images['1356:3009'] = photo.uri;
    action(c, ['1356:344', '1356:345'], () =>
      c.run(async () => {
        const body = required(v[k + 'body'], 'Nhập nội dung tổng kết.');
        if (body.length > 1000) throw new Error('Tối đa 1.000 ký tự.');
        const kg = v[k + 'kg'] ? Number(v[k + 'kg']) : null,
          recycled = v[k + 'recycled'] ? Number(v[k + 'recycled']) : null;
        if (
          (kg !== null && (!Number.isFinite(kg) || kg < 0)) ||
          (recycled !== null && (!Number.isFinite(recycled) || recycled < 0 || kg === null || recycled > kg))
        )
          throw new Error('Kiểm tra khối lượng tổng và tái chế.');
        await withEventPhoto(c.user!.id, photo, async (path) =>
          result(
            await createEventRecap(eid(), body, {
              total_kg: kg,
              recyclable_kg: recycled,
              photo_path: path,
            }),
          ),
        );
        for (const f of ['body', 'kg', 'recycled', 'photo']) c.setValue(k + f, '');
        c.refresh();
        c.go('1356:3049');
      }, true),
    );
  }
  if (id === '1356:3049') {
    const recap = recaps.find((r) => r.event_id === selected?.id);
    Object.assign(b.labels, {
      '1356:3059': selected?.title || 'Event recap',
      '1356:3060': eventDate(selected),
      '1431:269': recap?.body || 'No recap published yet.',
      '1356:3077': owner ? String(attendees.filter((r) => r.status === 'approved').length) : '—',
      '1356:3078': selected?.duration_minutes ? String(selected.duration_minutes / 60) : '—',
      '1356:3121': recap?.total_kg == null ? '—' : recap.total_kg + ' kg',
      '1356:3122': recap?.recyclable_kg == null ? '—' : recap.recyclable_kg + ' kg',
    });
    if (!checked) {
      for (const n of ['1356:3057', '1356:3058', '1431:272', '1431:273']) b.hidden.add(n);
    }
  }
}
