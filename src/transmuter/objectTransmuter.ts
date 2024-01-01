import { compileToString } from "../utility/template";
import { isNestedObj } from "../utility/objectUtil";

/**
 * get value by prop name in the object
 * @param propName - a string including '.' 
 * @param originalObj - the object to offer values (new object fetch values from this object)
 * @returns a nested dvalue
 */
export function getBypropName(propName: string, originalObj: object) {
  let propArray = propName.split('.');
  let currentValue = originalObj;
  type currentValueType = typeof currentValue;
  for (let i = 0; i < propArray.length; i++) {
    if (currentValue != null) {
      currentValue = currentValue[propArray[i] as keyof currentValueType];
    }
  }
  return currentValue;
}

/**
 * transfer originalObj to another structure
 * @param ruleObj - result object has the same key as the ruleObj
 * @param originalObj - the object to transmute
 * @returns - an object has the same structure as the ruleObj
 */
export function transmuteWithoutVar(ruleObj: any, originalObj: object) {
  let returnObj: any = {};
  const keysArray = Object.keys(ruleObj);
  for (let i = 0; i < keysArray.length; i++) {
    const key = keysArray[i];
    if (!isNestedObj(ruleObj[key])) {
      returnObj[key] = getBypropName(String(ruleObj[key]), originalObj);
    }
    else {
      returnObj[key] = transmuteWithoutVar(ruleObj[key], originalObj)
    }
  }
  return returnObj;
}
