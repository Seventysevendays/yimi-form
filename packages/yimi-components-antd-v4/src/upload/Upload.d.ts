import React from "react";
import { UploadProps as AUploadProps, UploadChangeParam } from "antd/lib/upload";
import { Status } from "../types";
interface UploadProps extends AUploadProps {
    status?: Status;
    value?: UploadChangeParam;
}
declare class Upload extends React.Component<UploadProps> {
    render(): JSX.Element;
}
export default Upload;
