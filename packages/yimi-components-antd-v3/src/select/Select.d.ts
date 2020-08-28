import React from "react";
import { SelectProps as ASelectProps } from "antd/lib/select";
import { Status } from "../types";
declare type Options = Array<{
    label: React.ReactNode;
    value: any;
    [other: string]: any;
}>;
interface SelectProps extends ASelectProps<any> {
    status?: Status;
    options?: Options;
}
declare class Select extends React.Component<SelectProps> {
    static Option: React.ClassicComponentClass<import("antd/lib/select").OptionProps>;
    static OptGroup: React.ClassicComponentClass<import("antd/lib/select").OptGroupProps>;
    render(): JSX.Element;
}
export default Select;
