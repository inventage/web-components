import { html, fixture, expect, assert } from '@open-wc/testing';
import sinon from 'sinon';

import { HamburgerMenu } from '../src/index.js';
import '../src/hamburger-menu.js';

describe('<hamburger-menu>', () => {
  describe('Structure', () => {
    it('is defined', () => {
      const el = document.createElement('hamburger-menu');
      assert.instanceOf(el, HamburgerMenu);
    });
  });

  describe('Functionality', () => {
    it('has a default toggled state', async () => {
      const el: HamburgerMenu = await fixture(html`<hamburger-menu></hamburger-menu>`);

      expect(el.toggled).to.equal(false);
    });

    it('can override the "toggled" state via attribute', async () => {
      const el: HamburgerMenu = await fixture(html`<hamburger-menu toggled></hamburger-menu>`);

      expect(el.toggled).to.equal(true);
    });

    it('can override the "toggled" state via property', async () => {
      const el: HamburgerMenu = await fixture(html`<hamburger-menu .toggled="${true}"></hamburger-menu>`);

      expect(el.toggled).to.equal(true);
    });

    it('toggles state on button click', async () => {
      const el: HamburgerMenu = await fixture(html`<hamburger-menu></hamburger-menu>`);
      expect(el.toggled).to.equal(false);

      el.shadowRoot!.querySelector('button')!.click();
      expect(el.toggled).to.equal(true);

      el.shadowRoot!.querySelector('button')!.click();
      expect(el.toggled).to.equal(false);
    });

    it('triggers "state-changed" event when clicked', async () => {
      const changedSpy = sinon.spy();
      const el = await fixture(html`<hamburger-menu @state-changed=${changedSpy as EventListener}></hamburger-menu>`);

      el.shadowRoot!.querySelector('button')!.click();
      expect(changedSpy.callCount).to.equal(1);

      el.shadowRoot!.querySelector('button')!.click();
      expect(changedSpy.callCount).to.equal(2);
    });
  });

  describe('Accessibility', () => {
    it('is displayed by default', async () => {
      const el = await fixture(html`<hamburger-menu></hamburger-menu>`);
      expect(el).to.be.displayed;
    });

    it('is hidden when attribute hidden is true', async () => {
      const el = await fixture(html`<hamburger-menu hidden></hamburger-menu>`);
      expect(el).not.to.be.displayed;
    });

    it('passes the a11y audit', async () => {
      const el = await fixture(html`<hamburger-menu></hamburger-menu>`);
      await expect(el).to.be.accessible();
    });
  });
});
