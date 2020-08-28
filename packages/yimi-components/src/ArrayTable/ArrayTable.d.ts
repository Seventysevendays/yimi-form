import React, { ReactNode } from "react";
import { Core } from "../../../yimi-form/src";
import { TableProps } from "antd/lib/table";
import { ArrayTableActionValue } from "../context/arrayTable";
import { FormProps } from "../../../yimi-form/src/components/Form/Form";
import "antd/lib/table/style/index.css";
import "antd/lib/pagination/style/index.css";
import { Status } from "../types";
interface ArrayTableProps<T> {
    children?: ReactNode;
    getTable?: (table: ArrayTable) => void;
    tableConfig?: TableProps<any>;
    onChange?: (data: T[]) => void;
    onRowChange?: (val: T, core: Core) => void;
    tableTop?: ReactNode;
    rowFormConfig?: FormProps;
    value?: T[];
    status?: Status;
}
interface ArrayTableState {
}
declare class ArrayTable extends React.Component<ArrayTableProps<any>, ArrayTableState> {
    protected components: any;
    protected dataSource: any[];
    rowKey: string;
    protected actionValue: ArrayTableActionValue;
    constructor(props: ArrayTableProps<any>);
    componentDidMount: () => void;
    componentDidUpdate: (prevProps: ArrayTableProps<any>) => void;
    private onRowChange;
    private onChange;
    changeAndUpdate: () => void;
    addBottom: () => void;
    addTop: () => void;
    remove: (id: string) => void;
    insertAfter: (id: string) => void;
    insertBefore: (id: string) => void;
    render(): JSX.Element;
}
export default ArrayTable;
