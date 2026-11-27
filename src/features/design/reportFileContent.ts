export type ExportRow = [string, string, string];
export type ExportFormat = 'CSV' | 'PDF' | 'PNG';
function html(text: string) {
  return text.replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!,
  );
}
export function reportHtml(title: string, rows: ExportRow[]) {
  return (
    '<!doctype html><html><head><meta charset="utf-8"><title>' +
    html(title) +
    '</title><style>body{font:16px system-ui;color:#123041;padding:24px}h1{color:#0186a8}td,th{padding:9px;border-bottom:1px solid #d3e5e8;text-align:left}table{border-collapse:collapse;width:100%}</style></head><body><h1>' +
    html(title) +
    '</h1><table><thead><tr><th>Date</th><th>Activity</th><th>Result</th></tr></thead><tbody>' +
    rows
      .map((row) => '<tr>' + row.map((cell) => '<td>' + html(cell) + '</td>').join('') + '</tr>')
      .join('') +
    '</tbody></table></body></html>'
  );
}
export function reportCsv(rows: ExportRow[]) {
  const cell = (value: string) =>
    '"' +
    (/^[\t\r\n =+@-]/.test(value) && !/^-?\d+(\.\d+)?$/.test(value) ? "'" : '') +
    value.replace(/"/g, '""') +
    '"';
  return (
    '\uFEFF' +
    [['Date', 'Activity', 'Result'], ...rows].map((row) => row.map(cell).join(',')).join('\r\n')
  );
}
