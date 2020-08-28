import React from "react";
import AMentions, { MentionProps as AMentionProps } from "antd/lib/mentions";
import { Status } from "../types";

interface MentionProps extends AMentionProps {
  status?: Status;
}

const { Option } = AMentions;
class Mentions extends React.Component<MentionProps> {
  static Option = Option;
  public render() {
    const { status, className } = this.props;
    return (
      <AMentions
        {...this.props}
        className={`is-${status} ${className ? className : ""}`}
      />
    );
  }
}

export default Mentions;
