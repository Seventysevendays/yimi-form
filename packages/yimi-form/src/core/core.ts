/*
 * @author: xuxiang
 * @description: description
 * @Date: 2020-07-15 16:31:58
 * @LastEditors: xuxiang
 * @LastEditTime: 2020-08-21 14:03:25
 */

import { FormItemProps } from "./../components/FormItem/FormItem";
import { EventEmitter } from "events";
import ItemCore from "./itemCore";
import { Form } from "../components/Form/Form";
import { ItemValidateConfig } from "./../components/FormItem/FormItem";
import getId from "../utils/getId";
import getFuncArgs from "../utils/getFuncArgs";

export type CoreOnChange = (
  key: string[],
  values: { [key: string]: any },
  core: Core
) => void;

/** when status is hidden, item will be hidden and core still holds properties, but will not be validate */
export type Status = "preview" | "disabled" | "edit" | "hidden";

export const ACTIONS = {
  value: "value",
  status: "status",
  change: "change",
  error: "error",
  forceUpdate: "forceUpdate",
};

export const noop = () => {};

export interface CoreProps {
  onChange?: CoreOnChange;
  /** values after reset */
  initValues?: { [key: string]: any };
  values?: { [key: string]: any };
  status?: { [key: string]: Status };
  error?: { [key: string]: string };
  validateConfig?: { [key: string]: ItemValidateConfig };
  autoValidate?: boolean;
  disableChildForm?: boolean;
  globalStatus?: Status;
  id?: string;
}

