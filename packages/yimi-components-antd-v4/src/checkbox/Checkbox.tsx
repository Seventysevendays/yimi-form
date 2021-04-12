import React from "react";
import ACheckbox, {
  CheckboxGroupProps,
  CheckboxProps as ACheckboxProps,
} from "antd/lib/checkbox";
import { Status } from "../types";

interface CheckboxProps extends ACheckboxProps {
  status?: Status;
}

const { Group: AGroup } = ACheckbox;

function Group(props: CheckboxGroupProps & { status?: Status }) {
  const { status, className } = props;
  return (
    <AGroup
      {...props}
      className={`is-${status} ${className ? className : ""}`}
    />
  );
}
class Checkbox extends React.Component<CheckboxProps> {
  static Group = Group;
  public render() {
    const { status, value, className } = this.props;
    return (
      <ACheckbox
        {...this.props}
        checked={!!value}
        className={`is-${status} ${className ? className : ""}`}
      />
    );
  }
}

export default Checkbox;
