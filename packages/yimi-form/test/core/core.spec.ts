import { Status } from "./../../src/core/core";
import Core from "../../src/core/core";

describe("core/form basic function", () => {
  let core: Core;
  beforeEach(() => {
    core = new Core({});
  });
  it("constructor values", () => {
    const values = { x: 1 };
    const valuesCore = new Core({ values });
    expect(valuesCore.getValues()).toEqual(values);
    expect(valuesCore.getValues("x")).toEqual(values.x);
    valuesCore.setValues({ x: 2 });
    expect(valuesCore.getValues()).toEqual({ x: 2 });
    expect(valuesCore.getValues("x")).toEqual(2);
  });
  it("constructor status", () => {
    const status = { x: "preview" as Status };
    const valuesCore = new Core({ status });
    expect(valuesCore.getStatus()).toEqual(status);
    expect(valuesCore.getStatus("x")).toEqual(status.x);
    valuesCore.setValues({ x: 2 });
    expect(valuesCore.getStatus()).toEqual({ x: "preview" });
    expect(valuesCore.getStatus("x")).toEqual("preview");
  });
  it("constructor initValues & core reset", () => {
    const initValues = { x: 1 };
    const core = new Core({ initValues });
    core.setValues({ x: 2 });
    core.reset();
    expect(core.getValues()).toEqual(initValues);
  });
  it("constructor globalStatus", () => {
    const core = new Core({ globalStatus: "preview" });
    expect(core.getGlobalStatus()).toEqual("preview");
    core.addChild({
      name: "x",
      form: core,
    });
    expect(core.getStatus("x")).toEqual("preview");
  });
  it("core reset items", () => {
    const values = { x: 1, y: 1 };
    const core = new Core({ values });
    core.reset(["x"]);
    expect(core.getValues()).toEqual({ y: 1, x: null });
  });
  it("core setValues", () => {
    core.setValues({ x: 1, y: 2 });
    expect(core.getValues()).toEqual({ x: 1, y: 2 });
    expect(core.getValues("x")).toEqual(1);
  });
  it("core setStatus", () => {
    core.setStatus({ x: "edit", y: "disabled" });
    expect(core.getStatus()).toEqual({ x: "edit", y: "disabled" });
    expect(core.getStatus("x")).toEqual("edit");
  });
  it("core setGlobalStatus", () => {
    core.addChild({
      name: "x",
      form: core,
    });
    core.setGlobalStatus("preview");
    expect(core.getGlobalStatus()).toEqual("preview");
    expect(core.getStatus("x")).toEqual("preview");
  });
  it("core setValuesSilent", () => {
    core.setValues({ x: 1, y: 2 });
    expect(core.getValues()).toEqual({ x: 1, y: 2 });
    expect(core.getValues("x")).toEqual(1);
  });
  it("core setProps", () => {
    core.addChild({
      name: "x",
      form: core,
    });
    core.setProps({ x: { loading: true } });
    expect(core.getProps("x")).toEqual({ loading: true });
  });
});
