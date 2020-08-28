/*
 * @author: xuxiang
 * @description: description
 * @Date: 2020-07-22 11:37:02
 * @LastEditors: xuxiang
 * @LastEditTime: 2020-07-22 14:02:34
 */

const isObject = (obj) =>
  Object.prototype.toString.call(obj) === "[object Object]";

const isFile = (obj) => Object.prototype.toString.call(obj) === "[object File]";

const isPromise = (p) => p && p.then && typeof p.then === "function";
const isInvalidVal = (val) => {
  if (typeof val === "number") {
    return false;
  } else if (typeof val === "boolean") {
    return false;
  }
  return !val;
};
const isSingleItemSet = (arg) => arg.length >= 3 && typeof arg[1] === "string";
const isFunction = (func) => typeof func === "function";
// const isValidStatus = status =>
//   typeof status === "function" ||
//   [EDIT, PREVIEW, DISABLED, HIDDEN].indexOf(status) !== -1;

export {
  isObject,
  isInvalidVal,
  isSingleItemSet,
  isPromise,
  isFunction,
  isFile,
  // isValidStatus
};
