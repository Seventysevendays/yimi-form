import React, { ReactNode } from "react";
import { ArrayListProps } from "../../../yimi-form-components/src/ArrayList/ArrayList";
export interface SchemaArrayListProps extends ArrayListProps<any> {
    hasAdd?: boolean;
    hasInsertAfter?: boolean;
    hasInsertBefore?: boolean;
    hasRemove?: boolean;
    addBottomText?: ReactNode;
    addTopText?: ReactNode;
    removeText?: ReactNode;
    insertAfterText?: ReactNode;
    insertBeforeText?: ReactNode;
    actionPosition?: "top" | "bottom";
    addFrom?: "bottom" | "top";
}
declare class SChemaArrayList extends React.Component<SchemaArrayListProps> {
    renderAction: () => JSX.Element;
    renderRowAction: () => JSX.Element;
    render(): JSX.Element;
}
export default SChemaArrayList;
