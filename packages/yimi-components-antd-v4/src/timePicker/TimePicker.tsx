import React from "react";
import ATimePicker, {
  TimePickerProps as ATimePickerProps,
} from "antd/lib/time-picker";
import { Status } from "../types";

interface TimePickerProps extends ATimePickerProps {
  status?: Status;
}

class TimePicker extends React.Component<TimePickerProps> {
  public render() {
    const { status, className } = this.props;
    return (
      <ATimePicker
        {...this.props}
        className={`is-${status} ${className ? className : ""}`}
      />
    );
  }
}

export default TimePicker;
