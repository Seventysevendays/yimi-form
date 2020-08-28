import React from "react";
import { SliderProps as SliderBaseProps } from "antd/lib/slider";
import { Status } from "../types";
interface SliderProps extends SliderBaseProps {
    status?: Status;
}
declare class Slider extends React.Component<SliderProps> {
    render(): JSX.Element;
}
export default Slider;
