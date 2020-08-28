import React from "react";
import { TreeSelectProps as ATreeSelectProps } from "antd/lib/tree-select";
import { Status } from "../types";
declare type TreeSelectProps = ATreeSelectProps<any> & {
    status?: Status;
};
declare class TreeSelect extends React.Component<TreeSelectProps> {
    static TreeNode: React.FC<import("rc-tree-select/lib/TreeNode").TreeNodeProps>;
    render(): JSX.Element;
}
export default TreeSelect;
