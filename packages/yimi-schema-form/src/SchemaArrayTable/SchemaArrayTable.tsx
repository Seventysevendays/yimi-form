import React, { ReactNode } from "react";
import ArrayTable, {
  ArrayTableProps,
} from "../../../yimi-components/src/ArrayTable/ArrayTable";
import { ArrayAction } from "../../../yimi-components/src";
import FormItem from "../../../yimi-form/src/components/FormItem/FormItem";

export interface SchemaArrayTableProps extends ArrayTableProps<any> {
  deleteText?: string;
  operationText?: string;
  hasInsertAfter?: boolean;
  hasInsertBefore?: boolean;
  hasRemove?: boolean;
  addBottomText?: ReactNode;
  addTopText?: ReactNode;
  removeText?: ReactNode;
  insertAfterText?: ReactNode;
  insertBeforeText?: ReactNode;
  actionPosition?: "top" | "bottom";
  addFrom?: "bottom" | "top";
  hasDelete?: boolean;
  editMode?: "edit" | "preview";
  editText?: string;
  saveText?: string;
}

class SchemaArrayTable extends React.Component<SchemaArrayTableProps> {
  public renderAction = () => {
    const { addBottomText, addTopText, addFrom, status } = this.props;
    return (
      status === "edit" && (
        <ArrayAction>
          {({ addBottom, addTop }) => {
            const isAddBottom = addFrom === "bottom" || addFrom === undefined;
            return (
              <div>
                <span
                  className="yimi-schema-action"
                  onClick={() => {
                    if (isAddBottom) {
                      addBottom();
                    } else {
                      addTop();
                    }
                  }}
                >
                  {(isAddBottom ? addBottomText : addTopText) || "添加"}
                </span>
              </div>
            );
          }}
        </ArrayAction>
      )
    );
  };
  public getColumns = () => {
    const {
      tableConfig,
      status,
      deleteText,
      operationText,
      hasDelete,
      editMode,
      editText,
      saveText,
      hasInsertAfter,
      insertAfterText,
      hasInsertBefore,
      insertBeforeText,
    } = this.props;
    const { columns, rowKey } = tableConfig || {};
    const cols = (columns || []).map((item) => item);
    if (status === "edit") {
      cols.push({
        dataIndex: "y-delete",
        title: operationText || "操作",
        render: () => {
          return (
            <ArrayAction>
              {({ remove, insertAfter, insertBefore }) => {
                return (
                  <>
                    {editMode === "preview" && (
                      <FormItem
                        view={(core) => {
                          return core.getGlobalStatus() === "preview" ? (
                            <span
                              className="yimi-schema-action"
                              style={{ marginRight: 10 }}
                              onClick={() => {
                                core.setGlobalStatus("edit");
                              }}
                            >
                              {editText || "编辑"}
                            </span>
                          ) : (
                            <span
                              className="yimi-schema-action"
                              style={{ marginRight: 10 }}
                              onClick={() => {
                                core.setGlobalStatus("preview");
                              }}
                            >
                              {saveText || "保存"}
                            </span>
                          );
                        }}
                      />
                    )}
                    {hasInsertAfter && (
                      <FormItem
                        view={(core, val) => {
                          return (
                            <span
                              className="yimi-schema-action"
                              style={{ marginRight: 10 }}
                              onClick={() => {
                                insertAfter(val[(rowKey as string) || "id"]);
                              }}
                            >
                              {insertAfterText || "下方添加"}
                            </span>
                          );
                        }}
                      />
                    )}
                    {hasInsertBefore && (
                      <FormItem
                        view={(core, val) => {
                          return (
                            <span
                              className="yimi-schema-action"
                              style={{ marginRight: 10 }}
                              onClick={() => {
                                insertBefore(val[(rowKey as string) || "id"]);
                              }}
                            >
                              {insertBeforeText || "上方添加"}
                            </span>
                          );
                        }}
                      />
                    )}
                    {hasDelete !== false && (
                      <FormItem
                        view={(core, val) => {
                          return (
                            <span
                              className="yimi-schema-action yimi-schema-action-delete"
                              onClick={() => {
                                remove(val[(rowKey as string) || "key"]);
                              }}
                            >
                              {deleteText || "删除"}
                            </span>
                          );
                        }}
                      />
                    )}
                  </>
                );
              }}
            </ArrayAction>
          );
        },
        fixed: "right",
      });
    }

    return cols as any;
  };
  public render() {
    const { tableConfig, addFrom, rowFormConfig, editMode } = this.props;
    const actionProps = { [addFrom || "bottom"]: this.renderAction() };

    return (
      <div className="yimi-schema-table">
        <ArrayTable
          {...this.props}
          {...actionProps}
          rowFormConfig={{ ...rowFormConfig, globalStatus: editMode }}
          tableConfig={{ ...tableConfig, columns: this.getColumns() }}
        />
      </div>
    );
  }
}

export default SchemaArrayTable;
