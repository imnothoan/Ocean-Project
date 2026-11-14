# Implementation progress

Updated: 2026-11-14

## Honest status

- Figma entries accounted for in the current inventory: 116 catalog entries.
- Figma entries individually inspected through design context: 0 (MCP unavailable).
- Figma layer/group names inspected in browser: High-Fidelity groups and visible child names.
- Actual feature UI implemented: core home/report/events/data/profile plus specialized flow renderers.
- Generic catalog-only entries: still present and not counted as complete.
- Functionally tested: typecheck/build and Supabase REST table reads; no device-level evidence.
- Visually verified: 0.
- Blocked: per-frame visual audit and Prototype interaction due Figma access limitations.

## Independent QA and code audit

Audit basis: direct source inspection, catalog-to-file tracing, a fresh Figma browser attempt, and fresh project checks. Route count and the catalog itself were not treated as implementation evidence.

| Metric | Evidence-based result | Coverage |
|---|---|---:|
| Design inspection coverage | No individual frame opened through design context. The browser remained at Figma `Password required` after the provided password submission. Group/layer names only were available. | 0/116 (0%) |
| Actual UI implementation coverage | 12 entries have dedicated reachable UI states: the 9 report-entry states plus report history, notification inbox and notification detail. The other catalog entries resolve to grouped/generic renderers or shared app surfaces. | 12/116 (10.3%) |
| Functional test coverage | No test files or test runner exists in `package.json`; typecheck, Expo export and Expo Doctor validate build health, not per-screen behavior. | 0/116 (0%) |
| Visual verification coverage | No Figma screenshot comparison was possible. | 0/116 (0%) |
| Backend integration coverage | 4 entry-level screens have direct backend operations in their dedicated UI: report submission, report history, notification inbox and notification detail. Existing event/donation/data operations are present in grouped renderers but are not evidence of per-frame implementation. | 4/116 (3.4%) |

### Audit findings

- The previous `Batch 12 completed` wording is accurate for the code batch, but it does not mean the three Figma entries are visually verified or independently tested.
- `FlowDetailScreen` dispatches most of the remaining 104 catalog entries into four generalized renderers. This is explicitly partial and must not be counted as 104 implemented screens.
- `ScreenCatalogScreen` is navigation metadata, not implementation coverage.
- `ReportHistoryScreens.tsx` has live queries and read-state mutation, but its notification/report mapping cannot be verified against Figma without frame metadata.
- There are no automated unit, integration, navigation, upload, authentication, or device tests.
- Supabase schema changes are present locally, but this audit did not claim they were applied to the remote project.

### Recalculated completion

Using the five metrics above, the conservative implementation state is **10.3% actual UI coverage**, **0% functional-test coverage**, **0% visual verification**, and **3.4% entry-level backend integration**. A single overall completion percentage would hide these gaps and is therefore not reported.

### Highest-priority next task

Implement a real testable report backend slice before expanding more screens: authenticated report ownership, evidence upload to Supabase Storage, persisted status-history writes, and automated tests for validation/repository behavior. This closes the highest-risk functional gap in the only currently dedicated multi-step workflow.

## Secure report vertical slice

### Audit findings addressed

- Before this batch, report submission used `createReport` without checking `supabase.auth.getUser()`, and RLS allowed anonymous reads/inserts.
- Camera capture only stored a boolean in `ReportEntryFlow`; no Storage upload or evidence metadata existed.
- `report_status_history` was queryable but had no insert/update trigger, so the tracker could fall back to fabricated local display data.
- Notifications were readable and writable by anonymous users.

### Implemented

- `src/features/reports/reportValidation.ts`: shared title/location/evidence validation and user/report-scoped Storage paths.
- `src/features/reports/reportSubmission.ts`: dependency-injected submission orchestration with authenticated-user check, MIME/10 MB validation, evidence metadata persistence, and cleanup of uploaded object/report on partial failure.
- `src/lib/supabase.ts`: production adapters for authenticated report creation, private Storage upload, evidence persistence and ownership-scoped reads.
- `src/features/reports/ReportEntryFlow.tsx`: passes the actual captured URI into submission instead of a local boolean.
- `supabase/schema.sql` and `supabase/migrations/20261114000000_secure_reports.sql`: owner/evidence columns, private `report-evidence` bucket, Storage/RLS policies, ownership-scoped report/history/notification policies, and database-side status-history trigger.
- `tests/reportSubmission.test.ts`: five mocked unit tests for validation, unauthenticated submission, evidence success and rollback.

### Verification

- `npm run typecheck`: passed.
- `npm test`: passed, 1 test file / 5 tests.
- Remote migration application: **not verified**; the migration must still be applied to the Supabase project.
- Real Storage/RLS integration: **not verified**; mocked tests do not prove remote policy behavior.
- Expo Go camera/upload and device testing: **not verified**.
- Figma visual comparison: **not verified**.

## Completed batch

- Added centralized design tokens.
- Added audit, inventory, database, test and known-issues documentation.
- Added specialized report, event, donation, data/admin and community flow renderers.
- Added Supabase Auth sign-in/sign-up UI and service with validation/loading/error states.
- Added Supabase registration and donation repository operations.
- Kept Expo SDK dependencies aligned and verified Expo Doctor.
- Added centralized tokens and the required forensic/design/test documentation.
- Latest batch checks: `npm run typecheck` passed, `npx expo-doctor` passed 18/18 checks, and Expo web export passed.
- Report batch 9: `1. Report type`, `2. Pollution Add Photo`, and `3. Pollution Select Location` now use `src/features/reports/ReportEntryFlow.tsx` with category validation, camera capture, QR/manual location and real reports insertion.
- Report batch 10: `4. Pollution Severity`, `5. Pollution Waste Type`, and `6. Pollution More Detail` now have a dedicated classification step with persisted submission data.
- Report batch 11: `7. Pollution Review`, `8. Pollution Submitted`, and `16. Report Status Tracker` now have a review confirmation, real Supabase insert, submitted state and tracker UI.

## Current verification

- `npm run typecheck`: pass after fixing the Expo Camera import.
- `npx expo export --platform web`: pass after the report review/tracker change.
- Supabase REST: existing reports/events/metrics tables previously returned HTTP 200.
- Exact Figma node IDs/design context and screenshot comparison remain blocked; these screens are not visually verified.

## Batch 12 completed

- Added `ReportHistoryScreen` with live `reports` query and per-report status timeline.
- Added `NotificationInboxScreen` and notification detail state with read/unread updates.
- Added Supabase repository functions for report status history and notifications.
- Added `report_status_history` and `notifications` tables plus read/update policies to `supabase/schema.sql`.
- Added Home entry points for report history. Notification inbox remains available through the feature shell while the Figma navigation mapping is blocked.
- Verification: `npm run typecheck` passed; `npx expo export --platform web` passed.
- Figma visual verification remains blocked by unavailable frame-level MCP context and Prototype authentication.

## Next batch

1. Apply `supabase/migrations/20261114000000_secure_reports.sql` remotely and verify authenticated/RLS/Storage behavior with staging users.
2. Add authenticated status-management endpoint/function for administrative transitions; ordinary users currently cannot change status.
3. Add notification read-state tests and an authenticated session-expiry/device test.
4. Continue with the remaining Data/Donate and Event batches.
5. Re-run per-frame Figma inspection when authenticated MCP/design context is available.
