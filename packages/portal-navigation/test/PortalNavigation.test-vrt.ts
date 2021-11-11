import { fixture, html } from '@open-wc/testing';
import { setViewport } from '@web/test-runner-commands';

import '../src/portal-navigation.js';
import { visualDiff } from '@web/test-runner-visual-regression';
import { PortalNavigation } from '../src/PortalNavigation.js';

const TEST_DATA_JSON_PATH = './data/test-data.json!';

describe('<portal-navigation>', () => {
  it('default', async () => {
    const el: PortalNavigation = await fixture(html` <portal-navigation src="${TEST_DATA_JSON_PATH}"></portal-navigation>`);
    await visualDiff(el, 'portal-navigation');
  });

  it('default with active items', async () => {
    const el: PortalNavigation = await fixture(html` <portal-navigation src="${TEST_DATA_JSON_PATH}" activeUrl="/some/path/item2.3"></portal-navigation>`);
    await visualDiff(el, 'portal-navigation-selected');
  });

  it('mobile', async () => {
    const el: PortalNavigation = await fixture(html` <portal-navigation src="${TEST_DATA_JSON_PATH}" mobilebreakpoint="600"></portal-navigation>`);
    setTimeout(async () => await setViewport({ width: 600, height: 800 }));
    await visualDiff(el, 'portal-navigation-mobile');
  });

  it('mobile expanded', async () => {
    const el: PortalNavigation = await fixture(
      html` <portal-navigation src="${TEST_DATA_JSON_PATH}" mobilebreakpoint="600" hamburgerMenuExpanded activeUrl="/some/path/item2.3"></portal-navigation>`
    );
    setTimeout(async () => await setViewport({ width: 600, height: 800 }));
    await visualDiff(el, 'portal-navigation-mobile-expanded');
  });
});
