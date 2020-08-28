import React from "react";
import { CascaderProps as ACascaderProps } from "antd/lib/cascader";
import { Status } from "../types";
interface CascaderProps extends ACascaderProps {
    status?: Status;
}
declare class Cascader extends React.Component<CascaderProps> {
    render(): JSX.Element;
}
export default Cascader;
