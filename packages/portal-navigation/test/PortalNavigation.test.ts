import { aTimeout, expect, fixture, html, oneEvent, waitUntil } from '@open-wc/testing';
import { setViewport } from '@web/test-runner-commands';
import sinon from 'sinon';

import '../src/portal-navigation.js';
import { PortalNavigation } from '../src/PortalNavigation.js';
import { MenuLabel } from '../src/Configuration.js';

const TEST_DATA_JSON_PATH = '/packages/portal-navigation/test/test-data.json!';

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
const childrenRendered = async (el: HTMLElement, selector = '[part="item-parent2"]', options?: WaitUntilOptions) => {
  await waitUntil(() => !!el.shadowRoot?.querySelector(selector), 'Element did not render children', options);
};

beforeEach(async () => {
  await setViewport({ width: 1200, height: 800 });
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
              new CustomEvent(PortalNavigation.events.setBadgeValue, {
                detail: {
                  id: 'meta',
                  value: 9,
                },
              })
            );

            document.dispatchEvent(
              new CustomEvent(PortalNavigation.events.setBadgeValue, {
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

    it('each item has a `part` attribute corresponding to its id', async () => {
      const el: PortalNavigation = await fixture(
        html` <portal-navigation src="${TEST_DATA_JSON_PATH}" internalrouting currentapplication="app1"></portal-navigation>`
      );
      await childrenRendered(el);

      // Set parent2 as "active" item (should default to its child…)
      const clickMenuItem = () => (<HTMLAnchorElement>el.shadowRoot!.querySelector('[part="item-parent2"]')!).click();
      setTimeout(clickMenuItem);
      await aTimeout(10); // Not needed, only here so the TS compiler does not complain about an unused import…

      // Assets part attributes
      expect(el.shadowRoot!.querySelector('[part="item-parent1"]'), 'part="item-parent1" should be present').not.to.equal(null);
      expect(el.shadowRoot!.querySelector('[part="item-parent2"]'), 'part="item-parent2" should be present').not.to.equal(null);
      expect(el.shadowRoot!.querySelector('[part="item-item2.1"]'), 'part="item-item2.1" should be present').not.to.equal(null);
      expect(el.shadowRoot!.querySelector('[part="item-item2.2"]'), 'part="item-item2.2" should be present').not.to.equal(null);
    });

    it('sets badge for a given menu item', async () => {
      const badgeLabel: MenuLabel = { en: 'new', de: 'neu' };
      const el: PortalNavigation = await fixture(
        html` <portal-navigation
          src="${TEST_DATA_JSON_PATH}"
          @portal-navigation.configured="${() => {
            document.dispatchEvent(
              new CustomEvent(PortalNavigation.events.setBadgeValue, {
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
    });
  });

  describe('Routing', () => {
    it.skip('sets activeUrl from current window location', async () => {
      // Cannot implement this yet since we cannot mock window.location in tests
    });

    it('does route externally when default item of parent item has other application', async () => {
      // const eventSpy = sinon.spy();
      // const el: PortalNavigation = await fixture(html`<portal-navigation src="${TEST_DATA_JSON_PATH}" currentApplication="app2" internalRouting @portal-navigation.routeTo="${eventSpy as EventListener}"></portal-navigation>`);
      const el: PortalNavigation = await fixture(
        html`<portal-navigation src="${TEST_DATA_JSON_PATH}" currentApplication="app2" internalRouting></portal-navigation>`
      );
      await childrenRendered(el);

      // Menu item from app1, should navigate externally
      const menuItem = <HTMLAnchorElement>el.shadowRoot!.querySelector('[part="item-parent2"]');

      // If the event does not get prevented in the component, we would navigate away from the page…
      let externalNavigationOccurred = false;
      // let clickEvent: Event;
      menuItem.addEventListener('click', (e: Event) => {
        // clickEvent = e;
        e.preventDefault();
        externalNavigationOccurred = true;
      });

      // Click menu item here
      setTimeout(() => menuItem.click());
      await aTimeout(1); // Needed, otherwise the click event hasn't occurred yet…

      // noinspection JSUnusedAssignment
      // expect(clickEvent!.defaultPrevented).to.be.false;
      expect(externalNavigationOccurred).to.be.true;
      // expect(eventSpy.callCount).to.equal(0);
    });

    it('does route internally when default item of parent item has same application', async () => {
      const el: PortalNavigation = await fixture(
        html`<portal-navigation src="${TEST_DATA_JSON_PATH}" currentApplication="app1" internalRouting></portal-navigation>`
      );
      await childrenRendered(el);

      const item = <HTMLAnchorElement>el.shadowRoot!.querySelector('[part="item-parent2"]');
      setTimeout(() => item.click());
      const { detail } = await oneEvent(el, 'portal-navigation.routeTo');

      expect(detail.url).to.equal('/some/path/item2.2');
    });

    it('does route internally when default item of parent item has same application', async () => {
      const el: PortalNavigation = await fixture(
        html`<portal-navigation src="${TEST_DATA_JSON_PATH}" currentApplication="app1" internalRouting></portal-navigation>`
      );
      await childrenRendered(el);

      setTimeout(() => (<HTMLAnchorElement>el.shadowRoot!.querySelector('[part="item-parent2"]')).click());
      const { detail } = await oneEvent(el, 'portal-navigation.routeTo');

      expect(detail.url).to.equal('/some/path/item2.2');
      expect(el.getActivePath().getMenuId()).to.equal('main');
      expect(el.getActivePath().getFirstLevelItemId()).to.equal('parent2');
      expect(el.getActivePath().getId(2)).to.equal('item2.2');
    });

    it('does not close an expanded mobile menu when the parent item with a default item has been clicked', async () => {
      const eventSpy = sinon.spy();
      const el: PortalNavigation = await fixture(
        html`<portal-navigation
          src="${TEST_DATA_JSON_PATH}"
          currentApplication="app1"
          internalRouting
          mobileBreakpoint="1500"
          hamburgerMenuExpanded
          @hamburgerMenuExpanded="${eventSpy as EventListener}"
        ></portal-navigation>`
      );
      await childrenRendered(el);

      expect(el.hamburgerMenuExpanded).to.be.true;

      setTimeout(() => (<HTMLAnchorElement>el.shadowRoot!.querySelector('[part="item-parent2"]')).click());

      expect(eventSpy.callCount).to.equal(1);
      expect(el.hamburgerMenuExpanded).to.be.true;
    });

    it('does close an expanded mobile menu when a non-parent item has been clicked', async () => {
      const eventSpy = sinon.spy();
      const el: PortalNavigation = await fixture(
        html`<portal-navigation
          src="${TEST_DATA_JSON_PATH}"
          currentApplication="app1"
          internalRouting
          mobileBreakpoint="1500"
          hamburgerMenuExpanded
          @hamburgerMenuExpanded="${eventSpy as EventListener}"
        ></portal-navigation>`
      );
      await childrenRendered(el);

      expect(el.hamburgerMenuExpanded).to.be.true;

      setTimeout(() => (<HTMLAnchorElement>el.shadowRoot!.querySelector('[part="item-parent2"]')).click()); // Open accordion first
      setTimeout(() => (<HTMLAnchorElement>el.shadowRoot!.querySelector('[part="item-item2.2"]')).click()); // Click a child
      await aTimeout(1);

      expect(eventSpy.callCount).to.equal(2);
      expect(el.hamburgerMenuExpanded).to.be.false;
    });

    it('does route externally when item overrides globally set internalRouting=true with false.', async () => {
      const el: PortalNavigation = await fixture(
        html`<portal-navigation src="${TEST_DATA_JSON_PATH}" currentApplication="app2" internalRouting></portal-navigation>`
      );
      await childrenRendered(el);

      // First open parent
      setTimeout(() => (<HTMLAnchorElement>el.shadowRoot!.querySelector('[part="item-parent3"]')).click());
      await aTimeout(1);

      // Then select menu item that should navigate away from the page
      const menuItem = <HTMLAnchorElement>el.shadowRoot!.querySelector('[part="item-item3.2"]');

      // If the event does not get prevented in the component, we would navigate away from the page…
      let externalNavigationOccurred = false;
      let clickEvent: Event;
      menuItem.addEventListener('click', (e: Event) => {
        clickEvent = e;
        e.preventDefault(); // prevent navigating away from page
        externalNavigationOccurred = true;
      });

      // Click menu item here
      setTimeout(() => menuItem.click());
      await aTimeout(1);

      // noinspection JSUnusedAssignment
      expect(clickEvent!.defaultPrevented).to.be.true;
      expect(externalNavigationOccurred).to.be.true;
    });

    it('does ignore default item when destination is "extern" on parent item clicks, and does call e.preventDefault()', async () => {
      const eventSpy = sinon.spy();
      const el: PortalNavigation = await fixture(
        html`<portal-navigation src="${TEST_DATA_JSON_PATH}" internalRouting @portal-navigation.routeTo="${eventSpy as EventListener}"></portal-navigation>`
      );
      await childrenRendered(el);

      setTimeout(() => (<HTMLAnchorElement>el.shadowRoot!.querySelector('[part="item-parent5"]')).click());
      await aTimeout(1);

      expect(eventSpy.callCount).to.equal(0);
      expect(el.getActivePath().getMenuId()).to.equal('logout');
      expect(el.getActivePath().getId(2)).to.be.undefined;
      expect(el.getActivePath().getFirstLevelItemId()).to.equal('parent5');
    });

    it('dispatches the "routeTo" event', async () => {
      const el: PortalNavigation = await fixture(
        html`<portal-navigation src="${TEST_DATA_JSON_PATH}" internalrouting currentapplication="app2"></portal-navigation>`
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
  });

  describe('Events', () => {
    it('dispatches the "configured" event', async () => {
      const eventSpy = sinon.spy();
      const el: PortalNavigation = await fixture(
        html`<portal-navigation src="${TEST_DATA_JSON_PATH}" @portal-navigation.configured="${eventSpy as EventListener}"></portal-navigation>`
      );
      await oneEvent(el, 'portal-navigation.configured');
      expect(eventSpy.callCount).to.equal(1);
    });

    it('dispatches the "setLanguage" event', async () => {
      const eventSpy = sinon.spy();
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
      const eventSpy = sinon.spy();
      const el: PortalNavigation = await fixture(
        html`<portal-navigation
          src="${TEST_DATA_JSON_PATH}"
          @portal-navigation.configured="${eventSpy as EventListener}"
          mobileBreakpoint="600"
        ></portal-navigation>`
      );
      setTimeout(async () => await setViewport({ width: 600, height: 800 }));
      await oneEvent(el, 'portal-navigation.breakpointChanged');
      expect(eventSpy.callCount).to.equal(1);
    });
  });
});
