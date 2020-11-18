import React from "react";
import { FormItemProps, ItemValidateConfig } from "../FormItem/FormItem";
import Core, { ACTIONS } from "../../core/core";

interface FormItemLabelProps extends FormItemProps {}

class FormItemLabel extends React.PureComponent<FormItemLabelProps> {
  public name: string;
  public label: React.ReactNode;
  public validateConfig: ItemValidateConfig;
  public core: Core;
  public required: boolean;
  public constructor(props: FormItemLabelProps) {
    super(props);
    const { label, validateConfig, form, name } = this.props;
    this.label = label || null;
    this.core = form;
    this.name = name;
    this.validateConfig =
      validateConfig && !Array.isArray(validateConfig)
        ? validateConfig
        : this.core.validateConfig[this.name] || {};
    if (typeof validateConfig === "function") {
      const rule = validateConfig(form.getValues(), form) || {};
      if (!Array.isArray(rule)) {
        this.validateConfig = rule;
      }
    }
    this.required = !!this.validateConfig["required"];
    this.core.on(ACTIONS.value, this.handleRequired);
    this.core.on(ACTIONS.forceUpdate, this.handleForceUpdate);
  }
  private handleForceUpdate = (keys: string[]) => {
    if (Array.isArray(keys) && keys.includes(this.name)) {
      this.forceUpdate();
    } else if (!keys) {
      this.forceUpdate();
    }
  };
  public handleRequired = () => {
    // 只针对对象校验规则的进行处理
    if (typeof this.props.validateConfig === "function") {
      const rule =
        this.props.validateConfig(this.core.getValues(), this.core) || {};
      if (!Array.isArray(rule)) {
        const required = !!rule.required;
        if (this.required !== required) {
          this.required = required;
          if (!this.required && this.core.getError(this.name)) {
            this.core.setError({ [this.name]: undefined });
            this.core.forceUpdate([this.name]);
          } else {
            this.forceUpdate();
          }
        }
      }
    }
  };
  public componentWillUnmount = () => {
    this.core.removeListener(ACTIONS.value, this.handleRequired);
    this.core.removeListener(ACTIONS.forceUpdate, this.handleForceUpdate);
  };
  public render() {
    const { colon } = this.props;
    const { colon: parentColon } = this.core.jsx
      ? this.core.jsx.props
      : ({} as any);
    const itemColon = typeof colon === "boolean" ? colon : parentColon;
    return (
      this.label && (
        <div
          className={`yimi-form-item-label ${itemColon ? "colon" : ""} ${
            !!this.required ? "required" : ""
          }`}
        >
          {this.label}
        </div>
      )
    );
  }
}

export default FormItemLabel;