class Core {
  public onChange?: CoreOnChange;
  public eventCenter: EventEmitter;
  public childrenMap: { [key: string]: ItemCore };
  public values: { [key: string]: any };
  public initValues: { [key: string]: any };
  public status: { [key: string]: Status };
  public error: {
    [key: string]:
      | string
      | { [key: string]: any }
      | Array<{ [key: string]: any }>;
  };
  public validateConfig: { [key: string]: ItemValidateConfig };
  public autoValidate?: boolean;
  public jsx: Form;
  public disableChildForm: boolean;
  public globalStatus: Status;
  public parentItemCore?: ItemCore;
  public silent: boolean;
  public id: string;
  constructor(props: CoreProps) {
    this.eventCenter = new EventEmitter();
    this.eventCenter.setMaxListeners(Infinity);
    this.on(ACTIONS.value, this.handleValueChange);
    this.on(ACTIONS.status, this.handleStatusChange);
    this.on(ACTIONS.error, this.handleErrorChange);
    const {
      onChange,
      values,
      status,
      error,
      validateConfig,
      autoValidate,
      disableChildForm,
      globalStatus,
      initValues,
      id,
    } = props;
    this.disableChildForm = !!disableChildForm;
    this.values = { ...values } || {};
    this.initValues = { ...initValues } || {};
    this.status = { ...status } || {};
    this.error = { ...error } || {};
    this.childrenMap = {};
    this.onChange = onChange || noop;
    this.autoValidate = !!autoValidate;
    this.validateConfig = validateConfig || {};
    this.globalStatus = globalStatus || "edit";
    this.silent = false;
    this.id = id || getId();
  }
  public on: EventEmitter["on"] = (event, listener) => {
    return this.eventCenter.on(event, listener);
  };
  public emit: EventEmitter["emit"] = (...args) => {
    return this.eventCenter.emit(...args);
  };
  public removeListener: EventEmitter["removeListener"] = (event, listener) => {
    return this.eventCenter.removeListener(event, listener);
  };
  private handleValueChange = (key: string | string[], value: any) => {
    let validateKeys: string[];
    if (Array.isArray(key)) {
      this.onChange(key, { ...this.values }, this);
      validateKeys = key;
    } else {
      this.values[key] = value;
      if (!this.silent) {
        this.onChange([key], { ...this.values }, this);
      }
      validateKeys = [key];
    }
    if (!this.silent) {
      this.emit(ACTIONS.change, { ...this.values });
      if (this.autoValidate) {
        validateKeys.forEach((key) => {
          if (this.childrenMap[key]) {
            // onChange 不触发内部Form的校验
            this.childrenMap[key].validate({ onlySelf: true });
          }
        });
      }
    }
  };
  private handleStatusChange = (
    key: string | string[],
    value: Status | { [key: string]: Status }
  ) => {
    if (typeof value === "object") {
      this.status = {
        ...this.status,
        ...value,
      };
    } else if (typeof key === "string") {
      this.status[key] = value;
    }
  };
  private handleErrorChange = (
    key: string | string[],
    error?: string | { [key: string]: string | undefined }
  ) => {
    if (typeof error === "object") {
      this.error = {
        ...this.error,
        ...error,
      };
    } else if (typeof key === "string") {
      this.error[key] = error;
    }
  };
  /** init FormItem core */
  public addChild = (options: FormItemProps) => {
    const {
      name,
      status,
      value,
      error,
      validateConfig,
      defaultValue,
    } = options;
    let funcStatus;
    if (typeof status === "function") {
      const keys = getFuncArgs(status);
      funcStatus = status(this, ...keys.map((key) => this.values[key]));
    }
    this.status[name] = funcStatus
      ? funcStatus
      : status || this.status[name] || this.globalStatus;
    // value > defaultValue > core value
    this.values[name] = value || defaultValue || this.values[name] || null;
    this.error[name] = error;
    this.validateConfig[name] = validateConfig;

    const childCore = new ItemCore({
      ...options,
      on: this.on,
      emit: this.emit,
    });
    this.childrenMap[name] = childCore;
    return childCore;
  };
  /** 设置值；可选同时批量触发或依次触发 */
  public setValues = (
    values: { [key: string]: any },
    opts?: { multiple: boolean }
  ) => {
    const { multiple } = opts || {};
    this.values = {
      ...this.values,
      ...values,
    };
    const setKeys = Object.keys(values);
    if (multiple) {
      this.emit(ACTIONS.value, setKeys);
      setKeys.forEach((key) => {
        if (this.childrenMap[key]) {
          this.childrenMap[key].set("value", values[key], {
            silent: true,
          });
        }
      });
    } else {
      setKeys.forEach((key) => {
        if (this.childrenMap[key]) {
          this.childrenMap[key].set("value", values[key]);
        } else {
          this.emit("value", key, values[key]);
        }
      });
    }
  };
  public setStatus = (status: { [key: string]: Status }) => {
    const setKeys = Object.keys(status);
    setKeys.forEach((key) => {
      if (
        this.childrenMap[key] &&
        !this.childrenMap[key].propStatus &&
        !this.childrenMap[key].funcStatus
      ) {
        this.childrenMap[key].set("status", status[key]);
      } else if (!this.childrenMap[key]) {
        this.emit("status", key, status[key]);
      }
    });
  };
  public setGlobalStatus = (status: Status) => {
    this.globalStatus = status;
    const allStatus = Object.keys(this.childrenMap).reduce((map, name) => {
      map[name] = status;
      return map;
    }, {});
    this.setStatus(allStatus);
  };
  public setError = (error: { [key: string]: string | undefined }) => {
    this.error = {
      ...this.error,
      ...error,
    };
    const setKeys = Object.keys(error);
    setKeys.forEach((key) => {
      if (this.childrenMap[key]) {
        this.childrenMap[key].set("error", error[key]);
      } else {
        this.emit("error", key, error[key]);
      }
    });
  };
  /** 获取单个或全部值 */
  public getValues = (key?: string) => {
    if (key) {
      return this.values[key];
    } else {
      return { ...this.values };
    }
  };
  /** 获取单个或全部状态 */
  public getStatus = (key?: string) => {
    if (key) {
      return this.status[key];
    } else {
      return { ...this.status };
    }
  };
  public getGlobalStatus = () => {
    return this.globalStatus;
  };
  public getError = (key?: string) => {
    if (key) {
      return this.error[key];
    } else {
      return this.error;
    }
  };
  /** 静默设置值 */
  public setValuesSilent = (values: { [key: string]: any }) => {
    this.values = {
      ...this.values,
      ...values,
    };
  };
  /** remove unmount formItem */
  public removeChild = (name: string) => {
    delete this.values[name];
    delete this.status[name];
    delete this.childrenMap[name];
  };
  public validate: (
    keys?: string[]
  ) => Promise<null | { [key: string]: any }> = (keys?: string[]) => {
    // 只校验status不是hidden的
    const error: { [key: string]: string } | null = {};
    let hasError = false;
    return Promise.all(
      Object.keys(this.childrenMap)
        .filter(
          (key) =>
            this.status[key] !== "hidden" &&
            (Array.isArray(keys) ? keys.includes(key) : true)
        )
        .map((key) => {
          return this.childrenMap[key].validate().then((err: string) => {
            if (err) {
              error[key] = err;
              hasError = true;
            }
            return err;
          });
        })
    ).then(() => {
      if (hasError) {
        return error;
      } else {
        return null;
      }
    });
  };
  public scrollToError = () => {
    const errorKeys = Object.keys(this.error).filter(
      (key) => !!this.error[key]
    );
    const first = errorKeys[0];
    if (first) {
      const firstCore = this.childrenMap[first];
      if (firstCore && firstCore.id) {
        const firstDom = document.getElementById(firstCore.id);
        if (firstDom && firstDom.scrollIntoView) {
          firstDom.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };
  // 控制子元素的更新
  public forceUpdate = (keys?: string[]) => {
    this.emit(ACTIONS.forceUpdate, keys);
  };
  public reset = (keys?: string[]) => {
    const resetKeys = Array.isArray(keys) ? keys : Object.keys(this.values);
    resetKeys.forEach((key) => {
      const value = key in this.initValues ? this.initValues[key] : null;
      if (this.childrenMap[key]) {
        this.silent = true;
        this.childrenMap[key].set("value", value);
        this.silent = false;
      } else {
        this.values[key] = value;
      }
    });
  };
}

export default Core;
