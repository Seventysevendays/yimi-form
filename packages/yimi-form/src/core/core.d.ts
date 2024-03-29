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
    props: string;
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
    visibleChildrenMap: {
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
    props: {
        [key: string]: any;
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
    reload: {
        [key: string]: boolean;
    };
    constructor(props: CoreProps);
    on: EventEmitter["on"];
    emit: EventEmitter["emit"];
    removeListener: EventEmitter["removeListener"];
    removeAllListeners: EventEmitter["removeAllListeners"];
    private handleValueChange;
    private handleStatusChange;
    private handlePropsChange;
    private handleErrorChange;
    addChild: (options: FormItemProps & {
        displayName?: string;
    }) => ItemCore;
    setValues: (values: {
        [key: string]: any;
    }, opts?: {
        multiple: boolean;
        overWrite?: boolean;
        validate?: boolean;
    }) => void;
    setStatus: (status: {
        [key: string]: Status;
    }) => void;
    setProps: (props: {
        [key: string]: any;
    }) => void;
    setGlobalStatus: (status: Status) => void;
    setError: (error: {
        [key: string]: string;
    }) => void;
    getValues: (key?: string) => any;
    getStatus: (key?: string) => "preview" | "disabled" | "edit" | "hidden" | {
        [x: string]: Status;
    };
    getProps: (key?: string) => any;
    getGlobalStatus: () => Status;
    getError: (key?: string) => string | {
        [key: string]: any;
    };
    setValuesSilent: (values: {
        [key: string]: any;
    }, opts?: {
        overWrite?: boolean;
    }) => void;
    removeChild: (name: string) => void;
    validate: (keys?: string[]) => Promise<null | {
        [key: string]: any;
    }>;
    scrollToError: (params?: ScrollIntoViewOptions) => void;
    forceUpdate: (keys?: string[]) => void;
    reset: (keys?: string[] | undefined, validate?: boolean) => void;
}
export default Core;
