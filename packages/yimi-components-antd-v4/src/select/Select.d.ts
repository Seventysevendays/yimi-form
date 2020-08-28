import React from "react";
import { SelectProps as ASelectProps } from "antd/lib/select";
import { Status } from "../types";
interface SelectProps extends ASelectProps<any> {
    status?: Status;
}
declare class Select extends React.Component<SelectProps> {
    static Option: import("rc-select/lib/Option").OptionFC;
    static OptGroup: import("rc-select/lib/OptGroup").OptionGroupFC;
    render(): JSX.Element;
}
export default Select;
