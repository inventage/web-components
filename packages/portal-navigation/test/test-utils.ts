import { spy } from 'sinon';

export const DEFAULT_VIEWPORT_WIDTH = 1200;
export const DEFAULT_VIEWPORT_HEIGHT = 800;

/**
 * From pwa-helpers
 *
 * @see https://github.com/Polymer/pwa-helpers/blob/master/src/router.ts
 */
export const globalClickHandlerSpy = spy(e => {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) {
    return;
  }

  const anchor = e.composedPath().filter((n: HTMLElement) => n.tagName === 'A')[0] as HTMLAnchorElement | undefined;
  if (!anchor || (anchor.target && anchor.target !== '_self') || anchor.hasAttribute('download') || anchor.getAttribute('rel') === 'external') {
    return;
  }

  const href = anchor.href;
  if (!href || href.indexOf('mailto:') !== -1) {
    return;
  }

  const location = window.location;
  const origin = location.origin || location.protocol + '//' + location.host;

  if (href.indexOf(origin) !== 0) {
    return;
  }

  e.preventDefault();

  if (href !== location.href) {
    window.history.replaceState({}, '', href);
  }
});

/**
 * Checks whether an element is in viewport
 *
 * @param element
 */
export const isInViewport = (element: Element) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};
