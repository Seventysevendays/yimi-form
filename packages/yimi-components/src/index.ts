import ArrayContext from "./context/arrayTable";
import ArrrayIndexContext from './context/arrayIndex'
export { default as ArrayTable } from "./ArrayTable/ArrayTable";
export { default as ArrayList } from "./ArrayList/ArrayList";
export const ArrayAction = ArrayContext.Consumer;
export const ArrayIndex = ArrrayIndexContext.Consumer;
