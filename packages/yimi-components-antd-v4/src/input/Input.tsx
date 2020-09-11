import React from "react";
import AInput, { InputProps as AInputProps } from "antd/lib/input";
import { Status } from "../types";

interface InputProps extends AInputProps {
  status?: Status;
}

const { Group, TextArea, Search, Password } = AInput;
class Input extends React.Component<InputProps> {
  static Group = Group;
  static Search = Search;
  static TextArea = TextArea;
  static Password = Password;
  public render() {
    const { status, className } = this.props;
    return (
      <AInput
        {...this.props}
        className={`is-${status} ${className ? className : ""}`}
      />
    );
  }
}

export default Input;
