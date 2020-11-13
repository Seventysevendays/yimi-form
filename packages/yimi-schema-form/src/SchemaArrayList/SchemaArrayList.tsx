import React, { ReactNode } from "react";
import ArrayList, {
  ArrayListProps,
} from "../../../yimi-components/src/ArrayList/ArrayList";
import { ArrayAction } from "../../../yimi-components/src";
import FormItem from "../../../yimi-form/src/components/FormItem/FormItem";

export interface SchemaArrayListProps extends ArrayListProps<any> {
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
}

class SChemaArrayList extends React.Component<SchemaArrayListProps> {
  public renderAction = () => {
    const { addBottomText, addTopText, addFrom, status } = this.props;
    return (
      status === "edit" && (
        <ArrayAction>
          {({ addBottom, addTop }) => {
            const isAddBottom = addFrom === "bottom" || addFrom === undefined;
            return (
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
            );
          }}
        </ArrayAction>
      )
    );
  };
  public renderRowAction = () => {
    const {
      hasRemove,
      removeText,
      hasInsertBefore,
      insertAfterText,
      insertBeforeText,
      rowKey,
      hasInsertAfter,
    } = this.props;
    return (
      <FormItem
        view={(core, values) => {
          return hasRemove !== false ? (
            <ArrayAction>
              {({ remove, insertAfter, insertBefore }) => {
                return (
                  <div className="yimi-schema-list-item-action">
                    {hasInsertAfter && (
                      <FormItem
                        view={(core, val) => {
                          return (
                            <span
                              className="yimi-schema-action"
                              onClick={() => {
                                insertAfter(val[rowKey || "id"]);
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
                              onClick={() => {
                                insertBefore(val[rowKey || "id"]);
                              }}
                            >
                              {insertBeforeText || "上方添加"}
                            </span>
                          );
                        }}
                      />
                    )}
                    <span
                      className="yimi-schema-action yimi-schema-action-delete"
                      onClick={() => remove(values[rowKey || "id"])}
                    >
                      {removeText || "删除"}
                    </span>
                  </div>
                );
              }}
            </ArrayAction>
          ) : null;
        }}
      />
    );
  };
  public render() {
    const { addFrom, children } = this.props;
    const actionProps = { [addFrom || "bottom"]: this.renderAction() };
    return (
      <div className="yimi-schema-list">
        <ArrayList {...this.props} {...actionProps}>
          <div className="yimi-schema-list-item">
            {children}
            {this.renderRowAction()}
          </div>
        </ArrayList>
      </div>
    );
  }
}

export default SChemaArrayList;
