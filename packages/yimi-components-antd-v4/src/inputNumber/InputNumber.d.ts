import React from "react";
import { InputNumberProps as AInputNumberProps } from "antd/lib/input-number";
import { Status } from "../types";
interface InputNumberProps extends AInputNumberProps {
    status?: Status;
}
declare class InputNumber extends React.Component<InputNumberProps> {
    render(): JSX.Element;
}
export default InputNumber;
