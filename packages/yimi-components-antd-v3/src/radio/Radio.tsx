import React from "react";
import ARadio, { RadioProps as ARadioProps } from "antd/lib/radio";
import { Status } from "../types";

interface RadioProps extends ARadioProps {
  status?: Status;
}

const { Group, Button } = ARadio;

class Radio extends React.Component<RadioProps> {
  static Group = Group;
  static Button = Button;
  public render() {
    const { className, status } = this.props;
    return (
      <ARadio
        {...this.props}
        className={`is-${status} ${className ? className : ""}`}
      />
    );
  }
}

export default Radio;
