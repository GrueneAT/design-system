# Execution: Such-Vorlage (Suchfeld + Ergebnis-Overlay) im Design System

**Started:** 2026-06-11
**Status:** complete
**Branch:** issue/26

## Execution Log

- [x] Task 1: `.gat-search*`-CSS-Familie in src/design-system.css — commit 4092cbe
  - Inserted the new family after the v2.2 toolbar block, before the HC block.
  - Composed only on existing `--gat-*` tokens; added HC overrides for the family.
  - Built CSS committed together with the source (atomic, self-consistent commit).
- [x] Task 2: gat-search.js ESM-Verhaltensmodul (engine-neutral) — commit 394cae2
  - `createSearch()` with open/close/focus/destroy/setQuery/refresh.
  - ARIA combobox/listbox/option + aria-activedescendant, arrow-key nav, Enter/ESC.
  - Native `<dialog>` modal focus-trap + returnFocus + body scroll lock.
  - Debounce with generation race-guard; AbortSignal passed; null ignored.
  - Default renderer escapes title via textContent; cancelable CustomEvents.
  - No import side effects (SSR-safe); no Barlow/font strings.
  - Deviation: see [Rule 1] below (resolveEl default-param document access).
- [x] Task 3: Dokumentierter Pagefind-Adapter (optionales Beispiel) — commit 93d9530
  - `pagefindAdapter()` lazy-loads the consumer bundle, no double debounce,
    maps to the slot schema, null passthrough, try/catch silent fallback.
- [x] Task 4: Showcase in index.html (beide Varianten + Dummy-Adapter) — commit 28177be
  - `#gat-search` section with inline-overlay + modal/Strg+K variants.
  - In-memory dummy adapter; no Pagefind binding; TOC entry added.
  - Verified built CSS unaffected by index.html edits (only existing classes used).
- [x] Task 5: Build + gebautes CSS committen (CI-Drift-Gate) — commits 4092cbe + dc062a8
  - Task 1 committed the built CSS atomically with the source. During the final
    self-check the drift gate flagged a real difference: Tailwind v4 scans ALL
    project files (incl. `.js`), and `gat-search.js`'s `toLowerCase()` makes the
    scanner emit a `.lowercase` utility. Since gat-search.js did not exist yet
    when Task 1 built the CSS, the committed output was stale by one utility.
  - Fix: rebuilt with all v2.3 sources present and committed (dc062a8). The
    build is now idempotent and `git diff --exit-code design-system.css` is
    clean — CI drift gate green. The `.gat-search*` classes are in the built CSS.
- [x] Task 6: Release v2.3.0 — CHANGELOG, MIGRATION, version bump — commit 1ea9365
  - package.json 2.2.0 -> 2.3.0; CHANGELOG [2.3.0] Added block; MIGRATION
    v2.2 -> v2.3 section + TOC. design-spec JSON version (1.0) untouched.
- [x] Task 7: Consumer-Doku im README (Such-Helfer-Abschnitt) — commit 12bab3c
  - "Such-Helfer (ES-Modul)" section: import, minimal example, modal variant,
    slot schema, XSS note, engine-is-consumer + adapter link + follow-up refs.

## Verification Results

**Per-task `<verify>` blocks:** all passed (BUILD_OK, CHECKS_OK, ADAPTER_OK,
SHOWCASE_OK, DRIFT_CLEAN, RELEASE_OK, README_OK).

**Final suite:**
- `npm run build` -> exit 0.
- `git diff --exit-code design-system.css` -> clean (CI drift gate green).
- `gat-search.js` + `examples/pagefind-adapter.js` import in Node with no side
  effects; exports present.
- Required `.gat-search*` classes present in the built `design-system.css`.
- `#gat-search` showcase present; `package.json` version = 2.3.0.
- No `Barlow`/font string in the module or adapter.
- No literal `pagefind` (lowercase) in `index.html` (matches the
  "no pagefind in showcase" gate); only an in-memory dummy adapter is wired.

**Tooling note:** the build environment defaults to `NODE_ENV=production`,
which makes pnpm/npm skip devDependencies (incl. the Tailwind CLI). Builds were
run with `NODE_ENV=development npm ci && NODE_ENV=development npm run build`.
GitHub Actions runs with the default `NODE_ENV` and installs devDependencies
normally — no workflow change needed. The locked Tailwind CLI (4.3.0, from
package-lock.json) was used, matching CI.

## Deviations from Plan

### Auto-fixed (Rules 1-3)

1. **[Rule 1 - Bug] `resolveEl` default-param touched `document` at call time**
   - Found during: Task 2 (Node smoke test).
   - Issue: `function resolveEl(ref, root = document)` evaluated the `document`
     default even when `ref` was nullish, producing a misleading
     "document is not defined" error instead of the intended
     "`input` ist erforderlich" guard message under SSR/Node.
   - Fix: changed to `function resolveEl(ref, root)` with `(root || document)`
     used only after the early `if (!ref) return null` short-circuit, so the
     guard message is correct and no `document` is touched for nullish refs.
   - Files: gat-search.js. Folded into commit 394cae2.

### Blocked (Rule 4)

None.

## Discovered Issues

- **Pre-existing CSS drift at branch base (resolved by this work):** the
  committed `design-system.css` on the issue/26 base was already stale relative
  to a fresh `npm run build` (the build now emits a `.backdrop-filter` utility +
  `@property` declarations that the committed file lacked). CI's
  `git diff --exit-code design-system.css` would already have been red on this
  base. The Task 1 rebuild+commit resolves it; the build is idempotent.
- **Pre-existing capitalized "Pagefind" prose in the `.gat-mark` section**
  (index.html ~lines 1618/1632) is unrelated to this issue and left untouched.
  The literal lowercase `pagefind` gate is clean; no Pagefind integration is
  wired in the showcase.

## Self-Check

- [x] All files from the plan exist (src + built CSS, gat-search.js,
      examples/pagefind-adapter.js, index.html, CHANGELOG, MIGRATION,
      package.json, README).
- [x] All recorded commit hashes exist on the branch.
- [x] Full verification suite passes (build, drift gate, ESM imports, greps).
- [x] No stubs / TODOs / placeholders (the "placeholder" hits are the input
      placeholder label, not stub markers).
- [x] No leftover debug code (no console.log/debugger).
- **Result:** PASSED

**Completed:** 2026-06-11
**Commits:** 7 implementation/build + 2 docs
- 4092cbe — feat(search): .gat-search overlay + modal CSS family (+ built CSS)
- 394cae2 — feat(search): gat-search.js engine-neutral behaviour module
- 93d9530 — docs(search): optional Pagefind adapter example
- 28177be — docs(search): search showcase in index.html
- 1ea9365 — chore(release): v2.3.0 (CHANGELOG/MIGRATION/version)
- 12bab3c — docs(search): README Such-Helfer section
- dc062a8 — chore(build): rebuild design-system.css with all v2.3 sources
- 9960d75 + (this) — docs(issues): execution log
