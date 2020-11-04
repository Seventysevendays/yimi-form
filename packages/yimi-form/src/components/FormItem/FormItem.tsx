import React, { ReactNode } from "react";
import FormContext from "../../context/form";
import Core, { Status, ACTIONS } from "../../core/core";
import ItemCore from "../../core/itemCore";
import FormItemContext from "../../context/formItem";
import isEqual from "lodash/isEqual";
import { RuleItem } from "async-validator";
import { getFuncArgs, mapValues } from "../../utils/dealListenkeys";
import FormItemLabel from "../FormItemLabel/FormItemLabel";
import FormItemError from "../FormItemError/FormItemError";
import FormItemBase from "../FormItemBase/FormItemBase";
import getName from "../../utils/getName";

export type ItemValidateConfig =
  | RuleItem
  | RuleItem[]
  | ((val: any, core: Core) => RuleItem | RuleItem[]);

export type ItemStatus = Status | ((core: Core, val: any) => Status);

export interface FormItemProps {
  name?: string;
  label?: ReactNode;
  children?: ReactNode;
  style?: React.CSSProperties;
  form?: Core;
  /** insert core to original onChange */
  onChange?: (core: Core, ...args: any[]) => void;
  defaultValue?: any;
  value?: any;
  status?: ItemStatus;
  /** insert props or deal with form inserted props */
  props?: { [key: string]: any } | ((core: Core, val: any) => any);
  /** when not visible, value & status will be removed */
  visible?: (core: Core, val: any) => boolean;
  /** show control: when not show, core status will be hidden and value will not be removed from core value */
  show?: (core: Core, val: any) => boolean;
  /** view control */
  view?: (core: Core, val: any) => ReactNode;
  validateConfig?: ItemValidateConfig;
  error?: string;
  errorRender?: (
    error: string | { [key: string]: any } | Array<{ [key: string]: any }>
  ) => ReactNode;
  /** independent layout */
  full?: boolean;
  colon?: boolean;
  inline?: boolean;
  direction?: "vertical" | "horizontal";
  /** around element */
  prefix?: ReactNode;
  top?: ReactNode;
  bottom?: ReactNode;
  suffix?: ReactNode;
  className?: string;
  statusListenKeys?: string[] | false;
  showListenKeys?: string[] | false;
  viewListenKeys?: string[] | false;
  propsListenKeys?: string[] | false;
  visibleListenKeys?: string[] | false;
}

class FormItem extends React.Component<FormItemProps> {
  public label: ReactNode;
  public form: Core;
  public itemCore: ItemCore;
  public name: string;
  public className: string;
  public id: string;
  public viewListenKeys: string[] | false;
  public showListenKeys: string[] | false;
  public validateConfig: ItemValidateConfig;
  public visibleListenKeys: string[] | false;
  public errorRender: any;
  public visible: boolean = true;
  public constructor(props: FormItemProps) {
    super(props);
    const {
      label,
      form,
      name,
      showListenKeys,
      viewListenKeys,
      view,
      show,
      validateConfig,
      errorRender,
      visible,
      visibleListenKeys,
    } = props;
    this.label = label;
    this.form = form || new Core({});
    this.name = name || getName();
    this.showListenKeys = showListenKeys;
    this.viewListenKeys = viewListenKeys;
    this.validateConfig = validateConfig;
    this.visibleListenKeys = visibleListenKeys;
    this.errorRender = errorRender;
    if (typeof show === "function" && !this.showListenKeys) {
      this.showListenKeys = getFuncArgs(show);
    }
    if (typeof view === "function" && !this.viewListenKeys) {
      this.viewListenKeys = getFuncArgs(view);
    }
    if (typeof visible === "function" && !this.viewListenKeys) {
      this.visibleListenKeys = getFuncArgs(visible);
    }
    // 有name的才需要监听
    const { type } = this.props.children || ({} as any);
    this.itemCore = this.form.addChild({
      ...props,
      name: this.name,
      form: this.form,
      showListenKeys: this.showListenKeys,
      displayName: type ? type.displayName : "",
    });
    this.id = this.itemCore.id;
    this.form.on(ACTIONS.value, this.handleUpdate);
    this.form.on(ACTIONS.status, this.handleStatusUpdate);
    this.form.on(ACTIONS.forceUpdate, this.handleForceUpdate);
  }
  private handleForceUpdate = (keys: string[]) => {
    if (Array.isArray(keys) && keys.includes(this.name)) {
      this.forceUpdate();
    } else if (!keys) {
      this.forceUpdate();
    }
  };
  private handleStatusUpdate = (name) => {
    if (name === this.name) {
      this.forceUpdate();
    }
  };
  private handleUpdate = (name) => {
    const {
      show,
      view,
      visible,
      viewListenKeys,
      showListenKeys,
      visibleListenKeys,
    } = this.props;
    const keys = Array.isArray(name) ? name : [name];
    // view 和 show 不应该同时出现
    if (typeof show === "function") {
      // 处理show的渲染时机
      if (showListenKeys === false) {
        this.handleShowUpdate();
      } else if (
        keys.some((item) => (this.showListenKeys || []).includes(item))
      ) {
        this.handleShowUpdate();
      }
    } else if (typeof view === "function") {
      if (viewListenKeys === false) {
        this.forceUpdate();
      } else if (
        keys.some((item) => (this.viewListenKeys || []).includes(item))
      ) {
        this.forceUpdate();
      }
    } else if (typeof visible === "function") {
      if (!visible(this.form, mapValues(this.form.getValues()))) {
        this.visible = false;
        // 隐藏时从core中移除
        this.form.removeChild(this.name);
      } else {
        this.visible = true;
      }
      if (visibleListenKeys === false) {
        this.forceUpdate();
      } else if (
        keys.some((item) => (this.visibleListenKeys || []).includes(item))
      ) {
        this.forceUpdate();
      }
    }
  };

