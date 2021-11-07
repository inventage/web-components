import { html } from '@inventage-web-components/common';
import { getCssArgs, getCssPropArgTypes, getCssProperties, setCssStyleFromArgsWithDefaults, Story } from '@inventage-web-components/dev-helpers';
import '../src/hamburger-menu.js';
import cem from '../custom-elements.json';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const cssProperties = getCssProperties(cem, 'src/HamburgerMenu.js', 'HamburgerMenu');

export default {
  component: 'hamburger-menu',
  title: 'Hamburger Menu',
  // Defaults for CSS props
  args: {
    ...getCssArgs(cssProperties),
  },
  // For available controls
  // @see https://storybook.js.org/docs/web-components/essentials/controls#annotation
  argTypes: {
    toggled: { control: 'boolean' },
    // CSS prop arg types
    ...getCssPropArgTypes(cssProperties),
  },
};

interface ArgTypes {
  toggled?: boolean;
  [key: string]: unknown;
}

const Template: Story<ArgTypes> = (args: ArgTypes) => {
  // Automatically set styles for each CSS custom prop passed as argument
  setCssStyleFromArgsWithDefaults(args, cssProperties, document.documentElement.style);

  return html`<hamburger-menu ?toggled="${args.toggled}"></hamburger-menu>`;
};

export const Default = Template.bind({});
Default.args = {};

export const Toggled = Template.bind({});
Toggled.args = {
  toggled: true,
};
