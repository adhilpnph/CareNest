---
name: custom-ui-skill
description: Apply my custom visual design rules whenever building or editing UI such as web pages, React/Next.js components, CSS, landing pages, dashboards, or HTML artifacts.
---

# Custom UI Style

## Rules
- **No purple.** Avoid purple, violet, indigo, and lavender, including gradients and Tailwind classes like `purple-*`, `violet-*`, `indigo-*`. Use blue, green, teal, orange, red, or neutrals.
- **Sharp corners only.** Buttons, cards, inputs, and modals use `border-radius: 0` (Tailwind: `rounded-none`). No `rounded-*`, no pill shapes.
- **Keep it simple.** Use plain HTML/CSS or the existing stack. Add no new libraries, abstractions, or animations unless asked.

## Workflow
1. Check the existing project styles and reuse them.
2. Build the UI following the rules above.
3. Before finishing, scan the code for `rounded`, `border-radius`, and purple/violet/indigo values, and fix any matches.

## Pitfalls
- Component libraries (shadcn, MUI) ship rounded defaults. Override them.
- Focus rings and shadows can reintroduce purple or rounded edges. Check them.