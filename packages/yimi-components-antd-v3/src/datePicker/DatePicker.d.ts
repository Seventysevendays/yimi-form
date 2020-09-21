import React from "react";
import { DatePickerProps as ADatePickerProps, MonthPickerProps, RangePickerProps, WeekPickerProps } from "antd/lib/date-picker/interface";
import { Status } from "../types";
declare type DatePickerProps = ADatePickerProps & {
    status?: Status;
};
declare function MonthPicker(props: MonthPickerProps & {
    status?: Status;
}): JSX.Element;
declare function RangePicker(props: RangePickerProps & {
    status?: Status;
}): JSX.Element;
declare function WeekPicker(props: WeekPickerProps & {
    status?: Status;
}): JSX.Element;
declare class DatePicker extends React.Component<DatePickerProps> {
    static MonthPicker: typeof MonthPicker;
    static RangePicker: typeof RangePicker;
    static WeekPicker: typeof WeekPicker;
    render(): JSX.Element;
}
export default DatePicker;
