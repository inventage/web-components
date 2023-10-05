/**
 * Simple hash function that generates an integer from a string. It uses bitwise operations and a prime number
 * to ensure a relatively even distribution of hash values and to minimize collisions.
 *
 * @param string the string to generate the hash from
 * @param tableSize the size of the hash table and is used to limit the range of output values
 */
export const stringHash = (string: string, tableSize = 1000) => {
  let hash = 5381; // A prime number
  let i = string.length;

  while (i) {
    hash = (hash * 33) ^ string.charCodeAt(--i);
  }

  return hash % tableSize;
};

export const getInitialsFromString = (string: string) => {
  if (!string) {
    return;
  }

  const [first, last] = string.split(' ');
  if (!last) {
    if (first.length < 2) {
      return;
    }

    return `${first[0]}${first[1]}`.toUpperCase();
  }

  return `${first[0]}${last[0]}`.toUpperCase();
};

export type SvgImageOptions = {
  backgroundColor: string;
  textColor: string;
  fontSize: number;
  round: boolean;
};

export const svgImageDefaultOptions: SvgImageOptions = {
  backgroundColor: '#000',
  textColor: '#fff',
  fontSize: 0.5,
  round: true,
};

export const svgImage = (text: string, size: number, options: Partial<SvgImageOptions> = {}) => {
  const { backgroundColor, textColor, fontSize, round } = {
    ...svgImageDefaultOptions,
    ...options,
  };

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}"><${
    round ? 'circle' : 'rect'
  } fill="${backgroundColor}" width="${size}" height="${size}" cx="${size / 2}" cy="${size / 2}" r="${
    size / 2
  }"/><text x="50%" y="50%" style="color: ${textColor}; line-height: 1; font-family: inherit;" alignment-baseline="middle" text-anchor="middle" font-size="${Math.round(
    size * fontSize
  )}" dy=".1em" dominant-baseline="middle" fill="${textColor}">${text}</text></svg>`;
};
