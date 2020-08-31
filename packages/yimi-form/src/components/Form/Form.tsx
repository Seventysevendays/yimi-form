/*
 * @author: xuxiang
 * @description: description
 * @Date: 2020-07-15 16:39:01
 * @LastEditors: xuxiang
 * @LastEditTime: 2020-08-29 07:31:06
 */

import React from "react";
import FormContext from "../../context/form";
import Core, { Status } from "../../core/core";
import FormItemContext from "../../context/formItem";
import ItemCore from "../../core/itemCore";
import isEqual from "lodash/isEqual";

export interface FormProps {
  core?: Core;
  colon?: boolean;
  onChange?: (val: any, core: Core) => void;
  itemCore?: ItemCore;
  value?: { [key: string]: any };
  inline?: boolean;
  full?: boolean;
  direction?: "vertical" | "horizontal";
  children?: React.ReactNode;
  status?: Status;
  Com?: any;
  className?: string;
  onMount?: (core: Core) => void;
  globalStatus?: Status;
  style?: React.CSSProperties;
}

export class Form extends React.Component<FormProps> {
  public core?: Core;
  private constructor(props: FormProps) {
    super(props);
    const { core, itemCore } = props;
    let parentItemCoreForm: Core;
    if (itemCore) {
      const { form } = itemCore;
      parentItemCoreForm = form;
    }
    this.core =
      core ||
      new Core({
        // 继承外层FormItem的Core的属性
        autoValidate: parentItemCoreForm
          ? parentItemCoreForm.autoValidate
          : true,
      });
    this.core.jsx = this;
    if (!this.core.disableChildForm) {
      this.core.on("change", this.onChange);
    }
  }
  public componentDidMount = () => {
    const { itemCore, value, status, onMount, globalStatus } = this.props;
    // 内层有Form
    if (itemCore && !this.core.disableChildForm) {
      itemCore.addInnerForm(this.core);
      this.core.parentItemCore = itemCore;
    }
    if (value) {
      this.core.setValuesSilent(value);
      this.forceUpdate();
    }
    if (status) {
      this.core.setGlobalStatus(status);
      this.forceUpdate();
    }
    if (globalStatus) {
      this.core.setGlobalStatus(globalStatus);
    }
    if (onMount) {
      onMount(this.core);
    }
  };
  public componentWillUnmount = () => {
    this.core.removeListener("change", this.onChange);
    this.core.eventCenter.removeAllListeners();
  };
  public componentDidUpdate = (prevProps: FormProps) => {
    const { value, status } = this.props;
    if (!isEqual(value, prevProps.value)) {
      this.core.setValuesSilent(value);
      this.forceUpdate();
    }
    if (!isEqual(status, prevProps.status)) {
      this.core.setGlobalStatus(status);
      this.forceUpdate();
    }
  };
  public onChange = (val) => {
    if (this.props.onChange) {
      this.props.onChange(val, this.core);
    }
  };
  public render() {
    const {
      inline,
      direction,
      Com = "div",
      className,
      style,
      full,
    } = this.props;
    return (
      <FormContext.Provider value={{ core: this.core }}>
        <Com
          className={`yimi-form ${inline ? "inline" : ""} ${
            direction ? direction : ""
          } ${className ? className : ""} ${full ? "full" : ""}`}
          style={style}
        >
          {this.props.children}
        </Com>
      </FormContext.Provider>
    );
  }
}

const ConnectForm = (props: FormProps) => {
  return (
    <FormItemContext.Consumer>
      {(formItemProps) => {
        const { itemCore } = formItemProps;
        let upperFormProps = {};
        if (itemCore) {
          const { colon, inline, direction, full } = itemCore.form.jsx.props;
          // 需要继承自外部Form的属性
          upperFormProps = {
            colon,
            inline,
            direction,
            full,
          };
        }
        return <Form {...upperFormProps} {...props} itemCore={itemCore} />;
      }}
    </FormItemContext.Consumer>
  );
};
ConnectForm.displayName = "yimiForm";
export default ConnectForm;
