import React from "react";
import ADatePicker, {
  DatePickerProps as ADatePickerProps,
  MonthPickerProps,
  RangePickerProps,
  WeekPickerProps,
} from "antd/lib/date-picker";
import { Status } from "../types";

type DatePickerProps = ADatePickerProps & {
  status?: Status;
};

const {
  MonthPicker: AMonthPicker,
  RangePicker: ARangePicker,
  WeekPicker: AWeekPicker,
} = ADatePicker;

function MonthPicker(props: MonthPickerProps & { status?: Status }) {
  const { status, className } = props;
  return (
    <AMonthPicker
      {...props}
      className={`is-${status} ${className ? className : ""}`}
    />
  );
}
function RangePicker(props: RangePickerProps & { status?: Status }) {
  const { status, className } = props;
  return (
    <ARangePicker
      {...props}
      className={`is-${status} ${className ? className : ""}`}
    />
  );
}
function WeekPicker(props: WeekPickerProps & { status?: Status }) {
  const { status, className } = props;
  return (
    <AWeekPicker
      {...props}
      className={`is-${status} ${className ? className : ""}`}
    />
  );
}

class DatePicker extends React.Component<DatePickerProps> {
  static MonthPicker = MonthPicker;
  static RangePicker = RangePicker;
  static WeekPicker = WeekPicker;
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
