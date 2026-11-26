> Historical record. The current handoff and verified limitations are in [CODEX_HANDOFF.md](./CODEX_HANDOFF.md). The current per-frame inventory is [FIGMA_SCREEN_INVENTORY.md](./FIGMA_SCREEN_INVENTORY.md).

# Screen acceptance matrix

| Area | Catalog entries | Dedicated implementation evidence | Functional evidence | Visual evidence | Status |
|---|---:|---:|---:|---:|---|
| Report flow | 19 | 12 reachable states | Report unit tests and local build | 0 | PARTIAL |
| Data and donate | 22 | Shared renderer variants | Local build only | 0 | PARTIAL |
| Event flow | 23 | Shared renderer variants | Local build only | 0 | PARTIAL |
| Community and gamification | 28 | Community Feed, Post Detail, and Create Post now have dedicated reachable screens; remaining entries use shared variants | Local build and publish-form path | Reference and 393x852 app captures saved; comparison remains manual | PARTIAL |
| Map and admin | 25 | Shared renderer variants | Local build only | 0 | PARTIAL |

The 116-entry catalog is navigation metadata and is not itself acceptance evidence. No screen is marked visually verified without a Figma reference and an application screenshot comparison.
