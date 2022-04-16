import React from "react";
import { ArrayTable, ArrayAction } from "../src";
import { Form, FormItem, Core } from "../../yimi-form/src";
import { mount } from "enzyme";
import { Input } from "../../yimi-components-antd-v4";
import { Button } from "antd";

describe("ArrayTable", () => {
  it("ArrayTable methods", () => {
    let core: Core;
    const form = mount(
      <Form onMount={(c) => (core = c)}>
        <FormItem name="table">
          <ArrayTable
            rowCoreConfig={{
              values: { name: "xiaoming" },
            }}
            bottom={
              <ArrayAction>
                {({ addBottom, addTop }) => {
                  return (
                    <div>
                      <Button className="addBottom" onClick={() => addBottom()}>
                        addBottom
                      </Button>
                      <Button className="addTop" onClick={() => addTop()}>
                        addTop
                      </Button>
                    </div>
                  );
                }}
              </ArrayAction>
            }
            tableConfig={{
              rowKey: "id",
              columns: [
                {
                  dataIndex: "name",
                  title: "name",
                  render: () => {
                    return (
                      <FormItem name="name">
                        <Input />
                      </FormItem>
                    );
                  },
                },
                {
                  dataIndex: "opr",
                  title: "opr",
                  render: (t, v) => {
                    return (
                      <>
                        <ArrayAction>
                          {({ insertAfter }) => {
                            return (
                              <div>
                                <Button
                                  onClick={() => {
                                    insertAfter(v.id);
                                  }}
                                >
                                  insertAfter
                                </Button>
                              </div>
                            );
                          }}
                        </ArrayAction>
                      </>
                    );
                  },
                },
              ],
            }}
          />
        </FormItem>
      </Form>
    );
    form.find("Button .addBottom").simulate("click");
    expect(core.getValues("table").length).toEqual(1);
    expect(core.getValues("table")[0]["name"]).toEqual("xiaoming");
    form.find("Button .addTop").simulate("click");
    expect(core.getValues("table").length).toEqual(2);
  });
  it("ArrayTable should support setValues", () => {
    let core: Core;
    const form = mount(
      <Form onMount={(c) => (core = c)}>
        <FormItem name="table">
          <ArrayTable
            tableConfig={{
              columns: [
                {
                  dataIndex: "name",
                  title: "name",
                  render: () => {
                    return (
                      <FormItem name="name">
                        <Input />
                      </FormItem>
                    );
                  },
                },
              ],
            }}
          />
        </FormItem>
      </Form>
    );
    core.setValues({
      table: [{ name: "xiaoming", key: "xiaoming" }],
    });
    form.update();
    expect(form.find(".ant-input").prop("value")).toBe("xiaoming");
    core.setValues({
      table: [],
    });
    form.update();
    expect(form.find(".ant-input").length).toBe(0);
  });
});
