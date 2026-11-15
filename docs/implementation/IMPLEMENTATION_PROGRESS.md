# Implementation progress

Updated: 2026-11-15

## Latest environment update

- Expo SDK upgraded from 54 to 58 (`expo ~58.0.25`, React Native `0.88.1`) to match the installed Expo Go SDK 58 client.
- `npm run typecheck`, `npm test`, `npx expo-doctor`, and `npx expo export --platform web` pass after the upgrade.
- Supabase URL and the compatible anon JWT are available only in ignored `.env.local`; the provided `sb_publishable_*` value is not accepted by this project's REST endpoint, while the anon JWT is accepted.
- The project anon JWT now verifies successfully against Supabase REST (`events`, HTTP 200) and Auth settings (`HTTP 200`). The profile shell now reflects the live Supabase session and supports sign-out.

## Honest status

- Figma entries accounted for in the current inventory: 116 catalog entries.
- Figma entries individually inspected through design context: selected frames including Mood Board `59:2155`, Leaderboard `238:299`, Community Feed `101:2769`, and Events Home `258:426`; full 116-frame audit remains incomplete.
- Figma layer/group names inspected in browser: High-Fidelity groups and visible child names.
- Actual feature UI implemented: core home/report/events/data/profile plus specialized flow renderers.
- Generic catalog-only entries: still present and not counted as complete.
- Functionally tested: typecheck/build and Supabase REST table reads; no device-level evidence.
- Visually verified: selected runtime screenshots only; full per-frame verification remains incomplete.
- Blocked: complete 116-frame audit, native device verification, and Prototype interaction coverage.

## Recent verified batches

- Leaderboard `238:299`: refined period tabs, podium, current-rank card, Near me control, and Community rankings; the running Expo web screen was inspected against the Figma screenshot.
- Notifications: inbox now loads authenticated rows from Supabase, marks persisted notifications read, and retains an explicit demo fallback for empty/unconfigured states.
- Settings: Notification Settings and Account Settings now have dedicated responsive controls with AsyncStorage persistence rather than generic alert-only actions.
- Certificates: donation and event certificate screens now use the native Share API; download actions explicitly disclose the remaining document-storage dependency.

## Independent QA and code audit

Audit basis: direct source inspection, catalog-to-file tracing, a fresh Figma browser attempt, and fresh project checks. Route count and the catalog itself were not treated as implementation evidence.

| Metric | Evidence-based result | Coverage |
|---|---|---:|
| Design inspection coverage | Selected frames opened through Figma design context; full frame-by-frame audit remains incomplete. | Partial |
| Actual UI implementation coverage | 12 entries have dedicated reachable UI states: the 9 report-entry states plus report history, notification inbox and notification detail. The other catalog entries resolve to grouped/generic renderers or shared app surfaces. | 12/116 (10.3%) |
| Functional test coverage | No test files or test runner exists in `package.json`; typecheck, Expo export and Expo Doctor validate build health, not per-screen behavior. | 0/116 (0%) |
| Visual verification coverage | Selected runtime screens were compared against retrieved Figma screenshots; full per-frame verification remains incomplete. | Partial |
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
- Report batch 9: `1. Report type`, `2. Pollution Add Photo`, and `3. Pollution Select Location` now use `src/features/reports/ReportEntryFlow.tsx` with category validation, recorded-photo state, manual location entry and real reports insertion. Camera/QR capture is intentionally disabled in the shared web runtime until a platform-specific implementation is added.
- Report batch 10: `4. Pollution Severity`, `5. Pollution Waste Type`, and `6. Pollution More Detail` now have a dedicated classification step with persisted submission data.
- Report batch 11: `7. Pollution Review`, `8. Pollution Submitted`, and `16. Report Status Tracker` now have a review confirmation, real Supabase insert, submitted state and tracker UI.
- Report batch 13: rare species type/photo/location/review and report history/edit/follow-up/resolved now have dedicated stateful UI flows with validation, review summaries and explicit action feedback.
- Map/Admin batch 14: all remaining Q-screen catalog entries now have distinct operational configurations for map layers, locations, moderation, assignments, habitats, alerts, partners and audit states rather than sharing one fallback message.
- Community/Gamification batch 15: Leaderboard now follows the Figma metadata structure with period tabs and a top-contributors podium; Challenge Detail, Badge Detail, Comments and Likes have dedicated reachable screens.
- Donation backend batch 16: donation notes now persist through final confirmation, payment review displays the selected amount, certificate navigation is wired, and the `donations.note` column plus constraint are applied remotely.
- Event backend batch 17: participant approval/rejection now persists in `event_registrations.status`, organizer-only RLS policies are applied remotely, and the Event Admin screen loads and updates real registration rows.
- Community backend batch 18: Community Feed now loads the latest public posts from Supabase with a safe empty-state fallback while preserving the dedicated Figma-aligned feed layout.
- Report backend batch 19: Edit Report now loads the current authenticated report and persists owner-scoped changes through Supabase; the report update RLS policy is applied remotely.

