export const debounce = (action: Function, debounce: number) => {
  let timer: number;

  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      action(...args);
    }, debounce);
  };
};
