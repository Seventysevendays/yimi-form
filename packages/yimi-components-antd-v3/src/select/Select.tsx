import React from "react";
import ASelect, { SelectProps as ASelectProps } from "antd/lib/select";
import { Status } from "../types";
type Options = Array<{
  label: React.ReactNode;
  value: any;
  [other: string]: any;
}>;

interface SelectProps extends ASelectProps<any> {
  status?: Status;
  options?: Options;
}
const { Option, OptGroup } = ASelect;
class Select extends React.Component<SelectProps> {
  static Option = Option;
  static OptGroup = OptGroup;
  public render() {
    const { status, value, mode, className, options } = this.props;
    const formatValue =
      mode === "tags" || mode === "multiple" ? (!value ? [] : value) : value;
    let children = this.props.children;
    if (Array.isArray(options)) {
      children = options.map((option) => (
        <Option {...option} value={option.value} key={value}>
          {option.label}
        </Option>
      ));
    }
    return (
      <ASelect
        {...this.props}
        className={`is-${status} ${className ? className : ""}`}
        value={formatValue || undefined}
        children={children}
      />
    );
  }
}

export default Select;
