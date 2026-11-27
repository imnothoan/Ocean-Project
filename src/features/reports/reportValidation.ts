export type ReportPhoto = { uri: string; mime?: string };
export const maxReportPhotos = 3;

export type ReportDraft = {
  category: 'pollution' | 'animal' | 'recycle';
  title: string;
  location: string;
  photos?: ReportPhoto[];
  photoUri?: string;
  photoMime?: string;
  details?: Record<string, string>;
};

export function validateReportDraft(draft: ReportDraft) {
  if (draft.photos && draft.photos.length > maxReportPhotos) return 'Mỗi báo cáo có thể đính kèm tối đa 3 ảnh.';
  if (!draft.title.trim()) return 'Hãy mô tả ngắn gọn điều bạn quan sát được.';
  if (draft.title.trim().length < 3) return 'Mô tả cần có ít nhất 3 ký tự.';
  if (!draft.location.trim()) return 'Nhập vị trí hoặc quét QR trước khi gửi.';
  if (draft.location.trim().length < 2) return 'Vị trí cần có ít nhất 2 ký tự.';
  return null;
}

export function buildEvidencePath(userId: string, reportId: string, fileName = 'capture.jpg', index = 0) {
  const extension = fileName.toLowerCase().match(/\.(jpg|jpeg|png|webp)$/)?.[1] ?? 'jpg';
  return `${userId}/${reportId}/evidence${index ? '-' + (index + 1) : ''}.${extension}`;
}
