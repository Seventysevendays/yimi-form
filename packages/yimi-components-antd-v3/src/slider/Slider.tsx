import React from "react";
import ASlider, { SliderProps as SliderBaseProps } from "antd/lib/slider";
import { Status } from "../types";

interface SliderProps extends SliderBaseProps {
  status?: Status;
}

class Slider extends React.Component<SliderProps> {
  public render() {
    const { status, className } = this.props;
    return (
      <ASlider
        {...this.props}
        className={`is-${status} ${className ? className : ""}`}
      />
    );
  }
}

export default Slider;