  public componentDidMount = () => {
    const { show } = this.props;
    // show 的控制是基于form core 内部的status，可能会有延后，强制渲染一次
    if (typeof show === "function") {
      this.handleShowUpdate();
    }
  };
  public componentWillUnmount = () => {
    this.form.removeListener(ACTIONS.value, this.handleUpdate);
    this.form.removeListener(ACTIONS.status, this.handleStatusUpdate);
    // 删除FormCore相关的所有属性
    this.form.removeChild(this.name);
    this.form.removeListener(ACTIONS.forceUpdate, this.handleForceUpdate);
  };
  private handleShowUpdate = () => {
    const { show, status } = this.props;
    const canShow = show(this.form, mapValues(this.form.getValues()));
    if (!canShow && this.form.getStatus(this.name) !== "hidden") {
      this.itemCore.set("status", "hidden");
    } else if (canShow && this.form.getStatus(this.name) === "hidden") {
      // 从隐藏到显示时的状态控制
      if (this.itemCore.funcStatus) {
        this.itemCore.consistStatus();
      } else {
        this.itemCore.set("status", status || "edit");
      }
    }
    this.forceUpdate();
  };

  public componentDidUpdate = (prevProps: FormItemProps) => {
    const { value } = this.props;
    if (!isEqual(value, prevProps.value)) {
      this.itemCore.set("value", value);
      this.forceUpdate();
    }
  };

  render() {
    const { view, visible } = this.props;
    if (typeof view === "function") {
      return view(this.form, mapValues(this.form.getValues()));
    }
    if (typeof visible === "function") {
      if (!this.visible) {
        return null;
      }
    }
    const {
      inline,
      direction,
      prefix,
      suffix,
      top,
      bottom,
      className,
      style,
      full,
      colon,
    } = this.props;
    const {
      inline: parentInline,
      direction: parentDirection,
      full: parentFull,
    } = this.form.jsx ? this.form.jsx.props : ({} as any);
    const itemInline = typeof inline === "boolean" ? inline : parentInline;
    const itemDirection =
      typeof direction !== "undefined" ? direction : parentDirection;
    const itemFull = typeof full === "boolean" ? full : parentFull;
    const status = this.form.getStatus(this.name);
    const error = this.form.getError(this.name);
    // 状态改变了，只是不展示，而非formitem被卸载了
    if (status === "hidden") {
      return null;
    }
    return (
      <FormItemContext.Provider value={{ itemCore: this.itemCore }}>
        <div
          className={`yimi-form-item is-${status} ${
            itemInline ? "inline" : "block"
          } ${itemDirection ? itemDirection : "vertical"} ${
            error ? "hasError" : ""
          } ${className ? className : ""} ${itemFull ? "full" : ""}`}
          id={this.id}
          style={style}
        >
          {top && <div className="yimi-form-item-top">{top}</div>}
          <FormItemLabel
            form={this.form}
            label={this.label}
            validateConfig={this.validateConfig}
            name={this.name}
            colon={colon}
          />
          <div className="yimi-form-item-control">
            <div className="yimi-form-item-content">
              {prefix && <div className="yimi-form-item-prefix">{prefix}</div>}
              <FormItemBase
                {...this.props}
                name={this.name}
                itemCore={this.itemCore}
              />
              {suffix && <div className="yimi-form-item-suffix">{suffix}</div>}
            </div>
            {status !== "preview" && (
              <FormItemError
                errorRender={this.errorRender}
                name={this.name}
                form={this.form}
              />
            )}
          </div>
          {bottom && <div className="yimi-form-item-bottom">{bottom}</div>}
        </div>
      </FormItemContext.Provider>
    );
  }
}

const ConnectFormItem = (props: FormItemProps) => {
  return (
    <FormContext.Consumer>
      {(formProps) => {
        const { core } = formProps;
        return <FormItem {...props} form={core} />;
      }}
    </FormContext.Consumer>
  );
};
ConnectFormItem.displayName = "yimiFormItem";
export default ConnectFormItem;
