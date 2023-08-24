"use strict";

import toggleLoadSpinner from "../../utils/spinner";

/**
 * @file This file contains the QuoteManager class module which is responsible for fetching quotes from an API, displaying them on the page, and allowing the user to tweet them.
 * @module QuoteManager
 * @summary The QuoteManager class has three methods:
 * getQuotes(), getNewQuote(), and tweetQuote().
 * getQuotes() fetches the quotes from the API and stores them in a variable for future use.
 * getNewQuote() gets a new quote from the API quotes array and displays it on the page. It also handles the click event for fetching a new quote and applies styling based on the quote's length.
 * tweetQuote() constructs a Twitter URL with the current quote and author, then opens that URL in a new window, allowing the user to tweet the quote.
 * @requires toggleLoadSpinner function from "../../utils/spinner"
 * @exports QuoteManager
 */
export class QuoteManager {
  constructor(apiUrl = String()) {
    this.apiUrl = apiUrl;
    this.quotesFromApi = [];
  }

  /**
   * @description This async function fetches the quotes from the API and stores them in a variable for future use.
   * @async
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
  @description This function selects a new quote from the `quotesFromApi` array and displays it on the page.  
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
   * @description This function constructs a Twitter URL with the current quote and author, then opens that URL in a new window, allowing the user to tweet the quote.
   */
  tweetQuote() {
    const quoteTxt = document.getElementById("quote");
    const authorTxt = document.getElementById("author");
    const tweetBtn = document.getElementById("twitter");

    const twitterUrl = `https://twitter.com/intent/tweet?text="${quoteTxt.textContent}" - ${authorTxt.textContent}`;

    window.open(twitterUrl, "_blank");

    tweetBtn.addEventListener("click", this.tweetQuote.bind(this));

    tweetBtn.removeEventListener("click", this.tweetQuote.bind(this));
    return;
  }

  /**
   * @description This async function initializes the `QuoteManager` class by fetching the quotes from the API and displaying the first quote.
   * @async
   */
  async initialize() {
    try {
      await this.getQuotes();
      console.log("Quotes fetched successfully");

      this.getNewQuote();
      this.tweetQuote();
    } catch (error) {
      console.warn("Failed to initialize QuoteManager:", error);
    }
  }
}
