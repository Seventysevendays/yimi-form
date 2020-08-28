import React from "react";
import { TransferProps as ATransferProps } from "antd/lib/transfer";
import { Status } from "../types";
interface TransferProps extends ATransferProps {
    status?: Status;
}
declare class Transfer extends React.Component<TransferProps> {
    render(): JSX.Element;
}
export default Transfer;
