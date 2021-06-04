/*
 * @author: xuxiang
 * @description: description
 * @Date: 2020-07-15 16:39:01
 * @LastEditors: xuxiang
 * @LastEditTime: 2021-05-19 17:12:19
 */

import React from "react";
import FormContext from "../../context/form";
import Core, { Status, ACTIONS } from "../../core/core";
import FormItemContext from "../../context/formItem";
import ItemCore from "../../core/itemCore";
import isEqual from "lodash/isEqual";

export interface FormProps
  extends Omit<React.DOMAttributes<HTMLDivElement>, "onChange"> {
  core?: Core;
  colon?: boolean;
  onChange?: (val: any, core: Core, key: string[]) => void;
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
  overWrite?: boolean;
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
      this.core.on(ACTIONS.change, this.onChange);
    }
  }
  public componentDidMount = () => {
    const { value, status, onMount, globalStatus, itemCore } = this.props;
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
    this.core.removeListener(ACTIONS.change, this.onChange);
    this.core.removeAllListeners();
    if (this.props.itemCore) {
      this.props.itemCore.removeInnerForm(this.core);
    }
  };
  public componentDidUpdate = (prevProps: FormProps) => {
    const { value, status, overWrite } = this.props;
    if (!isEqual(value, prevProps.value)) {
      this.core.setValuesSilent(value, { overWrite });
      this.forceUpdate();
    }
    if (!isEqual(status, prevProps.status)) {
      this.core.setGlobalStatus(status);
      this.forceUpdate();
    }
  };
  public onChange = (val, key) => {
    if (this.props.onChange) {
      this.props.onChange(val, this.core, key);
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
      core,
      colon,
      onChange,
      itemCore,
      value,
      children,
      status,
      onMount,
      globalStatus,
      overWrite,
      ...others
    } = this.props;
    return (
      <FormContext.Provider value={{ core: this.core }}>
        <Com
          {...others}
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
