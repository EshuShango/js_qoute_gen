"use strict";
// spinner.js

//&
/**
 * Toggles the visibility of the loading spinner and quote container elements.
 * @param {boolean} show - Whether to show or hide the loading spinner element.
 */
export default function toggleLoadSpinner(show) {
  const quoteContainerEl = document.getElementById("quote-container");
  const loaderEl = document.getElementById("loaderEl");
  loaderEl.hidden = !show;
  quoteContainerEl.hidden = show;
  console.log(show ? "Showing loaderEl..." : "Removing loaderEl...");
  console.log("loaderEl element:", loaderEl);
  console.log("Quote container element isHidden:", quoteContainerEl.hidden);
}
