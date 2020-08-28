import React from "react";
import { RadioProps as ARadioProps } from "antd/lib/radio";
import { Status } from "../types";
interface RadioProps extends ARadioProps {
    status?: Status;
}
declare class Radio extends React.Component<RadioProps> {
    static Group: typeof import("antd/lib/radio/group").default;
    static Button: typeof import("antd/lib/radio").Button;
    render(): JSX.Element;
}
export default Radio;
