import React from "react";
import AInput, {
  InputProps as AInputProps,
  TextAreaProps,
  GroupProps,
  SearchProps,
  PasswordProps,
} from "antd/lib/input";
import { Status } from "../types";

const {
  Group: AGroup,
  Search: ASearch,
  TextArea: ATextArea,
  Password: APassword,
} = AInput;

function TextArea(props: TextAreaProps & { status?: Status }) {
  const { status, className } = props;
  return (
    <ATextArea
      {...props}
      className={`is-${status} ${className ? className : ""}`}
    />
  );
}

function Group(props: GroupProps & { status?: Status }) {
  const { status, className } = props;
  return (
    <AGroup
      {...props}
      className={`is-${status} ${className ? className : ""}`}
    />
  );
}

function Search(props: SearchProps & { status?: Status }) {
  const { status, className } = props;
  return (
    <ASearch
      {...props}
      className={`is-${status} ${className ? className : ""}`}
    />
  );
}

function Password(props: PasswordProps & { status?: Status }) {
  const { status, className } = props;
  return (
    <APassword
      {...props}
      className={`is-${status} ${className ? className : ""}`}
    />
  );
}

interface InputProps extends AInputProps {
  status?: Status;
}

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
