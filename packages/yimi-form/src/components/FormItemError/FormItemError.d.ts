import React from "react";
import { FormItemProps } from "../FormItem/FormItem";
import Core from "../../core/core";
interface FormItemErrorProps extends FormItemProps {
}
declare class FormItemError extends React.PureComponent<FormItemErrorProps> {
    name: string;
    core: Core;
    error: any;
    errorRender: (error: any) => React.ReactNode;
    constructor(props: FormItemErrorProps);
    private handleForceUpdate;
    private handleUpdate;
    componentWillUnmount: () => void;
    render(): any;
}
export default FormItemError;
