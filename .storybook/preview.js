import { render } from 'lit-html';
import { addons } from '@web/storybook-prebuilt/addons.js';
import { setCustomElements } from '@web/storybook-prebuilt/web-components.js';

import customElements from '../custom-elements-experimental.json';

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
    // @see https://storybook.js.org/docs/react/writing-stories/naming-components-and-hierarchy#sorting-stories
    storySort: (a, b) => (a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, { numeric: true })),
  },
};

export const decorators = [sourceDecorator];

function skipSourceRender(context) {
  const sourceParams = context?.parameters.docs?.source;
  // noinspection JSUnresolvedVariable
  const isArgsStory = context?.parameters.__isArgsStory;

  // always render if the user forces it
  if (sourceParams?.type === 'dynamic') {
    return false;
  }

  // never render if the user is forcing the block to render code, or
  // if the user provides code, or if it's not an args story.
  return !isArgsStory || sourceParams?.code || sourceParams?.type === 'code';
}

function applyTransformSource(source, context) {
  const { transformSource } = context.parameters.docs ?? {};
  if (typeof transformSource !== 'function') return source;
  return transformSource(source, context);
}

export function sourceDecorator(storyFn, context) {
  // noinspection JSUnresolvedFunction
  const story = context.originalStoryFn(context.args);

  if (!skipSourceRender(context)) {
    const container = window.document.createElement('div');
    render(story, container);
    const source = applyTransformSource(container.innerHTML.replace(/<!---->/g, ''), context);
    if (source) addons.getChannel().emit('storybook/docs/snippet-rendered', context?.id, source);
  }

  return storyFn();
}
