import { createContext } from "react";

export interface ArrayTableActionValue {
  addBottom: () => void;
  addTop: () => void;
  remove: (id: string) => void;
  insertAfter: (id: string) => void;
  insertBefore: (id: string) => void;
}

const noop = () => {};
const ArrayTableContext = createContext<ArrayTableActionValue>({
  addBottom: noop,
  addTop: noop,
  remove: noop,
  insertAfter: noop,
  insertBefore: noop,
});

export default ArrayTableContext;
