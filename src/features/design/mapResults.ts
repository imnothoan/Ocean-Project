import type { OceanEvent, OceanReport } from '../../lib/supabase';
import { matchesQuery } from './communityView';
import { parseReportCoordinates, type Coordinates } from './reportLocation';
import type { Values } from './workflow';

export type MapItem = {
  id: string;
  kind: 'report' | 'event';
  title: string;
  location: string;
  date: string;
  category: string;
  status: string;
  severity: string;
  photo?: string;
  distance?: number;
};
function distanceKm(a: Coordinates, b: Coordinates) {
  const rad = Math.PI / 180,
    lat = (b.latitude - a.latitude) * rad,
    lon = (b.longitude - a.longitude) * rad;
  const h =
    Math.sin(lat / 2) ** 2 +
    Math.cos(a.latitude * rad) * Math.cos(b.latitude * rad) * Math.sin(lon / 2) ** 2;
  return 12742 * Math.asin(Math.sqrt(Math.min(1, h)));
}
export function mapItems(
  reports: OceanReport[],
  events: OceanEvent[],
  v: Values,
  now = Date.now(),
): MapItem[] {
  const here = parseReportCoordinates(v.mapOrigin || '');
  const categories = (v.mapCategories || '').split('|').filter(Boolean);
  const severity = (v.mapSeverity || '').split('|').filter(Boolean);
  const reportRows: MapItem[] = reports.map((r) => ({
    id: r.id,
    kind: 'report',
    title: r.title,
    location: r.location,
    date: r.created_at,
    category:
      r.category === 'animal'
        ? 'Marine wildlife'
        : r.details?.waste?.split('|').join(', ') || 'Pollution',
    status: r.status,
    severity: r.details?.severity || '',
    photo: r.report_evidence?.[0]?.storage_path,
  }));
  const eventRows: MapItem[] = events
    .filter((e) => !e.ended_at && Date.parse(e.event_date) >= now)
    .map((e) => ({
      id: e.id,
      kind: 'event',
      title: e.title,
      location: e.location,
      date: e.event_date,
      category: e.category || 'Cleanup',
      status: 'planned',
      severity: '',
      photo: e.cover_path || undefined,
    }));
  return [...reportRows, ...eventRows]
    .map((row) => {
      const point = parseReportCoordinates(row.location);
      return { ...row, distance: here && point ? distanceKm(here, point) : undefined };
    })
    .filter(
      (row) =>
        matchesQuery(v.mapSearch || '', row.location, row.title, row.category, row.status, row.kind) &&
        (!v.mapDays || Math.abs(now - Date.parse(row.date)) <= Number(v.mapDays) * 86400000) &&
        (!v.mapRadius || (row.distance != null && row.distance <= Number(v.mapRadius))) &&
        (!v.mapStatus || row.status === v.mapStatus) &&
        (!categories.length ||
          categories.some((cat) =>
            cat === 'Event' ? row.kind === 'event' : matchesQuery(cat, row.category),
          )) &&
        (!severity.length ||
          severity.includes(row.severity) ||
          (['High', 'Critical'].includes(row.severity) && severity.includes('Urgent'))),
    )
    .sort((a, b) =>
      v.mapSort === 'distance'
        ? (a.distance ?? Infinity) - (b.distance ?? Infinity)
        : Math.abs(Date.parse(a.date) - now) - Math.abs(Date.parse(b.date) - now),
    );
}
