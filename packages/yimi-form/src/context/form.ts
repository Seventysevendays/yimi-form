/*
 * @author: xuxiang
 * @description: description
 * @Date: 2020-07-15 16:16:17
 * @LastEditors: xuxiang
 * @LastEditTime: 2020-07-21 18:50:14
 */
import { createContext } from "react";
import Core from "../core/core";

const context = createContext<{ core?: Core }>({});

export default context;
