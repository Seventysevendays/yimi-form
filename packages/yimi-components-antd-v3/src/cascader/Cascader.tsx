import React from "react";
import ACascader, { CascaderProps as ACascaderProps } from "antd/lib/cascader";
import { Status } from "../types";

interface CascaderProps extends ACascaderProps {
  status?: Status;
}

class Cascader extends React.Component<CascaderProps> {
  public render() {
    const { status, placeholder, className } = this.props;
    return (
      <ACascader
        placeholder={status === "preview" ? "" : placeholder}
        {...this.props}
        className={`is-${status} ${className ? className : ""}`}
      />
    );
  }
}

export default Cascader;
