# Test strategy

## Automated checks

- `npm run typecheck` validates strict TypeScript compilation.
- `npm test` runs Vitest unit tests.
- `npx expo-doctor` validates Expo configuration and dependency compatibility.
- `npx expo export --platform web` validates the web bundle as a smoke check only.

## Current coverage

The report submission orchestration has mocked unit coverage for validation, authentication gating, evidence persistence, and rollback. Authenticated remote RLS, Storage, device camera behavior, and per-screen interaction coverage remain unverified.
