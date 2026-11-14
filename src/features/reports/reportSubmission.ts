import { buildEvidencePath, type ReportDraft, validateReportDraft } from './reportValidation';

type User = { id: string };
type ReportRecord = { id: string; owner_id: string; category: ReportDraft['category']; title: string; location: string; status: string; created_at: string };

export type ReportSubmissionDeps = {
  getUser: () => Promise<{ user: User | null; error: Error | null }>;
  createReport: (report: ReportRecord) => Promise<{ data: ReportRecord | null; error: Error | null }>;
  readEvidence: (uri: string) => Promise<{ blob: Blob; error: Error | null }>;
  uploadEvidence: (path: string, blob: Blob) => Promise<Error | null>;
  saveEvidence: (record: { report_id: string; owner_id: string; storage_path: string; content_type: string; byte_size: number }) => Promise<Error | null>;
  removeEvidence: (path: string) => Promise<void>;
  deleteReport: (id: string, ownerId: string) => Promise<void>;
  createId: () => string;
};

export async function submitReport(draft: ReportDraft, deps: ReportSubmissionDeps) {
  const validationError = validateReportDraft(draft);
  if (validationError) return { data: null, error: new Error(validationError) };

  const { user, error: userError } = await deps.getUser();
  if (userError || !user) return { data: null, error: userError ?? new Error('You must be signed in to submit a report.') };

  const reportId = deps.createId();
  const record = { id: reportId, owner_id: user.id, category: draft.category, title: draft.title.trim(), location: draft.location.trim(), status: 'submitted', created_at: new Date().toISOString() };
  const { data: report, error: reportError } = await deps.createReport(record);
  if (reportError || !report) return { data: null, error: reportError ?? new Error('Report could not be created.') };

  let uploadedPath: string | null = null;
  try {
    if (draft.photoUri) {
      const { blob, error: readError } = await deps.readEvidence(draft.photoUri);
      if (readError) throw readError;
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(blob.type) || blob.size > 10 * 1024 * 1024) {
        throw new Error('Evidence must be JPG, PNG or WebP and smaller than 10 MB.');
      }
      uploadedPath = buildEvidencePath(user.id, reportId, `capture.${blob.type.split('/')[1]}`);
      const uploadError = await deps.uploadEvidence(uploadedPath, blob);
      if (uploadError) throw uploadError;
      const evidenceError = await deps.saveEvidence({ report_id: reportId, owner_id: user.id, storage_path: uploadedPath, content_type: blob.type, byte_size: blob.size });
      if (evidenceError) throw evidenceError;
    }
    return { data: report, error: null };
  } catch (error) {
    if (uploadedPath) await deps.removeEvidence(uploadedPath);
    await deps.deleteReport(reportId, user.id);
    return { data: null, error: error instanceof Error ? error : new Error('Report submission failed.') };
  }
}
