# Design tokens

These are the shared tokens extracted from the accessible Mood Board and the recurring High-Fidelity visual language. They are intentionally centralized so later frame-by-frame refinement does not require editing every screen.

| Token | Value |
|---|---|
| Navy | `#0D2B45` |
| Ocean blue | `#087EA4` |
| Aqua | `#B9F2F4` |
| Mint surface | `#E8FAF7` |
| Ink | `#17324D` |
| Muted text | `#6E8494` |
| Divider | `#DDEBEF` |
| Coral accent | `#FF7A68` |

Implementation: [`src/theme/tokens.ts`](../../src/theme/tokens.ts).

Typography currently uses the platform sans-serif fallback for Expo Go reliability. The exact Figma font family must be confirmed through Figma Dev Mode before loading a custom font.
