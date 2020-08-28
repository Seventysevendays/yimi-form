import ItemCore from "../core/itemCore";
/*
 * @author: xuxiang
 * @description: description
 * @Date: 2020-07-22 20:08:56
 * @LastEditors: xuxiang
 * @LastEditTime: 2020-07-28 19:31:33
 */
import { createContext } from "react";

const formItemContext = createContext<{ itemCore?: ItemCore }>({});

export default formItemContext;
