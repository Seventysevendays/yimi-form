import React, { ReactNode } from "react";
import { Core } from "../../../yimi-form/src";
import { ArrayTableActionValue } from "../context/arrayTable";
import { FormProps } from "../../../yimi-form/src/components/Form/Form";
import { CoreProps, Status } from "../../../yimi-form/src/core/core";
export interface ArrayListProps<T> {
    children?: ReactNode;
    defaultValue?: T[];
    value?: T[];
    onChange?: (data: T[]) => void;
    rowKey?: string;
    onRowChange?: (val: any, core: Core, key: string[]) => void;
    bottom?: ReactNode;
    top?: ReactNode;
    rowFormConfig?: FormProps;
    rowCoreConfig?: CoreProps;
    status?: Status;
    className?: string;
    style?: React.CSSProperties;
    getInst?: (table: ArrayList) => void;
}
declare type ArrayTableCallback = (core: Core, dataSource: any[], coreList: Core[]) => void;
declare type Props = ArrayListProps<any>;
declare class ArrayList extends React.Component<Props> {
    static displayName: string;
    protected dataSource: any[];
    protected actionValue: ArrayTableActionValue;
    private rowKey;
    protected coreList: Core[];
    private coreValue;
    constructor(props: Props);
    componentDidMount: () => void;
    componentDidUpdate: (prevProps: Props) => void;
    private onRowChange;
    private onChange;
    changeAndUpdate: () => void;
    private updateCoreList;
    private handleCallback;
    addBottom: (callback?: ArrayTableCallback) => void;
    addTop: (callback?: ArrayTableCallback) => void;
    remove: (id: string, callback?: ArrayTableCallback) => void;
    insertAfter: (id: string, callback?: ArrayTableCallback) => void;
    insertBefore: (id: string, callback?: ArrayTableCallback) => void;
    render(): JSX.Element;
}
export default ArrayList;
