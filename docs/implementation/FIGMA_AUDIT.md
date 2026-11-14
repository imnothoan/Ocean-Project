# Figma audit

## Source

- File: Hoan - OP - Copilot Code
- Page audited: High-Fidelity
- Source URL: the password-protected Figma URL supplied by the user
- Audit date: 2026-11-14

## Verified structure

The High-Fidelity page exposes these top-level groups in the accessible layer tree:

1. Map & Admin - 25 Screens
2. Report Flow - 19 Screens
3. Data & Donate & Logo - 22 Screens
4. Event Flow - 23 Screens
5. Community & Gamification - 27 Screens

The labels' numeric suffixes do not match every visible child count. The inventory therefore uses each visible frame/layer name rather than trusting the suffix.

## Prototype limitation

Prototype view was opened. Figma displayed a “Sign up for Figma” dialog before the prototype could be interacted with. The anonymous browser session cannot verify prototype connections. Figma also reported a connection issue while opening the file sidebar during the latest audit. No prototype behavior is marked as verified because of this limitation.

## Visual system evidence

The Mood Board shows an ocean palette built around deep navy, turquoise/aqua, white surfaces, coral accents and photography of water/coastlines. The first implementation of these tokens is in [`src/theme/tokens.ts`](../../src/theme/tokens.ts). Exact font family and per-frame measurements remain NOT_INSPECTED because Dev Mode/design context access is unavailable in the anonymous session.
