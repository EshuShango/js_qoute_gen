"use strict";
export const setupCounter = (el) => {
  let counter = 0;
  if (!el) return;
  const setCounter = (count) => {
    counter = count;

    el.innerHTML = `count is ${counter}`;
  };
  el.addEventListener("click", () => setCounter(counter + 1));
  setCounter(0);
};
