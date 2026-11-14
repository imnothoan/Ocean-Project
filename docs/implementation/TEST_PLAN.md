# Test plan

## Automated checks

- `npm run typecheck`
- `npx expo-doctor`
- `npx expo export --platform web`

## Functional cases

1. Load home with Supabase configured and with an unavailable table.
2. Submit a report with valid and invalid fields.
3. Request camera permission and scan a QR code.
4. Load events and submit a registration.
5. Load impact metrics and render chart values.
6. Submit a donation with validation and backend error handling.
7. Search and open every inventory entry.

## Current limitation

No unit/e2e test runner is installed yet. Expo Go device-level testing and screenshot comparison remain pending.
