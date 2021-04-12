import React from "react";
import Core, { Status } from "../../core/core";
import ItemCore from "../../core/itemCore";
export interface FormProps {
    core?: Core;
    colon?: boolean;
    onChange?: (val: any, core: Core, key: string[]) => void;
    itemCore?: ItemCore;
    value?: {
        [key: string]: any;
    };
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
export declare class Form extends React.Component<FormProps> {
    core?: Core;
    private constructor();
    componentDidMount: () => void;
    componentWillUnmount: () => void;
    componentDidUpdate: (prevProps: FormProps) => void;
    onChange: (val: any, key: any) => void;
    render(): JSX.Element;
}
declare const ConnectForm: {
    (props: FormProps): JSX.Element;
    displayName: string;
};
export default ConnectForm;
