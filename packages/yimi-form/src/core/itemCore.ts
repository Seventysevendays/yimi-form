/*
 * @author: xuxiang
 * @description: description
 * @Date: 2020-07-22 14:55:28
 * @LastEditors: xuxiang
 * @LastEditTime: 2020-09-09 12:41:13
 */

import { ACTIONS } from "./core";
import Core from "../core/core";
import { FormItemProps } from "./../components/FormItem/FormItem";
import AsyncValidator from "async-validator";
import { EventEmitter } from "events";
import { ItemValidateConfig } from "./../components/FormItem/FormItem";
import getId from "../utils/getId";
import { Status } from "./core";
import isEqual from "lodash/isEqual";
import { getFuncArgs, mapValues } from "../utils/dealListenkeys";

export type SetType = "value" | "status" | "error";

interface ItemCoreProps extends FormItemProps {
  on: EventEmitter["on"];
  emit: EventEmitter["emit"];
}

class ItemCore {
  public name: string;
  public on: EventEmitter["on"];
  public emit: EventEmitter["emit"];
  public innerFormList?: Core[];
  public form: Core;
  public value: any;
  public validator?: AsyncValidator;
  public validateConfig?: ItemValidateConfig;
  public status: Status;
  public error: any;
  public id: string;
  public funcStatus: (core: Core, val: any) => Status;
  public statusListenKeys: string[] | false;
  public showListenKeys: string[] | false;
  public show: any;
  public propStatus: Status;

  constructor(props: ItemCoreProps) {
    const {
      name,
      on,
      emit,
      form,
      status,
      statusListenKeys,
      show,
      showListenKeys,
    } = props;
    this.name = name;
    this.on = on;
    this.emit = emit;
    this.id = getId();
    this.form = form;
    this.innerFormList = [];
    this.show = show;
    this.statusListenKeys = statusListenKeys;
    this.showListenKeys = showListenKeys;
    if (typeof status === "function") {
      this.funcStatus = status;
      this.statusListenKeys =
        statusListenKeys === false ? false : getFuncArgs(status);
    } else if (status) {
      this.propStatus = status;
    }

    // 直接取core上的，是已经merge过的属性
    this.validateConfig = this.form.validateConfig[this.name];
    this.status = this.form.status[this.name];
    this.value = this.form.values[this.name];
    this.error = this.form.error[this.name];
    this.form.on(ACTIONS.value, this.selfConsist);
  }

  public set = (
    type: keyof typeof ACTIONS,
    value: any,
    opts?: { silent?: boolean }
  ) => {
    if (!isEqual(this[type], value)) {
      // 如果有show的，stutus为hidden时，一切状态设置无效
      if (type === "status" && typeof this.show === "function") {
        const canshow = this.show(this.form, mapValues(this.form.getValues()));
        if (!canshow && value !== "hidden") {
          return;
        }
      }
      const { silent } = opts || {};
      this[type] = value;
      if (!silent) {
        this.emit(type, this.name, value);
      }
    }
  };
  // 内部有Form时，存储内部Form的core
  public addInnerForm = (core: Core) => {
    this.innerFormList.push(core);
  };
  public validate = async (opts?: { onlySelf?: boolean }) => {
    const { onlySelf } = opts || {};
    // 内部有多个Form的校验
    if (this.innerFormList.length !== 0 && !onlySelf) {
      const validateResult = await Promise.all(
        this.innerFormList.map((core) => core.validate())
      );
      return validateResult.some((err) => !!err) ? validateResult : null;
    } else {
      return new Promise((resolve) => {
        if (this.validateConfig) {
          // 动态校验
          if (typeof this.validateConfig === "function") {
            this.validator = new AsyncValidator({
              [this.name]:
                this.validateConfig(this.form.getValues(), this.form) || {},
            });
          } else {
            this.validator = new AsyncValidator({
              [this.name]: this.validateConfig,
            });
          }
          this.validator.validate(
            {
              [this.name]: this.form.getValues(this.name),
            },
            {},
            (err) => {
              if (err) {
                const errMessage = err[0].message;
                resolve(errMessage);
                this.error = errMessage;
                this.emit(ACTIONS.error, this.name, errMessage);
              } else {
                this.error = undefined;
                this.emit(ACTIONS.error, this.name, undefined);
                resolve();
              }
            }
          );
        } else {
          resolve();
        }
      });
    }
  };
  public removeListener = () => {
    this.form.removeListener(ACTIONS.value, this.selfConsist);
  };
  public consistStatus = () => {
    if (this.funcStatus) {
      this.set(
        "status",
        this.funcStatus(this.form, mapValues(this.form.getValues()))
      );
    }
  };
  public selfConsist = (name) => {
    if (this.statusListenKeys === false) {
      this.consistStatus();
    } else if (
      Array.isArray(this.statusListenKeys) &&
      this.statusListenKeys.includes(name)
    ) {
      this.consistStatus();
    }
  };
}
export default ItemCore;
