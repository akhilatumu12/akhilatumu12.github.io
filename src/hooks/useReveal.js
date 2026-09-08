import { useEffect } from "react";

/**
 * Adds `is-visible` to every `.reveal` element once it scrolls into view.
 * Elements can stagger themselves with an inline `transitionDelay`.
 *
 * A MutationObserver re-scans whenever new nodes mount, so elements added
 * after the first render — e.g. the extra cards behind "Show more" — get
 * observed too. Without it they stay at opacity 0 forever.
 */
export function useReveal(enabled = true) {
  useEffect(() => {
    // While the intro overlay is up the page is hidden behind it, so hold the
    // reveals until it clears — otherwise the hero animates where nobody sees it.
    if (!enabled) return;

    const reveal = (node) => node.classList.add("is-visible");
    const allHidden = () => document.querySelectorAll(".reveal:not(.is-visible)");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // No IntersectionObserver (or reduced motion): show everything immediately,
    // including anything that mounts later.
    if (reduced || typeof IntersectionObserver === "undefined") {
      const showAll = () => allHidden().forEach(reveal);
      showAll();
      const mutations = new MutationObserver(showAll);
      mutations.observe(document.body, { childList: true, subtree: true });
      return () => mutations.disconnect();
    }

    let observerFired = false;

    const observer = new IntersectionObserver(
      (entries) => {
        observerFired = true;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    // Re-observing an element already being observed is a no-op, so this is
    // safe to call repeatedly.
    const observeAll = () => allHidden().forEach((node) => observer.observe(node));
    observeAll();

    // Batch bursts of DOM changes into a single rescan. A timer rather than
    // rAF, so it still runs where the frame loop is throttled.
    let rescan = 0;
    const mutations = new MutationObserver(() => {
      clearTimeout(rescan);
      rescan = setTimeout(observeAll, 16);
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    /* ── Safety nets ───────────────────────────────────────────────
       Content must never be permanently invisible just because an
       observer did not report. These use plain timers, so they still
       work where the rendering pipeline (rAF / IntersectionObserver)
       is throttled or unavailable. In a healthy browser the observer
       has already fired long before these run, making them no-ops. */

    const onScreen = (node) => {
      const r = node.getBoundingClientRect();
      return r.height > 0 && r.top < window.innerHeight && r.bottom > 0;
    };

    // 1. Anything sitting in the viewport gets shown regardless.
    const failsafeInView = setTimeout(() => {
      allHidden().forEach((node) => {
        if (onScreen(node)) reveal(node);
      });
    }, 1200);

    // 2. If the observer never reported at all, treat it as unavailable
    //    and just show everything rather than leave a blank page.
    const failsafeAll = setTimeout(() => {
      if (!observerFired) allHidden().forEach(reveal);
    }, 4000);

    return () => {
      clearTimeout(failsafeInView);
      clearTimeout(failsafeAll);
      clearTimeout(rescan);
      mutations.disconnect();
      observer.disconnect();
    };
  }, [enabled]);
}

/**
 * Tracks which section is currently in the viewport, for nav highlighting.
 */
export function useActiveSection(ids, setActive) {
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { threshold: [0.2, 0.5], rootMargin: "-72px 0px -40% 0px" }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids, setActive]);
}
