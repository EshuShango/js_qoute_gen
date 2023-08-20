"use strict";
// export function sum(a=0, b=0) {
//   return a + b;
// }

export const sum = (a = 0, b = 0) => {
  const result = a + b;
  a !== Number(a) || b !== Number(b)
    ? console.warn("NaN: Not a Number! Please use digits!")
    : () => {};

  result === 0 ? console.warn("undefined: Please add a Number!") : () => {};

  return result;
};
