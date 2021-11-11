import { expect, fixture, html, oneEvent, waitUntil } from '@open-wc/testing';
import { setViewport } from '@web/test-runner-commands';
import { spy } from 'sinon';

import '../src/portal-navigation.js';
import { NavigationEventListeners, PortalNavigation } from '../src/PortalNavigation.js';
import { ConfigurationData, MenuLabel } from '../src/Configuration.js';
import dataJson from '../data/test-data.json';
import { DEFAULT_VIEWPORT_HEIGHT, DEFAULT_VIEWPORT_WIDTH, globalClickHandlerSpy, isInViewport } from './test-utils.js';

const configurationData = dataJson as ConfigurationData;

const TEST_DATA_JSON_PATH = './data/test-data.json!';

type WaitUntilOptions = {
  interval?: number;
  timeout?: number;
};

/**
 * Helper function that waits until the portal navigation children have been rendered.
 *
 * @param el
 * @param selector
 * @param options
 * @see https://open-wc.org/docs/testing/helpers/#waituntil
 */
const childrenRendered = async (el: HTMLElement, selector = '[part="item-parent2"]', options: WaitUntilOptions = { interval: 10, timeout: 10000 }) => {
  await waitUntil(() => !!el.shadowRoot?.querySelector(selector), 'Element did not render children', options);
};

beforeEach(async () => {
  await setViewport({ width: DEFAULT_VIEWPORT_WIDTH, height: DEFAULT_VIEWPORT_HEIGHT });
});

/**
 * PortalNavigation web component integration tests
 *
 * @see https://open-wc.org/docs/testing/helpers/
 */
