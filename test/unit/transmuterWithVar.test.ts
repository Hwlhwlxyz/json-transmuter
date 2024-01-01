import { createObjectByRuleObjWithVar, findByRegexInFlattenedObj, transmuteWithVar } from '../../src/transmuter/flattenTransmuter';
import { expect } from 'chai';
import 'mocha';

describe('flattenTransmuter test',
  () => {
    // it('basic test', () => {
    //   const result = findByRegexInFlattenedObj("getValue-${0}", "(\\d)", { "a": "valuea", "b": "valueb", "1": "value1", "2": "value2" });
    //   expect(result).to.deep.eq({ 'getValue-1': 'value1', 'getValue-2': 'value2' });
    //   console.log(result);
    // });

    // it('flattened nested object', () => {
    //   const result = findByRegexInFlattenedObj("getValue-${0}", "n.(\\d)", { "a": "valuea", "b": "valueb", "n.1": "value1", "n.2": "value2" });
    //   expect(result).to.deep.eq({ 'getValue-1': 'value1', 'getValue-2': 'value2' });
    //   console.log(result);
    // });

    it('createObjectByRuleObjWithVar', () => {
      const ruleObj = { 'justnumber': 1, "getValue-${0}": "n.(\\d)" };
      const originalObj = { "a": "valuea", "b": "valueb", "n.1": "value1", "n.2": "value2" };
      const result = createObjectByRuleObjWithVar(ruleObj, originalObj);
      expect(result).to.deep.eq({ justnumber: 1, 'getValue-1': 'value1', 'getValue-2': 'value2' });
    })

    it('createObjectByRuleObjWithVar, object key with dot', () => {
      const ruleObj = {
        'justnumber': 1,
        "getValue.n${0}": "n.(\\d)",
        "char${0}-num${1}": "(\\w).(\\d)"
      };
      const originalObj = { "a": "valuea", "b": "valueb", "n.1": "value1", "n.2": "value2", "x.1": "x1", "x.2": "x2", "y.1": "y1", "y.2": "y2" };
      const result = createObjectByRuleObjWithVar(ruleObj, originalObj);
      expect(result).to.deep.eq({ justnumber: 1, 'getValue.n1': 'value1', 'getValue.n2': 'value2', 'charn-num1': 'value1', 'charn-num2': 'value2', 'charx-num1': 'x1', 'charx-num2': 'x2', 'chary-num1': 'y1', 'chary-num2': 'y2' })
    })

    it('createObjectByRuleObjWithVar, nested array to key', () => {
      const ruleObj = {
        'justnumber': 2,
        "getValue-n${0}": "n.(\\d)",
        "char${0}-num${1}": "(\\w).(\\d)"
      };
      const originalObj = { "a": "valuea", "b": "valueb", "n.1": "value1", "n.2": "value2", "x.1": "x1", "x.2": "x2", "y.1": "y1", "y.2": "y2" };
      const result = createObjectByRuleObjWithVar(ruleObj, originalObj);
      expect(result).to.deep.eq({
        justnumber: 2,
        'getValue-n1': 'value1',
        'getValue-n2': 'value2',
        'charn-num1': 'value1',
        'charn-num2': 'value2',
        'charx-num1': 'x1',
        'charx-num2': 'x2',
        'chary-num1': 'y1',
        'chary-num2': 'y2'
      })
    })

    it('createObjectByRuleObjWithVar, key with number to array', () => {
      const ruleObj = {
        'justnumber': 3,
        "getValue.n${0}": "n.(\\d)",
        "char${0}.num${1}": "(\\w).(\\d)"
      };
      const originalObj = { "a": "valuea", "b": "valueb", "n.1": "value1", "n.2": "value2", "x.1": "x1", "x.2": "x2", "y.1": "y1", "y.2": "y2" };
      const result = createObjectByRuleObjWithVar(ruleObj, originalObj);
      expect(result).to.deep.eq({
        justnumber: 3,
        'getValue.n1': 'value1',
        'getValue.n2': 'value2',
        'charn.num1': 'value1',
        'charn.num2': 'value2',
        'charx.num1': 'x1',
        'charx.num2': 'x2',
        'chary.num1': 'y1',
        'chary.num2': 'y2'
      })
    })

    it('transmuterWithVar', () => {
      const ruleObj = {
        'justnumber': 4,
        "getValue.n${0}": "n.(\\d)",
        "char${0}.num${1}": "(\\w).(\\d)"
      };
      const originalObj = { "a": "valuea", "b": "valueb", "n.1": "value1", "n.2": "value2", "x.1": "x1", "x.2": "x2", "y.1": "y1", "y.2": "y2" };
      const result = transmuteWithVar(ruleObj, originalObj);
      expect(result).to.deep.eq({
        justnumber: 4,
        getValue: { n1: 'value1', n2: 'value2' },
        charn: { num1: 'value1', num2: 'value2' },
        charx: { num1: 'x1', num2: 'x2' },
        chary: { num1: 'y1', num2: 'y2' }
      })
    })
  });
