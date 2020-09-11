import React from "react";
import { InputProps as AInputProps } from "antd/lib/input";
import { Status } from "../types";
interface InputProps extends AInputProps {
    status?: Status;
}
declare class Input extends React.Component<InputProps> {
    static Group: React.StatelessComponent<import("antd/lib/input").GroupProps>;
    static Search: typeof import("antd/lib/input/Search").default;
    static TextArea: typeof import("antd/lib/input/TextArea").default;
    static Password: typeof import("antd/lib/input/Password").default;
    render(): JSX.Element;
}
export default Input;
