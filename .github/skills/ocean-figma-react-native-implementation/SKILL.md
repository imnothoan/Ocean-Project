---
name: ocean-figma-react-native-implementation
description: Use whenever the task is to build, fix or review any mobile screen or component (including the bottom Tab bar) of Ocean Project that must match a Figma design. Forces exact extraction of Figma values (colors, gradients, fonts, spacing, assets, prototype flows) and native React Native + Expo Go implementation with screenshot-based verification. Never invent visuals.
---

# Ocean Project: Figma -> React Native (Expo Go, mobile only)

## Product target (non-negotiable)

- The ONLY target is a native phone app running in **Expo Go on an iPhone 11** (logical viewport 414 x 896 pt, @2x, bottom safe-area inset 34 pt, top inset 44 pt).
- Do NOT build web or desktop UI. Do NOT use Expo Web output as evidence that a screen is correct.
- Figma frames are phone frames. Use their exact width/height as the reference and scale responsively only with flex/percentages derived from the frame, never with invented sizes.

## Core rule

**The Figma file is the single source of truth. The existing code is NOT.**
If existing code disagrees with Figma, the existing code is wrong, even if it "looks fine". Do not defend, preserve or "improve" visual decisions that were not extracted from Figma. Never create your own palette, icon set, layout or style.

If a value cannot be read from Figma, STOP and report it as `UNKNOWN`. Ask the user. Do not guess, and do not fill the gap with a "reasonable default".

## Prerequisites

1. Confirm the Figma MCP server is connected (tools such as `get_design_context`, `get_screenshot`, `get_variable_defs` are available). If not, stop and tell the user how to enable it. Do not continue from memory or from a described screenshot.
2. You need a Figma URL with `node-id` for every frame. Extract `fileKey` and `nodeId` (`101-2721` -> node `101:2721`).
3. Check Expo SDK version in `package.json` and which libraries are already installed.

## Required workflow (per screen or component)

### Step 1 - Identify
- Record Figma `fileKey`, `nodeId` and frame name.
- Find the exact corresponding screen/component in the repo. Do not guess the mapping. State the file path.

### Step 2 - Extract from Figma (before writing any code)
Call, in this order: `get_design_context`, `get_screenshot`, `get_variable_defs` (if available), and fetch every asset returned by the server.
Then write a **Spec Sheet** (in your reply or a scratch file) containing:

| Category | What to record |
|---|---|
| Layout | Frame size, every container's x/y/width/height, padding, gap, alignment, auto-layout direction, constraints |
| Color | Every fill as exact hex + opacity. Variable/token names if present |
| Gradients | Type, **angle/handle positions**, **every color stop with exact position (0-1) and alpha**. Never reduce to 2 colors |
| Typography | Font family, weight, size, line-height, letter-spacing, text-align, text color, text transform |
| Shape | Corner radii (each corner if different), border width/color/alpha |
| Effects | Drop/inner shadows (x, y, blur, spread, color, alpha), layer blur, background blur, blend modes |
| Assets | Every image, SVG, icon, illustration: node ID, file name, size, which element uses it |
| States | Default/pressed/active/disabled/selected variants, if present in Figma |
| Prototype | Every interaction on the frame: trigger, action, destination frame, transition (navigate, overlay/modal, back, scroll-to, etc.) |

If the MCP output does not expose prototype interactions, list them as `UNKNOWN` and ask the user for the flow. Do not invent navigation.

### Step 3 - Defect list (only when fixing an existing screen)
Compare the current implementation with the Figma screenshot and list concrete defects, for example: "background is flat #0A2540, Figma is 3-stop gradient 180deg #..". Group by: color/gradient, typography, spacing/geometry, shadow/blur, assets/icons, interaction.

