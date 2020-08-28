import React from "react";
import ADatePicker, {
  DatePickerProps as ADatePickerProps,
} from "antd/lib/date-picker";
import { Status } from "../types";

type DatePickerProps = ADatePickerProps & {
  status?: Status;
};

class DatePicker extends React.Component<DatePickerProps> {
  public render() {
    const { status, placeholder, className } = this.props;
    return (
      <ADatePicker
        placeholder={status === "preview" ? "" : placeholder}
        {...this.props}
        className={`is-${status} ${className ? className : ""}`}
      />
    );
  }
}

export default DatePicker;
