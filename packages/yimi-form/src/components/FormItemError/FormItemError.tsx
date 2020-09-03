import React from "react";
import { FormItemProps } from "../FormItem/FormItem";
import Core, { ACTIONS } from "../../core/core";

interface FormItemErrorProps extends FormItemProps {}

class FormItemError extends React.PureComponent<FormItemErrorProps> {
  public name: string;
  public core: Core;
  public error: any;
  public errorRender: (error: any) => React.ReactNode;
  public constructor(props: FormItemErrorProps) {
    super(props);
    const { form, name, errorRender } = this.props;
    this.core = form;
    this.name = name;
    const error = this.core.getError(this.name);
    this.errorRender = errorRender;
    this.error =
      typeof this.errorRender === "function" ? this.errorRender(error) : error;
    this.core.on(ACTIONS.error, this.handleUpdate);
    this.core.on(ACTIONS.forceUpdate, this.handleForceUpdate);
  }
  private handleForceUpdate = (keys: string[]) => {
    if (Array.isArray(keys) && keys.includes(this.name)) {
      this.forceUpdate();
    } else if (!keys) {
      this.forceUpdate();
    }
  };
  private handleUpdate = (name) => {
    if (this.name === name) {
      const error = this.core.getError(this.name);
      this.error =
        typeof this.errorRender === "function"
          ? this.errorRender(error)
          : error;
      this.forceUpdate();
    }
  };
  public componentWillUnmount = () => {
    this.core.removeListener(ACTIONS.error, this.handleUpdate);
    this.core.removeListener(ACTIONS.forceUpdate, this.handleForceUpdate);
  };
  public render() {
    return typeof this.errorRender === "function" ? (
      this.error
    ) : this.error ? (
      <div className="yimi-form-item-error">{this.error}</div>
    ) : null;
  }
}

export default FormItemError;
