import { html, TemplateResult } from '@inventage-web-components/common';
import { getRandomInt } from '@inventage-web-components/dev-helpers';

import { NavigationEventListeners } from '../src/PortalNavigation.js';

export const eventListenerDocs = (): TemplateResult => {
  return html`
    <style>
      .event-list {
        max-width: 75ch;
      }

      .event-list > .item {
        margin-bottom: 1.5rem;
      }

      .event-list-item > .trigger {
        text-decoration: none;
        color: rgb(10, 81, 194);
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
          Sets a random number between 1 and 1000 as badge on the menu item with id <code>"0"</code>. <br /><br />
          Example code:
          <pre>
document.dispatchEvent(
  new CustomEvent('${NavigationEventListeners.setBadgeValue}', {
    detail: {
      id: '0',
      value: 123,
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
              new CustomEvent(NavigationEventListeners.setBadgeValue, {
                detail: {
                  url: '/ebanking/show-dashboard',
                  value: {
                    en: `${getRandomInt(1, 1000)} (en)`,
                    de: `${getRandomInt(1, 1000)} (de)`,
                  },
                },
              })
            );
          }}"
          ><code>${NavigationEventListeners.setBadgeValue}</code></a
        >
        <span class="docs event-docs">
          The <code>value</code> property on the event payload can also be an object that maps a navigation language (e.g. <code>en</code>) to a string. This
          allows you to define i18n badges on menu items. Instead of an <code>id</code>, you can also pass an <code>url</code> property in the event payload to
          target a menu item by its url.<br /><br />
          Example code:
          <pre>
document.dispatchEvent(
  new CustomEvent('${NavigationEventListeners.setBadgeValue}', {
    detail: {
      url: '/ebanking/show-dashboard',
      value: {
        en: '123 (en)',
        de: '123 (de)',
      },
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
  new CustomEvent('${NavigationEventListeners.setActiveUrl}', {
    detail: '/ebanking/show-payment-standing-orders',
  })
);
        </pre
          >
        </span>
      </li>
    </ul>
  `;
};

/**
 * Dispatches some example setBadgeValue events.
 */
export const dispatchBadgeEvents = () => {
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

  // Badges for test-data.json
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
