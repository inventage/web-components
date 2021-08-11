import { html, TemplateResult } from 'lit-html';

import '../src/portal-navigation.js';
import { PortalNavigation } from '@inventage-web-components/portal-navigation';

export default {
  component: 'portal-navigation',
  title: 'Portal Navigation',
  // For available controls
  // @see https://storybook.js.org/docs/web-components/essentials/controls#annotation
  // @see https://github.com/storybookjs/storybook/tree/next/addons/controls
  argTypes: {
    src: {
      control: {
        type: 'select',
        options: ['./data/data.json', './data/data-settings.json', './data/test-data.json'],
      },
    },
    language: {
      control: {
        type: 'inline-radio',
        options: ['en', 'de'],
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
  },
};

interface Story<T> {
  (args: T): TemplateResult;

  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
  parameters?: Record<string, unknown>;
}

interface ArgTypes {
  src?: string;
  language: string;
  internalRouting?: boolean;
  currentApplication?: string;

  // CSS custom props
  '--portal-navigation-color-primary'?: string;
}

export const Default: Story<ArgTypes> = (args: ArgTypes) => {
  // TODO: We could probably iterate over all properties that start with `--` and generate the styles automatically…
  const styleContainer = document.documentElement.style;
  args['--portal-navigation-color-primary'] && styleContainer.setProperty('--portal-navigation-color-primary', args['--portal-navigation-color-primary']);

  return html` <portal-navigation
    src="${args.src!}"
    language="${args.language}"
    ?internalRouting="${args.internalRouting}"
    currentApplication="${args.currentApplication!}"
    @portal-navigation.configured="${dispatchBadgeEvents}"
  >
    <span slot="logo" style="font-size: 0.75rem; display: flex; align-items: center;">Logo slot</span>
    <span slot="left" style="font-size: 0.75rem; display: flex; align-items: center;">Left slot</span>
    <span slot="right" style="font-size: 0.75rem; display: flex; align-items: center;">Right slot</span>
  </portal-navigation>`;
};

Default.args = {
  language: 'en',
  src: './data/data.json',
  internalRouting: true,
  currentApplication: 'ebanking',
};

Default.parameters = {
  docs: {
    description: {
      story: 'Individual story description, may contain `markdown` markup',
    },
  },
};

export const Empty: Story<ArgTypes> = () => {
  return html` <portal-navigation></portal-navigation>`;
};

Empty.parameters = {
  docs: {
    description: {
      story: 'Empty `<portal-navigation>` tag without any `src` specified does not render anything.',
    },
  },
};

export const Test: Story<ArgTypes> = (args: ArgTypes) => {
  return html` <portal-navigation
    src="${args.src!}"
    language="${args.language}"
    ?internalRouting="${args.internalRouting}"
    currentApplication="${args.currentApplication!}"
    @portal-navigation.configured="${dispatchBadgeEventsTest}"
  >
  </portal-navigation>`;
};

Test.args = {
  language: 'en',
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
    new CustomEvent(PortalNavigation.events.setBadgeValue, {
      detail: {
        id: 'profile.preferences.userSettings',
        value: { en: 'NEW', de: 'NEU' },
      },
    })
  );

  document.dispatchEvent(
    new CustomEvent(PortalNavigation.events.setBadgeValue, {
      detail: {
        id: 'meta.messages',
        value: 9,
      },
    })
  );

  document.dispatchEvent(
    new CustomEvent(PortalNavigation.events.setBadgeValue, {
      detail: {
        id: 'main.assetCount',
        value: { en: 'new', de: 'neu' },
      },
    })
  );

  document.dispatchEvent(
    new CustomEvent(PortalNavigation.events.setBadgeValue, {
      detail: {
        url: '/ebanking/update-notification-preferences',
        value: 34,
      },
    })
  );
};

const dispatchBadgeEventsTest = () => {
  document.dispatchEvent(
    new CustomEvent(PortalNavigation.events.setBadgeValue, {
      detail: {
        id: 'meta',
        value: 9,
      },
    })
  );

  document.dispatchEvent(
    new CustomEvent(PortalNavigation.events.setBadgeValue, {
      detail: {
        id: 'parent2',
        value: { en: 'new', de: 'neu' },
      },
    })
  );
};
