"use strict";

const quoteContainer = document.getElementById("quote-container");
// const loader = document.getElementById("loader");
// const quoteTxt = document.getElementById("quote");
// const authorTxt = document.getElementById("author");
const xTwitterBtn = document.getElementById("twitter");
// const newQuoteBtn = document.getElementById("new-quote");

let apiQuotes = [];

//& Show Loading Spinner
/** 
 * @description this function shows the loading spinner
 * @param {string} loader - The loader
 * @param {string} quoteContainer - The quote container
 */
const showLoadSpinner = () => {
  const loader = document.getElementById("loader");
  loader.hidden = false;
  quoteContainer.hidden = true;
};

//& Hide Loading Spinner
/** 
 * @description this function hides the loading spinner
 * @param {string} loader - The loader
 * @param {string} quoteContainer - The quote container
 */
const removeLoadSpinner = () => {
  const loader = document.getElementById("loader");
  !loader.hidden ? (quoteContainer.hidden = false) : (loader.hidden = true);
};

//& Show New Quote
/**
 * @description Get Quotes From API
 * @returns {Promise<void>}
 * @async
 * @param {string} apiUrl - The API URL
 * @param {string} response - The API response
 * @param {string} data - The API data
 * @param {string} randomNum - The random number
 * @param {string} quote - The quote
 * @param {string} author - The author
 * @param {string} text - The text
 * @param {string} quoteElement - The quote element
 * @param {string} authorElement - The author element
 * @param {string} error - The error
 */
const newQuote = () => {
  // showLoadSpinner();
  const quoteTxt = document.getElementById("quote");
  const authorTxt = document.getElementById("author");
  const newQuoteBtn = document.getElementById("new-quote");
  // get a random number between 0 and the length of the data array, essentially a random index number or random quote
  //* Picks a random quote from the apiQuotes array
  const randomNum = Math.floor(Math.random() * apiQuotes.length);
  const quote = apiQuotes[randomNum];
  // check if author field is blank and replace it with unknown
  !author
    ? (authorTxt.textContent = "Unknown")
    : (authorTxt.textContent = quote.author);
  // check quote length to determine styling
  quote.text.length > 120
    ? quoteTxt.classList.add("long-quote")
    : quoteTxt.classList.remove("long-quote");
  // removeLoadSpinner();
  console.table(quote);
  authorTxt.textContent = quote.author;
  quoteTxt.textContent = quote.text;
  // Event Listener
  newQuoteBtn.addEventListener("click", newQuote);
  // removeLoadSpinner();
};

//& Get Quotes From API
/**
 * @description this function gets the quotes from the API
 * @async
 * @param {string} apiUrl - The API URL
 * @param {string} response - The API response
 * @param {string} apiQuotes - The API quotes
 * @param {function} newQuote - The new quote function
 */
const getQuotes = async () => {
  // loading();

  // const apiUrl = "https://type.fit/api/quotes";
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    // store the response in a variable called response
    const response = await fetch(apiUrl);
    // store the data in a variable called apiQuotes, response.json() is a promise so we need to await it and store it in a variable called apiQuotes
    apiQuotes = await response.json();
    // you can use console.log to see the data in the console,
    // you can also use console.table to see the data in a table format
    // console.table(apiQuotes);
    newQuote();
  } catch (error) {
    console.warn("Whoops, no quote", error);
  }
};

//& Tweet Quote
/**
 * @description this function tweets the quote
 * @param {string} quoteTxt - The quote text
 * @param {string} authorTxt - The author text
 * @param {string} twitterUrl - The twitter URL
 */
const tweetQuote = () => {
  const quoteTxt = document.getElementById("quote");
  const authorTxt = document.getElementById("author");

  // const xTwitterBtn = document.getElementById("twitter");
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteTxt.textContent} - ${authorTxt.textContent}`;
  window.open(twitterUrl, "_blank");
};
// Event Listeners
xTwitterBtn.addEventListener("click", tweetQuote);
// newQuoteBtn.addEventListener("click", newQuote);

// On Load
getQuotes();
// showLoadSpinner();
