/*
 * Grüne AT Design System — Such-Verhaltensmodul
 * ---------------------------------------------
 * Engine-neutrales ES-Modul für die `.gat-search`-Vorlage (Suchfeld +
 * Ergebnis-Overlay). Liefert das generische Verhalten zentral und konsistent:
 * Open/Close, Pfeiltasten-Navigation, ARIA combobox/listbox/option, Focus-Trap
 * im Modal (über natives <dialog>), `returnFocus`, `Strg/Cmd+K`, Debounce mit
 * Race-Guard und `prefers-reduced-motion`. Das Modul kennt KEINE Suchmaschine —
 * der Konsument übergibt eine Adapter-Funktion `async (query, { signal }) =>
 * SearchResult[]` und (optional) ein Render-/Slot-Schema.
 *
 * Geliefert via:
 *   import { createSearch }
 *     from 'https://design-system.gruene.at/gat-search.js';
 *
 *   const controller = createSearch({
 *     input: '#suche',
 *     overlay: '#suche-overlay',
 *     search: async (q, { signal }) => myEngine.find(q, { signal }),
 *   });
 *
 * SearchResult-Slot-Schema (was der Adapter liefern MUSS):
 *   { id, title, excerpt?, url, badge?, meta? }
 *   - `title` wird vom Default-Renderer via textContent escaped (XSS-sicher).
 *   - `excerpt` darf HTML enthalten (z. B. <mark>) — NUR wenn der Adapter es
 *     selbst escaped hat; es wird via innerHTML gesetzt.
 *
 * Das Modul hat KEINE Seiteneffekte beim Import (kein Top-Level-DOM-Zugriff —
 * Astro-/SSR-sicher); alles erst in createSearch(). Schrift regelt CSS über
 * --gat-font-* — hier werden bewusst KEINE Font-Strings gesetzt.
 *
 * Lizenz: CC BY 4.0 (gleich wie design-system.css).
 */

let idCounter = 0;

const DEFAULT_LABELS = {
  placeholder: "Suchen …",
  noResults: "Keine Treffer.",
  hint: "Mindestens {n} Zeichen eingeben …",
  loading: "Suche läuft …",
  count: "{n} Treffer",
};

function resolveEl(ref, root) {
  if (!ref) return null;
  if (typeof ref === "string") return (root || document).querySelector(ref);
  return ref;
}

function isMod(event) {
  return event.metaKey || event.ctrlKey;
}

