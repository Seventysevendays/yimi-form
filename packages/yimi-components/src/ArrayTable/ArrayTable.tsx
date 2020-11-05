import React, { ReactNode } from "react";
import { Form, Core } from "../../../yimi-form/src";
import Table, { TableProps } from "antd/lib/table";
import isEqual from "lodash/isEqual";
import ArrayTableContext, {
  ArrayTableActionValue,
} from "../context/arrayTable";
import { FormProps } from "../../../yimi-form/src/components/Form/Form";
import "antd/lib/table/style/index.css";
import "antd/lib/pagination/style/index.css";
import { Status } from "../types";
import { CoreProps } from "../../../yimi-form/src/core/core";
import zhCN from "antd/lib/locale-provider/zh_CN";
import enUS from "antd/lib/locale-provider/en_US";
import ConfigProvider from "antd/lib/config-provider";
export interface ArrayTableProps<T> {
  tableConfig?: TableProps<any>;
  onChange?: (data: T[]) => void;
  onRowChange?: (val: T, core: Core, key: string[]) => void;
  top?: ReactNode;
  bottom?: ReactNode;
  rowFormConfig?: FormProps;
  rowCoreConfig?: CoreProps;
  value?: T[];
  status?: Status;
  className?: string;
  style?: React.CSSProperties;
  locale?: "zh" | "en";
  getInst?: (table: ArrayTable) => void;
}
type ArrayTableCallback = (
  core: Core,
  dataSource: any[],
  coreList: Core[]
) => void;
interface ArrayTableState {
  current: number;
  pageSize: number;
}
const getId = () => Math.random().toString(36).slice(2);

class ArrayTable extends React.Component<
  ArrayTableProps<any>,
  ArrayTableState
