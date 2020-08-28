import React from "react";
import { RateProps as ARateProps } from "antd/lib/rate";
import { Status } from "../types";
interface RateProps extends ARateProps {
    status?: Status;
}
declare class Rate extends React.Component<RateProps> {
    render(): JSX.Element;
}
export default Rate;
