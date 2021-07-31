import controls from "./generated";

export const hasControls = (id: string): boolean => {
  return controls.has(id);
};
