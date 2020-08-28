import React from "react";
import ARate, { RateProps as ARateProps } from "antd/lib/rate";
import { Status } from "../types";

interface RateProps extends ARateProps {
  status?: Status;
}

class Rate extends React.Component<RateProps> {
  public render() {
    const { status, className } = this.props;
    return (
      <ARate
        {...this.props}
        className={`is-${status} ${className ? className : ""}`}
      />
    );
  }
}

export default Rate;
