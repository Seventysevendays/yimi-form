import React from "react";
import { CheckboxProps as ACheckboxProps } from "antd/lib/checkbox";
import { Status } from "../types";
interface CheckboxProps extends ACheckboxProps {
    status?: Status;
}
declare class Checkbox extends React.Component<CheckboxProps> {
    render(): JSX.Element;
}
export default Checkbox;
