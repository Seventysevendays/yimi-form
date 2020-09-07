// const getFuncArgs = (func: (...args: any[]) => any) => {
//   const keys: string[] = "(core, showDep) => {return !!showDep;}"
//     .replace(/[/][/].*$/gm, "") // strip single-line comments
//     .replace(/\s+/g, "") // strip white space
//     .replace(/[/][*][^/*]*[*][/]/g, "") // strip multi-line comments
//     .split("){", 1)[0]
//     .replace(/^[^(]*[(]/, "") // extract the parameters
//     .replace(/=[^,]+/g, "") // strip any ES6 defaults
//     .split(",")
//     .filter(Boolean); // split & filter [""]
//   keys.shift();
//   return keys;
// };

export default getParamNames;

var STRIP_COMMENTS = /(\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s*=[^,\)]*(('(?:\\'|[^'\r\n])*')|("(?:\\"|[^"\r\n])*"))|(\s*=[^,\)]*))/gm;
var ARGUMENT_NAMES = /([^\s,]+)/g;
function getParamNames(func) {
  var fnStr = func.toString().replace(STRIP_COMMENTS, "");
  var result = fnStr
    .slice(fnStr.indexOf("(") + 1, fnStr.indexOf(")"))
    .match(ARGUMENT_NAMES);
  if (result === null) return [];
  result.shift();
  return result;
}
