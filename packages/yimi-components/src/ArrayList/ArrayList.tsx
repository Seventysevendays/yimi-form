import React, { ReactNode } from "react";
import cloneDeep from "lodash/cloneDeep";
import isEqual from "lodash/isEqual";
import { Form, Core } from "../../../yimi-form/src";
import ArrayTableContext, {
  ArrayTableActionValue,
} from "../context/arrayTable";
import { FormProps } from "../../../yimi-form/src/components/Form/Form";
import { CoreProps, Status } from "../../../yimi-form/src/core/core";

interface ArrayListProps<T> {
  children?: ReactNode;
  defaultValue?: T[];
  value?: T[];
  onChange?: (data: T[]) => void;
  rowKey?: string;
  onRowChange?: (val: any, core: Core) => void;
  listBottom?: ReactNode;
  listTop?: ReactNode;
  rowFormConfig?: FormProps;
  rowCoreConfig?: CoreProps;
  status?: Status;
}
type ArrayTableCallback = (
  core: Core,
  dataSource: any[],
  coreList: Core[]
) => void;
type Props = ArrayListProps<any>;

const getId = () => Math.random().toString(36).slice(2);

class ArrayList extends React.Component<Props> {
  protected dataSource: any[];
  protected actionValue: ArrayTableActionValue;
  private rowKey: string;
  protected coreList: Core[];
  constructor(props: Props) {
    super(props);
    const { rowKey, defaultValue } = props;
    this.rowKey = rowKey || "key";
    this.dataSource = defaultValue || [];
    this.actionValue = {
      addBottom: this.addBottom,
      addTop: this.addTop,
      remove: this.remove,
      insertAfter: this.insertAfter,
      insertBefore: this.insertBefore,
    };
    this.updateCoreList();
  }
  public componentDidMount = () => {
    const { value } = this.props;
    if (Array.isArray(value)) {
      this.dataSource = cloneDeep(value);
    }
    this.updateCoreList();
    this.forceUpdate();
  };
  public componentDidUpdate = (prevProps: Props) => {
    const { value } = this.props;
    if (!isEqual(value, prevProps.value)) {
      this.dataSource = Array.isArray(value) ? cloneDeep(value) : [];
      this.updateCoreList();
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
  public changeAndUpdate = () => {
    this.onChange();
    this.forceUpdate();
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
    const { listBottom, listTop, rowFormConfig, status } = this.props;
    return (
      <ArrayTableContext.Provider value={this.actionValue}>
        {listTop && <div className="yimi-array-list-top">{listTop}</div>}
        <div className="yimi-array-list">
          {this.dataSource.map((row) => {
            const core = this.coreList.find(
              (core) => core.id === row[this.rowKey]
            );
            return (
              <div className="yimi-array-list-row" key={row[this.rowKey]}>
                <Form
                  {...rowFormConfig}
                  core={core}
                  value={row}
                  onChange={this.onRowChange}
                  status={status}
                >
                  {this.props.children}
                </Form>
              </div>
            );
          })}
          {listBottom && (
            <div className="yimi-array-list-bottom">{listBottom}</div>
          )}
        </div>
      </ArrayTableContext.Provider>
    );
  }
}

export default ArrayList;
