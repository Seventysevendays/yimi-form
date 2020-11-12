/// <reference types="react" />
import Core, { Status } from "../core/core";
declare const context: import("react").Context<{
    core?: Core;
    globalStatus?: Status;
}>;
export default context;
