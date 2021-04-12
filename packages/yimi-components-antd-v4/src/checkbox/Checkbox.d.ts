import React from "react";
import { CheckboxGroupProps, CheckboxProps as ACheckboxProps } from "antd/lib/checkbox";
import { Status } from "../types";
interface CheckboxProps extends ACheckboxProps {
    status?: Status;
}
declare function Group(props: CheckboxGroupProps & {
    status?: Status;
}): JSX.Element;
declare class Checkbox extends React.Component<CheckboxProps> {
    static Group: typeof Group;
    render(): JSX.Element;
}
export default Checkbox;
