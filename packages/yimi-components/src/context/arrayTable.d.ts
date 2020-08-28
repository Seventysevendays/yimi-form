/// <reference types="react" />
export interface ArrayTableActionValue {
    addBottom: () => void;
    addTop: () => void;
    remove: (id: string) => void;
    insertAfter: (id: string) => void;
    insertBefore: (id: string) => void;
}
declare const ArrayTableContext: import("react").Context<ArrayTableActionValue>;
export default ArrayTableContext;
