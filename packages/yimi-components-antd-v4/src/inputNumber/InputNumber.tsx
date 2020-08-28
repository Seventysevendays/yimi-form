import React from "react";
import AInputNumber, {
  InputNumberProps as AInputNumberProps,
} from "antd/lib/input-number";
import { Status } from "../types";

interface InputNumberProps extends AInputNumberProps {
  status?: Status;
}

class InputNumber extends React.Component<InputNumberProps> {
  public render() {
    const { status, className } = this.props;
    return (
      <AInputNumber
        {...this.props}
        className={`is-${status} ${className ? className : ""}`}
      />
    );
  }
}

export default InputNumber;
