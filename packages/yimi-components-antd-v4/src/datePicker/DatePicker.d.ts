import React from "react";
import { DatePickerProps as ADatePickerProps } from "antd/lib/date-picker";
import { Status } from "../types";
declare type DatePickerProps = ADatePickerProps & {
    status?: Status;
};
declare class DatePicker extends React.Component<DatePickerProps> {
    render(): JSX.Element;
}
export default DatePicker;
