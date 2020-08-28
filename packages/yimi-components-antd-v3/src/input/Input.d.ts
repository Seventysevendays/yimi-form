import React from "react";
import { InputProps as AInputProps } from "antd/lib/input";
import { Status } from "../types";
interface InputProps extends AInputProps {
    status?: Status;
}
declare class Input extends React.Component<InputProps> {
    render(): JSX.Element;
}
export default Input;
