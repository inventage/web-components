import { html, TemplateResult } from '@inventage-web-components/common';

/**
 * Generates the given number of paragraphs as Lit template.
 *
 * @param count
 */
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
 * Generates a random integer between the min and max values.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values
 * @param min
 * @param max
 */
export const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
};
