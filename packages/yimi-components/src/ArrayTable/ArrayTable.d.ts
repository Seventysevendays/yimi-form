import React, { ReactNode } from "react";
import { Core } from "../../../yimi-form/src";
import { TableProps } from "antd/lib/table";
import { ArrayTableActionValue } from "../context/arrayTable";
import { FormProps } from "../../../yimi-form/src/components/Form/Form";
import "antd/lib/table/style/index.css";
import "antd/lib/pagination/style/index.css";
import { Status } from "../types";
import { CoreProps } from "../../../yimi-form/src/core/core";
interface ArrayTableProps<T> {
    tableConfig?: TableProps<any>;
    onChange?: (data: T[]) => void;
    onRowChange?: (val: T, core: Core) => void;
    top?: ReactNode;
    bottom?: ReactNode;
    rowFormConfig?: FormProps;
    rowCoreConfig?: CoreProps;
    value?: T[];
    status?: Status;
    className?: string;
    style?: React.CSSProperties;
}
declare type ArrayTableCallback = (core: Core, dataSource: any[], coreList: Core[]) => void;
interface ArrayTableState {
    current: number;
    pageSize: number;
}
declare class ArrayTable extends React.Component<ArrayTableProps<any>, ArrayTableState> {
    protected components: any;
    protected dataSource: any[];
    protected coreList: Core[];
    rowKey: string;
    protected actionValue: ArrayTableActionValue;
    private coreValue;
    constructor(props: ArrayTableProps<any>);
    componentDidUpdate: (prevProps: ArrayTableProps<any>) => void;
    private onRowChange;
    private onChange;
    private updateCoreList;
    private handleCallback;
    changeAndUpdate: () => void;
    addBottom: (callback?: ArrayTableCallback) => void;
    addTop: (callback?: ArrayTableCallback) => void;
    remove: (id: string, callback?: ArrayTableCallback) => void;
    insertAfter: (id: string, callback?: ArrayTableCallback) => void;
    insertBefore: (id: string, callback?: ArrayTableCallback) => void;
    onShowSizeChange: (current: any, size: any) => void;
    onPageChange: (page: any, size: any) => void;
    render(): JSX.Element;
}
export default ArrayTable;
