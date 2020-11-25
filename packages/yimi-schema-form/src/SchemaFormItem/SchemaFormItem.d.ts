import React from "react";
import { FormItemProps } from "../../../yimi-form/src/components/FormItem/FormItem";
interface VisibleConfig {
    name: string;
    value: string;
    visible: boolean;
    rule: "===" | ">=" | ">" | "<=" | "<";
}
export interface SchemaFormItemProps extends FormItemProps {
    visibleOrConfig?: VisibleConfig[];
    visibleAndConfig?: VisibleConfig[];
}
declare class SchemaFormItem extends React.Component<SchemaFormItemProps> {
    itemProps: FormItemProps;
    constructor(props: SchemaFormItemProps);
    render(): JSX.Element;
}
export default SchemaFormItem;
