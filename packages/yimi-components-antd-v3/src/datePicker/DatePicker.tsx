import React from "react";
import ADatePicker from "antd/lib/date-picker";
import { Status } from "../types";
import { DatePickerProps as ADatePickerProps } from "antd/lib/date-picker/interface";

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
