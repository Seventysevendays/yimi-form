/// <reference types="node" />
import { ACTIONS } from "./core";
import Core from "../core/core";
import { FormItemProps } from "./../components/FormItem/FormItem";
import AsyncValidator from "async-validator";
import { EventEmitter } from "events";
import { ItemValidateConfig } from "./../components/FormItem/FormItem";
import { Status } from "./core";
export declare type SetType = "value" | "status" | "error";
interface ItemCoreProps extends FormItemProps {
    on: EventEmitter["on"];
    emit: EventEmitter["emit"];
    displayName: string;
}
export interface ItemCoreSetOptions {
    silent?: boolean;
    manual?: boolean;
    validate?: boolean;
}
declare class ItemCore {
    name: string;
    on: EventEmitter["on"];
    emit: EventEmitter["emit"];
    innerFormList?: Core[];
    form: Core;
    value: any;
    validator?: AsyncValidator;
    validateConfig?: ItemValidateConfig;
    status: Status;
    error: any;
    id: string;
    funcStatus: (core: Core, val: any) => Status;
    statusListenKeys: string[] | false;
    showListenKeys: string[] | false;
    show: any;
    propStatus: Status;
    displayName: string;
    constructor(props: ItemCoreProps);
    set: (type: keyof typeof ACTIONS, value: any, opts?: ItemCoreSetOptions) => void;
    addInnerForm: (core: Core) => void;
    removeInnerForm: (core: Core) => void;
    resetInnerFormList: () => void;
    reset: () => void;
    validate: (opts?: {
        onlySelf?: boolean;
    }) => Promise<unknown>;
    removeListener: () => void;
    updateFuncStatus: (funcStatus: any) => void;
    consistStatus: () => void;
    selfConsist: (name: any) => void;
}
export default ItemCore;
