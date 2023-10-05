import { html } from '@inventage-web-components/common';
import { getCssPropArgTypes, getCustomElement, Package, setCssStyleFromArgs, Story } from '@inventage-web-components/dev-helpers';
import '../src/hamburger-menu.js';
import cem from '../custom-elements.json';

const customElement = getCustomElement(cem as Package, 'src/HamburgerMenu.js', 'HamburgerMenu');

export default {
  component: 'hamburger-menu',
  title: 'Hamburger Menu',
  // Defaults for CSS props
  // args: {
  //   ...getPropertyArgs(customElement),
  //   ...getCssArgs(customElement),
  // },
  // For available controls
  // @see https://storybook.js.org/docs/web-components/essentials/controls#annotation
  argTypes: {
    toggled: { control: 'boolean' },
    // CSS prop arg types
    ...getCssPropArgTypes(customElement),
  },
  parameters: {
    actions: {
      handles: ['state-changed'],
    },
  },
};

interface ArgTypes {
  toggled?: boolean;

  [key: string]: unknown;
}

const Template: Story<ArgTypes> = (args: ArgTypes) => {
  // Automatically set styles for each CSS custom prop passed as argument
  setCssStyleFromArgs(args, document.documentElement.style);

  return html` <hamburger-menu ?toggled="${args.toggled}"></hamburger-menu>`;
};

export const Default = Template.bind({});
Default.args = {};

export const Toggled = Template.bind({});
Toggled.args = {
  toggled: true,
};
