import React, { ReactNode } from "react";
import FormItem, {
  SchemaFormItemProps,
} from "../SchemaFormItem/SchemaFormItem";
import Form, { FormProps } from "../../../yimi-form/src/components/Form/Form";
import ArrayTable, {
  SchemaArrayTableProps,
} from "../SchemaArrayTable/SchemaArrayTable";
import ArrayList, {
  SchemaArrayListProps,
} from "../SchemaArrayList/SchemaArrayList";
import { Core } from "../../../yimi-form/src";
import {
  Col,
  Row,
  Container,
  RowProps,
  ColProps,
  ContainerProps,
} from "react-grid-system";
import { CoreProps } from "../../../yimi-form/src/core/core";

export interface FormRenderRowSchema {
  row?: RowProps;
  component?: "y-form" | "y-list" | "y-table" | "y-row" | string;
  componentProps?:
    | FormProps
    | SchemaArrayListProps
    | SchemaArrayTableProps
    | { [key: string]: any };
  name?: string;
  title?: ReactNode;
  label?: ReactNode;
  formItem?: SchemaFormItemProps;
  col?: ColProps;
  properties?: Array<FormRenderRowSchema>;
  componentType?: "data" | "display";
}
type FormRenderSchema = Array<FormRenderRowSchema>;
type FormRenderSchemaComponent = { [key: string]: any };

export interface FormRenderProps {
  schema: FormRenderSchema;
  container?: ContainerProps;
  components: FormRenderSchemaComponent;
  form?: FormProps;
  coreConfig?: CoreProps;
  getForm?: (form: FormRender) => void;
}

export default class FormRender extends React.Component<FormRenderProps> {
  public components: FormRenderSchemaComponent;
  public core: Core;
  constructor(props: FormRenderProps) {
    super(props);
    const { components, coreConfig } = this.props;
    this.components = Object.keys(components).reduce((map, key) => {
      map[key] = components[key];
      map[key.toLowerCase()] = components[key];
      return map;
    }, {});
    this.core = new Core({ ...coreConfig });
  }
  public componentDidMount = () => {
    if (this.props.getForm) {
      this.props.getForm(this);
    }
  };
  public renderComponent = (cpName: string) => {
    if (!this.components[cpName]) {
      console.error(`yimi-shema-form: can not find component ${cpName}!`);
    }
    return (
      this.components[cpName] || <div className="yimi-schema-form-empty" />
    );
  };
  public renderForm = (item: FormRenderRowSchema) => {
    const { properties, name, title, formItem, label } = item;
    return (
      <FormItem
        name={name}
        label={label !== undefined ? label : title}
        {...formItem}
      >
        <Form>{this.renderSchema(properties)}</Form>
      </FormItem>
    );
  };
  public renderList = (item: FormRenderRowSchema) => {
    const { name, title, properties, componentProps, label } = item;
    return (
      <FormItem
        name={name}
        label={label !== undefined ? label : title}
        key={name}
      >
        <ArrayList {...(componentProps as any)}>
          {this.renderSchema(properties)}
        </ArrayList>
      </FormItem>
    );
  };
  public renderTable = (item: FormRenderRowSchema) => {
    const { componentProps, properties, name, title, formItem, label } = item;
    const { tableConfig } = componentProps || {};
    if (Array.isArray(properties)) {
      const columnsWithRender = properties.map((col) => {
        return {
          ...col,
          render: () => {
            return this.renderItem(col);
          },
        };
      });
      return (
        <FormItem
          name={name}
          label={label !== undefined ? label : title}
          {...formItem}
        >
          <ArrayTable
            {...(componentProps as any)}
            tableConfig={{
              columns: columnsWithRender,
              ...tableConfig,
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
    return schema.map((rowItem, index) => {
      const { properties, row, component, col } = rowItem;
      const R = (props) => (
        <Row
          {...(row as any)}
          className={`yimi-schema-form-row ${
            row && row.className ? row.className : ""
          }`}
        >
          <Col
            {...(col as any)}
            className={`yimi-schema-form-col ${
              col && col.className ? col.className : ""
            }`}
          >
            {props.children}
          </Col>
        </Row>
      );
      if (!properties) {
        return <R key={index}>{this.renderItem(rowItem)}</R>;
      }
      if (component === "y-form") {
        return <R key={index}>{this.renderForm(rowItem)}</R>;
      } else if (component === "y-table") {
        return <R key={index}>{this.renderTable(rowItem)}</R>;
      } else if (component === "y-list") {
        return <R key={index}>{this.renderList(rowItem)}</R>;
      }
      return (
        <Row
          {...(row as any)}
          className={`yimi-schema-form-row ${
            row && row.className ? row.className : ""
          }`}
          key={index}
        >
          {properties.map((item) => {
            const {
              component,
              name,
              title,
              label,
              formItem,
              col,
              componentProps,
              componentType,
            } = item;
            const C = (props) => (
              <Col
                {...col}
                {...props}
                className={`yimi-schema-form-col ${
                  col && col.className ? col.className : ""
                }`}
              />
            );
            if (properties && !component) {
              return this.renderSchema(properties);
            }
            if (component === "y-form") {
              return <C key={name + title}>{this.renderForm(item)}</C>;
            } else if (component === "y-list") {
              return <C key={name + title}>{this.renderList(item)}</C>;
            } else if (component === "y-table") {
              return <C key={name + title}>{this.renderTable(item)}</C>;
            } else if (component === "y-row") {
              return <C key={name + title}>{this.renderRow(item)}</C>;
            } else {
              const Cp = this.renderComponent(component);
              return (
                <C key={name + title}>
                  {componentType === "display" ? (
                    <Cp {...componentProps} />
                  ) : (
                    <FormItem
                      key={name + title}
                      name={name}
                      label={label !== undefined ? label : title}
                      {...formItem}
                    >
                      <Cp {...componentProps} />
                    </FormItem>
                  )}
                </C>
              );
            }
          })}
        </Row>
      );
    });
  };
  public renderItem = (item: FormRenderRowSchema) => {
    const {
      component,
      title,
      formItem,
      name,
      componentType,
      componentProps,
      label,
    } = item;
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
      return componentType === "display" ? (
        <Cp {...componentProps} />
      ) : (
        <FormItem
          name={name}
          label={label !== undefined ? label : title}
          {...formItem}
        >
          <Cp {...componentProps} />
        </FormItem>
      );
    }
  };
  public render() {
    const { schema, form, container } = this.props;
    return (
      <div className="yimi-schema-form">
        <Container fluid {...(container as any)}>
          <Form core={this.core} colon {...form}>
            {this.renderSchema(schema)}
          </Form>
        </Container>
      </div>
    );
  }
}
