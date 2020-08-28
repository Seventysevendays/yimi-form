import React from "react";
import { TreeSelectProps as ATreeSelectProps } from "antd/lib/tree-select";
import { Status } from "../types";
declare type TreeSelectProps = ATreeSelectProps<any> & {
    status?: Status;
};
declare class TreeSelect extends React.Component<TreeSelectProps> {
    static TreeNode: any;
    render(): JSX.Element;
}
export default TreeSelect;
