import { describe, beforeEach, afterEach, document, test } from "vitest";

import toggleLoadSpinner from "../utils/index";

// describe("toggleLoadSpinner", () => {
//   let quoteContainerEl;
//   let loaderEl;

//   beforeEach(() => {
//     // Setup the HTML elements
//     quoteContainerEl = document.createElement("div");
//     quoteContainerEl.id = "quote-container";
//     loaderEl = document.createElement("div");
//     loaderEl.id = "loaderEl";

//     document.body.appendChild(quoteContainerEl);
//     document.body.appendChild(loaderEl);
//   });

//   afterEach(() => {
//     // Clean up the HTML elements
//     document.body.removeChild(quoteContainerEl);
//     document.body.removeChild(loaderEl);
//   });

//   test("should show the loader and hide the quote container when show is true", () => {
//     toggleLoadSpinner(true);
//     expect(loaderEl.hidden).toBe(false);
//     expect(quoteContainerEl.hidden).toBe(true);
//   });

//   test("should hide the loader and show the quote container when show is false", () => {
//     toggleLoadSpinner(false);
//     expect(loaderEl.hidden).toBe(true);
//     expect(quoteContainerEl.hidden).toBe(false);
//   });
// });