> {
  static displayName = "yimiArrayTable";
  protected components;
  protected dataSource: any[];
  protected coreList: Core[];
  public rowKey: string;
  protected actionValue: ArrayTableActionValue;
  private coreValue: any;

  constructor(props: ArrayTableProps<any>) {
    super(props);
    const { rowKey, pagination } = props.tableConfig || {};
    const { rowFormConfig, value, rowCoreConfig } = this.props;
    const { values } = rowCoreConfig || {};
    this.coreValue = values;
    this.dataSource = value || [];
    this.rowKey = typeof rowKey === "string" ? rowKey : "key";
    const { pageSize, current } = pagination || {};
    this.state = {
      current: current || 1,
      pageSize: pageSize || 10,
    };
    const row = (props) => {
      /** IMP: antd table data-row-key */
      const key = props["data-row-key"];
      const core =
        this.coreList.find((core) => core.id === key) ||
        new Core({ disableChildForm: true });
      return (
        <Form
          {...rowFormConfig}
          {...props}
          Com={"tr"}
          onChange={this.onRowChange}
          // 没有 key 的禁止将自己上报给FormItem，如empty data
          core={core}
          value={core.getValues()}
          status={this.props.status}
        />
      );
    };
    this.components = {
      body: {
        row,
      },
      header: {
        row,
      },
    };

    this.dataSource = (value || []).map((data) => ({ ...values, ...data }));
    this.coreList = this.dataSource.map(
      (values) =>
        new Core({ ...rowCoreConfig, values, id: values[this.rowKey] })
    );
    this.actionValue = {
      addBottom: this.addBottom,
      addTop: this.addTop,
      remove: this.remove,
      insertAfter: this.insertAfter,
      insertBefore: this.insertBefore,
      dataSource: this.dataSource,
    };
  }
  public componentDidMount = () => {
    if (this.props.getInst) {
      this.props.getInst(this);
    }
  };
  public getCoreList = () => {
    return this.coreList;
  };
  public componentDidUpdate = (prevProps: ArrayTableProps<any>) => {
    const { value, rowCoreConfig } = this.props;
    if (!isEqual(value, prevProps.value)) {
      this.coreList = (value || []).map(
        (values) =>
          new Core({ ...rowCoreConfig, values, id: values[this.rowKey] })
      );
      this.dataSource = (value || []).map((data) => data);
      this.forceUpdate();
    }
  };
  private onRowChange = (val: any, core: Core, key: string[]) => {
    const { rowCoreConfig } = this.props;
    this.dataSource = this.coreList.map((item) =>
      item.id === core.id ? val : item.getValues()
    );
    this.coreList = this.dataSource.map(
      (values) =>
        new Core({ ...rowCoreConfig, values, id: values[this.rowKey] })
    );
    if (this.props.onRowChange) {
      this.props.onRowChange(val, core, key);
    }
    this.onChange();
  };
  private onChange = () => {
    if (this.props.onChange) {
      this.props.onChange(this.dataSource);
    }
  };
  private updateCoreList = () => {
    const { rowCoreConfig } = this.props;
    this.dataSource = this.coreList.map((core) => core.getValues());
    this.coreList = this.dataSource.map(
      (values) =>
        new Core({ ...rowCoreConfig, values, id: values[this.rowKey] })
    );
  };
  private handleCallback = (callback: ArrayTableCallback, id: string) => {
    if (callback) {
      //  make sure core funtions work
      setTimeout(() => {
        const core = this.coreList.find((core) => core.id === id);
        callback(core, this.dataSource, this.coreList);
      });
    }
  };
  public changeAndUpdate = () => {
    this.onChange();
    this.forceUpdate();
  };
  public addBottom = (callback?: ArrayTableCallback) => {
    const id = getId();
    this.coreList.push(
      new Core({ values: { [this.rowKey]: id, ...this.coreValue } })
    );
    this.updateCoreList();
    this.changeAndUpdate();
    this.handleCallback(callback, id);
    const current = Math.ceil(this.dataSource.length / this.state.pageSize);
    this.setState({
      current,
    });
  };
  public addTop = (callback?: ArrayTableCallback) => {
    const id = getId();
    this.coreList.unshift(
      new Core({ values: { [this.rowKey]: id, ...this.coreValue } })
    );
    this.updateCoreList();
    this.changeAndUpdate();
    this.handleCallback(callback, id);
    this.setState({
      current: 1,
    });
  };
  public remove = (id: string, callback?: ArrayTableCallback) => {
    const core = this.coreList.find((core) => core.id === id);
    this.coreList = this.coreList.filter((core) => core.id !== id);
    this.updateCoreList();
    if (callback) {
      callback(core, this.dataSource, this.coreList);
    }
    this.changeAndUpdate();
  };
  public insertAfter = (id: string, callback?: ArrayTableCallback) => {
    const rowId = getId();
    const index = this.coreList.findIndex((core) => core.id === id);
    this.coreList.splice(
      index + 1,
      0,
      new Core({
        values: {
          [this.rowKey]: rowId,
          ...this.coreValue,
        },
      })
    );
    this.updateCoreList();
    this.changeAndUpdate();
    this.handleCallback(callback, rowId);
    if ((index + 1) % this.state.pageSize === 0) {
      this.setState((prev) => {
        return {
          current: prev.current + 1,
        };
      });
    }
  };
  public insertBefore = (id: string, callback?: ArrayTableCallback) => {
    const rowId = getId();
    const index = this.coreList.findIndex((core) => core.id === id);
    this.coreList.splice(
      index,
      0,
      new Core({
        values: {
          [this.rowKey]: rowId,
          ...this.coreValue,
        },
      })
    );
    this.updateCoreList();
    this.changeAndUpdate();
    this.handleCallback(callback, rowId);
  };
  public onShowSizeChange = (current, size) => {
    const { tableConfig } = this.props;
    const { pagination } = tableConfig || {};
    const { onShowSizeChange } = pagination || {};
    if (typeof onShowSizeChange === "function") {
      onShowSizeChange(current, size);
    }
    this.setState({
      pageSize: size,
    });
  };
  public onPageChange = (page, size) => {
    const { tableConfig } = this.props;
    const { pagination } = tableConfig || {};
    const { onChange } = pagination || {};
    this.updateCoreList();
    if (typeof onChange === "function") {
      onChange(page, size);
    }
    this.setState({
      current: page,
    });
  };
  public render() {
    const { top, bottom, tableConfig, className, style, locale } = this.props;
    const { current, pageSize } = this.state;
    return (
      <ArrayTableContext.Provider
        value={{ ...this.actionValue, dataSource: this.dataSource }}
      >
        <div
          className={`yimi-array-table ${className ? className : ""}`}
          style={style}
        >
          {top && <div className="yimi-array-table-top">{top}</div>}
          <ConfigProvider locale={locale === "en" ? enUS : zhCN}>
            <Table
              {...this.props.tableConfig}
              pagination={{
                ...(tableConfig || {}).pagination,
                current,
                pageSize,
                onChange: this.onPageChange,
                onShowSizeChange: this.onShowSizeChange,
              }}
              components={this.components}
              dataSource={this.dataSource.map((item) => item)}
            />
          </ConfigProvider>

          {bottom && <div className="yimi-array-table-bottom">{bottom}</div>}
        </div>
      </ArrayTableContext.Provider>
    );
  }
}

export default ArrayTable;
