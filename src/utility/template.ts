export function compileToString(templateStr: string, variableArray: string[]) {
  let resultStr = templateStr.slice();
  for (let i = 0; i < variableArray.length; i++) {
    resultStr = resultStr.replace("${" + i + "}", variableArray[i]);
  }
  return resultStr;
}