import React from "react";
import ACheckbox, { CheckboxProps as ACheckboxProps } from "antd/lib/checkbox";
import { Status } from "../types";

interface CheckboxProps extends ACheckboxProps {
  status?: Status;
}

class Checkbox extends React.Component<CheckboxProps> {
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
