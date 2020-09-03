/// <reference types="react" />
import { Core } from "../../../yimi-form/src";
declare type ArrayTableCallback = (core: Core, dataSource: any[], coreList: Core[]) => void;
export interface ArrayTableActionValue {
    addBottom: (callback?: ArrayTableCallback) => void;
    addTop: (callback?: ArrayTableCallback) => void;
    remove: (id: string, callback?: ArrayTableCallback) => void;
    insertAfter: (id: string, callback?: ArrayTableCallback) => void;
    insertBefore: (id: string, callback?: ArrayTableCallback) => void;
    dataSource: any[];
}
declare const ArrayTableContext: import("react").Context<ArrayTableActionValue>;
export default ArrayTableContext;
