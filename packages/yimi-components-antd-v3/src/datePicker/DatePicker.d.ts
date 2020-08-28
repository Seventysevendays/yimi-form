import React from "react";
import { Status } from "../types";
import { DatePickerProps as ADatePickerProps } from "antd/lib/date-picker/interface";
declare type DatePickerProps = ADatePickerProps & {
    status?: Status;
};
declare class DatePicker extends React.Component<DatePickerProps> {
    render(): JSX.Element;
}
export default DatePicker;