export function createSearch(options = {}) {
  const {
    input,
    overlay = null,
    search,
    renderItem = null,
    getItemHref = (result) => result && result.url,
    minQueryLength = 3,
    debounceMs = 200,
    mode = "inline",
    shortcut = true,
    triggers = [],
    // Zusaetzliche Container (Elemente und/oder Selektor-Strings), die fuer die
    // Click-outside-Pruefung wie das Overlay als „innen" zaehlen. Noetig, wenn
    // ein Consumer seine Ergebnisse in ein eigenes Panel ausserhalb des
    // DS-Overlays rendert (Adapter gibt [] zurueck) — Klicks darin sollen die
    // Suche nicht schliessen. Default: leer (unveraendertes Verhalten).
    extraContainers = [],
    closeOnSelect = true,
    labels: userLabels = {},
  } = options;

  // Roh-Referenzen behalten und erst beim Klick aufloesen, damit auch
  // dynamisch eingehaengte Panels und Selektoren zuverlaessig greifen.
  const extraContainerRefs = Array.isArray(extraContainers)
    ? extraContainers
    : extraContainers
      ? [extraContainers]
      : [];

  const inputEl = resolveEl(input);
  if (!inputEl) {
    throw new Error("gat-search: `input` ist erforderlich (Element oder Selector).");
  }
  if (typeof search !== "function") {
    throw new Error("gat-search: `search`-Adapter (async function) ist erforderlich.");
  }

  const labels = { ...DEFAULT_LABELS, ...userLabels };
  const triggerEls = (Array.isArray(triggers) ? triggers : [triggers])
    .map((t) => resolveEl(t))
    .filter(Boolean);

  // Overlay-Container: im Inline-Modus erwartet/erzeugt; im Modal-Modus liegt er
  // im Dialog. Wenn nicht angegeben, wird ein Container neben dem Input erzeugt.
  let overlayEl = resolveEl(overlay);
  let dialogEl = null;
  if (mode === "modal") {
    dialogEl = inputEl.closest("dialog");
  }
  if (!overlayEl) {
    overlayEl = document.createElement("div");
    overlayEl.className = "gat-search__overlay";
    if (inputEl.parentElement) {
      inputEl.parentElement.appendChild(overlayEl);
    }
  }

  // Ergebnis-Liste (role=listbox) und Status-Region innerhalb des Overlays.
  const uid = `gat-search-${++idCounter}`;
  const listId = `${uid}-list`;
  if (!overlayEl.id) overlayEl.id = `${uid}-overlay`;

  const countEl = document.createElement("div");
  countEl.className = "gat-search__count";
  countEl.hidden = true;

  const listEl = document.createElement("ul");
  listEl.className = "gat-search__results";
  listEl.id = listId;
  listEl.setAttribute("role", "listbox");
  listEl.setAttribute("aria-label", labels.placeholder);

  const stateEl = document.createElement("div");
  stateEl.className = "gat-search__state";
  // Live-Region, damit Zustands-Wechsel angesagt werden.
  stateEl.setAttribute("aria-live", "polite");

  overlayEl.append(countEl, listEl, stateEl);

  // --- ARIA-Verdrahtung am Input (combobox-with-listbox, APG-Pattern) -------
  inputEl.setAttribute("role", "combobox");
  inputEl.setAttribute("aria-expanded", "false");
  inputEl.setAttribute("aria-controls", listId);
  inputEl.setAttribute("aria-autocomplete", "list");
  inputEl.setAttribute("aria-haspopup", "listbox");
  if (!inputEl.hasAttribute("autocomplete")) inputEl.setAttribute("autocomplete", "off");
  if (!inputEl.placeholder) inputEl.placeholder = labels.placeholder;

  // --- Interner Zustand ------------------------------------------------------
  let results = [];
  let activeIndex = -1;
  let isOpen = false;
  let generation = 0; // Race-Guard für veraltete async-Treffer
  let debounceTimer = null;
  let lastReturnFocus = null;
  let scrollLockPrev = "";

  // --- Rendering -------------------------------------------------------------
  function defaultRender(result) {
    const item = document.createElement("a");
    const title = document.createElement("span");
    title.className = "gat-search__item-title";
    // XSS: Titel IMMER via textContent escapen.
    title.textContent = result.title != null ? String(result.title) : "";
    item.appendChild(title);

    if (result.excerpt != null) {
      const ex = document.createElement("span");
      ex.className = "gat-search__item-excerpt";
      // excerpt darf HTML enthalten (vom Adapter escaped) -> innerHTML.
      ex.innerHTML = String(result.excerpt);
      item.appendChild(ex);
    }
    if (result.badge != null) {
      const badge = document.createElement("span");
      badge.className = "gat-search__item-badge";
      badge.textContent = String(result.badge);
      item.appendChild(badge);
    }
    return item;
  }

  function renderResults(query) {
    listEl.textContent = "";
    activeIndex = -1;

    results.forEach((result, index) => {
      const rendered = renderItem ? renderItem(result) : defaultRender(result);
      let node;
      if (typeof rendered === "string") {
        const li = document.createElement("li");
        li.innerHTML = rendered;
        node = li;
      } else if (rendered instanceof HTMLElement) {
        node = rendered.tagName === "LI" ? rendered : wrapInListItem(rendered);
      } else {
        node = document.createElement("li");
      }

      if (!node.classList.contains("gat-search__item")) {
        node.classList.add("gat-search__item");
      }
      node.id = `${uid}-opt-${index}`;
      node.setAttribute("role", "option");
      node.setAttribute("aria-selected", "false");

      const href = getItemHref(result);
      if (href && node.tagName === "A") node.setAttribute("href", href);

      node.addEventListener("click", (event) => {
        event.preventDefault();
        selectIndex(index);
      });
      node.addEventListener("mousemove", () => setActive(index, false));

      listEl.appendChild(node);
    });

    if (results.length > 0) {
      countEl.hidden = false;
      countEl.textContent = labels.count.replace("{n}", String(results.length));
      setState(null);
      emit("results", { query, count: results.length });
    } else {
      countEl.hidden = true;
      setState("no-results", labels.noResults);
      emit("results", { query, count: 0 });
    }
  }

  function wrapInListItem(el) {
    const li = document.createElement("li");
    li.appendChild(el);
    return li;
  }

  function itemNodes() {
    return Array.from(listEl.querySelectorAll(".gat-search__item"));
  }

  function setState(kind, message) {
    const map = {
      empty: labels.placeholder,
      hint: labels.hint.replace("{n}", String(minQueryLength)),
      loading: labels.loading,
      "no-results": labels.noResults,
    };
    stateEl.className = "gat-search__state";
    if (!kind) {
      stateEl.hidden = true;
      stateEl.textContent = "";
      return;
    }
    stateEl.hidden = false;
    stateEl.classList.add(`gat-search__state--${kind}`);
    stateEl.textContent = message != null ? message : map[kind] || "";
    if (kind === "loading" || kind === "hint" || kind === "no-results" || kind === "empty") {
      // Beim Anzeigen eines Zustands keine Treffer-Liste / Count.
      countEl.hidden = true;
      listEl.textContent = "";
      activeIndex = -1;
    }
  }

  // --- Active-Item / Tastatur-Navigation ------------------------------------
  function setActive(index, scroll = true) {
    const nodes = itemNodes();
    if (nodes.length === 0) {
      activeIndex = -1;
      inputEl.removeAttribute("aria-activedescendant");
      return;
    }
    nodes.forEach((n) => {
      n.classList.remove("is-active");
      n.setAttribute("aria-selected", "false");
    });
    activeIndex = ((index % nodes.length) + nodes.length) % nodes.length;
    const node = nodes[activeIndex];
    node.classList.add("is-active");
    node.setAttribute("aria-selected", "true");
    inputEl.setAttribute("aria-activedescendant", node.id);
    if (scroll) node.scrollIntoView({ block: "nearest" });
  }

  function moveActive(delta) {
    const nodes = itemNodes();
    if (nodes.length === 0) return;
    const next = activeIndex < 0 ? (delta > 0 ? 0 : nodes.length - 1) : activeIndex + delta;
    setActive(next);
  }

  function selectIndex(index) {
    const result = results[index];
    if (!result) return;
    // Konsumenten können das `select`-Event per preventDefault() abfangen und
    // die Navigation selbst übernehmen (z. B. Client-Side-Routing).
    const prevented = emit("select", { result });
    const href = getItemHref(result);
    if (closeOnSelect) close();
    if (!prevented && href) {
      window.location.assign(href);
    }
  }

  // --- Open / Close ----------------------------------------------------------
  function open() {
    if (isOpen) return;
    isOpen = true;
    inputEl.setAttribute("aria-expanded", "true");

    if (mode === "modal" && dialogEl && typeof dialogEl.showModal === "function") {
      lastReturnFocus = document.activeElement;
      lockScroll();
      if (!dialogEl.open) dialogEl.showModal();
      // Im Modal ist das Overlay statisch im Dialog — kein [hidden]-Toggle nötig,
      // aber wir entfernen es konsistent.
      overlayEl.hidden = false;
      window.requestAnimationFrame(() => inputEl.focus());
    } else {
      overlayEl.hidden = false;
      overlayEl.classList.add("is-open");
    }
    if (!results.length && inputEl.value.trim().length < minQueryLength) {
      setState("hint");
    }
    emit("open", {});
  }

  function close() {
    if (!isOpen) return;
    isOpen = false;
    inputEl.setAttribute("aria-expanded", "false");
    inputEl.removeAttribute("aria-activedescendant");
    activeIndex = -1;

    if (mode === "modal" && dialogEl) {
      unlockScroll();
      if (dialogEl.open) dialogEl.close();
      // returnFocus: schließt die in der Referenz dokumentierte Fokus-Lücke.
      if (lastReturnFocus && typeof lastReturnFocus.focus === "function") {
        lastReturnFocus.focus();
      }
      lastReturnFocus = null;
    } else {
      overlayEl.classList.remove("is-open");
      overlayEl.hidden = true;
    }
    emit("close", {});
  }

  function lockScroll() {
    scrollLockPrev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }
  function unlockScroll() {
    document.body.style.overflow = scrollLockPrev;
  }

  // --- Such-Pipeline mit Debounce + Generation-Guard ------------------------
  function onInput() {
    const query = inputEl.value.trim();
    if (debounceTimer) clearTimeout(debounceTimer);

    if (query.length < minQueryLength) {
      results = [];
      generation++; // laufende Suche entwerten
      setState("hint");
      emit("query", { query });
      return;
    }

    emit("query", { query });
    if (!isOpen) open();
    setState("loading");

    debounceTimer = setTimeout(() => runSearch(query), debounceMs);
  }

  async function runSearch(query) {
    const myGen = ++generation;
    const controllerSignal = createSignal();
    let payload;
    try {
      payload = await search(query, { signal: controllerSignal.signal });
    } catch (error) {
      if (myGen !== generation) return; // veraltet -> ignorieren
      results = [];
      setState("no-results");
      return;
    }
    // Race-Guard: ein neuerer Lauf hat begonnen -> dieses Ergebnis verwerfen.
    if (myGen !== generation) return;
    // null = superseded (z. B. Pagefind debouncedSearch) -> ignorieren.
    if (payload == null) return;

    results = Array.isArray(payload) ? payload : [];
    if (!isOpen) open();
    renderResults(query);
  }

  function createSignal() {
    if (typeof AbortController === "function") {
      const ac = new AbortController();
      return { signal: ac.signal, abort: () => ac.abort() };
    }
    return { signal: undefined, abort: () => {} };
  }

  // --- Tastatur am Input -----------------------------------------------------
  function onKeydown(event) {
    switch (event.key) {
      case "ArrowDown":
        if (!isOpen) open();
        event.preventDefault();
        moveActive(1);
        break;
      case "ArrowUp":
        event.preventDefault();
        moveActive(-1);
        break;
      case "Home":
        if (itemNodes().length) {
          event.preventDefault();
          setActive(0);
        }
        break;
      case "End":
        if (itemNodes().length) {
          event.preventDefault();
          setActive(itemNodes().length - 1);
        }
        break;
      case "Enter":
        if (activeIndex >= 0) {
          event.preventDefault();
          selectIndex(activeIndex);
        }
        break;
      case "Escape":
        if (isOpen) {
          event.preventDefault();
          if (mode !== "modal") inputEl.blur();
          close();
        }
        break;
      default:
        break;
    }
  }

  // --- Globale Shortcuts (Strg/Cmd+K, '/') ----------------------------------
  function onGlobalKeydown(event) {
    const k = event.key.toLowerCase();
    const isShortcut = (isMod(event) && k === "k") || (event.key === "/" && !isTypingTarget(event.target));
    if (isShortcut) {
      event.preventDefault();
      open();
      window.requestAnimationFrame(() => inputEl.focus());
    }
  }

  function isTypingTarget(el) {
    if (!el) return false;
    const tag = el.tagName;
    return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || el.isContentEditable;
  }

  // --- Inline-Modus: Klick außerhalb schließt -------------------------------
  function onDocumentPointerDown(event) {
    if (mode === "modal") return;
    if (!isOpen) return;
    const within =
      inputEl.contains(event.target) ||
      (overlayEl && overlayEl.contains(event.target)) ||
      extraContainerRefs.some((ref) => {
        const el = resolveEl(ref);
        return el ? el.contains(event.target) : false;
      });
    if (!within) close();
  }

  // --- Dialog-native Close (ESC / Backdrop) abfangen für returnFocus --------
  function onDialogClose() {
    if (isOpen) close();
  }

  // --- CustomEvents ----------------------------------------------------------
  function emit(type, detail) {
    const event = new CustomEvent(`gat-search:${type}`, {
      detail,
      bubbles: true,
      cancelable: true,
    });
    inputEl.dispatchEvent(event);
    if (overlayEl && overlayEl !== inputEl) overlayEl.dispatchEvent(event);
    return event.defaultPrevented;
  }

  // --- Listener-Verdrahtung (für sauberes destroy gespeichert) --------------
  const bound = [];
  function on(target, type, handler, opts) {
    target.addEventListener(type, handler, opts);
    bound.push(() => target.removeEventListener(type, handler, opts));
  }

  on(inputEl, "input", onInput);
  on(inputEl, "keydown", onKeydown);
  on(inputEl, "focus", () => {
    if (mode === "inline" && inputEl.value.trim().length >= minQueryLength && results.length) open();
  });
  on(document, "pointerdown", onDocumentPointerDown);
  if (shortcut) on(document, "keydown", onGlobalKeydown);
  triggerEls.forEach((t) =>
    on(t, "click", (event) => {
      event.preventDefault();
      open();
      window.requestAnimationFrame(() => inputEl.focus());
    }),
  );
  if (dialogEl) on(dialogEl, "close", onDialogClose);

  // Initialer Zustand.
  if (mode === "inline") {
    overlayEl.hidden = true;
  }
  setState("empty");

  // --- Öffentlicher Controller ----------------------------------------------
  return {
    open,
    close,
    focus() {
      inputEl.focus();
    },
    setQuery(q) {
      inputEl.value = q == null ? "" : String(q);
      onInput();
    },
    refresh() {
      onInput();
    },
    destroy() {
      if (debounceTimer) clearTimeout(debounceTimer);
      generation++;
      bound.forEach((off) => off());
      bound.length = 0;
      if (isOpen) close();
    },
  };
}
