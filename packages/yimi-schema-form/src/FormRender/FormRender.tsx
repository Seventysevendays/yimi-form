import Row, { RowProps } from "antd/lib/row";
import Col, { ColProps } from "antd/lib/col";
import React from "react";
import FormItem, {
  FormItemProps,
} from "../../../yimi-form/src/components/FormItem/FormItem";
import Form, { FormProps } from "../../../yimi-form/src/components/Form/Form";
import ArrayTable, {
  SchemaArrayTableProps,
} from "../SchemaArrayTable/SchemaArrayTable";
import ArrayList, {
  SchemaArrayListProps,
} from "../SchemaArrayList/SchemaArrayList";
import { Core } from "../../../yimi-form/src";

export interface FormRenderRowSchema {
  id?: string;
  row?: RowProps;
  component?: "y-form" | "y-list" | "y-table" | "y-row" | string;
  componentProps?:
    | FormProps
    | SchemaArrayListProps
    | SchemaArrayTableProps
    | { [key: string]: any };
  name?: string;
  title?: string;
  formItem?: FormItemProps;
  col?: ColProps;
  properties?: Array<FormRenderRowSchema>;
}
type FormRenderSchema = Array<FormRenderRowSchema>;
type FormRenderSchemaComponent = { [key: string]: any };

export interface FormRenderProps {
  schema: FormRenderSchema;
  row?: RowProps;
  components: FormRenderSchemaComponent;
  form?: FormProps;
}

class FormRender extends React.Component<FormRenderProps> {
  public components: FormRenderSchemaComponent;
  public core: Core;
  constructor(props: FormRenderProps) {
    super(props);
    const { components } = this.props;
    this.components = Object.keys(components).reduce((map, key) => {
      map[key] = components[key];
      map[key.toLowerCase()] = components[key];
      return map;
    }, {});
    this.core = new Core({
      onChange: ([key], value, core) => {
        console.log(key, value);
      },
    });
  }
  public renderComponent = (cpName: string) => {
    if (!this.components[cpName]) {
      console.error(`yimi-shema-form: can not find component ${cpName}!`);
    }
    return this.components[cpName] || null;
  };
  public renderForm = (item: FormRenderRowSchema) => {
    const { properties, name, title, formItem } = item;
    return (
      <FormItem name={name} label={title} {...formItem}>
        <Form>{this.renderSchema(properties)}</Form>
      </FormItem>
    );
  };
  public renderList = (item: FormRenderRowSchema) => {
    const { name, title, properties, componentProps } = item;
    return (
      <FormItem name={name} label={title} key={name}>
        <ArrayList {...(componentProps as any)}>
          {this.renderSchema(properties)}
        </ArrayList>
      </FormItem>
    );
  };
  public renderTable = (item: FormRenderRowSchema) => {
    const { componentProps, properties, name, title, formItem } = item;
    const { tableConfig } = componentProps || {};
    const { columns } = tableConfig || {};
    if (Array.isArray(properties) && Array.isArray(columns)) {
      const columnsWithRender = columns.map((col) => {
        const { dataIndex } = col;
        const curRender = properties.find((p) => p.name === dataIndex);
        if (curRender) {
          return {
            ...col,
            render: () => {
              return this.renderItem(curRender);
            },
          };
        } else {
          return col;
        }
      });
      return (
        <FormItem name={name} label={title} {...formItem}>
          <ArrayTable
            {...(componentProps as any)}
            tableConfig={{
              ...tableConfig,
              columns: columnsWithRender,
            }}
          />
        </FormItem>
      );
    }
    return null;
  };
  public renderRow = (item: FormRenderRowSchema) => {
    const { properties } = item;
    return this.renderSchema(properties);
  };
  public renderSchema = (schema: FormRenderSchema) => {
    const { row: propRow } = this.props;
    return schema.map((rowItem, index) => {
      const { properties, row, component } = rowItem;
      // 没有properties，直接渲染组件
      const span = Math.floor(24 / (properties ? properties.length : 1));
      if (!properties) {
        return (
          <Row {...propRow} {...row}>
            <Col span={24}>{this.renderItem(rowItem)}</Col>
          </Row>
        );
      }
      if (component === "y-form") {
        return (
          <Row {...propRow} {...row}>
            <Col span={24}>{this.renderForm(rowItem)}</Col>
          </Row>
        );
      } else if (component === "y-table") {
        return (
          <Row {...propRow} {...row}>
            <Col span={24}>{this.renderTable(rowItem)}</Col>
          </Row>
        );
      } else if (component === "y-list") {
        return (
          <Row {...propRow} {...row}>
            <Col span={24}>{this.renderList(rowItem)}</Col>
          </Row>
        );
      }
      return (
        <Row {...propRow} {...row} key={index}>
          {properties.map((item) => {
            const {
              component,
              name,
              title,
              formItem,
              col,
              componentProps,
            } = item;
            const C = (props) => (
              <Col span={span} {...col} {...props} key={name + title} />
            );
            if (properties && !component) {
              return this.renderSchema(properties);
            }
            if (component === "y-form") {
              return <C>{this.renderForm(item)}</C>;
            } else if (component === "y-list") {
              return <C>{this.renderList(item)}</C>;
            } else if (component === "y-table") {
              return <C>{this.renderTable(item)}</C>;
            } else if (component === "y-row") {
              return <C>{this.renderRow(item)}</C>;
            } else {
              const Cp = this.renderComponent(component);
              return (
                <C>
                  <FormItem
                    key={name + title}
                    name={name}
                    label={title || null}
                    {...formItem}
                  >
                    <Cp {...componentProps} />
                  </FormItem>
                </C>
              );
            }
          })}
        </Row>
      );
    });
  };
  public renderItem = (item: FormRenderRowSchema) => {
    const { component, title, formItem, name } = item;
    if (component === "y-form") {
      return this.renderForm(item);
    } else if (component === "y-list") {
      return this.renderList(item);
    } else if (component === "y-table") {
      return this.renderTable(item);
    } else if (component === "y-row") {
      return this.renderRow(item);
    } else {
      const Cp = this.renderComponent(component);
      return (
        <FormItem name={name} label={title || null} {...formItem}>
          <Cp />
        </FormItem>
      );
    }
  };
  public render() {
    const { schema, form } = this.props;
    return (
      <Form core={this.core} colon {...form}>
        {this.renderSchema(schema)}
      </Form>
    );
  }
}

export default FormRender;
