import React from "react";
import { RadioProps as ARadioProps } from "antd/lib/radio";
import { Status } from "../types";
interface RadioProps extends ARadioProps {
    status?: Status;
}
declare class Radio extends React.Component<RadioProps> {
    static Group: React.MemoExoticComponent<React.ForwardRefExoticComponent<import("antd/lib/radio").RadioGroupProps & React.RefAttributes<unknown>>>;
    static Button: React.ForwardRefExoticComponent<import("antd/lib/radio/radioButton").RadioButtonProps & React.RefAttributes<any>>;
    render(): JSX.Element;
}
export default Radio;
