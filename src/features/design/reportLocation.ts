export type Coordinates = { latitude: number; longitude: number };
export type ReportLocationProps = { location: string; onPick?: (point: Coordinates) => void; onLocate?: () => void };

export function parseReportCoordinates(location: string): Coordinates | undefined {
  const parts = location.trim().match(/^(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)$/);
  if (!parts) return;
  const latitude = Number(parts[1]);
  const longitude = Number(parts[2]);
  if (Math.abs(latitude) <= 90 && Math.abs(longitude) <= 180) return { latitude, longitude };
}

export function formatCoordinates(point: Coordinates) {
  return point.latitude.toFixed(5) + ', ' + point.longitude.toFixed(5);
}
