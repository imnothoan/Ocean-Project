# Known issues

1. Figma MCP tools are not available in this session; the browser can inspect the shared file but cannot retrieve per-frame design context or assets.
2. Figma Prototype view requires an authenticated Figma account and cannot be tested from the anonymous session.
3. `App.tsx` still contains the original core screens and should be extracted into feature modules.
4. The 116-entry catalog is coverage metadata, not proof of 116 pixel-perfect implementations.
5. Supabase policies are intentionally permissive for the personal prototype and require hardening before production.
6. There is no automated test suite or real-device Expo Go test evidence yet.
