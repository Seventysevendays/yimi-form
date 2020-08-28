import React from "react";
import ATreeSelect, {
  TreeSelectProps as ATreeSelectProps,
} from "antd/lib/tree-select";
import { Status } from "../types";

type TreeSelectProps = ATreeSelectProps<any> & {
  status?: Status;
};
const { TreeNode } = ATreeSelect;

class TreeSelect extends React.Component<TreeSelectProps> {
  static TreeNode = TreeNode;
  public render() {
    const { status, className, placeholder } = this.props;
    return (
      <ATreeSelect
        {...this.props}
        placeholder={status === "preview" ? "" : placeholder}
        className={`is-${status} ${className ? className : ""}`}
      />
    );
  }
}

export default TreeSelect;
