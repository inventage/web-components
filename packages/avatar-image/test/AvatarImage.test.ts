import { assert, expect, fixture, html } from '@open-wc/testing';

import { AvatarImage } from '../src/index.js';
import '../src/avatar-image.js';

describe('<avatar-image>', () => {
  describe('Structure', () => {
    it('is defined', () => {
      const el = document.createElement('avatar-image');
      assert.instanceOf(el, AvatarImage);
    });
  });

  describe('Display', () => {
    it('is empty by default', async () => {
      const el: AvatarImage = await fixture(html` <avatar-image></avatar-image>`);
      await expect(el.shadowRoot!.innerHTML).to.equal('<!---->');
    });
  });

  describe('Functionality', () => {
    // TODO
  });

  describe('Accessibility', () => {
    it('is displayed by default', async () => {
      const el = await fixture(html` <avatar-image></avatar-image>`);
      expect(el).to.be.displayed;
    });

    it('is hidden when attribute hidden is true', async () => {
      const el = await fixture(html` <avatar-image hidden></avatar-image>`);
      expect(el).not.to.be.displayed;
    });

    it('passes the a11y audit', async () => {
      const el = await fixture(html` <avatar-image></avatar-image>`);
      await expect(el).to.be.accessible();
    });
  });
});
