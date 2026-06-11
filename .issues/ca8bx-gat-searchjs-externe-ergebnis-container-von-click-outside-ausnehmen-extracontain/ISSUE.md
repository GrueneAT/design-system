---
id: ca8bx
title: 'gat-search.js: externe Ergebnis-Container von Click-outside ausnehmen (extraContainers)'
status: open
priority: medium
labels:
- design-system
- components
- enhancement
remote:
- source: github
  id: '28'
  url: https://github.com/GrueneAT/design-system/issues/28
---

## Kontext

Beim Gemeindeordnung-Rollout (GrueneAT/Gemeindeordnung#15) kam heraus: der
document-level Click-outside-Handler in `gat-search.js` schliesst die Suche,
sobald ein Klick **ausserhalb** von `input`/`overlay` faellt — auch wenn der
Consumer seine **eigenen** Ergebnisse in ein app-eigenes Panel rendert (Adapter
gibt `[]` zurueck, App malt selbst). Klicks ins App-Panel schlossen die Suche
mitten im Klick (Tab-Switch/Links brachen). Der Consumer musste das per
`pointerdown`-Stop umgehen — ein Workaround, der in jedem solchen Consumer
neu noetig waere.

## Ziel

Eine first-class DS-Option, mit der Consumer zusaetzliche Container als „innen"
registrieren, sodass Klicks darin die Suche **nicht** schliessen.

## Scope (Design System)

- Neue Option `extraContainers` in `createSearch(options)`: akzeptiert ein
  Array aus Elementen und/oder Selektor-Strings; zur Click-outside-Pruefung
  zaehlen sie wie `overlay` als „innen".
- `onDocumentPointerDown`: `within` zusaetzlich gegen die aufgeloesten
  extraContainers pruefen (robuste Element-/Selektor-Aufloesung, null-sicher).
- README „Such-Helfer"-Abschnitt + Beispiel ergaenzen; CHANGELOG + Patch-Version
  (v2.3.1). Build/Drift-Gate gruen halten.

## Acceptance Criteria

- [ ] `extraContainers` (Elemente und Selektoren) dokumentiert und implementiert.
- [ ] Klick in einen registrierten externen Container schliesst die Suche nicht;
      Klick wirklich ausserhalb schliesst weiterhin.
- [ ] Kein Verhalten ohne die Option veraendert (Default = leer).
- [ ] CHANGELOG + v2.3.1; `pnpm run build` ohne `design-system.css`-Drift.
