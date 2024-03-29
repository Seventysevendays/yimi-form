import React, { ReactNode } from "react";
import isEqual from "lodash/isEqual";
import { Form, Core } from "../../../yimi-form/src";
import ArrayTableContext, {
  ArrayTableActionValue,
} from "../context/arrayTable";
import { FormProps } from "../../../yimi-form/src/components/Form/Form";
import { CoreProps, Status } from "../../../yimi-form/src/core/core";
import ArrayIndexContext from '../context/arrayIndex'

export interface ArrayListProps<T> {
  children?: ReactNode;
  defaultValue?: T[];
  value?: T[];
  onChange?: (data: T[]) => void;
  rowKey?: string;
  onRowChange?: (val: any, core: Core, key: string[]) => void;
  bottom?: ReactNode;
  top?: ReactNode;
  rowFormConfig?: FormProps;
  rowCoreConfig?: CoreProps;
  status?: Status;
  className?: string;
  style?: React.CSSProperties;
  getInst?: (table: ArrayList) => void;
}
type ArrayTableCallback = (
  core: Core,
  dataSource: any[],
  coreList: Core[]
) => void;
type Props = ArrayListProps<any>;

const getId = () => Math.random().toString(36).slice(2);

class ArrayList extends React.Component<Props> {
  static displayName = "yimiArrayList";
  protected dataSource: any[];
  protected actionValue: ArrayTableActionValue;
  private rowKey: string;
  protected coreList: Core[];
  private coreValue: any;
  constructor(props: Props) {
    super(props);
    const { rowKey, defaultValue, value, rowCoreConfig } = props;
    const { values } = rowCoreConfig || {};
    this.coreValue = values;
    this.rowKey = rowKey || "id";
    this.dataSource = (value || defaultValue || []).map((data) => ({
      ...values,
      ...data,
    }));

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
  public componentDidUpdate = (prevProps: Props) => {
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
    this.dataSource = this.dataSource.map((item) =>
      item[this.rowKey] === val[this.rowKey] ? { ...val } : item
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
  public changeAndUpdate = () => {
    this.onChange();
    this.forceUpdate();
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
      const core = this.coreList.find((core) => core.id === id);
      callback(core, this.dataSource, this.coreList);
    }
  };
  public addBottom = (callback?: ArrayTableCallback) => {
    const id = getId();
    this.coreList.push(
      new Core({ values: { [this.rowKey]: id, ...this.coreValue } })
    );
    this.updateCoreList();
    this.changeAndUpdate();
    this.handleCallback(callback, id);
  };
  public addTop = (callback?: ArrayTableCallback) => {
    const id = getId();
    this.coreList.unshift(
      new Core({ values: { [this.rowKey]: id, ...this.coreValue } })
    );
    this.updateCoreList();
    this.changeAndUpdate();
    this.handleCallback(callback, id);
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
  public render() {
    const { bottom, top, rowFormConfig, status, className, style } = this.props;
    return (
      <ArrayTableContext.Provider
        value={{ ...this.actionValue, dataSource: this.dataSource }}
      >
        {top && <div className="yimi-array-list-top">{top}</div>}
        <div
          className={`yimi-array-list ${className ? className : ""}`}
          style={style}
        >
          {this.dataSource.map((row, index) => {
            const core = this.coreList.find(
              (core) => core.id === row[this.rowKey]
            );
            return (
              <div className="yimi-array-list-row" key={row[this.rowKey]}>
                <Form
                  {...rowFormConfig}
                  core={core}
                  onChange={this.onRowChange}
                  status={status}
                >
                  <ArrayIndexContext.Provider value={{ index: index + 1}}>
                    {this.props.children}
                  </ArrayIndexContext.Provider>
                    
                </Form>
              </div>
            );
          })}
          {bottom && <div className="yimi-array-list-bottom">{bottom}</div>}
        </div>
      </ArrayTableContext.Provider>
    );
  }
}

export default ArrayList;
