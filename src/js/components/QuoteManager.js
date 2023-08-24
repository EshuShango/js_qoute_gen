"use strict";
// QuoteManager.js

import toggleLoadSpinner from "../../utils/spinner";

/**
 * @file This file contains the QuoteManager class which is responsible for fetching quotes from an API, displaying them on the page, and allowing the user to tweet them.
 * @summary The QuoteManager class has three methods:
 * getQuotes(), getNewQuotes(), and tweetQuote().
 * getQuotes() fetches the quotes from the API and stores them in a variable for future use.
 * getNewQuotes() gets a new quote from the API quotes array and displays it on the page. It also handles the click event for fetching a new quote and applies styling based on the quote's length.
 * tweetQuote() constructs a Twitter URL with the current quote and author, then opens that URL in a new window, allowing the user to tweet the quote.
 * @requires toggleLoadSpinner function from "../../utils/spinner"
 * @exports QuoteManager
 */
export class QuoteManager {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
    this.quotesFromApi = [];
  }

  /**
   * @description This async function fetches the quotes from the API and stores them in a variable for future use. Also calls the getNewQuote() to display a quote.
   * @async
   */
  async getQuotes() {
    // console.log("🪀", "🪀");
    toggleLoadSpinner(true);

    const apiUrl =
      "https://jacintodesign.github.io/quotes-api/data/quotes.json";
    try {
      const response = await fetch(apiUrl);

      this.quotesFromApi = await response.json();

      // use console.table to see the data in a table format
      // console.table(quotesFromApi );
    } catch (error) {
      console.warn("Whoops, no quote", error);
    } finally {
      toggleLoadSpinner(false);
    }
  }

  /**
  @description This function shows and hides the loading spinner as needed, it also gets a new quote from the API quotes array and displays it on the page.  It also handles the click event for fetching a new quote and applies styling based on the quote's length.
  */
  async getNewQuotes() {
    const quoteTxt = document.getElementById("quote");
    const authorTxt = document.getElementById("author");
    const newQuoteBtn = document.getElementById("new-quote");

    const randomNum = Math.floor(Math.random() * this.quotesFromApi.length);

    const quote = this.quotesFromApi[randomNum];

    !quote.author
      ? (authorTxt.textContent = "Unknown")
      : (authorTxt.textContent = quote.author);

    quote.text.length > 120
      ? quoteTxt.classList.add("long-quote")
      : quoteTxt.classList.remove("long-quote");

    authorTxt.textContent = quote.author;
    quoteTxt.textContent = quote.text;

    newQuoteBtn.addEventListener("click", this.getNewQuotes.bind(this));
    newQuoteBtn.removeEventListener("click", this.getNewQuotes.bind(this));

    return;
  }

  /**
   * @description This function constructs a Twitter URL with the current quote and author, then opens that URL in a new window, allowing the user to tweet the quote.
   */
  async tweetQuote() {
    const quoteTxt = document.getElementById("quote");
    const authorTxt = document.getElementById("author");
    const tweetBtn = document.getElementById("twitter");

    const twitterUrl = `https://twitter.com/intent/tweet?text="${quoteTxt.textContent}" - ${authorTxt.textContent}`;
    window.open(twitterUrl, "_blank");

    tweetBtn.addEventListener("click", this.tweetQuote.bind(this));

    tweetBtn.removeEventListener("click", this.tweetQuote.bind(this));
    return;
  }

  async initialize() {
    await this.getQuotes();
    await this.getNewQuotes();
    await this.tweetQuote();
  }
}
