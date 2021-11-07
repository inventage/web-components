import { html, TemplateResult } from '@inventage-web-components/common';
import { CssCustomProperty, CustomElement, Package } from 'custom-elements-manifest/schema';

export { Package } from 'custom-elements-manifest/schema';

export interface Story<T> {
  (args: T): TemplateResult;

  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
  parameters?: Record<string, unknown>;
}

export const generateParagraphs = (count = 1): TemplateResult[] => {
  return [...Array(count).keys()].map(
    () => html` <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin fermentum ac est accumsan malesuada. Vivamus id scelerisque dolor. Duis feugiat ligula mi.
      Nullam nulla ligula, lobortis eu vulputate ac, tristique a elit. Aliquam quis dignissim tortor. Phasellus imperdiet, erat at dapibus porttitor, mi ante
      varius ante, sed congue libero magna ut urna. Aenean rutrum ante in vehicula tincidunt. Quisque urna odio, commodo eget leo sit amet, rhoncus tempus orci.
      Curabitur enim mi, sagittis nec tellus auctor, pellentesque consequat enim. Nulla finibus velit vel bibendum semper. Duis pulvinar id tellus a sagittis.
      Fusce a eros at turpis fermentum congue vestibulum vel justo. Ut nec elit congue, auctor dolor tincidunt, mattis sapien. Cras mi turpis, dictum in tempor
      id, blandit eget tortor. Curabitur nec libero vel lacus mollis accumsan. Maecenas metus tellus, finibus non volutpat vel, egestas quis velit.
    </p>`
  );
};

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values
 * @param min
 * @param max
 */
export const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
};

export const getCssProperties = (cem: Package, path: string, className: string): CssCustomProperty[] => {
  const module = cem.modules.find(m => m.path === path);
  if (!module) {
    return [];
  }

  const { declarations } = module;
  if (!declarations) {
    return [];
  }

  const [classDeclaration] = module!.declarations!.filter(d => d.kind === 'class' && d.name === className);
  const { cssProperties } = classDeclaration as CustomElement;
  if (!cssProperties) {
    return [];
  }

  return cssProperties;
};

export const getCssPropArgTypes = (cssProperties: CssCustomProperty[] = []): Record<string, unknown> => {
  const cssPropArgTypes: Record<string, unknown> = {};

  // Define CSS custom prop argTypes for all CSS properties
  cssProperties.map(prop => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { type: { text = {} } = {}, name } = prop as unknown as any;
    if (!name) {
      console.error('No property name found for', prop);
    }

    cssPropArgTypes[name] = {
      control: {
        type: `${text}`.toLowerCase() === 'color' ? 'color' : 'text',
        // This seems to be automatically inferred from CEM…
        // table: {
        //   defaultValue: {
        //     type: `${text}`.toLowerCase() === 'color' ? 'color' : 'text',
        //     summary: prop.default,
        //   },
        // },
      },
    };
  });

  return cssPropArgTypes;
};

export const getCssArgs = (cssProperties: CssCustomProperty[] = []): Record<string, unknown> => {
  const cssArgs: Record<string, unknown> = {};
  cssProperties.map(prop => (cssArgs[prop.name] = prop.default));
  return cssArgs;
};

export const setCssStyleFromArgsWithDefaults = (args: Record<string, unknown>, cssProps: CssCustomProperty[], styleContainer: CSSStyleDeclaration): void => {
  // Set defaults
  cssProps.map(prop => styleContainer.setProperty(prop.name, `${prop.default}`));

  // Set arg values
  Object.entries(args)
    .filter(([name, value]) => name.match(/^--/) && typeof value === 'string')
    .forEach(([name, value]) => styleContainer.setProperty(name, `${value}`));
};
