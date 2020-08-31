import React from "react";
import { Form, FormItem, Core } from "../../src";
import { mount } from "enzyme";
import { Input } from "../../../yimi-components-antd-v4/lib";

describe("Basic component Form", () => {
  it("Form should support style", () => {
    const styleForm = mount(
      <Form style={{ marginBottom: 12 }}>
        <FormItem name="age">
          <Input />
        </FormItem>
      </Form>
    );
    expect(styleForm.find(".yimi-form").prop("style")).toEqual({
      marginBottom: 12,
    });
  });
  it("Form should support colon", () => {
    const form = mount(
      <Form colon>
        <FormItem name="age" label="age">
          <Input />
        </FormItem>
      </Form>
    );
    expect(
      form.find('FormItem[name="age"] .yimi-form-item-label').prop("className")
    ).toContain("colon");
  });
  it("Form should support inline", () => {
    const form = mount(
      <Form inline>
        <FormItem name="age" label="age">
          <Input />
        </FormItem>
      </Form>
    );
    expect(
      form.find('FormItem[name="age"] .yimi-form-item').prop("className")
    ).toContain("inline");
  });
  it("Form should support full", () => {
    const form = mount(
      <Form full>
        <FormItem name="age" label="age">
          <Input />
        </FormItem>
      </Form>
    );
    expect(
      form.find('FormItem[name="age"] .yimi-form-item').prop("className")
    ).toContain("full");
  });
  it("Form should support full", () => {
    const form = mount(
      <Form full>
        <FormItem name="age" label="age">
          <Input />
        </FormItem>
      </Form>
    );
    expect(
      form.find('FormItem[name="age"] .yimi-form-item').prop("className")
    ).toContain("full");
  });
  it("Form should support direction", () => {
    const form = mount(
      <Form direction="horizontal">
        <FormItem name="age" label="age">
          <Input />
        </FormItem>
      </Form>
    );
    expect(
      form.find('FormItem[name="age"] .yimi-form-item').prop("className")
    ).toContain("horizontal");
  });
  it("Form should support direction", () => {
    const form = mount(
      <Form direction="horizontal">
        <FormItem name="age" label="age">
          <Input />
        </FormItem>
      </Form>
    );
    expect(
      form.find('FormItem[name="age"] .yimi-form-item').prop("className")
    ).toContain("horizontal");
  });
  it("Form should support status", () => {
    let core: Core;
    mount(
      <Form status="disabled" onMount={(c) => (core = c)}>
        <FormItem name="age" label="age">
          <Input />
        </FormItem>
      </Form>
    );
    expect(core.getStatus("age")).toEqual("disabled");
  });

  it("Form should support globalStatus", () => {
    let core: Core;
    mount(
      <Form globalStatus="disabled" onMount={(c) => (core = c)}>
        <FormItem name="age" label="age">
          <Input />
        </FormItem>
      </Form>
    );
    expect(core.getStatus("age")).toEqual("disabled");
  });
  it("Form should support value", () => {
    let core: Core;
    const value = { age: "18" };
    const form = mount(
      <Form value={value} onMount={(c) => (core = c)}>
        <FormItem name="age" label="age">
          <Input />
        </FormItem>
      </Form>
    );
    expect(core.getValues("age")).toEqual("18");
    form.setProps({ value: { age: "19" } });
    expect(core.getValues("age")).toEqual("19");
  });
  it("Form should support innerForm", () => {
    let core: Core;
    let innerCore: Core;
    let innerInnerCore: Core;
    const form = mount(
      <Form onMount={(c) => (core = c)} inline>
        <FormItem name="inner">
          <Form onMount={(c) => (innerCore = c)}>
            <FormItem name="inner-item">
              <Input />
            </FormItem>
            <FormItem name="inner-inner">
              <Form
                onMount={(c) => (innerInnerCore = c)}
                className="innerInner"
              >
                <FormItem
                  name="inner-inner-item"
                  className="innerInnerItem"
                  validateConfig={{ required: true }}
                >
                  <Input />
                </FormItem>
              </Form>
            </FormItem>
          </Form>
        </FormItem>
      </Form>
    );
    // 内部Form全局状态
    core.setGlobalStatus("disabled");
    expect(innerCore.getStatus("inner-item")).toEqual("disabled");
    // 设置值
    core.setValues({
      inner: { "inner-inner": { "inner-inner-item": "init" } },
    });
    // 内部Form core获取值
    setTimeout(() => {
      expect(innerInnerCore.getValues("inner-inner-item")).toEqual("init");
    });
    // 内部Form继承外部Form属性
    expect(
      form.find("Form .yimi-form .innerInner").hostNodes().prop("className")
    ).toContain("inline");
    // 内部Form校验
    core.validate();
    form.update();
    expect(
      form.find(".innerInnerItem").hostNodes().find(".yimi-form-item-error")
        .length
    ).toBe(1);
    // 外部重置，内部清空
    core.reset();
    expect(innerInnerCore.getValues("inner-inner-item")).toEqual(null);
  });
});
