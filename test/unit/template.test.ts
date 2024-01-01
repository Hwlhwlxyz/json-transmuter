import { expect } from 'chai';
import 'mocha';
import { compileToString } from "../../src/utility/template";

describe('Template test', () => {

  it('empty template', () => {
    let result1 = compileToString("", [])
    // console.log(result1)
    expect(result1).to.eq("");
  });
  it('template test', () => {
    let result1 = compileToString("${0}+${1}+${2}+", ["1", "2", "3"])
    // console.log(result1);
    expect(result1).to.eq("1+2+3+");
    let result2 = compileToString("${0}+${1}+${2}+", ["a", "b", "c"])
    // console.log(result2);
    expect(result2).to.eq("a+b+c+");
  });



});



