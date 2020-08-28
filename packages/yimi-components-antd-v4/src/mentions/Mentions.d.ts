import React from "react";
import { MentionProps as AMentionProps } from "antd/lib/mentions";
import { Status } from "../types";
interface MentionProps extends AMentionProps {
    status?: Status;
}
declare class Mentions extends React.Component<MentionProps> {
    static Option: React.SFC<import("rc-mentions/lib/Option").OptionProps>;
    render(): JSX.Element;
}
export default Mentions;
