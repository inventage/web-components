import { html, ifDefined, TemplateResult } from '@inventage-web-components/common';
import { generateParagraphs, getCssPropArgTypes, getCustomElement, Package, setCssStyleFromArgs, Story } from '@inventage-web-components/dev-helpers';

import '../src/portal-navigation.js';
import { NavigationEvents } from '../src/PortalNavigation.js';
import cem from '../custom-elements.json';
import { dispatchBadgeEvents, eventListenerDocs } from './helpers.js';

const customElement = getCustomElement(cem as Package, 'src/PortalNavigation.js', 'PortalNavigation');

export default {
  component: 'portal-navigation',
  title: 'Portal Navigation',
  // Default arguments
  args: {
    src: './data/data.json',
    language: 'en',
    internalRouting: true,
    currentApplication: 'ebanking',
    // ...getCssArgs(customElement),
  },
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
    currentApplication: {
      control: {
        type: 'text',
      },
    },
    anchor: {
      control: {
        type: 'text',
      },
    },
    // CSS prop arg types
    ...getCssPropArgTypes(customElement),
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
  activeUrl?: string;
  currentApplication?: string;
  anchor?: string;
  internalRouting?: boolean;
  logoutMenuInMetaBar?: boolean;
  logoutMenuInMobileHeader?: boolean;
  mobileBreakpoint?: number;
  isMobileBreakpoint?: boolean;
  hamburgerMenuExpanded?: boolean;
  sticky?: boolean;

  [key: string]: unknown;
}

const Template = (args: ArgTypes, slots?: TemplateResult | TemplateResult[], content?: TemplateResult | TemplateResult[]): TemplateResult => {
  // Automatically set styles for each CSS custom prop passed as argument
  setCssStyleFromArgs(args, document.documentElement.style);

  // Reset padding top, since the navigation might have set this (e.g. in sticky mode)
  document.querySelector('body')!.style.paddingTop = '';

  return html`
    <portal-navigation
      src="${ifDefined(args.src)}"
      language="${ifDefined(args.language)}"
      activeUrl="${ifDefined(args.activeUrl)}"
      currentApplication="${ifDefined(args.currentApplication)}"
      anchor="${ifDefined(args.anchor)}"
      mobileBreakpoint=${ifDefined(args.mobileBreakpoint)}
      ?internalRouting="${args.internalRouting}"
      ?logoutMenuInMetaBar="${args.logoutMenuInMetaBar}"
      ?logoutMenuInMobileHeader="${args.logoutMenuInMobileHeader}"
      ?isMobileBreakpoint="${args.isMobileBreakpoint}"
      ?hamburgerMenuExpanded="${args.hamburgerMenuExpanded}"
      ?sticky="${args.sticky}"
      @portal-navigation.configured="${dispatchBadgeEvents}"
    >
      ${slots}
    </portal-navigation>
    ${content}
  `;
};

/**
 * Default example story.
 *
 * @param args
 * @constructor
 */
export const Default: Story<ArgTypes> = (args: ArgTypes) => Template(args);
Default.args = {
  language: 'en',
  internalRouting: true,
};

/**
 * Example with event listeners.
 *
 * @param args
 * @constructor
 */
export const EventListeners: Story<ArgTypes> = (args: ArgTypes) => html` ${Template(args)} ${eventListenerDocs()}`;

/**
 * Mobile breakpoint story.
 *
 * @param args
 * @constructor
 */
export const Mobile: Story<ArgTypes> = (args: ArgTypes) => Template(args);
Mobile.args = {
  hamburgerMenuExpanded: true,
};
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

/**
 * Sticky story
 *
 * @param args
 * @constructor
 */
export const Sticky: Story<ArgTypes> = (args: ArgTypes) => Template(args, undefined, html`<div class="content">${generateParagraphs(20)}</div>`);

Sticky.args = {
  src: './data/test-data.json',
  currentApplication: 'app1',
  sticky: true,
  anchor: 'body',
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

/**
 * Story with test-data.json
 *
 * @param args
 * @constructor
 */
export const Test: Story<ArgTypes> = (args: ArgTypes) => Template(args);

Test.args = {
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
