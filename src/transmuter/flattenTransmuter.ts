import { isNestedObj, flattenJSON, unflattenToJSON } from "../utility/objectUtil";
import { compileToString } from "../utility/template";
import { NotNestedObject } from "../type";


/**
 * to check whether a string is a template and including variables
 * @param strToCheck - a string can be template literal
 */
function isTemplateLiteral(strToCheck: string) {
  const regex = /\${(.*?)\}/g
  const hasVariable = (str: string) => str.search(regex) > -1
  return hasVariable;
}

/**
 * find the values based on keys which match the regex rule
 * @param keyInNewObj - key of ruleObj
 * @param regexStr - the regex to match the keys in flattened object (value of ruleObj)
 * @param originalFlattenedObj 
 * @returns an array including values
 */
export function findByRegexInFlattenedObj(keyInNewObj: string, regexStr: string, originalFlattenedObj: object) {
  const matchKeyObj: NotNestedObject = {};
  let regexp = new RegExp(regexStr, "i");
  for (let [keyStr, value] of Object.entries(originalFlattenedObj)) {
    let matchResult = keyStr.match(regexp);
    if (matchResult != null) {
      let newKey = compileToString(keyInNewObj, matchResult.slice(1));
      matchKeyObj[newKey] = value;
    }
  }
  return matchKeyObj;
}



/**
 * create object by template literals and originalObj, and returns an object 
 * @param ruleObj - an object without nested object. Keys are string which maybe a template string including variables. Values are regex. 
 * @param originalFlattenedObj 
 * @return returnObj - flattend object
 */
export function createObjectByRuleObjWithVar(ruleObj: NotNestedObject, originalFlattenedObj: NotNestedObject) {
  let returnObj: any = {};
  for (const [key, value] of Object.entries(ruleObj)) {
    if (typeof value === 'string') {
      returnObj = Object.assign(returnObj, findByRegexInFlattenedObj(key, value, originalFlattenedObj));
    }
    else {
      returnObj[key] = value;
    }
  }
  return returnObj;
}

/**
 * flatten the ruleObj before calling createObjectByRuleObjVar
 * @param ruleObj 
 * @param originalFlattenedObj 
 */
export function transmuteWithVar(ruleObj: object, originalObj: object) {
  const flattenedRuleObj: NotNestedObject = flattenJSON(ruleObj);
  const flattendOriginalObj: NotNestedObject = flattenJSON(originalObj)
  const flattenedResultObj = createObjectByRuleObjWithVar(flattenedRuleObj, flattendOriginalObj);
  const resultObj = unflattenToJSON(flattenedResultObj);
  return resultObj;
}