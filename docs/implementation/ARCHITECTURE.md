# Architecture

## Current runtime

- Expo SDK 54 with React Native and TypeScript.
- The app currently uses a small state-driven shell in `App.tsx` rather than a navigation package.
- Supabase access is isolated in `src/lib/supabase.ts`; feature validation and report submission orchestration live under `src/features/reports/`.
- Design tokens are centralized in `src/theme/tokens.ts`.

## Boundaries

- UI screens own presentation state and user interaction.
- Domain validation is kept outside screens.
- Supabase operations derive ownership from `supabase.auth.getUser()` rather than accepting owner IDs from callers.
- Service-role credentials and database passwords are not valid client configuration.

## Known architectural gap

The catalog still routes many entries through shared flow renderers. Those entries are not considered individual Figma implementations until their frame-specific composition and behavior are implemented and verified.
