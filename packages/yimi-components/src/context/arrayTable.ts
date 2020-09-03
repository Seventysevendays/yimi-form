import { createContext } from "react";
import { Core } from "../../../yimi-form/src";

type ArrayTableCallback = (
  core: Core,
  dataSource: any[],
  coreList: Core[]
) => void;

export interface ArrayTableActionValue {
  addBottom: (callback?: ArrayTableCallback) => void;
  addTop: (callback?: ArrayTableCallback) => void;
  remove: (id: string, callback?: ArrayTableCallback) => void;
  insertAfter: (id: string, callback?: ArrayTableCallback) => void;
  insertBefore: (id: string, callback?: ArrayTableCallback) => void;
  dataSource: any[];
}

const noop = () => {};
const ArrayTableContext = createContext<ArrayTableActionValue>({
  addBottom: noop,
  addTop: noop,
  remove: noop,
  insertAfter: noop,
  insertBefore: noop,
  dataSource: [],
});

export default ArrayTableContext;
