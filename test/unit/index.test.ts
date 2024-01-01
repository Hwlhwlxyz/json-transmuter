import { transmuteWithVar, transmuteWithoutVar } from '../../src/index';
import { expect } from 'chai';
import 'mocha';

describe('First test',
  () => {
    it('transmuteWithoutVar', () => {
      const result = transmuteWithoutVar(
        { 'one': 1, 'two': 2, 'three': 3, 'fruita': 'fruit.a', 'fruitb': 'fruit.b', 'fruitc': 'fruit.c' },
        { 1: 'x', 2: 'y', 3: 'z', 'fruit': { 'a': 'apple', 'b': 'banana', c: 'cherries' } });
      expect(result).deep.eq({ one: 'x', two: 'y', three: 'z', fruita: 'apple', fruitb: 'banana', fruitc: 'cherries' });
    });

    it('transmuteWithVar', () => {
      const result = transmuteWithVar(
        { 'number.number-${0}': '(\\d)', 'fruit${0}': 'fruit\.(\\w+)' },
        { 1: 'x', 2: 'y', 3: 'z', 'fruit': { 'a': 'apple', 'b': 'banana', c: 'cherries' } });
      console.log(result)
      expect(result).deep.eq({ number: { 'number-1': 'x', 'number-2': 'y', 'number-3': 'z' }, fruita: 'apple', fruitb: 'banana', fruitc: 'cherries' });
    });
  });