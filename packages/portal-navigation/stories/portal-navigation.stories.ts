import { html, TemplateResult } from '@inventage-web-components/common';
import { generateParagraphs, Story } from '@inventage-web-components/dev-helpers';

import '../src/portal-navigation.js';
import { NavigationEventListeners, NavigationEvents } from '../src/PortalNavigation.js';

export default {
  component: 'portal-navigation',
  title: 'Portal Navigation',
  // For available controls
  // @see https://storybook.js.org/docs/web-components/essentials/controls#annotation
  // @see https://github.com/storybookjs/storybook/tree/next/addons/controls
  argTypes: {
    src: {
      control: {
        type: 'text',
      },
    },
    language: {
      options: ['en', 'de'],
      control: {
        type: 'inline-radio',
      },
    },
    activeUrl: {
      control: {
        type: 'text',
      },
    },
    '--portal-navigation-color-primary': {
      control: {
        type: 'color',
      },
    },
    anchor: {
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    actions: {
      handles: [Object.values(NavigationEvents)],
    },
  },
};

interface ArgTypes {
  src?: string;
  language?: string;
  internalRouting?: boolean;
  currentApplication?: string;
  logoutMenuInMetaBar?: boolean;
  sticky?: boolean;

  // CSS custom props
  '--portal-navigation-color-primary'?: string;
}

const Template = (
  { src = './data/data.json', language = 'en', internalRouting = true, currentApplication = 'ebanking', ...rest }: ArgTypes,
  content?: TemplateResult | TemplateResult[]
): TemplateResult => {
  // TODO: We could probably iterate over all properties that start with `--` and generate the styles automatically…
  const styleContainer = document.documentElement.style;
  rest['--portal-navigation-color-primary'] && styleContainer.setProperty('--portal-navigation-color-primary', rest['--portal-navigation-color-primary']);

  // Reset padding top, since the navigation might have set this (e.g. in sticky mode)
  document.querySelector('body')!.style.paddingTop = '';

  return html`<portal-navigation
    src="${src!}"
    language="${language}"
    ?internalRouting="${internalRouting}"
    currentApplication="${currentApplication!}"
    ?logoutMenuInMetaBar="${rest.logoutMenuInMetaBar}"
    @portal-navigation.configured="${dispatchBadgeEvents}"
  >
    ${content}
  </portal-navigation>`;
};

/**
 * Default example story.
 *
 * @param args
 * @constructor
 */
export const Default: Story<ArgTypes> = (args: ArgTypes) => Template(args);

/**
 * Mobile breakpoint story.
 *
 * @param args
 * @constructor
 */
export const Mobile: Story<ArgTypes> = (args: ArgTypes) => Template(args);
Mobile.parameters = {
  viewport: {
    defaultViewport: 'mobile2',
  },
};

/**
 * Story showing all slots.
 *
 * @param args
 * @constructor
 */
export const Slots: Story<ArgTypes> = (args: ArgTypes) => {
  const slot = (name: string) =>
    html`<span slot="${name}" style="font-size: 0.75rem; display: flex; align-items: center; color: #c0392b"
      ><code style="padding-right: 0.5em;"><b>${name}</b></code> slot
    </span>`;
  const slots = ['logo', 'right', 'left', 'meta-left', 'meta-right', 'header-mobile', 'tree-bottom', 'current'];

  return Template(
    args,
    slots.map(name => html`${slot(name)}`)
  );
};

/**
 * Empty data story
 *
 * @param args
 * @constructor
 */
export const Empty: Story<ArgTypes> = (args: ArgTypes) => Template(args);

Empty.args = {
  src: '',
};

Empty.parameters = {
  docs: {
    description: {
      story: 'Empty `<portal-navigation>` tag without any `src` specified does not render anything.',
    },
  },
};

export const Sticky: Story<ArgTypes> = (args: ArgTypes) => {
  return html`
    <portal-navigation
      src="${args.src!}"
      ?internalRouting="${args.internalRouting}"
      currentApplication="${args.currentApplication!}"
      ?sticky="${args.sticky}"
      anchor="body"
      @portal-navigation.configured="${dispatchBadgeEventsTest}"
    ></portal-navigation>

    ${generateParagraphs(20)};
  `;
};

Sticky.args = {
  src: './data/test-data.json',
  internalRouting: true,
  currentApplication: 'app1',
  sticky: true,
};

Sticky.parameters = {
  docs: {
    description: {
      story: `The navigation can be made "sticky", by setting the \`sticky\` attribute/property as well as defining a valid CSS selector for an \`anchor\` element in the shadowDOM host the navigation will be positioned to.
This \`anchor\` element needs to have a \`position: relative\` for the \`position: fixed\` of the navigation to work.
`,
    },
    inlineStories: false,
    iframeHeight: '400px',
  },
};

export const Test: Story<ArgTypes> = (args: ArgTypes) => {
  return html` <portal-navigation
    src="${args.src!}"
    language="${args.language ?? ''}"
    ?internalRouting="${args.internalRouting}"
    currentApplication="${args.currentApplication!}"
    @portal-navigation.configured="${dispatchBadgeEventsTest}"
  >
  </portal-navigation>`;
};

Test.args = {
  language: 'en',
  currentApplication: 'app1',
  internalRouting: true,
  src: './data/test-data.json',
};

Test.parameters = {
  docs: {
    description: {
      story: 'This story renders the configuration (data) from the integration tests.',
    },
  },
};

const dispatchBadgeEvents = () => {
  document.dispatchEvent(
    new CustomEvent(NavigationEventListeners.setBadgeValue, {
      detail: {
        id: 'profile.preferences.userSettings',
        value: { en: 'NEW', de: 'NEU' },
      },
    })
  );

  document.dispatchEvent(
    new CustomEvent(NavigationEventListeners.setBadgeValue, {
      detail: {
        id: 'meta.messages',
        value: 9,
      },
    })
  );

  document.dispatchEvent(
    new CustomEvent(NavigationEventListeners.setBadgeValue, {
      detail: {
        id: 'main.assetCount',
        value: { en: 'new', de: 'neu' },
      },
    })
  );

  document.dispatchEvent(
    new CustomEvent(NavigationEventListeners.setBadgeValue, {
      detail: {
        url: '/ebanking/update-notification-preferences',
        value: 34,
      },
    })
  );
};

const dispatchBadgeEventsTest = () => {
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
};
