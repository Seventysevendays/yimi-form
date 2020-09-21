import React from "react";
import { FormItemProps } from "../FormItem/FormItem";
import Core, { ACTIONS } from "../../core/core";
import ItemCore from "../../core/itemCore";
import { getFuncArgs, mapValues } from "../../utils/dealListenkeys";
import isEqual from "lodash/isEqual";

interface FormItemBaseProps extends FormItemProps {
  itemCore: ItemCore;
}

class FormItemBase extends React.PureComponent<FormItemBaseProps> {
  public core: Core;
  public name: string;
  public itemCore: ItemCore;
  public statusListenKeys: string[] | false;
  public propsListenKeys: string[] | false;
  private cacheValue: any;
  constructor(props: FormItemBaseProps) {
    super(props);
    const {
      form,
      name,
      itemCore,
      statusListenKeys,
      status,
      propsListenKeys,
      props: propProps,
    } = props;
    this.name = name;
    this.core = form;
    this.itemCore = itemCore;
    this.statusListenKeys = statusListenKeys;
    this.propsListenKeys = propsListenKeys;
    if (typeof status === "function" && !this.statusListenKeys) {
      this.statusListenKeys = getFuncArgs(status);
    }
    if (typeof propProps === "function") {
      this.propsListenKeys = getFuncArgs(propProps as any);
    }
    this.core.on(ACTIONS.value, this.handleValueUpdate);
    this.core.on(ACTIONS.status, this.handleStatusUpdate);
    this.core.on(ACTIONS.forceUpdate, this.handleForceUpdate);
    this.core.on(ACTIONS.props, this.handleStatusUpdate);
  }
  public componentWillUnmount = () => {
    this.core.removeListener(ACTIONS.value, this.handleValueUpdate);
    this.core.removeListener(ACTIONS.status, this.handleStatusUpdate);
    this.core.removeListener(ACTIONS.forceUpdate, this.handleForceUpdate);
    this.core.removeListener(ACTIONS.props, this.handleStatusUpdate);
  };
  public componentDidMount = () => {
    this.cacheValue = this.core.getValues(this.name);
    this.forceUpdate();
  };
  public handleValueUpdate = (name, value, opts) => {
    const { status, props } = this.props;
    const { manual } = opts || {};
    const currentLength = this.itemCore.innerFormList.length;
    const keys = Array.isArray(name) ? name : [name];
    if (
      keys.includes(this.name) &&
      // 内部Form内的FormItem触发就好了
      (currentLength === 0 ||
        // Array data 手动设置的值
        (Array.isArray(value) && !isEqual(this.cacheValue, value) && manual))
    ) {
      this.cacheValue = value;
      this.forceUpdate();
    } else if (typeof status === "function") {
      if (this.props.statusListenKeys === false) {
        this.forceUpdate();
      } else if (
        Array.isArray(this.statusListenKeys) &&
        this.statusListenKeys.includes(name)
      ) {
        this.forceUpdate();
      }
    } else if (typeof props === "function") {
      if (this.props.propsListenKeys === false) {
        this.forceUpdate();
      } else if (
        Array.isArray(this.propsListenKeys) &&
        this.propsListenKeys.includes(name)
      ) {
        this.forceUpdate();
      }
    }
  };
  public onChange = (...args: any[]) => {
    const [e] = args;
    let val = e;
    if (e && e.target) {
      if ("checked" in e.target && e.target.type === "checkbox") {
        val = e.target.checked;
      } else if ("value" in e.target) {
        val = e.target.value;
      }
    }
    this.itemCore.set("value", val);
    if (this.props.onChange) {
      this.props.onChange(this.core, ...args);
    }
  };
  // 处理props
  public getChildProps = () => {
    const { props } = this.props;
    const coreProps = this.core.getProps(this.name);
    // jsx status 优先级最高
    let status = this.core.getStatus(this.name);
    let baseProps = {
      ...coreProps,
      onChange: this.onChange,
      value: this.core.getValues(this.name),
      disabled: status === "disabled" || status === "preview",
      status,
    };
    if (typeof props === "function") {
      const values = this.core.getValues();
      return { ...baseProps, ...props(this.core, mapValues(values)) };
    } else if (props) {
      return {
        ...baseProps,
        ...props,
      };
    }
    return baseProps;
  };
  public handleStatusUpdate = (name) => {
    if (name === this.name) {
      this.forceUpdate();
    }
  };
  private handleForceUpdate = (keys: string[]) => {
    if (Array.isArray(keys) && keys.includes(this.name)) {
      this.forceUpdate();
    } else if (!keys) {
      this.forceUpdate();
    }
  };
  public render() {
    const { children } = this.props;
    const child = React.Children.only(children) as any;
    return (
      <div className="yimi-form-item-base">
        {React.cloneElement(child, this.getChildProps())}
      </div>
    );
  }
}

export default FormItemBase;
