import React from "react";
import { InputProps as AInputProps, TextAreaProps, GroupProps, SearchProps, PasswordProps } from "antd/lib/input";
import { Status } from "../types";
declare function TextArea(props: TextAreaProps & {
    status?: Status;
}): JSX.Element;
declare function Group(props: GroupProps & {
    status?: Status;
}): JSX.Element;
declare function Search(props: PasswordProps & {
    status?: Status;
}): JSX.Element;
declare function Password(props: SearchProps & {
    status?: Status;
}): JSX.Element;
interface InputProps extends AInputProps {
    status?: Status;
}
declare class Input extends React.Component<InputProps> {
    static Group: typeof Group;
    static Search: typeof Search;
    static TextArea: typeof TextArea;
    static Password: typeof Password;
    render(): JSX.Element;
}
export default Input;
