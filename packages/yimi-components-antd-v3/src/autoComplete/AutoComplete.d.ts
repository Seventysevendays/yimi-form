import React from "react";
import { AutoCompleteProps as AAutoCompleteProps } from "antd/lib/auto-complete";
import { Status } from "../types";
interface AutoCompleteProps extends AAutoCompleteProps {
    status?: Status;
}
declare class AutoComplete extends React.Component<AutoCompleteProps> {
    render(): JSX.Element;
}
export default AutoComplete;