### Step 4 - Implement with native React Native
- Use `View`, `Text`, `Pressable`, `ScrollView`, `FlatList`, `Image`, `StyleSheet`. No `<div>`, no CSS, no Tailwind classes copied from MCP output. The MCP often returns React + Tailwind: treat it only as a description of the design and translate it to React Native styles.
- Map Figma values to the project's theme/tokens file. If a token does not exist, **add it with the exact Figma value**. Do not round or "normalize" values.
- Preserve backend, auth, data layer, navigation architecture and business logic. Change only the presentation layer unless the Figma prototype demands a navigation change.
- Keep changes scoped to the screen(s) under work. Do not touch unrelated screens.

### Step 5 - Verify
See "Verification" below. A screen is not done until verified.

## Expo Go compatibility rules

Only use what runs in Expo Go (no custom native modules, no dev-client-only libs).
Libraries that ship with Expo Go and are the correct choice here:

- Gradients: `expo-linear-gradient`
- Blur / glass: `expo-blur` (`BlurView`)
- SVG: `react-native-svg` (render Figma SVG assets as exported)
- Gradient text / masking: `@react-native-masked-view/masked-view` together with `expo-linear-gradient`
- Animation/gestures: `react-native-reanimated`, `react-native-gesture-handler`
- Safe area: `react-native-safe-area-context`
- Fonts: `expo-font` (`useFonts`) with the exact font files from Figma, or the matching `@expo-google-fonts/*` package

Before adding any dependency: use `npx expo install <pkg>` (never a random version) and confirm it is in the Expo Go bundled module list for the project's SDK. If it is not, do not add it; find an Expo Go compatible way or report the limitation.
Never add an icon pack. **All icons come from the Figma payload.**

## Gradients (most common failure)

- Never replace a Figma gradient with a flat color or a 2-color approximation.
- Use `LinearGradient` with `colors`, `locations` (all stops) and `start`/`end`.
- Convert the Figma/CSS angle to `start`/`end` using the real box size (w, h). For CSS-style angle theta (0deg = to top, clockwise), with L = |w*sin(theta)| + |h*cos(theta)|:
  - start = { x: 0.5 - (L/2)*sin(theta)/w, y: 0.5 + (L/2)*cos(theta)/h }
  - end   = { x: 0.5 + (L/2)*sin(theta)/w, y: 0.5 - (L/2)*cos(theta)/h }
  - Sanity check: 0deg -> start (0.5, 1) end (0.5, 0); 90deg -> start (0, 0.5) end (1, 0.5).
  - For diagonal angles the points can fall outside 0-1 (e.g. 45deg on a 300x600 box gives start (-0.25, 0.875), end (1.25, 0.125)). That is correct, keep the values unclamped.
- Stops with alpha -> use `rgba()` colors. Keep stop positions exactly.
- Radial/angular/diamond gradients are not supported by `LinearGradient`. Use the exported SVG/PNG asset from Figma or an SVG gradient (`react-native-svg`). Do not approximate with linear.
- Gradient strokes/borders: use a gradient-filled outer view with an inner view inset by the border width, or SVG. Do not drop the gradient border.

## Typography

- Load the exact fonts before rendering (`useFonts`, keep splash screen visible until loaded). Never fall back to the system font silently.
- Map Figma weight to the actual font file (e.g. a separate family name per weight). Do not rely on `fontWeight` with custom fonts.
- Set `fontSize`, `lineHeight`, `letterSpacing` from Figma. Convert Figma percentage letter-spacing to points (percent x fontSize).
- Disable unwanted OS font scaling for fixed-design text (`allowFontScaling={false}`) unless the design explicitly supports it.

## Shadows and effects

- iOS: `shadowColor`, `shadowOffset`, `shadowOpacity`, `shadowRadius` (Figma blur ~= 2 x shadowRadius; derive opacity from the color alpha).
- Android: `elevation` is only an approximation; keep it, and note the limitation. The test device is iPhone, so iOS fidelity is the acceptance criterion.
- Background blur: `BlurView` with `intensity` tuned to the Figma blur value plus the Figma tint overlay color. Do not skip the tint.
- Multiple shadows in Figma: layer several wrapper views. Do not drop the extras.