describe('<portal-navigation>', () => {
  describe('Display', () => {
    // We have to skip this since FF + Safari render the component differently…
    it.skip('is empty by default', async () => {
      const el: PortalNavigation = await fixture(html` <portal-navigation></portal-navigation>`);
      expect(el.shadowRoot!.innerHTML).to.equal('<!----><!---->');
    });

    it('is displayed by default', async () => {
      const el: PortalNavigation = await fixture(html` <portal-navigation src="${TEST_DATA_JSON_PATH}"></portal-navigation>`);
      expect(el).to.be.displayed;
    });

    it('is hidden when attribute hidden is true', async () => {
      const el: PortalNavigation = await fixture(html` <portal-navigation src="${TEST_DATA_JSON_PATH}" hidden></portal-navigation>`);
      expect(el).not.to.be.displayed;
    });

    it('passes the a11y audit', async () => {
      const el: PortalNavigation = await fixture(
        html` <portal-navigation
          src="${TEST_DATA_JSON_PATH}"
          @portal-navigation.configured="${() => {
            document.dispatchEvent(
              new CustomEvent(NavigationEventListeners.setBadgeValue, {
                detail: {
                  id: 'meta',
                  value: 9,
                },
              })
            );

            document.dispatchEvent(
              new CustomEvent(NavigationEventListeners.setBadgeValue, {
                detail: {
                  id: 'parent2',
                  value: { en: 'new', de: 'neu' },
                },
              })
            );
          }}"
        ></portal-navigation>`
      );

      await childrenRendered(el);
      await expect(el).to.be.accessible();
    });

    it('is not visible when scrolled and not sticky (desktop)', async () => {
      const el: PortalNavigation = await fixture(
        html` <portal-navigation src="${TEST_DATA_JSON_PATH}"></portal-navigation>${[...Array(20).keys()].map(
            () =>
              html`<p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin fermentum ac est accumsan malesuada. Vivamus id scelerisque dolor. Duis feugiat
                ligula mi. Nullam nulla ligula, lobortis eu vulputate ac, tristique a elit. Aliquam quis dignissim tortor. Phasellus imperdiet, erat at dapibus
                porttitor, mi ante varius ante, sed congue libero magna ut urna. Aenean rutrum ante in vehicula tincidunt. Quisque urna odio, commodo eget leo
                sit amet, rhoncus tempus orci. Curabitur enim mi, sagittis nec tellus auctor, pellentesque consequat enim. Nulla finibus velit vel bibendum
                semper. Duis pulvinar id tellus a sagittis. Fusce a eros at turpis fermentum congue vestibulum vel justo. Ut nec elit congue, auctor dolor
                tincidunt, mattis sapien. Cras mi turpis, dictum in tempor id, blandit eget tortor. Curabitur nec libero vel lacus mollis accumsan. Maecenas
                metus tellus, finibus non volutpat vel, egestas quis velit.
              </p>`
          )}`
      );
      window.scroll(0, 1000);
      expect(isInViewport(el.shadowRoot!.querySelector('.container')!)).to.be.false;
    });

    it('is visible when scrolled and sticky (desktop)', async () => {
      const el: PortalNavigation = await fixture(
        html` <portal-navigation src="${TEST_DATA_JSON_PATH}" sticky></portal-navigation>${[...Array(20).keys()].map(
            () =>
              html`<p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin fermentum ac est accumsan malesuada. Vivamus id scelerisque dolor. Duis feugiat
                ligula mi. Nullam nulla ligula, lobortis eu vulputate ac, tristique a elit. Aliquam quis dignissim tortor. Phasellus imperdiet, erat at dapibus
                porttitor, mi ante varius ante, sed congue libero magna ut urna. Aenean rutrum ante in vehicula tincidunt. Quisque urna odio, commodo eget leo
                sit amet, rhoncus tempus orci. Curabitur enim mi, sagittis nec tellus auctor, pellentesque consequat enim. Nulla finibus velit vel bibendum
                semper. Duis pulvinar id tellus a sagittis. Fusce a eros at turpis fermentum congue vestibulum vel justo. Ut nec elit congue, auctor dolor
                tincidunt, mattis sapien. Cras mi turpis, dictum in tempor id, blandit eget tortor. Curabitur nec libero vel lacus mollis accumsan. Maecenas
                metus tellus, finibus non volutpat vel, egestas quis velit.
              </p>`
          )}`
      );
      window.scroll(0, 1000);
      expect(isInViewport(el.shadowRoot!.querySelector('.container')!)).to.be.true;
    });

    it('is not visible when scrolled and not sticky (mobile)', async () => {
      await setViewport({ width: 600, height: 400 });
      const el: PortalNavigation = await fixture(
        html` <portal-navigation src="${TEST_DATA_JSON_PATH}" mobilebreakpoint="600"></portal-navigation>${[...Array(20).keys()].map(
            () =>
              html`<p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin fermentum ac est accumsan malesuada. Vivamus id scelerisque dolor. Duis feugiat
                ligula mi. Nullam nulla ligula, lobortis eu vulputate ac, tristique a elit. Aliquam quis dignissim tortor. Phasellus imperdiet, erat at dapibus
                porttitor, mi ante varius ante, sed congue libero magna ut urna. Aenean rutrum ante in vehicula tincidunt. Quisque urna odio, commodo eget leo
                sit amet, rhoncus tempus orci. Curabitur enim mi, sagittis nec tellus auctor, pellentesque consequat enim. Nulla finibus velit vel bibendum
                semper. Duis pulvinar id tellus a sagittis. Fusce a eros at turpis fermentum congue vestibulum vel justo. Ut nec elit congue, auctor dolor
                tincidunt, mattis sapien. Cras mi turpis, dictum in tempor id, blandit eget tortor. Curabitur nec libero vel lacus mollis accumsan. Maecenas
                metus tellus, finibus non volutpat vel, egestas quis velit.
              </p>`
          )}`
      );
      window.scroll(0, 1000);
      expect(isInViewport(el.shadowRoot!.querySelector('.container')!)).to.be.false;
    });

    it('is visible when scrolled and sticky (mobile)', async () => {
      await setViewport({ width: 600, height: 400 });
      const el: PortalNavigation = await fixture(
        html` <portal-navigation src="${TEST_DATA_JSON_PATH}" sticky mobilebreakpoint="600"></portal-navigation>${[...Array(20).keys()].map(
            () =>
              html`<p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin fermentum ac est accumsan malesuada. Vivamus id scelerisque dolor. Duis feugiat
                ligula mi. Nullam nulla ligula, lobortis eu vulputate ac, tristique a elit. Aliquam quis dignissim tortor. Phasellus imperdiet, erat at dapibus
                porttitor, mi ante varius ante, sed congue libero magna ut urna. Aenean rutrum ante in vehicula tincidunt. Quisque urna odio, commodo eget leo
                sit amet, rhoncus tempus orci. Curabitur enim mi, sagittis nec tellus auctor, pellentesque consequat enim. Nulla finibus velit vel bibendum
                semper. Duis pulvinar id tellus a sagittis. Fusce a eros at turpis fermentum congue vestibulum vel justo. Ut nec elit congue, auctor dolor
                tincidunt, mattis sapien. Cras mi turpis, dictum in tempor id, blandit eget tortor. Curabitur nec libero vel lacus mollis accumsan. Maecenas
                metus tellus, finibus non volutpat vel, egestas quis velit.
              </p>`
          )}`
      );
      window.scroll(0, 1000);
      expect(isInViewport(el.shadowRoot!.querySelector('.container')!)).to.be.true;
    });

    it('adds top padding to anchor element when sticky', async () => {
      const el: PortalNavigation = await fixture(
        html` <portal-navigation src="${TEST_DATA_JSON_PATH}" sticky anchor="body"></portal-navigation>${[...Array(20).keys()].map(
            () =>
              html`<p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin fermentum ac est accumsan malesuada. Vivamus id scelerisque dolor. Duis feugiat
                ligula mi. Nullam nulla ligula, lobortis eu vulputate ac, tristique a elit. Aliquam quis dignissim tortor. Phasellus imperdiet, erat at dapibus
                porttitor, mi ante varius ante, sed congue libero magna ut urna. Aenean rutrum ante in vehicula tincidunt. Quisque urna odio, commodo eget leo
                sit amet, rhoncus tempus orci. Curabitur enim mi, sagittis nec tellus auctor, pellentesque consequat enim. Nulla finibus velit vel bibendum
                semper. Duis pulvinar id tellus a sagittis. Fusce a eros at turpis fermentum congue vestibulum vel justo. Ut nec elit congue, auctor dolor
                tincidunt, mattis sapien. Cras mi turpis, dictum in tempor id, blandit eget tortor. Curabitur nec libero vel lacus mollis accumsan. Maecenas
                metus tellus, finibus non volutpat vel, egestas quis velit.
              </p>`
          )}`
      );
      const container = el.shadowRoot!.querySelector('.container')!;
      const body = document.querySelector('body')!;
      await waitUntil(() => container.getBoundingClientRect().height > 0, 'Container should have a height', { interval: 10, timeout: 10000 });
      await waitUntil(() => body.style.paddingTop !== '', 'Anchor should have a padding', { interval: 10, timeout: 10000 });
      const { height = 0 } = container.getBoundingClientRect() || {};
      expect(height).to.be.greaterThan(0);
      expect(body!.style.paddingTop).to.equal(`${height}px`);
    });

    it('expanded menu items show their children in mobile breakpoint', async () => {
      await setViewport({ width: 600, height: 400 });
      const el: PortalNavigation = await fixture(
        html` <portal-navigation src="${TEST_DATA_JSON_PATH}" mobilebreakpoint="600" currentapplication="app1" internalrouting></portal-navigation>`
      );

      el.hamburgerMenuExpanded = true;
      await childrenRendered(el, '[part="item-item5.1"]');

      expect(<HTMLElement>el.shadowRoot!.querySelector('[part="item-item5.1"]')!).to.be.visible;
    });
  });

  describe('Structure', () => {
    it('returns sorted array of known menu ids', () => {
      expect(PortalNavigation.menuIdsOrdered).to.deep.equal(['main', 'settings', 'meta', 'profile', 'logout']);
    });

    it('sets corresponding activePath when activeUrl is set', async () => {
      const el: PortalNavigation = await fixture(html` <portal-navigation src="${TEST_DATA_JSON_PATH}"></portal-navigation>`);

      el.activeUrl = '/some/path/item3.2';
      await childrenRendered(el, '[part="item-item3.2"]');

      expect(el.getActivePath().getMenuId()).to.eq('meta');
      expect(el.getActivePath().getFirstLevelItemId()).to.eq('parent3');
      expect(el.getActivePath().getId(2)).to.eq('item3.2');
    });

    it('can return its parsed configuration', async () => {
      const el: PortalNavigation = await fixture(html` <portal-navigation src="${TEST_DATA_JSON_PATH}"></portal-navigation>`);
      await childrenRendered(el);
      const configuration = el.getConfiguration();
      expect(configuration).to.not.be.undefined;
      expect(configuration.getMenus()?.length).to.equal(configurationData.menus?.length);
      configuration.getMenus()?.forEach(menu => {
        expect(menu.items?.length).to.be.equal(configurationData.menus?.find(m => m.id === menu.id)?.items?.length);
      });
    });

    it('each item has a `part` attribute corresponding to its id', async () => {
      const el: PortalNavigation = await fixture(
        html` <portal-navigation src="${TEST_DATA_JSON_PATH}" internalrouting currentapplication="app1"></portal-navigation>`
      );
      await childrenRendered(el);

      // Set parent2 as "active" item (should default to its child…)
      setTimeout(() => (<HTMLAnchorElement>el.shadowRoot!.querySelector('[part="item-parent2"]')!).click());
      await childrenRendered(el, '[part="item-item2.1"]');

      // Assets part attributes
      expect(el.shadowRoot!.querySelector('[part="item-parent1"]'), 'part="item-parent1" should be present').not.to.equal(null);
      expect(el.shadowRoot!.querySelector('[part="item-parent2"]'), 'part="item-parent2" should be present').not.to.equal(null);
      expect(el.shadowRoot!.querySelector('[part="item-item2.1"]'), 'part="item-item2.1" should be present').not.to.equal(null);
      expect(el.shadowRoot!.querySelector('[part="item-item2.2"]'), 'part="item-item2.2" should be present').not.to.equal(null);
    });

    it('sets badge for a given menu item id', async () => {
      const badgeLabel: MenuLabel = { en: 'new', de: 'neu' };
      const el: PortalNavigation = await fixture(
        html` <portal-navigation
          src="${TEST_DATA_JSON_PATH}"
          @portal-navigation.configured="${() => {
            document.dispatchEvent(
              new CustomEvent(NavigationEventListeners.setBadgeValue, {
                detail: {
                  id: 'parent2',
                  value: badgeLabel,
                },
              })
            );
          }}"
        ></portal-navigation>`
      );
      await childrenRendered(el);

      expect(el.getTemporaryBadgeValues().get('parent2')).equals(badgeLabel);
      expect(el.shadowRoot!.querySelector('[part="badge-parent2"]')).not.to.be.null;
      expect(el.shadowRoot!.querySelector('[part="badge-parent2"]')!.textContent).to.equal('new');
    });

    it('sets badge for a given menu item url', async () => {
      const badgeLabel: MenuLabel = { en: 'new', de: 'neu' };
      const el: PortalNavigation = await fixture(
        html` <portal-navigation
          src="${TEST_DATA_JSON_PATH}"
          activeUrl="/some/path/item2.2"
          @portal-navigation.configured="${() => {
            document.dispatchEvent(
              new CustomEvent(NavigationEventListeners.setBadgeValue, {
                detail: {
                  url: '/some/path/item2.2',
                  value: badgeLabel,
                },
              })
            );
          }}"
        ></portal-navigation>`
      );
      await childrenRendered(el, '[part="item-item2.2"]');

      expect(el.getTemporaryBadgeValues().get('item2.2')).equals(badgeLabel);
      expect(el.shadowRoot!.querySelector('[part="badge-item2.2"]')).not.to.be.null;
      expect(el.shadowRoot!.querySelector('[part="badge-item2.2"]')!.textContent).to.equal('new');
    });

    it('sets badge for a given menu item id, then url', async () => {
      const el: PortalNavigation = await fixture(
        html` <portal-navigation
          src="${TEST_DATA_JSON_PATH}"
          activeUrl="/some/path/item2.2"
          @portal-navigation.configured="${() => {
            document.dispatchEvent(
              new CustomEvent(NavigationEventListeners.setBadgeValue, {
                detail: {
                  id: 'item2.2',
                  value: 1,
                },
              })
            );
          }}"
        ></portal-navigation>`
      );

      await childrenRendered(el, '[part="item-item2.2"]');
      expect(el.shadowRoot!.querySelector('[part="badge-item2.2"]')!.textContent).to.equal('1');

      const event = oneEvent(document, NavigationEventListeners.setBadgeValue);
      setTimeout(() => {
        document.dispatchEvent(
          new CustomEvent(NavigationEventListeners.setBadgeValue, {
            detail: {
              url: '/some/path/item2.2',
              value: 2,
            },
          })
        );
      });
      await event;

      await childrenRendered(el, '[part="badge-item2.2"]');
      expect(el.shadowRoot!.querySelector('[part="badge-item2.2"]')!.textContent).to.equal('2');
    });

    it('sets the active url using event listeners', async () => {
      const el: PortalNavigation = await fixture(
        html` <portal-navigation
          src="${TEST_DATA_JSON_PATH}"
          @portal-navigation.configured="${() => {
            document.dispatchEvent(
              new CustomEvent(NavigationEventListeners.setActiveUrl, {
                detail: '/some/path/item2.2',
              })
            );
          }}"
        ></portal-navigation>`
      );
      await childrenRendered(el, '[part="item-item2.2"]');

      expect(el.activeUrl).equals('/some/path/item2.2');
      expect(el.shadowRoot!.querySelector('[part="item-item2.2"]')).not.to.be.null;
    });
  });

  describe('Routing', () => {
    let origHref: string;

    beforeEach(() => {
      origHref = window.location.href;
      document.addEventListener('click', globalClickHandlerSpy);
    });

    afterEach(() => {
      document.removeEventListener('click', globalClickHandlerSpy);
      window.history.replaceState({}, '', origHref);
    });

    it('sets activeUrl from current window location', async () => {
      const origHref = window.location.href;
      window.history.replaceState({}, '', '/test');
      const el: PortalNavigation = await fixture(html` <portal-navigation src="${TEST_DATA_JSON_PATH}"></portal-navigation>`);
      expect(el.activeUrl).to.equal('/test');
      window.history.replaceState({}, '', origHref);
    });

    it('does route internally when default item of parent item has same application', async () => {
      const el: PortalNavigation = await fixture(
        html` <portal-navigation src="${TEST_DATA_JSON_PATH}" currentapplication="app1" internalrouting></portal-navigation>`
      );
      await childrenRendered(el);

      const item = <HTMLAnchorElement>el.shadowRoot!.querySelector('[part="item-parent2"]');
      setTimeout(() => item.click());
      const { detail } = await oneEvent(el, 'portal-navigation.routeTo');

      expect(detail.url).to.equal('/some/path/item2.2');
      expect(el.getActivePath().getMenuId()).to.equal('main');
      expect(el.getActivePath().getFirstLevelItemId()).to.equal('parent2');
      expect(el.getActivePath().getId(2)).to.equal('item2.2');
    });

    it('does not close an expanded mobile menu when the parent item with a default item has been clicked', async () => {
      // noinspection DuplicatedCode
      const eventSpy = spy();
      const el: PortalNavigation = await fixture(
        html` <portal-navigation
          src="${TEST_DATA_JSON_PATH}"
          currentapplication="app1"
          internalrouting
          mobilebreakpoint="${DEFAULT_VIEWPORT_WIDTH - 1}"
          hamburgermenuexpanded
          @portal-navigation.hamburgerMenuExpanded="${eventSpy as EventListener}"
        ></portal-navigation>`
      );
      await childrenRendered(el);

      expect(el.hamburgerMenuExpanded).to.be.true;
      expect(eventSpy.callCount).to.equal(1);

      setTimeout(() => (<HTMLAnchorElement>el.shadowRoot!.querySelector('[part="item-parent2"]')).click());

      expect(eventSpy.callCount).to.equal(1);
      expect(el.hamburgerMenuExpanded).to.be.true;
    });

    it('does open menu items with children in mobile breakpoint without navigating', async () => {
      await setViewport({ width: 600, height: DEFAULT_VIEWPORT_HEIGHT });

      const el: PortalNavigation = await fixture(
        html` <portal-navigation
          src="${TEST_DATA_JSON_PATH}"
          currentapplication="app1"
          internalrouting
          mobilebreakpoint="${DEFAULT_VIEWPORT_WIDTH - 1}"
          hamburgermenuexpanded
        ></portal-navigation>`
      );
      await childrenRendered(el);

      setTimeout(() => (<HTMLAnchorElement>el.shadowRoot!.querySelector('[part="item-parent2"]')).click());
      await childrenRendered(el, '[part="item-item2.1"]');

      expect(el.hamburgerMenuExpanded).to.be.true;
      expect(el.getActivePath().getMenuId()).to.equal('main');
      expect(el.getActivePath().getFirstLevelItemId()).to.equal('parent2');

      setTimeout(() => (<HTMLAnchorElement>el.shadowRoot!.querySelector('[part="item-parent6"]')).click());
      await childrenRendered(el, '[part="item-item6.1"]');

      expect(el.hamburgerMenuExpanded).to.be.true;
      expect(el.getActivePath().getMenuId()).to.equal('main');
      expect(el.getActivePath().getFirstLevelItemId()).to.equal('parent6');

      // External item (different app)
      const windowLocationBefore = window.location.pathname;
      setTimeout(() => (<HTMLAnchorElement>el.shadowRoot!.querySelector('[part="item-parent7"]')).click());
      await childrenRendered(el, '[part="item-item7.1"]');

      expect(el.hamburgerMenuExpanded).to.be.true;
      expect(el.getActivePath().getMenuId()).to.equal('main');
      expect(el.getActivePath().getFirstLevelItemId()).to.equal('parent7');

      // Location should not change (no external routing)
      expect(window.location.pathname).to.equal(windowLocationBefore);
    });

    it('does close menu items with children in mobile breakpoint without navigating', async () => {
      await setViewport({ width: 600, height: DEFAULT_VIEWPORT_HEIGHT });

      const el: PortalNavigation = await fixture(
        html` <portal-navigation
          src="${TEST_DATA_JSON_PATH}"
          currentapplication="app1"
          internalrouting
          mobilebreakpoint="${DEFAULT_VIEWPORT_WIDTH - 1}"
          hamburgermenuexpanded
        ></portal-navigation>`
      );
      await childrenRendered(el);

      setTimeout(() => (<HTMLAnchorElement>el.shadowRoot!.querySelector('[part="item-parent2"]')).click());
      await childrenRendered(el, '[part="item-item2.1"]');

      expect(el.hamburgerMenuExpanded).to.be.true;
      expect(el.getActivePath().getMenuId()).to.equal('main');
      expect(el.getActivePath().getFirstLevelItemId()).to.equal('parent2');

      const clickElement = <HTMLAnchorElement>el.shadowRoot!.querySelector('[part="item-parent2"]');
      const click = oneEvent(clickElement, 'click');
      setTimeout(() => clickElement.click());
      await click;

      expect(el.hamburgerMenuExpanded).to.be.true;
      expect(el.getActivePath().isEmpty()).to.be.true;
    });

    it('does close an expanded mobile menu when a non-parent item has been clicked', async () => {
      // noinspection DuplicatedCode
      const eventSpy = spy();
      const el: PortalNavigation = await fixture(
        html` <portal-navigation
          src="${TEST_DATA_JSON_PATH}"
          currentapplication="app1"
          internalrouting
          mobilebreakpoint="${DEFAULT_VIEWPORT_WIDTH - 1}"
          hamburgermenuexpanded
          @portal-navigation.hamburgerMenuExpanded="${eventSpy as EventListener}"
        ></portal-navigation>`
      );
      await childrenRendered(el);

      expect(el.hamburgerMenuExpanded).to.be.true;

      setTimeout(() => (<HTMLAnchorElement>el.shadowRoot!.querySelector('[part="item-parent2"]')).click()); // Open accordion first
      setTimeout(() => (<HTMLAnchorElement>el.shadowRoot!.querySelector('[part="item-item2.2"]')).click()); // Click a child
      await oneEvent(el, 'portal-navigation.hamburgerMenuExpanded');

      expect(eventSpy.callCount).to.equal(2);
      expect(el.hamburgerMenuExpanded).to.be.false;
    });

    it('does route externally when default item of parent item has other application', async () => {
      const el: PortalNavigation = await fixture(
        html` <portal-navigation src="${TEST_DATA_JSON_PATH}" currentapplication="app2" internalrouting></portal-navigation>`
      );
      await childrenRendered(el);

      // Menu item from app1, should navigate externally
      const menuItem = <HTMLAnchorElement>el.shadowRoot!.querySelector('[part="item-parent2"]');

      // Click menu item here
      const clicked = oneEvent(document, 'click');
      setTimeout(() => menuItem.click());
      await clicked;

      expect(window.location.pathname).to.equal('/some/path/item2.2');
    });

    it('does route externally when item overrides globally set internalrouting=true with false.', async () => {
      const el: PortalNavigation = await fixture(
        html` <portal-navigation src="${TEST_DATA_JSON_PATH}" currentapplication="app2" internalrouting></portal-navigation>`
      );
      await childrenRendered(el);

      // First open parent
      setTimeout(() => (<HTMLAnchorElement>el.shadowRoot!.querySelector('[part="item-parent3"]')).click());
      await childrenRendered(el, '[part="item-item3.2"]');

      // Then select menu item that should navigate away from the page
      const menuItem = <HTMLAnchorElement>el.shadowRoot!.querySelector('[part="item-item3.2"]');

      // Click menu item here
      const clicked = oneEvent(document, 'click');
      setTimeout(() => menuItem.click());
      await clicked;

      expect(window.location.pathname).to.equal('/some/path/item3.2');
    });

    it('does ignore default item when destination is "extern" on parent item clicks, and does call e.preventDefault()', async () => {
      const eventSpy = spy();
      const el: PortalNavigation = await fixture(
        html` <portal-navigation src="${TEST_DATA_JSON_PATH}" internalrouting @portal-navigation.routeTo="${eventSpy as EventListener}"></portal-navigation>`
      );
      await childrenRendered(el);

      const clickElement = <HTMLAnchorElement>el.shadowRoot!.querySelector('[part="item-parent5"]');
      const clicked = oneEvent(clickElement, 'click');
      setTimeout(() => clickElement.click());
      await clicked;

      expect(eventSpy.callCount).to.equal(0);
      expect(el.getActivePath().getMenuId()).to.equal('logout');
      expect(el.getActivePath().getId(2)).to.be.undefined;
      expect(el.getActivePath().getFirstLevelItemId()).to.equal('parent5');
    });

    it('dispatches the "routeTo" event', async () => {
      const el: PortalNavigation = await fixture(
        html` <portal-navigation src="${TEST_DATA_JSON_PATH}" internalrouting currentapplication="app2"></portal-navigation>`
      );
      await childrenRendered(el, '[part="item-parent3"]');

      // @see https://open-wc.org/docs/testing/helpers/#testing-events
      setTimeout(() => (<HTMLAnchorElement>el.shadowRoot!.querySelector('[part="item-parent3"]')).click());
      const { detail } = await oneEvent(el, 'portal-navigation.routeTo');

      expect(detail.url).to.equal('/some/path/item3.1');
      expect(detail.label).to.deep.equal({
        de: 'Item 3.1_de',
        en: 'Item 3.1_en',
      });
    });

    it('dispatches the "routeTo" event when item has internalrouting=true and menu has no application set.', async () => {
      const el: PortalNavigation = await fixture(html` <portal-navigation src="${TEST_DATA_JSON_PATH}"></portal-navigation>`);
      await childrenRendered(el);

      setTimeout(() => (<HTMLAnchorElement>el.shadowRoot!.querySelector('[part="item-parent1"]')).click());
      const { detail } = await oneEvent(el, 'portal-navigation.routeTo');

      expect(window.location.pathname).to.equal('/');
      expect(detail.url).to.equal('/some/path/parent1');
    });
  });

  describe('Events', () => {
    it('dispatches the "configured" event', async () => {
      const eventSpy = spy();
      const el: PortalNavigation = await fixture(
        html` <portal-navigation src="${TEST_DATA_JSON_PATH}" @portal-navigation.configured="${eventSpy as EventListener}"></portal-navigation>`
      );
      await oneEvent(el, 'portal-navigation.configured');
      expect(eventSpy.callCount).to.equal(1);
    });

    it('dispatches the "setLanguage" event', async () => {
      const eventSpy = spy();
      const el: PortalNavigation = await fixture(
        html` <portal-navigation language="de" @portal-navigation.setLanguage="${eventSpy as EventListener}"></portal-navigation>`
      );

      // Should trow an event initially…
      expect(eventSpy.callCount).to.equal(1);

      el.language = 'en';
      const { detail } = await oneEvent(el, 'portal-navigation.setLanguage');

      // After changing the language again, the callCount should be increased once more…
      expect(eventSpy.callCount).to.equal(2);
      expect(detail).to.equal('en');
    });

    it('dispatches the "breakpointChanged" event', async () => {
      const el: PortalNavigation = await fixture(html` <portal-navigation src="${TEST_DATA_JSON_PATH}" mobilebreakpoint="600"></portal-navigation>`);
      setTimeout(async () => await setViewport({ width: 600, height: 800 }));
      const { detail } = await oneEvent(el, 'portal-navigation.breakpointChanged');
      expect(el.isMobileBreakpoint).to.be.true;
      expect(detail).to.be.true;
    });
  });
});
