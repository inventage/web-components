import { fixture, html } from '@open-wc/testing';
import { visualDiff } from '@web/test-runner-visual-regression';

import { HamburgerMenu } from '../src/index.js';
import '../src/hamburger-menu.js';

describe('<hamburger-menu> visual regression tests', () => {
  it('can diff an element', async () => {
    const el: HamburgerMenu = await fixture(html` <hamburger-menu></hamburger-menu>`);
    await visualDiff(el, 'hamburger-menu');
  });

  it('can diff an element (toggled)', async () => {
    const el: HamburgerMenu = await fixture(html` <hamburger-menu toggled></hamburger-menu>`);
    await visualDiff(el, 'hamburger-menu-toggled');
  });
});
