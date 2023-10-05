import { html } from '@inventage-web-components/common';
import { getCssPropArgTypes, getCustomElement, Package, setCssStyleFromArgs, Story } from '@inventage-web-components/dev-helpers';
import '../src/avatar-image.js';
import cem from '../custom-elements.json';

const customElement = getCustomElement(cem as Package, 'src/AvatarImage.js', 'AvatarImage');

export default {
  component: 'avatar-image',
  title: 'Avatar Image',
  // For available controls
  // @see https://storybook.js.org/docs/web-components/essentials/controls#annotation
  argTypes: {
    input: {
      control: {
        type: 'text',
      },
    },
    // CSS prop arg types
    ...getCssPropArgTypes(customElement),
  },
};

interface ArgTypes {
  input?: string;

  [key: string]: unknown;
}

const Template: Story<ArgTypes> = (args: ArgTypes) => {
  // Automatically set styles for each CSS custom prop passed as argument
  setCssStyleFromArgs(args, document.documentElement.style);

  return html` <avatar-image .input="${args.input}"></avatar-image>`;
};

export const Default = Template.bind({});
Default.args = {
  input: 'Foo Bar',
};

export const Empty = Template.bind({});
Empty.args = {};
