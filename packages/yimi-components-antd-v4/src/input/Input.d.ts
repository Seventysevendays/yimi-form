import React from "react";
import AInput, { InputProps as AInputProps } from "antd/lib/input";
import { Status } from "../types";
interface InputProps extends AInputProps {
    status?: Status;
}
declare class Input extends React.Component<InputProps> {
    static Group: React.FC<import("antd/lib/input").GroupProps>;
    static Search: React.ForwardRefExoticComponent<import("antd/lib/input").SearchProps & React.RefAttributes<AInput>>;
    static TextArea: typeof import("antd/lib/input/TextArea").default;
    static Password: React.ForwardRefExoticComponent<import("antd/lib/input").PasswordProps & React.RefAttributes<unknown>>;
    render(): JSX.Element;
}
export default Input;
