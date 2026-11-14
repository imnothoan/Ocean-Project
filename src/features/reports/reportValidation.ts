export type ReportDraft = {
  category: 'pollution' | 'animal' | 'recycle';
  title: string;
  location: string;
  photoUri?: string;
};

export function validateReportDraft(draft: ReportDraft) {
  if (!draft.title.trim()) return 'Hãy mô tả ngắn gọn điều bạn quan sát được.';
  if (draft.title.trim().length < 3) return 'Mô tả cần có ít nhất 3 ký tự.';
  if (!draft.location.trim()) return 'Nhập vị trí hoặc quét QR trước khi gửi.';
  if (draft.location.trim().length < 2) return 'Vị trí cần có ít nhất 2 ký tự.';
  return null;
}

export function buildEvidencePath(userId: string, reportId: string, fileName = 'capture.jpg') {
  const extension = fileName.toLowerCase().match(/\.(jpg|jpeg|png|webp)$/)?.[1] ?? 'jpg';
  return `${userId}/${reportId}/evidence.${extension}`;
}
