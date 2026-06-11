/*
 * Grüne AT Design System — Pagefind-Adapter (optionales Beispiel)
 * --------------------------------------------------------------
 * Verbindet eine Pagefind-Suche mit dem engine-neutralen Kern aus
 * `gat-search.js`. Pagefind ist KEINE Pflicht-Abhängigkeit des DS und wird
 * NICHT vendorisiert — dieser Adapter importiert das vom Konsumenten gebaute
 * Pagefind-Bundle erst zur Laufzeit (dynamic import).
 *
 * Nutzung:
 *   import { createSearch }
 *     from 'https://design-system.gruene.at/gat-search.js';
 *   import { pagefindAdapter }
 *     from 'https://design-system.gruene.at/examples/pagefind-adapter.js';
 *
 *   createSearch({
 *     input: '#suche',
 *     overlay: '#suche-overlay',
 *     search: pagefindAdapter({ bundlePath: '/pagefind/' }),
 *   });
 *
 * Debounce/Race-Guard macht gat-search — der Adapter ruft daher
 * `pf.debouncedSearch(query, opts, 0)` (Wartezeit 0) und gibt `null`
 * (superseded) unverändert durch; gat-search ignoriert `null`.
 *
 * XSS-Hinweis: Pagefinds `excerpt` ist HTML-escaped (mit <mark>) und damit
 * sicher für innerHTML. `meta.title` ist NICHT escaped — der Default-Renderer
 * von gat-search escaped den Titel via textContent. Wer einen eigenen
 * `renderItem` nutzt, muss den Titel selbst escapen.
 *
 * Lizenz: CC BY 4.0 (gleich wie design-system.css).
 */

export function pagefindAdapter({ bundlePath = "/pagefind/", limit = 10, filters } = {}) {
  let pf = null;
  let initPromise = null;

  async function init() {
    if (pf) return pf;
    if (!initPromise) {
      initPromise = (async () => {
        // Konsumenten-Bundle dynamisch laden; /* @vite-ignore */ verhindert,
        // dass Vite den Pfad zur Build-Zeit aufzulösen versucht.
        const mod = await import(/* @vite-ignore */ `${bundlePath}pagefind.js`);
        await mod.options({ bundlePath });
        pf = mod;
        return pf;
      })();
    }
    return initPromise;
  }

  return async function search(query) {
    try {
      const engine = await init();
      const opts = filters ? { filters } : {};
      // Wartezeit 0: das Debouncing übernimmt gat-search (kein Doppel-Debounce).
      const res = await engine.debouncedSearch(query, opts, 0);
      // null = superseded -> unverändert durchreichen; gat-search ignoriert es.
      if (res == null) return null;

      const hits = res.results.slice(0, limit);
      const data = await Promise.all(hits.map((r) => r.data()));
      return data.map((d) => ({
        id: d.url,
        title: (d.meta && d.meta.title) || "",
        excerpt: d.excerpt, // Pagefind liefert HTML-escaped excerpt mit <mark>
        url: d.url,
        meta: d.meta,
      }));
    } catch (error) {
      // Stiller Fallback: im Dev-Modus fehlt `pagefind.js`, bis
      // `pagefind --site dist` gelaufen ist.
      return [];
    }
  };
}
