import React from "react";
import { SwitchProps as ASwitchProps } from "antd/lib/switch";
import { Status } from "../types";
interface SwitchProps extends ASwitchProps {
    status?: Status;
    value?: boolean;
}
declare class Switch extends React.Component<SwitchProps> {
    render(): JSX.Element;
}
export default Switch;
