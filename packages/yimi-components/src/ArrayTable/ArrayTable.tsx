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

interface ArrayTableProps<T> {
  tableConfig?: TableProps<any>;
  onChange?: (data: T[]) => void;
  onRowChange?: (val: T, core: Core) => void;
  tableTop?: ReactNode;
  tableBottom?: ReactNode;
  rowFormConfig?: FormProps;
  rowCoreConfig?: CoreProps;
  value?: T[];
  status?: Status;
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
  protected components;
  protected dataSource: any[];
  protected coreList: Core[];
  public rowKey: string;
  protected actionValue: ArrayTableActionValue;
  private coreValue: any;

  constructor(props: ArrayTableProps<any>) {
    super(props);
    const { dataSource, rowKey, pagination } = props.tableConfig || {};
    const { rowFormConfig, value, rowCoreConfig } = this.props;
    const { values } = rowCoreConfig || {};
    this.coreValue = values;
    this.dataSource = dataSource || [];
    this.rowKey = typeof rowKey === "string" ? rowKey : "key";
    const { pageSize, current } = pagination || {};
    this.state = {
      current: current || 1,
      pageSize: pageSize || 10,
    };
    this.components = {
      body: {
        row: (props) => {
          /** IMP: antd table data-row-key */
          const key = props["data-row-key"];
          const core = this.coreList.find((core) => core.id === key);
          return (
            <Form
              {...rowFormConfig}
              {...props}
              Com="tr"
              onChange={this.onRowChange}
              core={core}
              status={this.props.status}
            />
          );
        },
      },
    };
    this.actionValue = {
      addBottom: this.addBottom,
      addTop: this.addTop,
      remove: this.remove,
      insertAfter: this.insertAfter,
      insertBefore: this.insertBefore,
    };
    if (Array.isArray(value)) {
      this.dataSource = value.map((data) => ({ ...values, ...data }));
    } else if (Array.isArray(dataSource)) {
      this.dataSource = dataSource.map((data) => ({ ...values, ...data }));
    }
    this.coreList = this.dataSource.map(
      (values) =>
        new Core({ ...rowCoreConfig, values, id: values[this.rowKey] })
    );
  }
  public componentDidUpdate = (prevProps: ArrayTableProps<any>) => {
    const { tableConfig, value, rowCoreConfig } = this.props;
    if (Array.isArray(value)) {
      if (!isEqual(value, prevProps.value)) {
        this.coreList = value.map(
          (values) =>
            new Core({ ...rowCoreConfig, values, id: values[this.rowKey] })
        );
        this.dataSource = value.map((data) => data);
        this.forceUpdate();
      }
    } else if (tableConfig) {
      const { dataSource } = tableConfig;
      if (
        prevProps.tableConfig &&
        !isEqual(dataSource, prevProps.tableConfig.dataSource)
      ) {
        this.coreList = dataSource.map(
          (values) =>
            new Core({ ...rowCoreConfig, values, id: values[this.rowKey] })
        );
        this.dataSource = dataSource.map((data) => data);
        this.forceUpdate();
      }
    }
  };
  private onRowChange = (val: any, core: Core) => {
    this.dataSource = this.dataSource.map((item) =>
      item[this.rowKey] === val[this.rowKey] ? { ...val } : item
    );
    if (this.props.onRowChange) {
      this.props.onRowChange(val, core);
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
    const { tableTop, tableBottom, tableConfig } = this.props;
    const { current, pageSize } = this.state;
    return (
      <ArrayTableContext.Provider value={this.actionValue}>
        <div className="yimi-array-table">
          {tableTop && <div className="yimi-array-table-top">{tableTop}</div>}
          <Table
            {...this.props.tableConfig}
            pagination={{
              ...tableConfig.pagination,
              current,
              pageSize,
              onChange: this.onPageChange,
              onShowSizeChange: this.onShowSizeChange,
            }}
            components={this.components}
            dataSource={this.dataSource.map((item) => item)}
          />
          {tableBottom && (
            <div className="yimi-array-table-bottom">{tableBottom}</div>
          )}
        </div>
      </ArrayTableContext.Provider>
    );
  }
}

export default ArrayTable;
