import React from "react";
import ASelect, { SelectProps as ASelectProps } from "antd/lib/select";
import { Status } from "../types";

interface SelectProps extends ASelectProps<any> {
  status?: Status;
}
const { Option, OptGroup } = ASelect;
class Select extends React.Component<SelectProps> {
  static Option = Option;
  static OptGroup = OptGroup;
  public render() {
    const { status, value, mode, className } = this.props;
    const formatValue =
      mode === "tags" || mode === "multiple" ? (!value ? [] : value) : value;
    return (
      <ASelect
        {...this.props}
        className={`is-${status} ${className ? className : ""}`}
        value={formatValue || undefined}
      />
    );
  }
}

export default Select;
