/**
 * Smoothly scrolls a detail / information panel into view, leaving room for the
 * sticky site header (and the mobile tab bar) so the content is never hidden
 * behind it.
 *
 * Used when a student taps a dosage form or a piece of equipment: instead of
 * making them scroll down to find the dossier, the page moves to it.
 *
 * Safe to call with a null ref (screen reader / splash / missing node): no-op.
 */
export function scrollInfoIntoView(el: HTMLElement | null): void {
  if (!el || typeof window === 'undefined') return;

  // The sticky header is taller on phones because the tab bar wraps underneath it.
  const isCompact =
    typeof window.matchMedia === 'function'
      ? window.matchMedia('(max-width: 767px)').matches
      : window.innerWidth < 768;

  const headerOffset = isCompact ? 112 : 88;
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  const rect = el.getBoundingClientRect();

  // Already sitting comfortably under the header (typical desktop layout where
  // the index and the dossier are side by side) → don't yank the page around.
  const alreadyInPlace = rect.top >= headerOffset - 24 && rect.top <= viewportHeight * 0.55;
  if (alreadyInPlace) return;

  const target = rect.top + window.scrollY - headerOffset;
  window.scrollTo({ top: Math.max(target, 0), behavior: 'smooth' });
}
