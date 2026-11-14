# Component inventory

## Implemented reusable components

- `Header`, `Card`, `Pill`: core application surfaces in `App.tsx`.
- `ScreenCatalogScreen`, `FlowDetailScreen`: inventory navigation in `src/screens/FlowScreens.tsx`.
- `FlowFrame`, `Field`, `MetricCard`, `SuccessCard`: shared flow primitives for report, event, donation and community states.
- `CameraView` QR scanner: report location capture.
- Supabase repository functions: reports, events, metrics, registrations and donations.

## Required next extraction

The remaining refactor should move the existing `App.tsx` screen implementations into feature folders without changing behavior:

- `src/features/home`
- `src/features/reports`
- `src/features/events`
- `src/features/data`
- `src/features/donations`
- `src/features/community`
- `src/features/profile`

No component is considered pixel-perfect until its running screenshot has been compared with its Figma frame.
