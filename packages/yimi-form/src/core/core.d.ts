/// <reference types="node" />
import { FormItemProps } from "./../components/FormItem/FormItem";
import { EventEmitter } from "events";
import ItemCore from "./itemCore";
import { Form } from "../components/Form/Form";
import { ItemValidateConfig } from "./../components/FormItem/FormItem";
export declare type CoreOnChange = (key: string[], values: {
    [key: string]: any;
}, core: Core) => void;
export declare type Status = "preview" | "disabled" | "edit" | "hidden";
export declare const ACTIONS: {
    value: string;
    status: string;
    change: string;
    error: string;
    forceUpdate: string;
};
export declare const noop: () => void;
export interface CoreProps {
    onChange?: CoreOnChange;
    initValues?: {
        [key: string]: any;
    };
    values?: {
        [key: string]: any;
    };
    status?: {
        [key: string]: Status;
    };
    error?: {
        [key: string]: string;
    };
    validateConfig?: {
        [key: string]: ItemValidateConfig;
    };
    autoValidate?: boolean;
    disableChildForm?: boolean;
    globalStatus?: Status;
    id?: string;
}
declare class Core {
    onChange?: CoreOnChange;
    eventCenter: EventEmitter;
    childrenMap: {
        [key: string]: ItemCore;
    };
    values: {
        [key: string]: any;
    };
    initValues: {
        [key: string]: any;
    };
    status: {
        [key: string]: Status;
    };
    error: {
        [key: string]: string | {
            [key: string]: any;
        } | Array<{
            [key: string]: any;
        }>;
    };
    validateConfig: {
        [key: string]: ItemValidateConfig;
    };
    autoValidate?: boolean;
    jsx: Form;
    disableChildForm: boolean;
    globalStatus: Status;
    parentItemCore?: ItemCore;
    silent: boolean;
    id: string;
    constructor(props: CoreProps);
    on: EventEmitter["on"];
    emit: EventEmitter["emit"];
    removeListener: EventEmitter["removeListener"];
    removeAllListeners: EventEmitter["removeAllListeners"];
    private handleValueChange;
    private handleStatusChange;
    private handleErrorChange;
    addChild: (options: FormItemProps) => ItemCore;
    setValues: (values: {
        [key: string]: any;
    }, opts?: {
        multiple: boolean;
    }) => void;
    setStatus: (status: {
        [key: string]: Status;
    }) => void;
    setGlobalStatus: (status: Status) => void;
    setError: (error: {
        [key: string]: string;
    }) => void;
    getValues: (key?: string) => any;
    getStatus: (key?: string) => "preview" | "disabled" | "edit" | "hidden" | {
        [x: string]: Status;
    };
    getGlobalStatus: () => Status;
    getError: (key?: string) => string | {
        [key: string]: any;
    };
    setValuesSilent: (values: {
        [key: string]: any;
    }) => void;
    removeChild: (name: string) => void;
    validate: (keys?: string[]) => Promise<null | {
        [key: string]: any;
    }>;
    scrollToError: () => void;
    forceUpdate: (keys?: string[]) => void;
    reset: (keys?: string[]) => void;
}
export default Core;
