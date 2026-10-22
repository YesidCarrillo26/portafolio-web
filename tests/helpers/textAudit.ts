import type { Page } from '@playwright/test';

export interface TextAuditResult {
  viewport: number;
  /** Palabras de 3 o más letras partidas entre dos líneas. */
  brokenWords: string[];
  /** Elementos de texto grande (≥ 48px) que se salen del ancho de la pantalla. */
  overflowing: string[];
  /** Títulos que ocupan demasiadas líneas. */
  tallHeadings: string[];
  /** ¿El documento tiene scroll horizontal? */
  horizontalScroll: boolean;
}

/**
 * Mide la página en el navegador:
 * - Recorre cada nodo de texto visible y, por palabra, usa Range.getClientRects(): si una palabra genera
 *   rectángulos a alturas distintas, se partió en dos líneas.
 * - Ignora a propósito lo que se desplaza (marquesinas, pistas horizontales) y lo que está aria-hidden.
 */
export async function auditText(page: Page, opts: { maxHeadingLines?: number } = {}): Promise<TextAuditResult> {
  const maxHeadingLines = opts.maxHeadingLines ?? 4;
  return page.evaluate((maxLines) => {
    const brokenWords = new Set<string>();
    const overflowing = new Set<string>();
    const tallHeadings = new Set<string>();

    const skip = (el: Element | null) =>
      !!el?.closest('[aria-hidden="true"], [data-audit-ignore], script, style, noscript, .animate-marquee');

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node: Node | null;
    while ((node = walker.nextNode())) {
      const el = node.parentElement;
      if (!el || !node.textContent?.trim() || skip(el)) continue;
      const style = getComputedStyle(el);
      if (style.display === 'none' || style.visibility === 'hidden') continue;
      if (el.getClientRects().length === 0) continue;

      const text = node.textContent;
      const fontSize = parseFloat(style.fontSize);
      const re = /\S+/g;
      let m: RegExpExecArray | null;
      while ((m = re.exec(text))) {
        const word = m[0].replace(/[.,;:!?¿¡()"“”]/g, '');
        if (word.length < 3) continue;
        const range = document.createRange();
        range.setStart(node, m.index);
        range.setEnd(node, m.index + m[0].length);
        const tops = new Set([...range.getClientRects()].filter((r) => r.width > 0.5).map((r) => Math.round(r.top / 4)));
        if (tops.size > 1) brokenWords.add(`${m[0]} (${Math.round(fontSize)}px, <${el.tagName.toLowerCase()}>)`);
      }

      if (fontSize >= 48) {
        const b = el.getBoundingClientRect();
        if (b.right > innerWidth + 1 || b.left < -1) overflowing.add(`${text.trim().slice(0, 30)} (${Math.round(fontSize)}px)`);
      }
    }

    document.querySelectorAll('h1, h2').forEach((h) => {
      if (skip(h)) return;
      const lh = parseFloat(getComputedStyle(h).lineHeight) || parseFloat(getComputedStyle(h).fontSize) * 1.1;
      const lines = Math.round(h.getBoundingClientRect().height / lh);
      if (lines > maxLines) tallHeadings.add(`${(h.textContent ?? '').trim().slice(0, 40)} (${lines} líneas)`);
    });

    return {
      viewport: innerWidth,
      brokenWords: [...brokenWords],
      overflowing: [...overflowing],
      tallHeadings: [...tallHeadings],
      horizontalScroll: document.documentElement.scrollWidth > innerWidth + 1,
    };
  }, maxHeadingLines);
}
