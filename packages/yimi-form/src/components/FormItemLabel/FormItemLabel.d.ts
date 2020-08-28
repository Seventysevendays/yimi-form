import React from "react";
import { FormItemProps, ItemValidateConfig } from "../FormItem/FormItem";
import Core from "../../core/core";
interface FormItemLabelProps extends FormItemProps {
}
declare class FormItemLabel extends React.PureComponent<FormItemLabelProps> {
    name: string;
    label: React.ReactNode;
    validateConfig: ItemValidateConfig;
    core: Core;
    required: boolean;
    constructor(props: FormItemLabelProps);
    private handleForceUpdate;
    handleRequired: () => void;
    componentWillUnmount: () => void;
    render(): JSX.Element;
}
export default FormItemLabel;
