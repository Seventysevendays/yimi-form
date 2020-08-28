import React from "react";
import AAutoComplete, {
  AutoCompleteProps as AAutoCompleteProps,
} from "antd/lib/auto-complete";
import { Status } from "../types";

interface AutoCompleteProps extends AAutoCompleteProps {
  status?: Status;
}

class AutoComplete extends React.Component<AutoCompleteProps> {
  public render() {
    const { status, className } = this.props;
    return (
      <AAutoComplete
        {...this.props}
        className={`is-${status} ${className ? className : ""}`}
      />
    );
  }
}

export default AutoComplete;
