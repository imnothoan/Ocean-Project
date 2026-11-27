import type { ComponentRef, RefObject } from 'react';
import type { View } from 'react-native';
import { reportCsv, reportHtml, type ExportFormat, type ExportRow } from './reportFileContent';
function download(blob: Blob, name: string) {
  const href = URL.createObjectURL(blob),
    link = document.createElement('a');
  link.href = href;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(href), 30000);
}
export async function exportReport(
  format: ExportFormat,
  title: string,
  rows: ExportRow[],
  _preview?: RefObject<ComponentRef<typeof View> | null>,
) {
  if (format === 'CSV') {
    download(new Blob([reportCsv(rows)], { type: 'text/csv;charset=utf-8' }), 'ocean-impact.csv');
    return;
  }
  if (format === 'PDF') {
    const frame = document.createElement('iframe');
    frame.style.cssText = 'position:fixed;width:1px;height:1px;opacity:0;pointer-events:none';
    await new Promise<void>((resolve) => {
      frame.onload = () => resolve();
      frame.srcdoc = reportHtml(title, rows);
      document.body.appendChild(frame);
    });
    frame.contentWindow?.focus();
    frame.contentWindow?.print();
    setTimeout(() => frame.remove(), 60000);
    return;
  }
  const canvas = document.createElement('canvas');
  canvas.width = 920;
  const context = canvas.getContext('2d');
  if (!context) throw new Error('PNG export is unavailable.');
  context.font = '20px sans-serif';
  const lines: string[] = [];
  for (const row of rows) {
    let line = '';
    for (const word of row.filter(Boolean).join(' · ').split(/\s+/)) {
      if (line && context.measureText(line + ' ' + word).width > 820) {
        lines.push(line);
        line = '';
      }
      line += (line ? ' ' : '') + word;
    }
    lines.push(line, '');
  }
  canvas.height = 135 + lines.length * 29;
  context.fillStyle = '#fff';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = '#0186a8';
  context.font = 'bold 32px sans-serif';
  context.fillText(title, 38, 56, 842);
  context.font = '20px sans-serif';
  context.fillStyle = '#263f4c';
  lines.forEach((line, i) => context.fillText(line, 38, 106 + i * 29, 840));
  const blob = await new Promise<Blob | null>((done) => canvas.toBlob(done, 'image/png'));
  if (!blob) throw new Error('Could not create image.');
  download(blob, 'ocean-impact.png');
}
