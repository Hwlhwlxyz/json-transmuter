import { expect } from 'chai';
import 'mocha';
import { flattenJSON, unflattenToJSON } from '../../src/utility/objectUtil';

describe('Transmuter getByAttributeName test', () => {

  it('get a new flatten json', () => {
    let result1 = flattenJSON({ a: 'a', b: 'b', c: 'c', d: { e: 'e' }, f: 'f-f1-f2', g: { g1: { g2: { g3: 'g123' } } } })
    // console.log(result1)
    expect(result1).deep.eq({ '.a': 'a', '.b': 'b', '.c': 'c', '.d.e': 'e', '.f': 'f-f1-f2', '.g.g1.g2.g3': 'g123' });
  });

  it('get a flatten object from array', () => {
    let result1 = flattenJSON([{ a: 'a', b: 'b', c: 'c', d: { e: 'e' }, f: 'f.f1.f2' }, { a: 'a' }])
    // console.log(result1);
    expect(result1).deep.eq({ '[0].a': 'a', '[0].b': 'b', '[0].c': 'c', '[0].d.e': 'e', '[0].f': 'f.f1.f2', '[1].a': 'a' });
  });

  it('unflatten', () => {
    let result1 = unflattenToJSON({ '[0].a': 'a', '[0].b': 'b', '[0].c': 'c', '[0].d.e': 'e', '[0].f': 'f-f1-f2', '[1].a': 'a' })
    expect(result1).deep.eq({
      '0': { a: 'a', b: 'b', c: 'c', d: { e: 'e' }, f: 'f-f1-f2' },
      '1': { a: 'a' }
    });
  });

});



