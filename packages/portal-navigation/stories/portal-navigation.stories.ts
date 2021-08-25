import { html, TemplateResult } from '@inventage-web-components/common';

import '../src/portal-navigation.js';
import { PortalNavigation } from '../src/PortalNavigation.js';

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
    anchor: {
      control: {
        type: 'text',
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
  logoutMenuInMetaBar?: boolean;
  sticky?: boolean;

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
    ?logoutMenuInMetaBar="${args.logoutMenuInMetaBar}"
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

export const Empty: Story<ArgTypes> = (_args: ArgTypes) => {
  return html` <portal-navigation></portal-navigation>`;
};

Empty.parameters = {
  docs: {
    description: {
      story: 'Empty `<portal-navigation>` tag without any `src` specified does not render anything.',
    },
  },
};

// export const Basic: Story<ArgTypes> = (args: ArgTypes) => {
//   return html` <portal-navigation
//     src="${args.src!}"
//     ?internalRouting="${args.internalRouting}"
//     currentApplication="${args.currentApplication!}"
//   ></portal-navigation>`;
// };
//
// Basic.args = {
//   src: './data/basic.json',
//   internalRouting: true,
//   currentApplication: 'app1',
// };
//
// Basic.parameters = {
//   docs: {
//     description: {
//       story: 'TODO',
//     },
//   },
// };

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

    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin fermentum ac est accumsan malesuada. Vivamus id scelerisque dolor. Duis feugiat ligula mi.
      Nullam nulla ligula, lobortis eu vulputate ac, tristique a elit. Aliquam quis dignissim tortor. Phasellus imperdiet, erat at dapibus porttitor, mi ante
      varius ante, sed congue libero magna ut urna. Aenean rutrum ante in vehicula tincidunt. Quisque urna odio, commodo eget leo sit amet, rhoncus tempus orci.
      Curabitur enim mi, sagittis nec tellus auctor, pellentesque consequat enim. Nulla finibus velit vel bibendum semper. Duis pulvinar id tellus a sagittis.
      Fusce a eros at turpis fermentum congue vestibulum vel justo. Ut nec elit congue, auctor dolor tincidunt, mattis sapien. Cras mi turpis, dictum in tempor
      id, blandit eget tortor. Curabitur nec libero vel lacus mollis accumsan. Maecenas metus tellus, finibus non volutpat vel, egestas quis velit.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin fermentum ac est accumsan malesuada. Vivamus id scelerisque dolor. Duis feugiat ligula mi.
      Nullam nulla ligula, lobortis eu vulputate ac, tristique a elit. Aliquam quis dignissim tortor. Phasellus imperdiet, erat at dapibus porttitor, mi ante
      varius ante, sed congue libero magna ut urna. Aenean rutrum ante in vehicula tincidunt. Quisque urna odio, commodo eget leo sit amet, rhoncus tempus orci.
      Curabitur enim mi, sagittis nec tellus auctor, pellentesque consequat enim. Nulla finibus velit vel bibendum semper. Duis pulvinar id tellus a sagittis.
      Fusce a eros at turpis fermentum congue vestibulum vel justo. Ut nec elit congue, auctor dolor tincidunt, mattis sapien. Cras mi turpis, dictum in tempor
      id, blandit eget tortor. Curabitur nec libero vel lacus mollis accumsan. Maecenas metus tellus, finibus non volutpat vel, egestas quis velit.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin fermentum ac est accumsan malesuada. Vivamus id scelerisque dolor. Duis feugiat ligula mi.
      Nullam nulla ligula, lobortis eu vulputate ac, tristique a elit. Aliquam quis dignissim tortor. Phasellus imperdiet, erat at dapibus porttitor, mi ante
      varius ante, sed congue libero magna ut urna. Aenean rutrum ante in vehicula tincidunt. Quisque urna odio, commodo eget leo sit amet, rhoncus tempus orci.
      Curabitur enim mi, sagittis nec tellus auctor, pellentesque consequat enim. Nulla finibus velit vel bibendum semper. Duis pulvinar id tellus a sagittis.
      Fusce a eros at turpis fermentum congue vestibulum vel justo. Ut nec elit congue, auctor dolor tincidunt, mattis sapien. Cras mi turpis, dictum in tempor
      id, blandit eget tortor. Curabitur nec libero vel lacus mollis accumsan. Maecenas metus tellus, finibus non volutpat vel, egestas quis velit.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin fermentum ac est accumsan malesuada. Vivamus id scelerisque dolor. Duis feugiat ligula mi.
      Nullam nulla ligula, lobortis eu vulputate ac, tristique a elit. Aliquam quis dignissim tortor. Phasellus imperdiet, erat at dapibus porttitor, mi ante
      varius ante, sed congue libero magna ut urna. Aenean rutrum ante in vehicula tincidunt. Quisque urna odio, commodo eget leo sit amet, rhoncus tempus orci.
      Curabitur enim mi, sagittis nec tellus auctor, pellentesque consequat enim. Nulla finibus velit vel bibendum semper. Duis pulvinar id tellus a sagittis.
      Fusce a eros at turpis fermentum congue vestibulum vel justo. Ut nec elit congue, auctor dolor tincidunt, mattis sapien. Cras mi turpis, dictum in tempor
      id, blandit eget tortor. Curabitur nec libero vel lacus mollis accumsan. Maecenas metus tellus, finibus non volutpat vel, egestas quis velit.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin fermentum ac est accumsan malesuada. Vivamus id scelerisque dolor. Duis feugiat ligula mi.
      Nullam nulla ligula, lobortis eu vulputate ac, tristique a elit. Aliquam quis dignissim tortor. Phasellus imperdiet, erat at dapibus porttitor, mi ante
      varius ante, sed congue libero magna ut urna. Aenean rutrum ante in vehicula tincidunt. Quisque urna odio, commodo eget leo sit amet, rhoncus tempus orci.
      Curabitur enim mi, sagittis nec tellus auctor, pellentesque consequat enim. Nulla finibus velit vel bibendum semper. Duis pulvinar id tellus a sagittis.
      Fusce a eros at turpis fermentum congue vestibulum vel justo. Ut nec elit congue, auctor dolor tincidunt, mattis sapien. Cras mi turpis, dictum in tempor
      id, blandit eget tortor. Curabitur nec libero vel lacus mollis accumsan. Maecenas metus tellus, finibus non volutpat vel, egestas quis velit.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin fermentum ac est accumsan malesuada. Vivamus id scelerisque dolor. Duis feugiat ligula mi.
      Nullam nulla ligula, lobortis eu vulputate ac, tristique a elit. Aliquam quis dignissim tortor. Phasellus imperdiet, erat at dapibus porttitor, mi ante
      varius ante, sed congue libero magna ut urna. Aenean rutrum ante in vehicula tincidunt. Quisque urna odio, commodo eget leo sit amet, rhoncus tempus orci.
      Curabitur enim mi, sagittis nec tellus auctor, pellentesque consequat enim. Nulla finibus velit vel bibendum semper. Duis pulvinar id tellus a sagittis.
      Fusce a eros at turpis fermentum congue vestibulum vel justo. Ut nec elit congue, auctor dolor tincidunt, mattis sapien. Cras mi turpis, dictum in tempor
      id, blandit eget tortor. Curabitur nec libero vel lacus mollis accumsan. Maecenas metus tellus, finibus non volutpat vel, egestas quis velit.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin fermentum ac est accumsan malesuada. Vivamus id scelerisque dolor. Duis feugiat ligula mi.
      Nullam nulla ligula, lobortis eu vulputate ac, tristique a elit. Aliquam quis dignissim tortor. Phasellus imperdiet, erat at dapibus porttitor, mi ante
      varius ante, sed congue libero magna ut urna. Aenean rutrum ante in vehicula tincidunt. Quisque urna odio, commodo eget leo sit amet, rhoncus tempus orci.
      Curabitur enim mi, sagittis nec tellus auctor, pellentesque consequat enim. Nulla finibus velit vel bibendum semper. Duis pulvinar id tellus a sagittis.
      Fusce a eros at turpis fermentum congue vestibulum vel justo. Ut nec elit congue, auctor dolor tincidunt, mattis sapien. Cras mi turpis, dictum in tempor
      id, blandit eget tortor. Curabitur nec libero vel lacus mollis accumsan. Maecenas metus tellus, finibus non volutpat vel, egestas quis velit.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin fermentum ac est accumsan malesuada. Vivamus id scelerisque dolor. Duis feugiat ligula mi.
      Nullam nulla ligula, lobortis eu vulputate ac, tristique a elit. Aliquam quis dignissim tortor. Phasellus imperdiet, erat at dapibus porttitor, mi ante
      varius ante, sed congue libero magna ut urna. Aenean rutrum ante in vehicula tincidunt. Quisque urna odio, commodo eget leo sit amet, rhoncus tempus orci.
      Curabitur enim mi, sagittis nec tellus auctor, pellentesque consequat enim. Nulla finibus velit vel bibendum semper. Duis pulvinar id tellus a sagittis.
      Fusce a eros at turpis fermentum congue vestibulum vel justo. Ut nec elit congue, auctor dolor tincidunt, mattis sapien. Cras mi turpis, dictum in tempor
      id, blandit eget tortor. Curabitur nec libero vel lacus mollis accumsan. Maecenas metus tellus, finibus non volutpat vel, egestas quis velit.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin fermentum ac est accumsan malesuada. Vivamus id scelerisque dolor. Duis feugiat ligula mi.
      Nullam nulla ligula, lobortis eu vulputate ac, tristique a elit. Aliquam quis dignissim tortor. Phasellus imperdiet, erat at dapibus porttitor, mi ante
      varius ante, sed congue libero magna ut urna. Aenean rutrum ante in vehicula tincidunt. Quisque urna odio, commodo eget leo sit amet, rhoncus tempus orci.
      Curabitur enim mi, sagittis nec tellus auctor, pellentesque consequat enim. Nulla finibus velit vel bibendum semper. Duis pulvinar id tellus a sagittis.
      Fusce a eros at turpis fermentum congue vestibulum vel justo. Ut nec elit congue, auctor dolor tincidunt, mattis sapien. Cras mi turpis, dictum in tempor
      id, blandit eget tortor. Curabitur nec libero vel lacus mollis accumsan. Maecenas metus tellus, finibus non volutpat vel, egestas quis velit.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin fermentum ac est accumsan malesuada. Vivamus id scelerisque dolor. Duis feugiat ligula mi.
      Nullam nulla ligula, lobortis eu vulputate ac, tristique a elit. Aliquam quis dignissim tortor. Phasellus imperdiet, erat at dapibus porttitor, mi ante
      varius ante, sed congue libero magna ut urna. Aenean rutrum ante in vehicula tincidunt. Quisque urna odio, commodo eget leo sit amet, rhoncus tempus orci.
      Curabitur enim mi, sagittis nec tellus auctor, pellentesque consequat enim. Nulla finibus velit vel bibendum semper. Duis pulvinar id tellus a sagittis.
      Fusce a eros at turpis fermentum congue vestibulum vel justo. Ut nec elit congue, auctor dolor tincidunt, mattis sapien. Cras mi turpis, dictum in tempor
      id, blandit eget tortor. Curabitur nec libero vel lacus mollis accumsan. Maecenas metus tellus, finibus non volutpat vel, egestas quis velit.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin fermentum ac est accumsan malesuada. Vivamus id scelerisque dolor. Duis feugiat ligula mi.
      Nullam nulla ligula, lobortis eu vulputate ac, tristique a elit. Aliquam quis dignissim tortor. Phasellus imperdiet, erat at dapibus porttitor, mi ante
      varius ante, sed congue libero magna ut urna. Aenean rutrum ante in vehicula tincidunt. Quisque urna odio, commodo eget leo sit amet, rhoncus tempus orci.
      Curabitur enim mi, sagittis nec tellus auctor, pellentesque consequat enim. Nulla finibus velit vel bibendum semper. Duis pulvinar id tellus a sagittis.
      Fusce a eros at turpis fermentum congue vestibulum vel justo. Ut nec elit congue, auctor dolor tincidunt, mattis sapien. Cras mi turpis, dictum in tempor
      id, blandit eget tortor. Curabitur nec libero vel lacus mollis accumsan. Maecenas metus tellus, finibus non volutpat vel, egestas quis velit.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin fermentum ac est accumsan malesuada. Vivamus id scelerisque dolor. Duis feugiat ligula mi.
      Nullam nulla ligula, lobortis eu vulputate ac, tristique a elit. Aliquam quis dignissim tortor. Phasellus imperdiet, erat at dapibus porttitor, mi ante
      varius ante, sed congue libero magna ut urna. Aenean rutrum ante in vehicula tincidunt. Quisque urna odio, commodo eget leo sit amet, rhoncus tempus orci.
      Curabitur enim mi, sagittis nec tellus auctor, pellentesque consequat enim. Nulla finibus velit vel bibendum semper. Duis pulvinar id tellus a sagittis.
      Fusce a eros at turpis fermentum congue vestibulum vel justo. Ut nec elit congue, auctor dolor tincidunt, mattis sapien. Cras mi turpis, dictum in tempor
      id, blandit eget tortor. Curabitur nec libero vel lacus mollis accumsan. Maecenas metus tellus, finibus non volutpat vel, egestas quis velit.
    </p>
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
