import React, { ReactNode } from "react";
import { ArrayTableProps } from "../../../yimi-form-components/src/ArrayTable/ArrayTable";
export interface SchemaArrayTableProps extends ArrayTableProps<any> {
    hasAdd?: boolean;
    deleteText?: string;
    operationText?: string;
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
    hasDelete?: boolean;
    editMode?: "edit" | "preview";
    editText?: string;
    saveText?: string;
}
declare class SchemaArrayTable extends React.Component<SchemaArrayTableProps> {
    renderAction: () => JSX.Element;
    getColumns: () => any;
    render(): JSX.Element;
}
export default SchemaArrayTable;
