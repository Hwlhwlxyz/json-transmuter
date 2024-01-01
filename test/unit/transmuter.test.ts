import { transmuteWithoutVar, getBypropName } from '../../src/transmuter/objectTransmuter';
import { expect } from 'chai';
import 'mocha';

describe('Transmuter getByAttributeName test', () => {
  it('get a nested value', () => {
    const x = { a: { b: { c: { d: "d" } } } };
    const result = getBypropName("a.b.c", x)
    expect(result).deep.eq({ d: "d" });
  });

  it('get a value in an array', () => {
    const y = { a: [1, 2, 3] }
    const result1 = getBypropName("a.1", y)
    expect(result1).to.equal(2);
    const result2 = getBypropName("a.4", y)
    expect(result2).to.equal(undefined);
    expect(result2).to.be.undefined;
  });

  it('get a new json', () => {
    let result1 = transmuteWithoutVar({ a: 'a', b: 'b', c: 'c', d: { e: 'e' }, f: 'f.f1.f2' }, { a: 1, b: 2, c: 3, d: 4, e: 5, f: { f1: { f2: 6 } } })
    // console.log(result1)
    expect(result1).deep.eq({ a: 1, b: 2, c: 3, d: { e: 5 }, f: 6 });
  });

  it('get a new json object from array', () => {
    let result1 = transmuteWithoutVar([{ a: 'a', b: 'b', c: 'c', d: { e: 'e' }, f: 'f.f1.f2' }, { a: 'a' }], { a: 1, b: 2, c: 3, d: 4, e: 5, f: { f1: { f2: 6 } } })
    // console.log(result1);
    expect(result1).deep.eq({ '0': { a: 1, b: 2, c: 3, d: { e: 5 }, f: 6 }, '1': { a: 1 } });
  });
});



