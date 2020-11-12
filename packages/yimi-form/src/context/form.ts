/*
 * @author: xuxiang
 * @description: description
 * @Date: 2020-07-15 16:16:17
 * @LastEditors: xuxiang
 * @LastEditTime: 2020-11-12 18:31:26
 */
import { createContext } from "react";
import Core from "../core/core";

const context = createContext<{ core?: Core }>({});

export default context;
