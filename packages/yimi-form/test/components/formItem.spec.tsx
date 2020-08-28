import React from "react";
import { Form, FormItem, Core } from "../../src";
import { mount } from "enzyme";
import { Input } from "../../../yimi-components-antd-v4/lib";

describe("Basic component FormItem", () => {
  it("FormItem should support style", () => {
    const styleForm = mount(
      <Form>
        <FormItem name="age" style={{ marginBottom: 12 }}>
          <Input />
        </FormItem>
      </Form>
    );
    expect(
      styleForm.find(".yimi-form").find(".yimi-form-item").prop("style")
    ).toEqual({
      marginBottom: 12,
    });
  });
  it("FormItem should support label", () => {
    const form = mount(
      <Form>
        <FormItem name="age" label="age">
          <Input />
        </FormItem>
      </Form>
    );
    expect(
      form
        .find(".yimi-form")
        .find(".yimi-form-item")
        .find(".yimi-form-item-label")
        .render()
        .text()
    ).toEqual("age");
  });
  it("FormItem should support defaultValue & value", () => {
    let core;
    mount(
      <Form onMount={(c) => (core = c)}>
        <FormItem name="age" label="age" defaultValue={12}>
          <Input />
        </FormItem>
        <FormItem name="name" label="name" defaultValue="xiaoming">
          <Input />
        </FormItem>
      </Form>
    );
    expect(core.getValues()).toEqual({ age: 12, name: "xiaoming" });
  });

  it("FormItem should support status", () => {
    let core;
    mount(
      <Form onMount={(c) => (core = c)}>
        <FormItem name="age" status="preview">
          <Input />
        </FormItem>
      </Form>
    );
    expect(core.getStatus()).toEqual({ age: "preview" });
  });

  it("FormItem should support props", () => {
    const form = mount(
      <Form>
        <FormItem name="age" props={{ placeholder: "age" }}>
          <Input />
        </FormItem>
      </Form>
    );
    expect(form.find(".ant-input").prop("placeholder")).toEqual("age");
  });
  it("FormItem should support  funcProps", () => {
    let core: Core;
    const form = mount(
      <Form onMount={(c) => (core = c)}>
        <FormItem name="placeholder">
          <Input />
        </FormItem>
        <FormItem
          name="age"
          props={(core, placeholder) => ({
            placeholder: placeholder,
          })}
        >
          <Input />
        </FormItem>
      </Form>
    );
    expect(
      form.find("FormItem[name='age'] .ant-input").prop("placeholder")
    ).toEqual(null);
    core.setValues({ placeholder: "input" });
    form.update();
    expect(
      form.find("FormItem[name='age'] .ant-input").prop("placeholder")
    ).toEqual("input");
  });
  it("FormItem should support show & funcStatus", () => {
    let core: Core;
    const form = mount(
      <Form onMount={(c) => (core = c)}>
        <FormItem name="showDep">
          <Input />
        </FormItem>
        <FormItem name="statusDep">
          <Input />
        </FormItem>
        <FormItem
          name="show"
          show={(core, showDep) => showDep === "show"}
          status={(core, statusDep) => statusDep || "disabled"}
        >
          <Input />
        </FormItem>
      </Form>
    );
    expect(form.find('FormItem[name="show"] .yimi-form-item').length).toBe(0);
    core.setStatus({ show: "edit" });
    expect(core.getStatus("show")).toEqual("hidden");
    core.setValues({ showDep: "show" });
    form.update();
    // 当动态status，从隐藏到显示时的状态需要保持正确
    expect(core.getStatus("show")).toEqual("disabled");
    expect(form.find('FormItem[name="show"] .yimi-form-item').length).toBe(1);
    core.setValues({ statusDep: "edit" });
    expect(core.getStatus("show")).toEqual("edit");
  });

  it("FormItem should support view ", () => {
    let core: Core;
    const form = mount(
      <Form onMount={(c) => (core = c)}>
        <FormItem name="viewDep">
          <Input />
        </FormItem>
        <FormItem
          name="view"
          view={(core, viewDep) => {
            if (viewDep === "input") {
              return (
                <FormItem name="view">
                  <Input />
                </FormItem>
              );
            } else {
              return null;
            }
          }}
        />
      </Form>
    );
    expect(form.find(".yimi-form-item").length).toEqual(1);
    core.setValues({ viewDep: "input" });
    form.mount();
    // 显示测试
    expect(form.find(".yimi-form-item").length).toEqual(2);
    core.setValues({
      view: "view",
    });
    expect(core.getValues()).toEqual({ viewDep: "input", view: "view" });
    core.setValues({ viewDep: "other" });
    // 消失值需要删除测试
    form.mount();
    expect(core.getValues()).toEqual({ viewDep: "other" });
  });
  it("FormItem should support validateConfig", () => {
    let core: Core;
    const form = mount(
      <Form onMount={(c) => (core = c)}>
        <FormItem
          name="age"
          label="age"
          validateConfig={{ required: true, message: "必填" }}
        >
          <Input />
        </FormItem>
        <FormItem
          name="name"
          label="name"
          validateConfig={(val, core) => {
            return val.age === "18" ? { required: true } : {};
          }}
        >
          <Input />
        </FormItem>
      </Form>
    );
    expect(
      form
        .find('FormItem[name="age"]')
        .find(".yimi-form-item-label")
        .prop("className")
    ).toContain("required");
    expect(
      form
        .find('FormItem[name="name"]')
        .find(".yimi-form-item-label")
        .prop("className")
    ).not.toContain("required");
    core.validate();
    expect(core.getError()).toEqual({ age: "必填" });
    form.mount();
    expect(form.find(".yimi-form-item-error").render().text()).toEqual("必填");
    // 设置值之后 添加required标记
    core.setValues({ age: "18" });
    form.mount();
    expect(
      form
        .find('FormItem[name="name"]')
        .find(".yimi-form-item-label")
        .prop("className")
    ).toContain("required");
  });

  it("FormItem should support colon", () => {
    const form = mount(
      <Form colon={false}>
        <FormItem name="age" colon label="age">
          <Input />
        </FormItem>
      </Form>
    );
    // FormItem > Form
    expect(
      form
        .find('FormItem[name="age"]')
        .find(".yimi-form-item-label")
        .prop("className")
    ).toContain("colon");
  });

  it("FormItem should support inline", () => {
    const form = mount(
      <Form inline={false}>
        <FormItem name="age" inline label="age">
          <Input />
        </FormItem>
      </Form>
    );
    // FormItem > Form
    expect(
      form
        .find('FormItem[name="age"]')
        .find(".yimi-form-item")
        .prop("className")
    ).toContain("inline");
  });

  it("FormItem should support full", () => {
    const form = mount(
      <Form full={false}>
        <FormItem name="age" full label="age">
          <Input />
        </FormItem>
      </Form>
    );
    // FormItem > Form
    expect(
      form
        .find('FormItem[name="age"]')
        .find(".yimi-form-item")
        .prop("className")
    ).toContain("full");
  });

  it("FormItem should support direction", () => {
    const form = mount(
      <Form direction="horizontal">
        <FormItem name="age" label="age" direction="vertical">
          <Input />
        </FormItem>
      </Form>
    );
    // FormItem > Form
    expect(
      form
        .find('FormItem[name="age"]')
        .find(".yimi-form-item")
        .prop("className")
    ).toContain("vertical");
  });

  it("FormItem should support className", () => {
    const form = mount(
      <Form>
        <FormItem name="age" className="item-age">
          <Input />
        </FormItem>
      </Form>
    );
    // FormItem > Form
    expect(
      form
        .find('FormItem[name="age"]')
        .find(".yimi-form-item")
        .prop("className")
    ).toContain("item-age");
  });
});
