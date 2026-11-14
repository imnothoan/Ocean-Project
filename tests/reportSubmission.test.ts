import { describe, expect, it, vi } from 'vitest';
import { submitReport } from '../src/features/reports/reportSubmission';
import { buildEvidencePath, validateReportDraft } from '../src/features/reports/reportValidation';

const draft = { category: 'pollution' as const, title: 'Rác nhựa', location: 'Cầu cảng' };

function dependencies(overrides: Partial<Parameters<typeof submitReport>[1]> = {}) {
  const report = { id: 'report-1', owner_id: 'user-1', ...draft, status: 'submitted', created_at: new Date().toISOString() };
  return {
    getUser: vi.fn(async () => ({ user: { id: 'user-1' }, error: null })),
    createReport: vi.fn(async () => ({ data: report, error: null })),
    readEvidence: vi.fn(async () => ({ blob: new Blob(['image'], { type: 'image/jpeg' }), error: null })),
    uploadEvidence: vi.fn(async () => null),
    saveEvidence: vi.fn(async () => null),
    removeEvidence: vi.fn(async () => undefined),
    deleteReport: vi.fn(async () => undefined),
    createId: vi.fn(() => 'report-1'),
    ...overrides
  };
}

describe('report validation', () => {
  it('rejects missing description and location', () => {
    expect(validateReportDraft({ ...draft, title: '' })).toContain('mô tả');
    expect(validateReportDraft({ ...draft, location: '' })).toContain('vị trí');
  });

  it('builds a user and report scoped evidence path', () => {
    expect(buildEvidencePath('user-1', 'report-1', 'photo.png')).toBe('user-1/report-1/evidence.png');
  });
});

describe('report submission', () => {
  it('rejects unauthenticated submissions before creating a report', async () => {
    const deps = dependencies({ getUser: vi.fn(async () => ({ user: null, error: null })) });
    const result = await submitReport(draft, deps);
    expect(result.error?.message).toContain('signed in');
    expect(deps.createReport).not.toHaveBeenCalled();
  });

  it('uploads evidence and persists its metadata', async () => {
    const deps = dependencies();
    const result = await submitReport({ ...draft, photoUri: 'file:///photo.jpg' }, deps);
    expect(result.error).toBeNull();
    expect(deps.uploadEvidence).toHaveBeenCalledWith('user-1/report-1/evidence.jpeg', expect.any(Blob));
    expect(deps.saveEvidence).toHaveBeenCalledWith(expect.objectContaining({ report_id: 'report-1', owner_id: 'user-1' }));
  });

  it('rolls back the report and uploaded evidence after persistence failure', async () => {
    const deps = dependencies({ saveEvidence: vi.fn(async () => new Error('database unavailable')) });
    const result = await submitReport({ ...draft, photoUri: 'file:///photo.jpg' }, deps);
    expect(result.error?.message).toBe('database unavailable');
    expect(deps.removeEvidence).toHaveBeenCalledWith('user-1/report-1/evidence.jpeg');
    expect(deps.deleteReport).toHaveBeenCalledWith('report-1', 'user-1');
  });
});
