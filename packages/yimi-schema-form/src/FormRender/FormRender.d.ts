import React from "react";
import { SchemaFormItemProps } from "../SchemaFormItem/SchemaFormItem";
import { FormProps } from "../../../yimi-form/src/components/Form/Form";
import { SchemaArrayTableProps } from "../SchemaArrayTable/SchemaArrayTable";
import { SchemaArrayListProps } from "../SchemaArrayList/SchemaArrayList";
import { Core } from "../../../yimi-form/src";
import { RowProps, ColProps, ContainerProps } from "react-grid-system";
import { CoreProps } from "../../../yimi-form/src/core/core";
export interface FormRenderRowSchema {
    row?: RowProps;
    component?: "y-form" | "y-list" | "y-table" | "y-row" | string;
    componentProps?: FormProps | SchemaArrayListProps | SchemaArrayTableProps | {
        [key: string]: any;
    };
    name?: string;
    title?: string;
    formItem?: SchemaFormItemProps;
    col?: ColProps;
    properties?: Array<FormRenderRowSchema>;
    componentType?: "data" | "display";
}
declare type FormRenderSchema = Array<FormRenderRowSchema>;
declare type FormRenderSchemaComponent = {
    [key: string]: any;
};
export interface FormRenderProps {
    schema: FormRenderSchema;
    container?: ContainerProps;
    components: FormRenderSchemaComponent;
    form?: FormProps;
    coreConfig?: CoreProps;
}
declare class FormRender extends React.Component<FormRenderProps> {
    components: FormRenderSchemaComponent;
    core: Core;
    constructor(props: FormRenderProps);
    renderComponent: (cpName: string) => any;
    renderForm: (item: FormRenderRowSchema) => JSX.Element;
    renderList: (item: FormRenderRowSchema) => JSX.Element;
    renderTable: (item: FormRenderRowSchema) => JSX.Element;
    renderRow: (item: FormRenderRowSchema) => JSX.Element[];
    renderSchema: (schema: FormRenderSchema) => JSX.Element[];
    renderItem: (item: FormRenderRowSchema) => JSX.Element | JSX.Element[];
    render(): JSX.Element;
}
export default FormRender;
