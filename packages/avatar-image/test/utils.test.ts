import { assert } from '@open-wc/testing';
import { getInitialsFromString, stringHash } from '../src/utils.js';

describe('utils.ts', () => {
  describe('stringHash', () => {
    it('creates a unique hash from strings', () => {
      assert.equal(stringHash('foo'), 387);
      assert.equal(stringHash('bar'), 564);
      assert.equal(stringHash('foo bar'), 714);
    });
  });

  describe('getInitialsFromString', () => {
    it('returns undefined when string is empty', () => {
      assert.isUndefined(getInitialsFromString(''));
    });

    it('returns undefined when string is one part and only one character', () => {
      assert.isUndefined(getInitialsFromString('F'));
    });

    it('returns the first two characters when string consists of one part only', () => {
      assert.equal(getInitialsFromString('Foo'), 'FO');
    });

    it('returns the first characters of each part of a string', () => {
      assert.equal(getInitialsFromString('Foo Bar'), 'FB');
    });

    it('only considers the first two parts of a string', () => {
      assert.equal(getInitialsFromString('Foo Bar Baz'), 'FB');
    });
  });
});
