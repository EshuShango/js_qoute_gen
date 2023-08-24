"use strict";

import { toggleLoadSpinner } from "../../utils/spinner";
import { toggleXbtn } from "../../utils/toggleBtn.js";

/**
 * @file This file contains the QuoteManager class module which is responsible for fetching quotes from an API, displaying them on the page,
 * @module QuoteManager
 * @method `getQuotes()`
 * @method `getNewQuote()`
 * @summary The QuoteManager class has two methods: `getQuotes()` and `getNewQuote()`.
 * `getQuotes()` fetches the quotes from the API and stores them in a variable for future use.
 * `getNewQuote()` gets a new quote from the API quotes array and displays it on the page. It also handles the click event for fetching a new quote and applies styling based on the quote's length.
 * @param {string} apiUrl - Accepts a string as a parameter. The string is the URL of the API to fetch the quotes from.
 * @exports QuoteManager
 */
export class QuoteManager {
  constructor(apiUrl = String()) {
    if (typeof apiUrl !== "string" || apiUrl.trim() === "")
      console.warn(
        "Warning: Invalid or empty apiUrl provided to QuoteManager constructor. Using default apiUrl."
      );

    this.apiUrl = apiUrl;
    this.quotesFromApi = [];
  }

  /**
   * This async function fetches the quotes from the API and stores them in a variable for future use.
   * @async
   * @param {void} - This function does not accept any parameters.
   * @returns {Array} - An array of quotes fetched from the API.
   */
  async getQuotes() {
    toggleLoadSpinner(true);

    const apiUrl = this.apiUrl;
    try {
      const apiRes = await fetch(apiUrl);
      this.quotesFromApi = await apiRes.json();

      this.getNewQuote();

      return this.quotesFromApi;

      // console.table(quotesFromApi ); --to see data in table format
    } catch (error) {
      console.warn("Failed to fetch quotes:", error);
      return null;
    } finally {
      toggleLoadSpinner(false);
    }
  }

  /**
   * This function selects a new quote from the `quotesFromApi` array and displays it on the page.
   * @param {void} - This function does not accept any parameters.
   */
  getNewQuote() {
    const quoteTxt = document.getElementById("quote");
    const authorTxt = document.getElementById("author");
    const newQuoteBtn = document.getElementById("new-quote");

    const randoQuote = Math.floor(Math.random() * this.quotesFromApi.length);

    const quote = this.quotesFromApi[randoQuote];

    !quote.author
      ? (authorTxt.textContent = "Unknown")
      : (authorTxt.textContent = quote.author);

    quote.text.length > 120
      ? quoteTxt.classList.add("long-quote")
      : quoteTxt.classList.remove("long-quote");

    authorTxt.textContent = quote.author;
    quoteTxt.textContent = quote.text;

    newQuoteBtn.addEventListener("click", this.getNewQuote.bind(this));
    newQuoteBtn.removeEventListener("click", this.getNewQuote.bind(this));

    return;
  }

  /**
   * Initializes the `QuoteManager` class by fetching the quotes from the API and displaying the first quote.
   * @async
   * @param {void} - This function does not accept any parameters.
   */
  async init() {
    try {
      await this.getQuotes();
      console.log("Quotes fetched successfully");

      this.getNewQuote();
      toggleXbtn(this.apiUrl);
    } catch (error) {
      console.warn("Failed to initialize QuoteManager:", error);
    }
  }
}
