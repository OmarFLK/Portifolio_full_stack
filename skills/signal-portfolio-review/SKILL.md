---
name: signal-portfolio-review
description: Audit changes to Omar Saliba's React portfolio for visual-DNA drift, generic AI-generated UI patterns, content accuracy, responsive behavior, accessibility, motion safety, mobile bundle isolation, and production readiness. Use before merging redesigns, adding sections, changing motion or 3D, updating portfolio content, or preparing a release.
---

# Signal Portfolio Review

Protect the portfolio's "engineering in edit mode" identity while verifying that every change remains truthful, usable, light on mobile, and deployable.

## Review workflow

1. Read `../../docs/design-dna.json`, `../../docs/design-plan.md`, `../../docs/animation-map.md`, and `references/acceptance-checklist.md`.
2. Inspect the current diff and nearby implementation. Preserve unrelated user changes.
3. Trace any changed claim back to `../../src/data/portfolio.ts` or the latest curriculum. Flag invented dates, metrics, roles, clients, outcomes, or placeholder content.
4. Review desktop and mobile as different compositions. Essential content must stay in the central reading flow; gutters may contain only decorative art.
5. Verify capability gates before approving any Three.js, Lenis, canvas, sequence, or scroll-linked effect. Mobile, coarse pointer, Save-Data, weak hardware, and reduced motion need a complete static path.
6. Check semantics, keyboard operation, focus, contrast, targets, headings, dialog behavior, hash navigation, reflow, and horizontal overflow.
7. Run the smallest relevant validation first, then the full project commands when preparing a release:

   ```text
   npm run lint
   npm run typecheck
   npm run test
   npm run build
   npm run test:e2e
   ```

8. Capture representative screenshots at 375x812, 768x1024, 1440x900, and 1920x1080. Inspect them rather than relying only on DOM assertions.
9. Score the dimensions in the checklist. Do not approve a dimension below 8/10 without a concrete technical constraint and remediation path.

## Decision rules

- Keep ink, paper, signal yellow, amber, and neutral grays as the dominant system.
- Reject aquatic motifs, dominant blue/cyan, magenta escape gradients, repeated SaaS cards, excessive pills, generic glass panels, random icons, and identical section rhythm.
- Treat bounding boxes, torn paper, system notices, scribbles, liquid metal, and the star as semantic accents with controlled frequency.
- Text and links must work before motion. Decorative visuals are `aria-hidden` and cannot block pointer input.
- Never hide a heavy mobile import with CSS. Confirm through network entries that the chunk was not requested.
- Prefer event-driven rendering and cleanup over continuous animation loops.
- Do not deploy, push, merge, or rewrite history as part of an audit unless the user explicitly authorizes it.

## Report format

Lead with the verdict, then list:

1. blocking defects;
2. visual-DNA drift;
3. content or accessibility risks;
4. measured validation evidence;
5. score table;
6. precise recommended fixes.

Distinguish confirmed findings from inferences. Link to local files and line numbers when possible.
