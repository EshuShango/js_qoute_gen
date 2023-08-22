"use strict";

window.addEventListener("load", () => {
  console.log("window loaded");
});

// Global var
let quotesFromApi = [];

//&
/**
 * @description This function shows the loading spinner by un-hiding the loader element and hiding the quote container element. It assumes that the loader and quote container elements are accessible within the scope of this function.
 */
const showLoadSpinner = () => {
  const quoteContainerEl = document.getElementById("quote-container");
  const loaderEl = document.getElementById("loaderEl");
  console.log("Showing loaderEl...");
  console.log("loaderEl element:", loaderEl);
  console.log("Quote container element isHidden:", quoteContainerEl);
  loaderEl.hidden = false;
  quoteContainerEl.hidden = true;
};

//&
/**
 *  @description This function hides the loading spinner and shows the quote container. It assumes that the loader and quote container elements are accessible within the scope of this function.
 */
const removeLoadSpinner = () => {
  const quoteContainerEl = document.getElementById("quote-container");
  const loaderEl = document.getElementById("loaderEl");
  console.log("Removing loaderEl...");
  console.log("loaderEl element:", loaderEl);
  console.log("Quote container element !isHidden:", quoteContainerEl.hidden);
  loaderEl.hidden = true;
  quoteContainerEl.hidden = false;
};

//&
/**
@description This function shows and hides the loading spinner as needed, it also gets a new quote from the API quotes array and displays it on the page.  It also handles the click event for fetching a new quote and applies styling based on the quote's length.
*/
const getNewQuote = () => {
  // Show loader before quote is loaded
  showLoadSpinner();
  // var for the quote and author text elements,new quote button
  const quoteTxt = document.getElementById("quote");
  const authorTxt = document.getElementById("author");
  const newQuoteBtn = document.getElementById("new-quote");
  // get a random number between 0 and the length of the data array, essentially a random index number or random quote
  const randomNum = Math.floor(Math.random() * quotesFromApi.length);
  //Picks a random quote from the quotesFromApi  array
  const quote = quotesFromApi[randomNum];
  // check if author field is blank and replace it with unknown
  !author
    ? (authorTxt.textContent = "Unknown")
    : (authorTxt.textContent = quote.author);
  // check quote length to determine styling for long quotes
  quote.text.length > 120
    ? quoteTxt.classList.add("long-quote")
    : quoteTxt.classList.remove("long-quote");

  console.table(quote);
  authorTxt.textContent = quote.author;
  quoteTxt.textContent = quote.text;
  // Event Listener
  newQuoteBtn.addEventListener("click", getNewQuote);
  // Remove loader once quote is loaded
  removeLoadSpinner();
};

//& Get Quotes From API
/**
 * @description This async function fetches the quotes from the API and stores them in a variable for future use. Also calls the getNewQuote() to display a quote.
 * @async
 */
const getQuotes = async () => {
  console.log("🪀", "🪀");
  // showLoadSpinner();
  //store the api url in a variable called apiUrl
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    // store the response in a variable called response
    const response = await fetch(apiUrl);
    // store the data in a variable called quotesFromApi , response.json() is a promise so we need to await it and store it in a variable called quotesFromApi
    quotesFromApi = await response.json();
    // you can use console.log to see the data in the console,
    // you can also use console.table to see the data in a table format
    // console.table(quotesFromApi );
    // removeLoadSpinner();
    // throw new Error("Whoops");
  } catch (error) {
    // getNewQuote();
    // getQuotes();
    console.warn("Whoops, no quote", error);
  } finally {
    getNewQuote();
    // removeLoadSpinner();
  }
};

//&
/**
 * @description This function constructs a Twitter URL with the current quote and author, then opens that URL in a new window, allowing the user to tweet the quote.
 */
const tweetQuote = () => {
  const quoteTxt = document.getElementById("quote"); // The quote text element
  const authorTxt = document.getElementById("author"); // The author text element
  const tweetBtn = document.getElementById("twitter"); // The Twitter button element

  const twitterUrl = `https://twitter.com/intent/tweet?text="${quoteTxt.textContent}" - ${authorTxt.textContent}`; // The Twitter URL constructed with the quote and author text
  window.open(twitterUrl, "_blank"); // Opens the Twitter URL in a new window
  tweetBtn.addEventListener("click", tweetQuote); // Adds a click event listener to the Twitter button
};
tweetQuote();

// On Load
getQuotes();

// const createQuoteManager = () => {
//   let quotesFromApi = [];

//   getQuotes();
//   getNewQuote();
//   tweetQuote();
//   return {
//     getQuotes,
//     getNewQuote,
//     tweetQuote,
//   };
// };

// const quoteManager = createQuoteManager();
// quoteManager.getQuotes();
// quoteManager.getNewQuote();
// quoteManager.tweetQuote();
