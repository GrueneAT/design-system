---
id: m1wxd
title: Such-Vorlage (Suchfeld + Ergebnis-Overlay) im Design System, abgeleitet von
  Gemeindeordnung
status: done
priority: high
labels:
- design-system
- components
- enhancement
remote:
- source: github
  id: '26'
  url: https://github.com/GrueneAT/design-system/issues/26
---

## Kontext

Das Suchfeld auf **werkzeuge** (Pagefind Default-UI, `PagefindUI`) rendert die
Treffer inline unterhalb des Eingabefelds und schiebt dadurch den restlichen
Seiteninhalt nach unten (Layout-Shift). Die **Gemeindeordnung** hat bereits
eine ausgereifte Suche, die genau das vermeidet:

- Hero-Suchfeld auf der Startseite mit **absolut positioniertem Ergebnis-Dropdown**
  (Overlay → kein Content-Shift) — `#hero-search-input` + `#hero-search-dropdown`.
- **Modal-Overlay**-Suche (Header-Button + `Strg/Cmd+K`, Desktop zentriert,
  Mobile Full-Screen) — `#search-modal-trigger`.
- Floating-Action-Button (`#fab-search`).
- Eigene Pagefind-Integration (`src/js/search.js`) mit Custom-Result-Rendering,
  Content-Typ-Gruppierung, Bundesland-Filter und Stemming-Falsch-Positiv-Filter.

## Ziel

Eine **wiederverwendbare Such-Vorlage im Design System**: Suchfeld-Komponente
+ Such-Ergebnis-Darstellung (Overlay/Dropdown, optional Modal), **abgeleitet von
der Gemeindeordnung**, mit Verbesserungen und Anpassung an unsere DS-Tokens und
Komponenten. Anschliessend werden **werkzeuge** und **Gemeindeordnung** auf diese
gemeinsame Vorlage umgestellt (siehe Folge-Issues).

## Scope (dieses Issue = Design System)

- Suchfeld-Komponente (`.gat-search` o. ae.): Input + Such-Icon, auf DS-Tokens
  (Farben, Radius, Spacing, Fonts) statt Hardcodes/Tailwind-Utilities.
- **Ergebnis-Overlay/Dropdown-Pattern**: absolut positioniert, liegt ueber dem
  Content → **kein Layout-Shift**. Slots fuer Ergebnis-Items (Titel, Snippet,
  Badges/Kategorien), Leer-/Lade-/Keine-Treffer-Zustand vereinheitlicht.
- Optional, aber empfohlen: **Modal-/`Strg+K`-Pattern** (Desktop zentriert,
  Mobile Full-Screen) als zweite Variante derselben Vorlage.
- Markup + CSS in `design-system.css`, Showcase in `index.html` (und/oder
  `examples/`), CHANGELOG- + Versionseintrag.
- **Framework-agnostisch**: Das DS liefert Markup + CSS (+ optional ein kleines
  Vanilla-JS-Verhaltens-Helferlein fuer Open/Close/Keyboard). Die konkrete
  Pagefind-Anbindung bleibt Aufgabe der Consumer-Apps (dokumentieren).

## Verbesserungen ggue. der Gemeindeordnung

- DS-Tokens statt Tailwind-Utilities/hardcodierter Farben.
- A11y: `role=combobox`/`listbox`/`option`, Tastatur-Navigation der Treffer
  (Pfeiltasten/Enter), `ESC` schliesst, Focus-Trap im Modal, sichtbarer Fokus.
- Konsequent **kein Layout-Shift** (Overlay), `prefers-reduced-motion` beachten.
- Mobile: Full-Screen-Modal-Variante.
- Klar definierte, dokumentierte Slots fuer Ergebnis-Items, damit Consumer ihr
  eigenes Rendering einhaengen koennen.

## Rollout (separate Folge-Issues)

- **werkzeuge**: Index-Suchfeld von PagefindUI-Inline auf die DS-Overlay-Vorlage
  umstellen (behebt den Content-Shift live auf werkzeuge.gruene.at).
- **Gemeindeordnung**: bestehende Suche auf die DS-Vorlage zurueckfuehren
  (gemeinsame Basis, Eigenheiten wie BL-Filter als App-Schicht erhalten).

## Acceptance Criteria

- [ ] DS enthaelt ein dokumentiertes Suchfeld- + Ergebnis-Overlay-Pattern
      (CSS + Markup) in `design-system.css` mit Showcase in `index.html`/`examples/`.
- [ ] Ergebnis-Anzeige als Overlay/Dropdown — schiebt **keinen** Seiteninhalt.
- [ ] A11y: Tastatur-Navigation, aria-Rollen, `ESC`/Focus-Handling im Beispiel.
- [ ] Responsive inkl. Mobile-Full-Screen-Variante.
- [ ] Framework-agnostisch dokumentiert (Pagefind-Anbindung als Consumer-Aufgabe).
- [ ] CHANGELOG- + Versionseintrag im DS.
- [ ] Folge-Issues fuer werkzeuge + Gemeindeordnung angelegt und verlinkt.
