"use strict";

// main.js
import { QuoteManager } from "./components/QuoteManager.js";

window.addEventListener("load", async () => {
  console.log("window loaded");

  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  const quoteManager = new QuoteManager(apiUrl);
  try {
    await quoteManager.initialize();
  } catch (error) {
    console.error(error);
    window.removeEventListener("load", loadEventListener);
  }
});

const loadEventListener = async () => {
  console.warn("window load event listener removed");
  window.removeEventListener("load", loadEventListener);
};

// window.addEventListener("load", loadEventListener);
