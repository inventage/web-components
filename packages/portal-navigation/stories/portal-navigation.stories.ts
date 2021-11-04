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
 * Example with event listeners.
 *
 * @param args
 * @constructor
 */
export const EventListeners: Story<ArgTypes> = (args: ArgTypes) => html`
  ${Template(args)}

  <style>
    .event-list > .item {
      margin-bottom: 1.5rem;
    }

    .event-list-item > .trigger {
      text-decoration: none;
      color: inherit;
      display: block;
      margin-bottom: 0.5rem;
    }

    .event-docs pre {
      margin: 1rem 0 0;
    }
  </style>

  <p>This component defines event listeners for the following events. You can click on each event to trigger an example.</p>
  <ul class="event-list">
    <li class="item event-list-item">
      <a
        href="#"
        class="trigger"
        @click="${(e: MouseEvent) => {
          e.preventDefault();
          document.dispatchEvent(
            new CustomEvent(NavigationEventListeners.setBadgeValue, {
              detail: {
                id: '0',
                value: getRandomInt(1, 1000),
              },
            })
          );
        }}"
        ><code>${NavigationEventListeners.setBadgeValue}</code></a
      >
      <span class="docs event-docs">
        Sets a random label (between <code>1</code> and <code>1000</code>) on the menu item with id <code>"0"</code>. <br /><br />
        Example code:
        <pre>
document.dispatchEvent(
  new CustomEvent(NavigationEventListeners.setBadgeValue, {
    detail: {
      id: '0',
      value: getRandomInt(1, 1000),
    },
  })
);
        </pre
        >
      </span>
    </li>
    <li class="item event-list-item">
      <a
        href="#"
        class="trigger"
        @click="${(e: MouseEvent) => {
          e.preventDefault();
          document.dispatchEvent(
            new CustomEvent(NavigationEventListeners.setActiveUrl, {
              detail: '/ebanking/show-payment-standing-orders',
            })
          );
        }}"
        ><code>${NavigationEventListeners.setActiveUrl}</code></a
      >
      <span class="docs event-docs">
        Sets the active url of the navigation to the event payload. This also marks the corresponding menu item, if found, «active» or «selected».
        <br /><br />
        Example code:
        <pre>
document.dispatchEvent(
  new CustomEvent(NavigationEventListeners.setActiveUrl, {
    detail: '/ebanking/show-payment-standing-orders',
  })
);
        </pre
        >
      </span>
    </li>
  </ul>
`;

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

/**
 * Dispatches some example setBadgeValue events.
 */
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

/**
 * Dispatches some example setBadgeValue events for the test-data.json story.
 */
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

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values
 * @param min
 * @param max
 */
const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
};
