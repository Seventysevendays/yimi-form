import React from "react";
import FormItem, {
  FormItemProps,
} from "../../../yimi-form/src/components/FormItem/FormItem";

interface VisibleConfig {
  name: string;
  value: string;
  visible: boolean;
  rule: "===" | ">=" | ">" | "<=" | "<";
}

export interface SchemaFormItemProps extends FormItemProps {
  // 或表达式配置
  visibleOrConfig?: VisibleConfig[];
  // 和表达式配置
  visibleAndConfig?: VisibleConfig[];
}

class SchemaFormItem extends React.Component<SchemaFormItemProps> {
  public itemProps: FormItemProps;
  constructor(props: SchemaFormItemProps) {
    super(props);
    const { visibleOrConfig, visibleAndConfig } = props;
    this.itemProps = { ...props } || {};

    let orString = "false ";
    let andString = "true ";

    if (Array.isArray(visibleOrConfig) && visibleOrConfig.length > 0) {
      visibleOrConfig.forEach((item) => {
        const { name, value, rule, visible } = item;
        const isNumber = typeof value === "number";
        orString += `|| (values['$${name}']${rule}${
          isNumber ? value : '"' + value + '"'
        } && ${visible})`;
      });
    }
    if (Array.isArray(visibleAndConfig) && visibleAndConfig.length > 0) {
      visibleAndConfig.forEach((item) => {
        const { name, value, rule, visible } = item;
        const isNumber = typeof value === "number";
        andString += `&& (values['$${name}']${rule}${
          isNumber ? value : '"' + value + '"'
        } && ${visible})`;
      });
    }
    this.itemProps.visible =
      orString !== "false " || andString !== "true "
        ? (core, values) => {
            return (
              (orString !== "false " ? eval(orString) : true) &&
              (andString !== "true " ? eval(andString) : true)
            );
          }
        : undefined;
  }
  public render() {
    return (
      <FormItem visibleListenKeys={false} {...this.itemProps}>
        {this.props.children}
      </FormItem>
    );
  }
}

export default SchemaFormItem;
