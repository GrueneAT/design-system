/*
 * Grüne AT Design System — Chart-Helper-Modul
 * -------------------------------------------
 * Palette und Helfer für ECharts-basierte Datenwerkzeuge.
 * Geliefert via:
 *   import { PALETTE, INK, LABEL_SIZE, AXIS_SIZE,
 *            BAR_MAX_DICHT, BAR_MAX_WEIT, VA_DECAL,
 *            tip, legende, grid, planIstLegende }
 *     from 'https://design-system.gruene.at/gat-charts.js';
 *
 * ZWEI EBENEN, bewusst getrennt:
 *
 *   PALETTE / INK        statische Werte, identisch zu den DS-Defaults.
 *                        Lesbar auf Modulebene und ohne DOM (Node-Tests).
 *                        Kennen KEIN Theming.
 *
 *   palette() / ink()    lesen dieselben Werte zur AUFRUFZEIT aus den
 *   / schrift()          CSS-Tokens und folgen damit einer lokalen
 *                        Ueberschreibung (siehe Styleguide, Abschnitt
 *                        "Fuer andere Organisationen"). Ohne DOM oder
 *                        ohne geladenes Stylesheet fallen sie auf die
 *                        statischen Werte zurueck.
 *
 * Konsumenten der Gruenen AT koennen bei PALETTE/INK bleiben. Wer das
 * Design-System auf eine andere Marke umstellt, nutzt die Funktionen —
 * sonst bleiben die Diagramme gruen, waehrend der Rest der Oberflaeche
 * die neue Marke traegt.
 *
 * Lizenz: CC BY 4.0 (gleich wie design-system.css).
 */

// Liest ein CSS-Custom-Property vom Wurzelelement. Faellt auf `ersatz`
// zurueck, wenn kein DOM vorhanden ist (Node), das Stylesheet noch nicht
// geladen wurde oder das Token leer ist.
function token(name, ersatz) {
  if (typeof document === "undefined" || typeof getComputedStyle !== "function") {
    return ersatz;
  }
  try {
    const wert = getComputedStyle(document.documentElement)
      .getPropertyValue(name)
      .trim();
    return wert || ersatz;
  } catch {
    return ersatz;
  }
}

export const PALETTE = [
  "#3f7d4f", // --gat-web-chart-1  Erträge / primär grün
  "#6ba368", // --gat-web-chart-2  Personal-Alt / sekundär grün
  "#4f93a0", // --gat-web-chart-3  Personal / Teal
  "#c9a24b", // --gat-web-chart-4  Sachaufwand / Ocker
  "#b9744f", // --gat-web-chart-5  Aufwand / Risiko / Terrakotta
  "#9c5b7d", // --gat-web-chart-6  Transfers / Pflaume
  "#5d6b8a", // --gat-web-chart-7  Nettoergebnis / Schiefer
  "#8a8f7d", // --gat-web-chart-8  Sonstige / neutrales Olivgrau
];

export const INK = {
  text:     "#23271f",
  soft:     "#5e6358",
  mute:     "#6b6f63",
  hairline: "#e1e4db",
  gridline: "#e7eae2",
  axis:     "#cdd2c8",
  green:    "#3f7d4f",
  clay:     "#9c5a38",
  slate:    "#5d6b8a",
};

export const LABEL_SIZE    = 15;
export const AXIS_SIZE     = 14;
export const BAR_MAX_DICHT = 56;
export const BAR_MAX_WEIT  = 130;

export const VA_DECAL = {
  symbol:      "rect",
  symbolSize:  1,
  dashArrayX:  [3, 0],
  dashArrayY:  [1, 6],
  color:       "rgba(255,255,255,0.45)",
  rotation:    -Math.PI / 4,
};

/* Laufzeit-Varianten — folgen lokalen Token-Ueberschreibungen. */

// Die acht Kategorie-Toene in derselben Reihenfolge wie PALETTE.
export function palette() {
  return PALETTE.map((ersatz, i) => token(`--gat-web-chart-${i + 1}`, ersatz));
}

// Tonale Farben. `gridline` und `axis` haben im DS kein eigenes Token und
// bleiben daher immer die statischen Werte.
export function ink() {
  return {
    text:     token("--gat-web-text",       INK.text),
    soft:     token("--gat-web-text-soft",  INK.soft),
    mute:     token("--gat-web-text-mute",  INK.mute),
    hairline: token("--gat-web-hairline",   INK.hairline),
    gridline: INK.gridline,
    axis:     INK.axis,
    green:    token("--gat-web-chart-1",    INK.green),
    clay:     token("--gat-web-clay-text",  INK.clay),
    slate:    token("--gat-web-chart-7",    INK.slate),
  };
}

// Schriftfamilie fuer Diagramm-Beschriftungen.
export function schrift() {
  return token("--gat-font-copy", "'Barlow Semi Condensed', sans-serif");
}

export function tip(extra = {}) {
  const farbe = ink();
  return {
    trigger:         "axis",
    backgroundColor: token("--gat-web-surface", "#ffffff"),
    borderColor:     farbe.hairline,
    borderWidth:     1,
    extraCssText:
      "box-shadow: 0 4px 14px rgba(31,38,28,.08); border-radius: 8px;",
    textStyle: {
      color:      farbe.text,
      fontFamily: schrift(),
      fontSize:   LABEL_SIZE,
    },
    ...extra,
  };
}

export function legende(extra = {}) {
  return {
    textStyle: { color: ink().soft, fontSize: LABEL_SIZE },
    itemGap:   14,
    ...extra,
  };
}

export function grid(extra = {}) {
  return {
    left:         10,
    right:        18,
    top:          14,
    bottom:       10,
    containLabel: true,
    ...extra,
  };
}

export function planIstLegende() {
  return [
    { name: "Ist (RA)",      type: "bar", data: [] },
    {
      name: "Plan (VA/NVA)",
      type: "bar",
      data: [],
      itemStyle: { decal: VA_DECAL },
    },
  ];
}
