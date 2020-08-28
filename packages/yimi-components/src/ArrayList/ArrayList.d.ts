import React, { ReactNode } from "react";
import { Core } from "../../../yimi-form/src";
import { ArrayTableActionValue } from "../context/arrayTable";
import { FormProps } from "../../../yimi-form/src/components/Form/Form";
interface ArrayListProps<T> {
    children?: ReactNode;
    defaultValue?: T[];
    value?: T[];
    onChange?: (data: T[]) => void;
    rowKey?: string;
    onRowChange?: (val: any, core: Core) => void;
    listBottom?: ReactNode;
    listTop?: ReactNode;
    rowFormConfig?: FormProps;
}
declare type Props = ArrayListProps<any>;
declare class ArrayList extends React.Component<Props> {
    protected dataSource: any[];
    protected actionValue: ArrayTableActionValue;
    private rowKey;
    constructor(props: Props);
    componentDidMount: () => void;
    componentDidUpdate: (prevProps: Props) => void;
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
export default ArrayList;
