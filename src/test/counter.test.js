
import {expect, test, describe,  beforeEach, afterEach, } from "vitest";
import { setupCounter } from "../js/counter";

//! Test isn't working
describe("setupCounter", () => {
  let el;

  beforeEach(() => {
    el = document.createElement("div");
  });

  afterEach(() => {
    el = null;
  });

  test("should set counter to 0 on initialization", () => {
    setupCounter(el);
    expect(el.innerHTML).toBe("count is 0");
  });

  test("should increment counter on click", async () => {
    setupCounter(el);
    el.click();
    await Promise.resolve(); // Wait for the next tick of the event loop
    expect(el.innerHTML).toBe("count is 1");
    el.click();
    await Promise.resolve(); // Wait for the next tick of the event loop
    expect(el.innerHTML).toBe("count is 2");
  });

  // test("should increment counter on click", () => {
  //   setupCounter(el);
  //   el.click();
  //   expect(el.innerHTML).toBe("count is 1");
  //   el.click();
  //   expect(el.innerHTML).toBe("count is 2");
  // });

  test("should not set up counter if element is not provided", () => {
    setupCounter(null);
    expect(el.innerHTML).toBe("");
  });
});