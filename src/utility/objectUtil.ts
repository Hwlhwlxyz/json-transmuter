export function isNestedObj(targetObj: any) {
  return (targetObj != null && (typeof targetObj === 'object' || Array.isArray(targetObj)))
}

/**
 * flatten an object
 * @param JSONObj original object
 * @returns object without nested object
 */
export function flattenJSON(JSONObj: object) {
  let flattenedJSONObj: any = {};
  function innerRecurse(curObj: any, chainedPropStr: string) {
    if (!isNestedObj(curObj)) {
      flattenedJSONObj[chainedPropStr] = curObj; // add flattend prop names to flattenedJSONObj
      return curObj;
    } else {
      if (Array.isArray(curObj)) {
        for (let i = 0; i < curObj.length; i++) {
          const arrayElement = curObj[i];
          if (arrayElement != null) innerRecurse(arrayElement, chainedPropStr + "[" + i + "]");
        }
      }
      else { // if the nested curObj is a nested object but not array
        const keysArray = Object.keys(curObj);
        for (let i = 0; i < keysArray.length; i++) {
          const keyStr = keysArray[i];
          if (curObj[keyStr] != null) innerRecurse(curObj[keyStr], chainedPropStr + "." + keyStr);
        }
      }
    }
    return;
  }
  innerRecurse(JSONObj, '');
  return flattenedJSONObj;
}

export function unflattenToJSON(flattenObj: object) {
  let result: any = {};
  for (const [flattenedkey, value] of Object.entries(flattenObj)) {
    let searchKey = flattenedkey.split(/[.,\[,\]]/).filter(e => e.length > 0);
    if (searchKey != null) {
      let keysArray: string[] = searchKey;
      let cur = result;
      for (let i = 0; i < keysArray.length - 1; i++) {
        let curKey = keysArray[i];
        if (cur[curKey] == undefined) {
          cur[curKey] = {};
        }
        cur = cur[curKey];
      }
      cur[keysArray[keysArray.length - 1]] = value;
    }
  }
  return result;
}