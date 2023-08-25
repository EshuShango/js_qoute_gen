"use strict";

import  QuoteManager  from "./components/QuoteManager.js";

/**
 * Main entry point of the application.
 * Initializes the QuoteManager and loads the quotes from the API.
 *
 * @async
 * @function loadEventListener
 * @param {void} void - This function does not accept any parameters.
 * @returns {Promise<void>} - A Promise that resolves when the QuoteManager is initialized.
 */
async function loadEventListener() {
  console.log("window loaded");

  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  const quoteManager = new QuoteManager(apiUrl);
  try {
    await quoteManager.init();
  } catch (error) {
    console.error(error);
    window.removeEventListener("load", loadEventListener);
    console.warn("window load event listener removed");
  }
};

window.addEventListener("load", loadEventListener);
