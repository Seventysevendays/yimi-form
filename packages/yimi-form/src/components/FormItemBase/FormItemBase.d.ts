import React from "react";
import { FormItemProps } from "../FormItem/FormItem";
import Core from "../../core/core";
import ItemCore from "../../core/itemCore";
interface FormItemBaseProps extends FormItemProps {
    itemCore: ItemCore;
}
declare class FormItemBase extends React.PureComponent<FormItemBaseProps> {
    core: Core;
    name: string;
    itemCore: ItemCore;
    statusListenKeys: string[] | false;
    propsListenKeys: string[] | false;
    constructor(props: FormItemBaseProps);
    componentWillUnmount: () => void;
    componentDidMount: () => void;
    handleValueUpdate: (name: any) => void;
    onChange: (...args: any[]) => void;
    getChildProps: () => any;
    handleStatusUpdate: (name: any) => void;
    private handleForceUpdate;
    render(): JSX.Element;
}
export default FormItemBase;