## Current verification

- `npm run typecheck`: pass after removing the shared-runtime Expo Camera import.
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

## Current session evidence

- Figma session connected successfully; mood board frame `59:2155` was inspected through design context and exported to `visual-evidence/figma-mood-board-59-2155.png`.
- The extracted palette was synchronized into `src/theme/tokens.ts` and the app shell palette.
- Authenticated-only guards were added to event registration and donation creation. Matching RLS policies are present in both schema sources.
- `tsconfig.json` now excludes generated `dist` and dependency files so typecheck does not depend on stale export artifacts.
- Verified after changes: `npm run typecheck`, `npm test` (5 tests), `npx expo-doctor` (18/18), and `npx expo export --platform web`.
- Expo web runtime loaded successfully with no camera worker error after removing `expo-camera` imports from the shared app runtime. Physical device camera behavior remains unverified.
- The Figma mood board and app home screenshots are evidence artifacts, not a same-frame comparison; visual verification remains `0`.
- High-Fidelity community frames `101:2769` (Community Feed), `105:2895` (Post Details), and `115:422` (Create Post) were inspected with design context. Dedicated React Native screens were added for all three, including local navigation between feed, detail, and create states.
- Event frame `258:426` (Events Home) was inspected with design context and implemented as a dedicated responsive Expo screen with local assets, search/filter interactions, remote event loading, featured-event navigation, and campaign cards. Event Detail remains reachable from the featured and event cards.
- Event frame `258:792` (Event Registration) was inspected and added as a reachable form from Event Detail, with required-field validation, selectable contribution type, Supabase registration submission, and explicit error handling.
- Event frame `258:614` (Event Calendar) was inspected and added as a catalog-reachable calendar view with event dates, selected event days, and event cards using local Figma assets.
- Event frame `258:842` (Event Checklist) was inspected and added as a reachable interactive preparation checklist with persisted local state for five items, progress feedback, safety reminder, and completion gating.
- Event frame `258:906` (My Event) was inspected and added as a catalog-reachable view for registered, recommended, and past activities using local Figma assets.
- Event frame `258:1135` (Event Check-in) was inspected and added as a reachable code-entry flow with validation, submission feedback, and local event imagery.
- Event frame `258:1177` (Event Check-in Completed) was inspected and added as a reachable completion state with participant ID, daily goal, certificate action, and explicit feedback.
- Event frame `258:1500` (Event Feedback) was inspected and added as a reachable rating and feedback form with selectable experience options, validation, and submission feedback.
- Event frame `258:1450` (Event Certificate) was inspected and added as a catalog-reachable contribution certificate view with download/share actions and certificate metadata.
- Event frames `258:978` (Event Participants) and `258:1078` (Event Group Chat) were inspected and added as reachable participant search/messaging and local group-chat flows with message composition.
- Event frame `1356:3049` (Event Recap) was inspected and added as a reachable post-event recap with impact metrics, local memory gallery assets, certificate action, and feedback action.
- Event frame `258:516` (Events Search Filter) and create-event frames `258:1226`, `258:1279`, `708:684`, and `700:264` now route through dedicated responsive filter/wizard UI with required-field validation and step progress. Backend draft persistence and administration screens remain outstanding.
- Event administration frames for organizer home, event management, participant approval, and recap posting now have dedicated interactive screens with approval state and publish feedback; server persistence for those actions is still pending.
- Event check-in and feedback now persist authenticated user actions through `event_checkins` and `event_feedback` tables with ownership RLS and repository helpers.
- Event group chat now loads and sends messages through `event_messages` with authenticated insert and participant read policies, while retaining a visible local fallback when no remote messages exist.
- Organizer recap publishing now persists authenticated updates through `event_recaps` with RLS and required-content validation.
- Data & Donate entries now use an analytics/campaign-specific dashboard renderer with period filters and activity charts; Map & Admin entries now use an interactive map-style renderer with area filters and live-sync metrics instead of the previous generic placeholder.
- Community & Gamification entries now use a learning/rewards/community-specific renderer with progress cards, actionable content rows, and saved journey interaction instead of the previous generic card.
- Remaining Report Flow states now use dedicated status, notification, history, review, and rare-species content patterns with selectable state and explicit next-step feedback.
- Figma frame `258:1279` was re-inspected; Create Event Step 2 now matches the reference structure with location/map preview, date, time, duration selectors, progress indicator, and primary Continue action.
- Create Event Step 3 was re-inspected from Figma frame `708:684`; the donation form now includes the 75% progress state, QR preview card, QR action, explanatory note, Continue, and Skip actions. Edit Event also has a dedicated editable form.
- Figma frame `700:264` was re-inspected; Create Event Step 4 now implements maximum participants, removable preparation items, add-item interaction, safety notes, and Preview event CTA.
- Figma frame `258:1226` was re-inspected; Create Event Step 1 now includes the event image asset between activity type and description, matching the designed hierarchy.
- The Create Event wizard now persists its draft across catalog navigation with AsyncStorage and clears the draft after successful Supabase event creation.
- Edit Event now loads the current event target and updates title, location, and capacity through an owner-scoped Supabase repository method.
- Figma donation frames `1581:1359`, `1581:1458`, and `1581:1601` now route through dedicated React Native Campaigns, Campaign Detail, and Donate screens. The flow includes campaign filtering, progress presentation, amount selection, anonymous donations, optional notes, and Supabase persistence.
- Figma frame `1335:4425` (`Q - 42`) now has a dedicated Verify Report moderation lesson flow for image, location, and severity checks.
- Donation frames `1581:1655`, `1581:1711`, and `1581:1764` now have dedicated Payment Method, Confirmation, and Success states with selectable payment methods and connected navigation.
- Donation frames `1581:1806`, `1581:1860`, `1581:1920`, and `1581:1986` now have dedicated Campaign Updates, Impact Report, Donation History, and Donation Certificate states.
- Report frames `230:1402`, `1249:216`, `230:2075`, and `230:2052` now have dedicated submitted, status tracker, notification inbox, and notification detail screens.
- Pollution report entry states now use a dedicated wizard for report type, waste type, severity, and additional detail instead of the generic report renderer.
- Community/Gamification now has dedicated Leaderboard, Challenges, Badge Collection, and Learning Quiz screens with progress, selection, and quiz interactions.
- Figma frames `1335:4572` and `1335:4756` now use dedicated Create Event and Safety & Rescue training lesson screens.
- Map/Admin grouped rendering now provides distinct operational variants for live cleanup, hotspots, area administration, verification queue, and community actions instead of identical content across Q-screens.
- Data/Donate analytics now provide per-frame configurations for donors, area metrics/comparison, waste composition, trends, rankings, export, eco history, impact, campaign stats, heatmap, and community dashboard states.
- Community/Gamification contextual states now have distinct configurations for points history, rewards, reward detail, notifications, notification settings, account settings, help center, and project information.
- Event Participants now loads registered participant names from Supabase when available, retaining seeded presentation data only as a no-data fallback.
- Event Recap now loads the latest organizer update from Supabase and renders it above the local memory gallery.
- The remote Supabase migration was applied and verified: owner-scoped report/history/notification/evidence policies, authenticated event/donation writes, private evidence storage policies, and `community_posts` now exist. No production rows were reset or deleted.
