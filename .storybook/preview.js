import { setCustomElements } from '@web/storybook-prebuilt/web-components.js';

import customElements from '../custom-elements.json';

// @see https://github.com/modernweb-dev/storybook-prebuilt/issues/51#issuecomment-815398039
setCustomElements(customElements);

export const parameters = {
  docs: {
    inlineStories: true,
    source: {
      type: 'dynamic',
      language: 'html',
    },
    iframeHeight: '200px',
  },
  controls: { expanded: true },
  layout: 'fullscreen',
  options: {
    // @see https://storybook.js.org/docs/web-components/writing-stories/naming-components-and-hierarchy#sorting-stories
    storySort: (a, b) => (a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, { numeric: true })),
  },
};
