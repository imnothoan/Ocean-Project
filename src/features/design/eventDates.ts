import type { OceanEvent } from '../../lib/supabase';

export function localDateKey(date: Date) {
  return [
    String(date.getFullYear()).padStart(4, '0'),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('-');
}

export function eventStart(date: string, time: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) {
    throw new Error('Nhập ngày YYYY-MM-DD và giờ HH:mm.');
  }
  const start = new Date(date + 'T' + time);
  if (!Number.isFinite(start.getTime()) || localDateKey(start) !== date || localTime(start) !== time) {
    throw new Error('Ngày hoặc giờ sự kiện không hợp lệ.');
  }
  return start;
}

export function localTime(date: Date) {
  return String(date.getHours()).padStart(2, '0') + ':' + String(date.getMinutes()).padStart(2, '0');
}

export function calendarMonth(selected: Date, events: OceanEvent[]) {
  const year = selected.getFullYear();
  const month = selected.getMonth();
  const first = new Date(year, month, 1);
  const leading = (first.getDay() + 6) % 7;
  const days = new Date(year, month + 1, 0).getDate();
  const monthEvents = events
    .filter((event) => {
      const date = new Date(event.event_date);
      return date.getMonth() === month && date.getFullYear() === year;
    })
    .sort((a, b) => Date.parse(a.event_date) - Date.parse(b.event_date));
  const selectedEvents = monthEvents.filter(
    (event) => new Date(event.event_date).getDate() === selected.getDate(),
  );
  const otherEvents = monthEvents.filter(
    (event) => new Date(event.event_date).getDate() !== selected.getDate(),
  );
  return {
    leading,
    days,
    selectedEvents,
    otherEvents,
    markedDays: new Set(monthEvents.map((event) => new Date(event.event_date).getDate())),
  };
}
