/*
 * Grüne AT Design System — Chart-Helper-Modul
 * -------------------------------------------
 * Palette und Helfer für ECharts-basierte Datenwerkzeuge.
 * Geliefert via:
 *   import { PALETTE, INK, LABEL_SIZE, AXIS_SIZE,
 *            BAR_MAX_DICHT, BAR_MAX_WEIT, VA_DECAL,
 *            tip, legende, grid, planIstLegende }
 *     from 'https://grueneat.github.io/design-system/gat-charts.js';
 *
 * Die Palette spiegelt die CSS-Tokens --gat-web-chart-1..8 im DS.
 * Lizenz: CC BY 4.0 (gleich wie design-system.css).
 */

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

export function tip(extra = {}) {
  return {
    trigger:         "axis",
    backgroundColor: "#ffffff",
    borderColor:     INK.hairline,
    borderWidth:     1,
    extraCssText:
      "box-shadow: 0 4px 14px rgba(31,38,28,.08); border-radius: 8px;",
    textStyle: {
      color:      INK.text,
      fontFamily: "'Barlow Semi Condensed', sans-serif",
      fontSize:   LABEL_SIZE,
    },
    ...extra,
  };
}

export function legende(extra = {}) {
  return {
    textStyle: { color: INK.soft, fontSize: LABEL_SIZE },
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
