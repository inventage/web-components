import { html, TemplateResult } from 'lit-html';

import '../src/portal-navigation.js';
import { PortalNavigation } from '@inventage-web-components/portal-navigation';

export default {
  component: 'portal-navigation',
  title: 'Portal Navigation',
  // For available controls
  // @see https://storybook.js.org/docs/web-components/essentials/controls#annotation
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
  },
};

interface Story<T> {
  (args: T): TemplateResult;

  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  src?: string;
  language: string;
  internalRouting?: boolean;
  currentApplication?: string;
}

export const Default: Story<ArgTypes> = (args: ArgTypes) =>
  html` <portal-navigation
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

Default.args = {
  language: 'en',
  src: '/data/data.json',
  internalRouting: true,
  currentApplication: 'ebanking',
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
