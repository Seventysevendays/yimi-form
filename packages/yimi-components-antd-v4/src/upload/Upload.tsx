import React from "react";
import AUpload, {
  UploadProps as AUploadProps,
  UploadChangeParam,
} from "antd/lib/upload";
import { Status } from "../types";

interface UploadProps extends AUploadProps {
  status?: Status;
  value?: UploadChangeParam;
}

class Upload extends React.Component<UploadProps> {
  public render() {
    const { status, className, value } = this.props;
    const { fileList } = value || {};
    return (
      <AUpload
        fileList={fileList || undefined}
        {...this.props}
        className={`is-${status} ${className ? className : ""}`}
      />
    );
  }
}

export default Upload;
