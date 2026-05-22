# Plan: Kernkomponenten und Layout-System

<objective>
What this plan accomplishes: Extends `design-system/design-system.css` with the
component layer of the Grüne-AT Design System — Header/Navigation, layout grid,
typography classes, buttons, cards, and CD design elements (underline, highlight,
"Störer" badge) — all as pure-CSS `gat-`-prefixed classes built strictly on the
existing `--gat-` token set from issue #3.

Why it matters: Issue #3 delivered the token vocabulary. Issue #5 (style-guide
showcase) and every consuming Grüne-AT tool need a stable, reusable component
layer. This issue is the contract those consumers code against.

Scope IN: component CSS selectors appended below the existing `:root`; a small
clearly-commented supplementary `--gat-` token block (radius/border/container/
breakpoint) to close the token gap; the Google-Fonts `@import`; copying the logo
SVG into the repo under a URL-safe name.
Scope OUT: any JavaScript; filling `index.html` with component markup (issue #5);
a native light logo variant (CSS recolor is the chosen solution per RESEARCH.md).
</objective>

<strategy>
The token base from issue #3 is complete and stable, so this is purely additive:
append a flat, single-class component layer below the existing `:root`. The one
real design tension is the logo — the delivered SVG is monochrome dark green
(`#2d793c`) and would vanish on the dark-green header (D-5). Resolution: copy the
SVG into the repo under a URL-safe name and recolor it to white via CSS `mask` +
`background-color`, so no second asset file is needed.

Strategic options considered:
- Layout engine: CSS Grid for the 2D page/container raster, Flexbox for 1D
  component-internal axes (header row, nav, button groups). Grid-only cannot do
  linear wrap cleanly; Flexbox-only cannot do equal-height column rasters. The
  Grid+Flexbox split is the chosen, uncontentious approach.
- Token gap: issue #3 deliberately tokenized only the CD vocabulary, so there is
  no radius/border/container/breakpoint token. Rather than hardcode `4px` in
  components (an acceptance-criterion violation), Task 1 adds a small, clearly
  commented `--gat-` supplementary block. Chosen over hardcoding.
- Logo recolor: CSS `mask` + `background-color` chosen over `filter:
  brightness(0) invert(1)` — `mask` is the cleaner token-driven path and lets the
  white come from `--gat-color-weiss`.

Key decision points: all six locked decisions D-1…D-6 are honored (gat- prefix,
logo asset, `@import` fonts, dark SVG + CSS recolor, dark-green header, Störer in
both yellow and magenta). Responsiveness is achieved with `repeat(auto-fit,
minmax())`, `flex-wrap`, and `clamp()` plus a minimal set of `max-width` media
queries — no JavaScript anywhere.
</strategy>

<skills>
No workspace skills found (`.claude/skills/` does not exist). None to inject.
</skills>

<context>
Issue: @.issues/core-components-layout/ISSUE.md
Research: @.issues/core-components-layout/RESEARCH.md
Decisions: @.issues/core-components-layout/CONTEXT.md

Repo-path note: issue artifacts live at `/workspace/.issues/core-components-layout/`
but the edit target is the separate git clone at `/workspace/design-system/`.
All file edits in this plan are inside `/workspace/design-system/`.

<interfaces>
<!-- Executor: use these contracts directly. Do not explore the codebase. -->

INPUT CONTRACT — existing tokens in design-system/design-system.css :root
(issue #3, already present, unchanged). Components must reference ONLY these:

  /* Farb-Primitive */
  --gat-color-dunkelgruen: #257639;
  --gat-color-hellgruen:   #56af31;
  --gat-color-gelb:        #ffed00;
  --gat-color-magenta:     #e6007e;
  --gat-color-weiss:       #ffffff;
  --gat-color-anthrazit:   #1d1d1b;
  /* Farb-Semantik (Aliase) */
  --gat-color-primary;       /* -> dunkelgruen */
  --gat-color-secondary;     /* -> hellgruen   */
  --gat-color-accent;        /* -> magenta     */
  --gat-color-highlight;     /* -> gelb        */
  --gat-color-text;          /* -> anthrazit   */
  --gat-color-surface;       /* -> weiss       */
  --gat-color-on-primary;    /* -> weiss   (Text auf Dunkelgrün, 5,63:1) */
  --gat-color-on-secondary;  /* -> anthrazit (Text auf Hellgrün, 6,09:1) */
  /* Schrift-Familien */
  --gat-font-headline;   /* 'Barlow Semi Condensed', sans-serif */
  --gat-font-copy;       /* 'Barlow Semi Condensed', sans-serif */
  --gat-font-emphasis;   /* 'Vollkorn', serif */
  /* Typo-Größen */
  --gat-text-h1: 2.441rem;  --gat-text-h2: 1.953rem;  --gat-text-h3: 1.563rem;
  --gat-text-subline: 1.25rem;  --gat-text-copy: 1rem;  --gat-text-small: 0.8rem;
  /* Zeilenabstände (einheitslos) */
  --gat-leading-headline: 0.9;  --gat-leading-copy: 1.3;
  /* Abstände */
  --gat-space-1: 0.25rem; --gat-space-2: 0.5rem; --gat-space-3: 1rem;
  --gat-space-4: 1.5rem;  --gat-space-5: 2rem;   --gat-space-6: 3rem;

OUTPUT CONTRACT — new supplementary tokens (Task 1) and public component
classes (Tasks 2-6). These names are stable; renaming them is a breaking
change for issue #5 and consuming tools.

  /* Supplementary tokens (Web-Ergänzung, Issue #4) */
  --gat-radius-sm;       /* small radius — buttons, badges */
  --gat-radius-md;       /* card radius */
  --gat-border-width;    /* standard stroke — secondary button outline */
  --gat-container-max;   /* max content width, 72rem */
  --gat-breakpoint-sm;   /* documenting comment only — @media cannot read var() */
  --gat-breakpoint-md;   /* documenting comment only */

  /* Layout */          .gat-container .gat-grid .gat-grid--2 .gat-grid--3 .gat-section
  /* Header / Nav */    .gat-header .gat-header__inner .gat-header__logo
                        .gat-nav .gat-nav__link .gat-nav__link--active
  /* Typografie */      .gat-headline .gat-subline .gat-fliesstext .gat-emphasis
  /* Buttons */         .gat-btn .gat-btn--primary .gat-btn--secondary
  /* Karten */          .gat-card .gat-card--primary .gat-card--secondary
                        .gat-card__title .gat-card__body
  /* CD-Elemente */     .gat-underline .gat-highlight
                        .gat-stoerer .gat-stoerer--gelb .gat-stoerer--magenta
</interfaces>

Key files:
@design-system/design-system.css — the canonical stylesheet; 97 lines, holds the
  file header + complete `:root` token block. Components are appended here.
@design-system/index.html — page skeleton; NOT to be modified (issue #5 scope).
Logo source: `/workspace/Grüne Logo Bund dunkelgrün RGB.svg` — monochrome SVG,
  single fill `#2d793c`, 150,32×132,07, viewBox set. Must be copied URL-safe.
</context>

<commit_format>
Format: conventional with issue prefix (from .issues/config.yaml).
Pattern: {source-id}: {type}({scope}): {description}
Example: 4: feat(components): add header and navigation component classes
Source id is the GitHub issue number `4` (config: source.id). Types: feat, chore.
</commit_format>

<tasks>

<task type="auto">
  <name>Task 1: Add font @import, copy logo asset, add supplementary token block</name>
  <files>design-system/design-system.css, design-system/assets/gruene-logo.svg</files>
  <action>
  Three foundation changes, all prerequisites for the component layer.

  1. Google Fonts @import (D-3). Insert as the FIRST CSS statement in
     `design-system.css` — directly below the existing file-header comment block
     and ABOVE `:root`. Comments do not count as rules, so this satisfies the
     "@import before all rules" requirement. Use exactly this verified URL:
       @import url('https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:ital,wght@0,400;0,600;0,700;0,900;1,400;1,900&family=Vollkorn:ital,wght@0,400;0,900&display=swap');
     This is the RESEARCH.md URL tightened to the weights the components actually
     use: Barlow 400 (copy), 600/700 (subline/UI), 900 (headline) + italics;
     Vollkorn 400 and 900-italic (emphasis). Add a short German comment above it.

  2. Copy the logo asset (D-2, D-4). Create `design-system/assets/` and copy
     `/workspace/Grüne Logo Bund dunkelgrün RGB.svg` to
     `design-system/assets/gruene-logo.svg` (URL-safe name, no umlauts/spaces).
     Do NOT modify the SVG contents — it stays the monochrome dark-green vector;
     the header recolors it via CSS in Task 2.

  3. Supplementary token block. Append a new, clearly-commented `--gat-` block
     INSIDE `:root`, at the end (just before the closing brace). German comment
     banner marking it explicitly as "Web-Ergänzung, Issue #4 — Komponenten-
     Maße". Define:
       --gat-radius-sm: 0.25rem;     /* Buttons, Badges */
       --gat-radius-md: 0.5rem;      /* Karten */
       --gat-border-width: 2px;      /* Sekundär-Button-Outline */
       --gat-container-max: 72rem;   /* max. Inhaltsbreite */
     Plus two documenting-only comment tokens for breakpoints (a @media query
     cannot read var(), so these exist purely for traceability):
       --gat-breakpoint-sm: 36rem;   /* nur Doku — @media nutzt den rem-Wert direkt */
       --gat-breakpoint-md: 48rem;   /* nur Doku — @media nutzt den rem-Wert direkt */
     All comments in German per the issue-#3 convention.

  No hardcoded colors/sizes introduced — every later component value resolves to
  a token. Do NOT touch `index.html`.
  </action>
  <verify>
  <automated>cd /workspace/design-system && test -f assets/gruene-logo.svg && head -c 5 assets/gruene-logo.svg | grep -q '<' && grep -q "fonts.googleapis.com/css2" design-system.css && grep -q -- "--gat-radius-sm" design-system.css && grep -q -- "--gat-container-max" design-system.css && awk '/@import/{i=NR} /:root/{r=NR} END{exit !(i>0 && i<r)}' design-system.css && echo OK</automated>
  </verify>
  <done>
  - `design-system/assets/gruene-logo.svg` exists and is a valid SVG
  - `@import` for Barlow Semi Condensed + Vollkorn is the first CSS statement, above `:root`
  - Supplementary `--gat-radius-sm/md`, `--gat-border-width`, `--gat-container-max`,
    `--gat-breakpoint-sm/md` tokens exist inside `:root`, clearly commented as Issue #4 additions
  - `index.html` unchanged
  </done>
</task>

<task type="auto">
  <name>Task 2: Layout system + Header/Navigation components</name>
  <files>design-system/design-system.css</files>
  <action>
  Append a commented section banner "Layout / Seitenstruktur" then a
  "Header / Navigation" banner. All selectors are flat, single-class, `.gat-`
  prefixed (D-1). No naked tag selectors (`h1`, `body`, `*`) — the stylesheet is
  embedded into foreign tools. Every value resolves to a `--gat-` token.

  Layout:
  - `.gat-container` — `max-width: var(--gat-container-max)`, `margin-inline:
    auto`, horizontal padding `var(--gat-space-4)`.
  - `.gat-grid` — `display: grid`, `gap: var(--gat-space-4)`,
    `grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr))` so
    it reflows to one column on narrow viewports without a media query.
  - `.gat-grid--2` / `.gat-grid--3` — fixed 2- and 3-column variants:
    `grid-template-columns: repeat(2|3, 1fr)`. Inside one `max-width: 36rem`
    media query, collapse both to `1fr` (single column). Comment the query with
    `--gat-breakpoint-sm` for traceability.
  - `.gat-section` — vertical rhythm block, `padding-block: var(--gat-space-6)`.

  Header / Navigation (D-5 dark-green header, D-4 white-recolored logo):
  - `.gat-header` — `background: var(--gat-color-primary)` (dark green),
    `color: var(--gat-color-on-primary)` (white). CD rule "Text on green"
    structurally enforced — surface + on-* token always paired.
  - `.gat-header__inner` — Flexbox row: `display: flex`, `align-items: center`,
    `justify-content: space-between`, `flex-wrap: wrap`, `gap: var(--gat-space-4)`,
    centered via `max-width: var(--gat-container-max)` + `margin-inline: auto`,
    padding `var(--gat-space-4)`.
  - `.gat-header__logo` — the logo, recolored to white via CSS mask (the source
    SVG is monochrome so the mask is exact):
      display: inline-block; width: 2.5rem; aspect-ratio: 150.32 / 132.07;
      background-color: var(--gat-color-weiss);
      -webkit-mask: url('assets/gruene-logo.svg') no-repeat center / contain;
      mask: url('assets/gruene-logo.svg') no-repeat center / contain;
    Wrap it with `padding: var(--gat-space-3)` to represent the CD Schutzzone
    (clear space around the logo) — comment this padding as the Schutzzone.
  - `.gat-nav` — Flexbox: `display: flex`, `flex-wrap: wrap`,
    `gap: var(--gat-space-4)`, `align-items: center`. Wrapping replaces a JS
    hamburger menu (no JS allowed).
  - `.gat-nav__link` — inherits white header text; `text-decoration: none`,
    `font-family: var(--gat-font-copy)`. Add `:hover` and `:focus-visible`
    states using a `--gat-color-highlight` (yellow) underline via
    `text-decoration` or `border-bottom` — CSS only, no JS.
  - `.gat-nav__link--active` — persistent active state: yellow CD underline
    (`border-bottom: var(--gat-border-width) solid var(--gat-color-highlight)`).
    The consuming tool sets this class; no JS state logic here.

  Use the `-webkit-mask` prefix alongside `mask` for browser coverage. German
  comments throughout.
  </action>
  <verify>
  <automated>cd /workspace/design-system && python3 -c "
import re,sys
css=open('design-system.css').read()
for s in ['.gat-container','.gat-grid','.gat-grid--2','.gat-grid--3','.gat-section','.gat-header','.gat-header__inner','.gat-header__logo','.gat-nav','.gat-nav__link','.gat-nav__link--active']:
    assert s+' ' in css or s+',' in css or s+'{' in css or s+':' in css, 'missing '+s
# component bodies must contain no hardcoded hex colors
bodies=re.findall(r'\.gat-[^{]*\{([^}]*)\}',css)
bad=[b for b in bodies if re.search(r'#[0-9a-fA-F]{3,6}\b',b)]
assert not bad, 'hardcoded hex in component: '+str(bad)
assert 'mask' in css and 'gruene-logo.svg' in css, 'logo mask missing'
print('OK')
"</automated>
  </verify>
  <done>
  - `.gat-container`, `.gat-grid`, `.gat-grid--2/3`, `.gat-section` defined and responsive
  - `.gat-header` is dark green with `on-primary` white text (D-5)
  - `.gat-header__logo` recolors the SVG to white via `mask` + `background-color` (D-4)
    and carries Schutzzone padding
  - `.gat-nav` wraps without JS; `--active` shows the CD underline
  - No hardcoded hex colors in any component body
  </done>
</task>

<task type="auto">
  <name>Task 3: Typography classes</name>
  <files>design-system/design-system.css</files>
  <action>
  Append a "Typografie" section banner, then the typography classes. Flat
  `.gat-` single-class selectors only. The CD line-height factors ARE the
  `--gat-leading-*` tokens — set them directly as unitless `line-height`, do NOT
  multiply again (RESEARCH.md pitfall: ×0,9 is already the token value).

  - `.gat-headline` — `font-family: var(--gat-font-headline)`,
    `font-weight: 900` (Barlow Black = the CD "Ultra" headline role),
    `font-size: var(--gat-text-h1)`, `line-height: var(--gat-leading-headline)`
    (0,9), `color: var(--gat-color-text)`.
  - `.gat-subline` — `font-family: var(--gat-font-headline)`,
    `font-weight: 600`, `font-size: var(--gat-text-subline)`,
    `line-height: var(--gat-leading-headline)`, `color: var(--gat-color-text)`.
  - `.gat-fliesstext` — `font-family: var(--gat-font-copy)`,
    `font-weight: 400`, `font-size: var(--gat-text-copy)`,
    `line-height: var(--gat-leading-copy)` (1,3),
    `color: var(--gat-color-text)`.
  - `.gat-emphasis` — `font-family: var(--gat-font-emphasis)` (Vollkorn),
    `font-style: italic`, `font-weight: 900` (the CD Black-Italic emphasis
    role), `line-height: var(--gat-leading-copy)`.

  Optional: make `.gat-headline` fluid with `clamp()` using token endpoints
  (e.g. `clamp(var(--gat-text-h2), 5vw, var(--gat-text-h1))`) — the `vw` middle
  value is the one permitted non-token literal and is acceptable for fluid type;
  comment it. Keep it simple if uncertain — a plain `var(--gat-text-h1)` is fine.

  Note on the CD "Text only on green" rule: these typography classes set
  `color` only (the anthracite text token); they do NOT set a background.
  Pairing text with a green surface is enforced structurally by `.gat-header`
  (Task 2) and `.gat-card` (Task 5). German comments.
  </action>
  <verify>
  <automated>cd /workspace/design-system && python3 -c "
import re
css=open('design-system.css').read()
for s in ['.gat-headline','.gat-subline','.gat-fliesstext','.gat-emphasis']:
    assert s in css, 'missing '+s
def body(sel):
    m=re.search(re.escape(sel)+r'\s*\{([^}]*)\}',css); return m.group(1) if m else ''
assert 'var(--gat-leading-headline)' in body('.gat-headline'), 'headline leading not token'
assert 'var(--gat-leading-copy)' in body('.gat-fliesstext'), 'copy leading not token'
assert 'var(--gat-font-emphasis)' in body('.gat-emphasis'), 'emphasis font not token'
bodies=[body(s) for s in ['.gat-headline','.gat-subline','.gat-fliesstext','.gat-emphasis']]
assert not any(re.search(r'#[0-9a-fA-F]{3,6}\b',b) for b in bodies), 'hardcoded hex'
print('OK')
"</automated>
  </verify>
  <done>
  - `.gat-headline`, `.gat-subline`, `.gat-fliesstext`, `.gat-emphasis` defined
  - `line-height` uses `--gat-leading-headline` (0,9) for headline/subline and
    `--gat-leading-copy` (1,3) for copy/emphasis — set directly, not re-multiplied
  - Fonts and sizes resolve to `--gat-` tokens; no hardcoded hex
  </done>
</task>

<task type="auto">
  <name>Task 4: Button components (primary / secondary)</name>
  <files>design-system/design-system.css</files>
  <action>
  Append a "Buttons" section banner, then the button classes. Flat `.gat-`
  single-class selectors. Every value resolves to a token.

  - `.gat-btn` — base: `display: inline-flex`, `align-items: center`,
    `justify-content: center`, `gap: var(--gat-space-2)`,
    `padding: var(--gat-space-2) var(--gat-space-4)`,
    `border-radius: var(--gat-radius-sm)`,
    `font-family: var(--gat-font-copy)`, `font-weight: 700`,
    `font-size: var(--gat-text-copy)`, `line-height: var(--gat-leading-copy)`,
    `text-decoration: none`, `cursor: pointer`, `border: var(--gat-border-width)
    solid transparent`. Add a `:focus-visible` outline using a green token for
    keyboard accessibility (CSS only).
  - `.gat-btn--primary` — `background: var(--gat-color-primary)` (dark green),
    `color: var(--gat-color-on-primary)` (white — verified 5,63:1 contrast).
    Add a `:hover` state (e.g. slight `filter: brightness(0.92)` — token-free
    but acceptable as a relative transform; comment it; OR shift background to
    `--gat-color-secondary`). Prefer the brightness approach so no new color
    is introduced.
  - `.gat-btn--secondary` — outline style: `background: transparent`,
    `color: var(--gat-color-primary)`,
    `border: var(--gat-border-width) solid var(--gat-color-primary)`.
    `:hover` fills the surface: `background: var(--gat-color-primary)`,
    `color: var(--gat-color-on-primary)`.

  Do NOT pair white text with light green anywhere (RESEARCH.md anti-pattern —
  `on-secondary` is anthracite for a reason). German comments.
  </action>
  <verify>
  <automated>cd /workspace/design-system && python3 -c "
import re
css=open('design-system.css').read()
for s in ['.gat-btn','.gat-btn--primary','.gat-btn--secondary']:
    assert s in css, 'missing '+s
def body(sel):
    m=re.search(re.escape(sel)+r'\s*\{([^}]*)\}',css); return m.group(1) if m else ''
assert 'var(--gat-radius-sm)' in body('.gat-btn'), 'btn radius not token'
assert 'var(--gat-border-width)' in body('.gat-btn'), 'btn border-width not token'
for s in ['.gat-btn','.gat-btn--primary','.gat-btn--secondary']:
    assert not re.search(r'#[0-9a-fA-F]{3,6}\b',body(s)), 'hardcoded hex in '+s
print('OK')
"</automated>
  </verify>
  <done>
  - `.gat-btn` base + `--primary` (dark green fill, white text) + `--secondary` (green outline)
  - Radius and border-width come from `--gat-radius-sm` / `--gat-border-width`
  - Hover and `:focus-visible` states defined, CSS only, no white-on-light-green pairing
  - No hardcoded hex in button bodies
  </done>
</task>

<task type="auto">
  <name>Task 5: Card / surface components</name>
  <files>design-system/design-system.css</files>
  <action>
  Append a "Karten / Flächen" section banner, then the card classes. Flat
  `.gat-` single-class selectors. This task structurally enforces the CD rule
  "Typografie steht immer auf grüner Fläche" — a card variant ALWAYS pairs a
  green surface with its matching `on-*` text token.

  - `.gat-card` — base layout: `display: flex`, `flex-direction: column`,
    `gap: var(--gat-space-3)`, `padding: var(--gat-space-5)`,
    `border-radius: var(--gat-radius-md)`. No standalone background — a card is
    only ever used through a green variant.
  - `.gat-card--primary` — `background: var(--gat-color-primary)` (dark green) +
    `color: var(--gat-color-on-primary)` (white, 5,63:1). CD-conform.
  - `.gat-card--secondary` — `background: var(--gat-color-secondary)`
    (light green) + `color: var(--gat-color-on-secondary)` (anthracite, 6,09:1).
    Never pair light green with white text.
  - `.gat-card__title` — card headline: `font-family: var(--gat-font-headline)`,
    `font-weight: 900`, `font-size: var(--gat-text-h3)`,
    `line-height: var(--gat-leading-headline)`. Inherits the variant's `color`
    (do NOT set an explicit text color — it must adapt to the green surface).
  - `.gat-card__body` — card copy: `font-family: var(--gat-font-copy)`,
    `font-size: var(--gat-text-copy)`, `line-height: var(--gat-leading-copy)`.
    Inherits the variant `color`.

  Critical: `__title` and `__body` must NOT hardcode a `color` — they inherit
  from the `--primary` / `--secondary` variant so text always sits correctly on
  its green surface. German comments.
  </action>
  <verify>
  <automated>cd /workspace/design-system && python3 -c "
import re
css=open('design-system.css').read()
for s in ['.gat-card','.gat-card--primary','.gat-card--secondary','.gat-card__title','.gat-card__body']:
    assert s in css, 'missing '+s
def body(sel):
    m=re.search(re.escape(sel)+r'\s*\{([^}]*)\}',css); return m.group(1) if m else ''
assert 'var(--gat-color-primary)' in body('.gat-card--primary') and 'var(--gat-color-on-primary)' in body('.gat-card--primary'), 'primary card surface/text not paired'
assert 'var(--gat-color-secondary)' in body('.gat-card--secondary') and 'var(--gat-color-on-secondary)' in body('.gat-card--secondary'), 'secondary card surface/text not paired'
assert 'var(--gat-radius-md)' in body('.gat-card'), 'card radius not token'
for s in ['.gat-card','.gat-card--primary','.gat-card--secondary','.gat-card__title','.gat-card__body']:
    assert not re.search(r'#[0-9a-fA-F]{3,6}\b',body(s)), 'hardcoded hex in '+s
print('OK')
"</automated>
  </verify>
  <done>
  - `.gat-card` base + `--primary` (dark green + white) + `--secondary` (light green + anthracite)
  - Each variant pairs a green surface token with the matching `on-*` text token (CD rule)
  - `__title` / `__body` inherit the variant color — no hardcoded text color
  - Radius from `--gat-radius-md`; no hardcoded hex
  </done>
</task>

<task type="auto">
  <name>Task 6: CD design elements — underline, highlight, Störer; final verification</name>
  <files>design-system/design-system.css</files>
  <action>
  Append a "CD-Gestaltungselemente" section banner, then the CD accent classes.
  Flat `.gat-` single-class selectors, token-only values.

  - `.gat-underline` — CD underline accent for inline text:
    `border-bottom: var(--gat-border-width) solid var(--gat-color-accent)`
    (magenta), `padding-bottom: var(--gat-space-1)`. Apply to inline spans.
  - `.gat-highlight` — yellow marker highlight for inline text:
    `background: var(--gat-color-highlight)` (yellow),
    `color: var(--gat-color-text)` (anthracite — yellow+anthracite is a
    high-contrast pair; never use white text here),
    `padding: 0 var(--gat-space-1)`.
  - `.gat-stoerer` — the tilted "Störer" badge, pure CSS (D-6):
    `display: inline-block`, `padding: var(--gat-space-2) var(--gat-space-4)`,
    `border-radius: var(--gat-radius-sm)`,
    `font-family: var(--gat-font-headline)`, `font-weight: 900`,
    `line-height: var(--gat-leading-headline)`,
    `transform: rotate(-6deg)`, `text-align: center`.
  - `.gat-stoerer--gelb` — modifier: `background: var(--gat-color-highlight)`
    (yellow) + `color: var(--gat-color-text)` (anthracite).
  - `.gat-stoerer--magenta` — modifier: `background: var(--gat-color-accent)`
    (magenta) + `color: var(--gat-color-on-primary)` (white — magenta is a dark
    enough accent that white text reads; if uncertain keep white, it is the CD
    accent-on-color convention).
  Both Störer modifiers are delivered (D-6 — consuming tool picks per context).

  Final verification after writing: confirm the whole file is valid CSS, every
  component value resolves to a `--gat-` token (no stray hex/px in component
  bodies — the only permitted literals are the documented `vw` in any `clamp()`,
  the `transform: rotate(-6deg)` angle, the logo `aspect-ratio`, the
  `-webkit-mask` prefix, and the breakpoint rem-values inside `@media` queries).
  German comments throughout. Do not modify `index.html`.
  </action>
  <verify>
  <automated>cd /workspace/design-system && python3 -c "
import re
css=open('design-system.css').read()
# all CD-element classes present
for s in ['.gat-underline','.gat-highlight','.gat-stoerer','.gat-stoerer--gelb','.gat-stoerer--magenta']:
    assert s in css, 'missing '+s
def body(sel):
    m=re.search(re.escape(sel)+r'\s*\{([^}]*)\}',css); return m.group(1) if m else ''
assert 'rotate(' in body('.gat-stoerer'), 'stoerer not rotated'
assert 'var(--gat-color-highlight)' in body('.gat-stoerer--gelb'), 'gelb modifier wrong'
assert 'var(--gat-color-accent)' in body('.gat-stoerer--magenta'), 'magenta modifier wrong'
# global: balanced braces
assert css.count('{')==css.count('}'), 'unbalanced braces'
# global: no naked tag selectors styling foreign markup (rough check: no top-level h1/body/* rules)
assert not re.search(r'(^|\n)\s*(h[1-6]|body|\*)\s*\{',css), 'naked tag selector found'
# global: no hardcoded hex inside any .gat- component body
for m in re.finditer(r'(\.gat-[A-Za-z0-9_-]+(?:\s*,\s*\.gat-[A-Za-z0-9_-]+)*)\s*\{([^}]*)\}',css):
    assert not re.search(r'#[0-9a-fA-F]{3,6}\b',m.group(2)), 'hardcoded hex in '+m.group(1)
print('OK')
" && python3 -c "
# CSS validity smoke check via cssutils if available, else brace/at-rule sanity
try:
    import cssutils, logging
    cssutils.log.setLevel(logging.CRITICAL)
    cssutils.parseFile('design-system.css', validate=False)
    print('CSS parses OK')
except ImportError:
    print('cssutils absent — brace check above is the gate')
"</automated>
  </verify>
  <done>
  - `.gat-underline` (magenta), `.gat-highlight` (yellow + anthracite text) defined
  - `.gat-stoerer` is a `transform: rotate()` badge with BOTH `--gelb` and `--magenta` modifiers (D-6)
  - Whole file: balanced braces, no naked tag selectors, no hardcoded hex in any component body
  - `index.html` unchanged
  </done>
</task>

</tasks>

<verification>
After all tasks, run final checks from `/workspace/design-system/`:
- Brace balance + no naked tag selectors + no hardcoded hex in component bodies
  (the Task 6 Python check covers this for the whole file).
- CSS parses cleanly (`cssutils` if installed, else the brace check is the gate).
- Every public class from the OUTPUT CONTRACT in `<interfaces>` is present.
- `@import` is the first CSS statement, above `:root`.
- `design-system/assets/gruene-logo.svg` exists and is a valid SVG.
- Spot-check WCAG contrast on text-on-surface pairings: dark-green+white (5,63:1),
  light-green+anthracite (6,09:1), yellow+anthracite — all use the issue-#3
  `on-*` tokens, which were already contrast-verified; no new pairing is introduced.
- `index.html` is unchanged (issue #5 scope).
</verification>

<success_criteria>
Maps 1:1 to ISSUE.md acceptance criteria:
- Header, layout grid, typography classes, buttons and cards exist as CSS
  components in `design-system.css` — Tasks 2-5.
- Components use design tokens exclusively, no hardcoded colors/sizes — enforced
  by the per-task no-hardcoded-hex checks and the supplementary token block
  (Task 1) that closes the radius/border/container gap.
- The CD rule "text only on green surface" is structurally encoded in the
  text/card components — `.gat-header` (Task 2) and `.gat-card--primary/secondary`
  (Task 5) always pair a green surface with the matching `on-*` token.
- Components are responsive and JavaScript-free — `repeat(auto-fit, minmax())`,
  `flex-wrap`, `clamp()`, and `max-width` media queries; no JS anywhere.
Locked-decision traceability: D-1 `gat-` prefix (all tasks), D-2/D-4 logo asset
copied + CSS recolor (Tasks 1-2), D-3 `@import` fonts (Task 1), D-5 dark-green
header (Task 2), D-6 Störer yellow + magenta variants (Task 6).
</success_criteria>