## TAB BAR (high priority, the user's custom design)

The bottom Tab bar is custom-designed in Figma. The default navigator tab bar is **forbidden**.

1. Treat the Tab bar as its own frame. Get its node ID, run the full Step 2 extraction and write its Spec Sheet **before** touching code.
2. Implement it as a custom component and plug it in via the navigator's `tabBar` prop (React Navigation: `tabBar={(props) => <OceanTabBar {...props} />}`; Expo Router `<Tabs tabBar={(props) => <OceanTabBar {...props} />}>`).
3. Do not style the built-in bar with `tabBarStyle`/`tabBarActiveTintColor` as a substitute for the custom design.
4. Reproduce exactly: overall height, width and horizontal margins, corner radii, floating vs docked position and its offset from the bottom, background fill/gradient/blur, border, shadows, item spacing, icon size, label font/size/weight, gap between icon and label.
5. Active / inactive states: use the exact Figma variants (icon file for each state, color, label color, background pill/indicator, glow, scale). If a state is not drawn in Figma, report `UNKNOWN`, do not invent it.
6. Icons: use the Figma SVG/PNG assets for every tab and every state. No `@expo/vector-icons`, no emoji, no substitute icons.
7. Center/raised/special buttons (if any): implement as designed, with their own geometry and shadow.
8. Safe area: the Figma tab bar height does not include the iPhone home indicator. Add `useSafeAreaInsets().bottom` per the Figma bottom spacing, and ensure screen content has bottom padding so it is not hidden behind the bar.
9. Transitions: implement only the tab-switch animation visible in the prototype. If none is specified, use no animation rather than inventing one.
10. Keep route names, tab order and `navigation.navigate` behavior identical to the existing navigation architecture. Only the presentation changes.

## Forbidden

- Replacing gradients with solid colors; reducing multi-stop gradients to fewer stops.
- Inventing colors, fonts, icons, illustrations, spacings or layouts.
- Using generic cards, generic icons or placeholder images where Figma has specific ones.
- "Simplifying" a complex layout.
- Adding web/desktop layouts or relying on Expo Web screenshots as proof.
- Adding icon libraries or non-Expo-Go native modules.
- Declaring success without a screenshot comparison.
- Changing unrelated screens, backend, auth, security behavior or navigation structure.
- Mass-converting many screens before the calibration screen(s) are reviewed by the user.

## Verification (required before saying "done")

1. Run `npx tsc --noEmit` (or the project's typecheck script) and the project's lint/test scripts if present. Report real results.
2. Run the app with Expo and confirm it starts without red-screen errors or missing-module warnings in Expo Go.
3. Obtain a **real Expo Go screenshot** of the screen:
   - If you can access a device/simulator, capture it yourself.
   - If you cannot, you must **not** claim visual success. Mark the screen as `NOT VISUALLY VERIFIED`, and ask the user to send an iPhone 11 Expo Go screenshot of that screen next to the Figma frame.
4. Compare screenshot vs the Figma `get_screenshot` image on: layout/proportions, gradient direction and stops, colors, fonts/weights, icon/asset identity, radii, shadows/blur, spacing, active states, Tab bar details.
5. List every remaining mismatch. Fix and repeat until differences are only unavoidable platform limits (state them explicitly).
6. Verify each prototype interaction listed in the Spec Sheet works (navigate, modal, back, gesture, state change).

## Calibration-first rule

Start with ONE representative screen plus the Tab bar. Stop and report. Do not proceed to remaining screens until the user (or an independent reviewer) confirms the calibration screens match Figma. Afterwards, repeat the same verified process screen by screen. Reuse components and tokens already proven correct.

## Final report format

For each screen/component:
- Figma file key, node ID, frame name
- Repo files changed
- Exact tokens and assets used (hex values, gradient stops, font files, asset names)
- Screenshot comparison evidence (or `NOT VISUALLY VERIFIED` + what is needed)
- Remaining visual mismatches or `UNKNOWN` values
- Real typecheck/test/runtime results
