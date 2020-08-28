import React from "react";
import { TimePickerProps as ATimePickerProps } from "antd/lib/time-picker";
import { Status } from "../types";
interface TimePickerProps extends ATimePickerProps {
    status?: Status;
}
declare class TimePicker extends React.Component<TimePickerProps> {
    render(): JSX.Element;
}
export default TimePicker;
