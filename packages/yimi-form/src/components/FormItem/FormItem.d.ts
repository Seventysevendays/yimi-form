import React, { ReactNode } from "react";
import Core, { Status } from "../../core/core";
import { RuleItem } from "async-validator";
export declare type ItemValidateConfig = RuleItem | RuleItem[] | ((val: any, core: Core) => RuleItem | RuleItem[]);
export declare type ItemStatus = Status | ((core: Core, val: any) => Status);
export interface FormItemProps {
    name?: string;
    label?: ReactNode;
    children?: ReactNode;
    style?: React.CSSProperties;
    form?: Core;
    onChange?: (core: Core, ...args: any[]) => void;
    defaultValue?: any;
    value?: any;
    status?: ItemStatus;
    props?: {
        [key: string]: any;
    } | ((core: Core, val: any) => any);
    show?: (core: Core, val: any) => boolean;
    view?: (core: Core, val: any) => ReactNode;
    validateConfig?: ItemValidateConfig;
    error?: string;
    errorRender?: (error: string | {
        [key: string]: any;
    } | Array<{
        [key: string]: any;
    }>) => ReactNode;
    full?: boolean;
    colon?: boolean;
    inline?: boolean;
    direction?: "vertical" | "horizontal";
    prefix?: ReactNode;
    top?: ReactNode;
    bottom?: ReactNode;
    suffix?: ReactNode;
    className?: string;
    statusListenKeys?: string[] | false;
    showListenKeys?: string[] | false;
    viewListenKeys?: string[] | false;
    propsListenKeys?: string[] | false;
}
declare const ConnectFormItem: {
    (props: FormItemProps): JSX.Element;
    displayName: string;
};
export default ConnectFormItem;
