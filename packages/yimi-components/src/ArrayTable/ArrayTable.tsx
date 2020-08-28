import React, { ReactNode } from "react";
import { Form, Core } from "../../../yimi-form/src";
import Table, { TableProps } from "antd/lib/table";
import isEqual from "lodash/isEqual";
import cloneDeep from "lodash/cloneDeep";
import ArrayTableContext, {
  ArrayTableActionValue,
} from "../context/arrayTable";
import { FormProps } from "../../../yimi-form/src/components/Form/Form";
import "antd/lib/table/style/index.css";
import "antd/lib/pagination/style/index.css";
import { Status } from "../types";
import { CoreProps } from "../../../yimi-form/src/core/core";

interface ArrayTableProps<T> {
  getTable?: (table: ArrayTable) => void;
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
interface ArrayTableState {}
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

  constructor(props: ArrayTableProps<any>) {
    super(props);
    const { dataSource, rowKey } = props.tableConfig || {};
    const { rowFormConfig, value } = this.props;
    this.rowKey = typeof rowKey === "string" ? rowKey : "key";
    this.dataSource = dataSource || [];
    this.components = {
      body: {
        row: (props) => {
          /** IMP: antd table data-row-key */
          const key = props["data-row-key"];
          const core = this.coreList.find((core) => core.id === key);
          const value = this.dataSource.find((row) => row[this.rowKey] === key);
          return (
            <Form
              {...rowFormConfig}
              {...props}
              value={value}
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
      this.dataSource = cloneDeep(value);
    } else if (Array.isArray(dataSource)) {
      this.dataSource = cloneDeep(dataSource);
    }
    this.updateCoreList();
  }
  public componentDidMount = () => {
    const { getTable } = this.props;
    if (getTable) {
      getTable(this);
    }
    this.forceUpdate();
  };
  public componentDidUpdate = (prevProps: ArrayTableProps<any>) => {
    const { tableConfig, value } = this.props;
    if (Array.isArray(value)) {
      if (!isEqual(value, prevProps.value)) {
        this.dataSource = cloneDeep(value);
        this.updateCoreList();
        this.forceUpdate();
      }
    } else if (tableConfig) {
      const { dataSource } = tableConfig;
      if (
        prevProps.tableConfig &&
        !isEqual(dataSource, prevProps.tableConfig.dataSource)
      ) {
        this.dataSource = cloneDeep(dataSource);
        this.updateCoreList();
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
    this.coreList = this.dataSource.map(
      (values) =>
        new Core({ ...rowCoreConfig, values, id: values[this.rowKey] })
    );
  };
  private handleCallback = (callback: ArrayTableCallback, id: string) => {
    if (callback) {
      // TODO: make sure core funtions work
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
    this.dataSource = cloneDeep(this.dataSource);
    this.dataSource.push({ [this.rowKey]: id });
    this.updateCoreList();
    this.changeAndUpdate();
    this.handleCallback(callback, id);
  };
  public addTop = (callback?: ArrayTableCallback) => {
    const id = getId();
    this.dataSource = cloneDeep(this.dataSource);
    this.dataSource.unshift({ [this.rowKey]: id });
    this.updateCoreList();
    this.changeAndUpdate();
    this.handleCallback(callback, id);
  };
  public remove = (id: string, callback?: ArrayTableCallback) => {
    const core = this.coreList.find((core) => core.id === id);
    this.dataSource = this.dataSource.filter(
      (item) => item[this.rowKey] !== id
    );
    this.updateCoreList();
    if (callback) {
      callback(core, this.dataSource, this.coreList);
    }
    this.changeAndUpdate();
  };
  public insertAfter = (id: string, callback?: ArrayTableCallback) => {
    const rowId = getId();
    const index = this.dataSource.findIndex((item) => item[this.rowKey] === id);
    this.dataSource = cloneDeep(this.dataSource);
    this.dataSource.splice(index + 1, 0, { [this.rowKey]: rowId });
    this.updateCoreList();
    this.changeAndUpdate();
    this.handleCallback(callback, rowId);
  };
  public insertBefore = (id: string, callback?: ArrayTableCallback) => {
    const rowId = getId();
    const index = this.dataSource.findIndex((item) => item[this.rowKey] === id);
    this.dataSource = cloneDeep(this.dataSource);
    this.dataSource.splice(index, 0, { [this.rowKey]: rowId });
    this.updateCoreList();
    this.changeAndUpdate();
    this.handleCallback(callback, rowId);
  };
  public render() {
    const { tableTop, tableBottom } = this.props;
    return (
      <ArrayTableContext.Provider value={this.actionValue}>
        <div className="yimi-array-table">
          {tableTop && <div className="yimi-array-table-top">{tableTop}</div>}
          <Table
            {...this.props.tableConfig}
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
