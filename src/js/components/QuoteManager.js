"use strict";
// QuoteManager.js
import toggleLoadSpinner  from "../../utils/spinner";

export class QuoteManager  {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
    this.quotesFromApi = [];
  }

  //& Get Quotes From API
  /**
   * @description This async function fetches the quotes from the API and stores them in a variable for future use. Also calls the getNewQuote() to display a quote.
   * @async
   */
  async getQuotes() {
    // console.log("🪀", "🪀");
    toggleLoadSpinner(true);
    // //store the api url in a variable called apiUrl
    const apiUrl =
      "https://jacintodesign.github.io/quotes-api/data/quotes.json";
    // try {
      // store the response in a variable called response
      const response = await fetch(apiUrl);
      // store the data in a variable called quotesFromApi , response.json() is a promise so we need to await it and store it in a variable called quotesFromApi
      this.quotesFromApi = await response.json();
      // you can use console.log to see the data in the console,
      // you can also use console.table to see the data in a table format
      // console.table(quotesFromApi );
    // } catch (error) {
    //   // catch any errors and log them to the console
    //   console.warn("Whoops, no quote", error);
    // } finally {
    //   getNewQuote();
      toggleLoadSpinner(false);
    // }
  }
  //&
  /**
  @description This function shows and hides the loading spinner as needed, it also gets a new quote from the API quotes array and displays it on the page.  It also handles the click event for fetching a new quote and applies styling based on the quote's length.
  */
  async getNewQuotes() {
    // toggleLoadSpinner(true);

    // var for the quote and author text elements,new quote button
    const quoteTxt = document.getElementById("quote");
    const authorTxt = document.getElementById("author");
    const newQuoteBtn = document.getElementById("new-quote");
    // get a random number between 0 and the length of the data array, essentially a random index number or random quote
  
    const randomNum = Math.floor(Math.random() * this.quotesFromApi.length);
 
    //Picks a random quote from the quotesFromApi  array
    const quote = this.quotesFromApi[randomNum];
   
    // check if author field is blank and replace it with unknown
    !quote.author
    ? (authorTxt.textContent = "Unknown")
    : (authorTxt.textContent = quote.author);
    // console.log("🦫");
    // check quote length to determine styling for long quotes
    quote.text.length > 120
      ? quoteTxt.classList.add("long-quote")
      : quoteTxt.classList.remove("long-quote");

  
    authorTxt.textContent = quote.author;
    quoteTxt.textContent = quote.text;
    // Event Listener
    newQuoteBtn.addEventListener("click", this.getNewQuotes.bind(this));

    // toggleLoadSpinner(false);
   
  };
  //&
  /**
   * @description This function constructs a Twitter URL with the current quote and author, then opens that URL in a new window, allowing the user to tweet the quote.
   */
   async tweetQuote(){
    const quoteTxt = document.getElementById("quote"); // The quote text element
    const authorTxt = document.getElementById("author"); // The author text element
    const tweetBtn = document.getElementById("twitter"); // The Twitter button element
  
    const twitterUrl = `https://twitter.com/intent/tweet?text="${quoteTxt.textContent}" - ${authorTxt.textContent}`; // The Twitter URL constructed with the quote and author text
    window.open(twitterUrl, "_blank"); // Opens the Twitter URL in a new window
    tweetBtn.addEventListener("click", this.tweetQuote.bind(this)); // Adds a click event listener to the Twitter button
    // tweetQuote();
  };

  async initialize() {
    await this.getQuotes();
    await this.getNewQuotes();
    
    console.log("🪀", "🪀");
    await this.tweetQuote();
  }
} // end of QuoteManager class
