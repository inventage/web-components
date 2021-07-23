import { setCustomElements } from '@web/storybook-prebuilt/web-components.js';

import customElements from '../custom-elements-experimental.json';

// @see https://github.com/modernweb-dev/storybook-prebuilt/issues/51#issuecomment-815398039
setCustomElements(customElements);

// export const parameters = {
//   docs: {
//     inlineStories: true,
//     source: {
//       type: 'dynamic',
//       language: 'html',
//     },
//     iframeHeight: '200px',
//   },
//   controls: { expanded: true },
//   layout: 'fullscreen',
// };
