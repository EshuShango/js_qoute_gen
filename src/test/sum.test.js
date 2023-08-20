//test
import { expect, test } from "vitest";
import { sum } from "../js/sum.js";

//* Test is working for associated function
// test("adds 1 + 2 to equal 3", () => {
//   expect(sum(1, 2)).toBe(3);
// });

//! Test isn't working
test("sum adds two numbers", ({ assert }) => {
  assert.is(sum(1, 2), 3);
  assert.is(sum(0, 0), 0);
  assert.is(sum(-1, 1), 0);
});

test("sum handles non-numeric input", ({ assert }) => {
  console.warn = () => {}; // suppress console warnings
  assert.is(sum("1", 2), NaN);
  assert.is(sum(1, "2"), NaN);
  assert.is(sum("1", "2"), NaN);
});

test("sum warns when input is undefined", ({ assert }) => {
  console.warn = () => {}; // suppress console warnings
  assert.is(sum(), undefined);
  assert.is(sum(1), undefined);
  assert.is(sum(undefined, 2), undefined);
});