import { fixture, html } from '@open-wc/testing';
import { setViewport } from '@web/test-runner-commands';

import '../src/portal-navigation.js';
import { visualDiff } from '@web/test-runner-visual-regression';
import { PortalNavigation } from '../src/PortalNavigation.js';
import { childrenRendered } from './PortalNavigation.test.js';
import { DEFAULT_VIEWPORT_HEIGHT, DEFAULT_VIEWPORT_WIDTH } from './test-utils.js';

const TEST_DATA_JSON_PATH = './data/test-data.json!';

beforeEach(async () => {
  await setViewport({ width: DEFAULT_VIEWPORT_WIDTH, height: DEFAULT_VIEWPORT_HEIGHT });
});

describe('<portal-navigation> visual regression tests', () => {
  it('default', async () => {
    const el: PortalNavigation = await fixture(html` <portal-navigation src="${TEST_DATA_JSON_PATH}"></portal-navigation>`);
    await childrenRendered(el);
    await visualDiff(el, 'portal-navigation');
  });

  it('default with active items', async () => {
    const el: PortalNavigation = await fixture(html` <portal-navigation src="${TEST_DATA_JSON_PATH}" activeUrl="/some/path/item2.2"></portal-navigation>`);
    await childrenRendered(el, '[part="item-item2.2"]');
    await visualDiff(el, 'portal-navigation-selected');
  });

  it('mobile', async () => {
    await setViewport({ width: 600, height: 800 });
    const el: PortalNavigation = await fixture(html` <portal-navigation src="${TEST_DATA_JSON_PATH}" mobilebreakpoint="600"></portal-navigation>`);
    await visualDiff(el, 'portal-navigation-mobile');
  });

  it('mobile expanded', async () => {
    await setViewport({ width: 600, height: 800 });
    const el: PortalNavigation = await fixture(
      html` <portal-navigation src="${TEST_DATA_JSON_PATH}" mobilebreakpoint="600" hamburgerMenuExpanded activeUrl="/some/path/item2.2"></portal-navigation>`
    );
    await childrenRendered(el, '[part="item-item2.2"]');
    await visualDiff(el, 'portal-navigation-mobile-expanded');
  });
});
