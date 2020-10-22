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
        {...this.props}
        placeholder={status === "preview" ? "" : placeholder}
        className={`is-${status} ${className ? className : ""}`}
      />
    );
  }
}

export default Cascader;
