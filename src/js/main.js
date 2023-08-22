"use strict";

// main.js
import { QuoteManager } from "./components/QuoteManager.js";

window.addEventListener("load", async () => {
  console.log("window loaded");

  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  const quoteManager = new QuoteManager(apiUrl);
  quoteManager.initialize();
});

window.removeEventListener("load", async () => {
  console.warn("window load event listener removed");
});
