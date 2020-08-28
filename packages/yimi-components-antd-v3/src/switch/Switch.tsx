import React from "react";
import ASwitch, { SwitchProps as ASwitchProps } from "antd/lib/switch";
import { Status } from "../types";

interface SwitchProps extends ASwitchProps {
  status: Status;
  value?: boolean;
}

class Switch extends React.Component<SwitchProps> {
  public render() {
    const { status, className, value } = this.props;
    return (
      <ASwitch
        {...this.props}
        checked={!!value}
        className={`is-${status} ${className ? className : ""}`}
      />
    );
  }
}

export default Switch;
