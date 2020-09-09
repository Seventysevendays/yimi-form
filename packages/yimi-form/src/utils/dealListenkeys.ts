export const getFuncArgs = (func: (...args: any[]) => void) => {
  const keys = func.toString().match(/\$\w+/g) || [];
  return Array.from(new Set(keys.join(",").replace(/\$/g, "").split(",")));
};
export const mapValues = (values: { [key: string]: any }) => {
  return Object.keys(values).reduce((map, key) => {
    map[`$${key}`] = values[key];
    return map;
  }, {} as any);
};
