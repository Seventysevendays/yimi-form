import React from "react";
import ATransfer, { TransferProps as ATransferProps } from "antd/lib/transfer";
import { Status } from "../types";

interface TransferProps extends ATransferProps {
  status?: Status;
}

class Transfer extends React.Component<TransferProps> {
  public render() {
    const { className, status } = this.props;
    return (
      <ATransfer
        {...this.props}
        className={`is-${status} ${className ? className : ""}`}
      />
    );
  }
}

export default Transfer;
