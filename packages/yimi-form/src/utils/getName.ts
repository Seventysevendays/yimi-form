const getName = () => "__" + Math.random().toString(36).slice(2) + "__";
export const matchName = (name: string) => /^__.+__$/.test(name);
export default getName;
