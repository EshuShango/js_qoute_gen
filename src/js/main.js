"use strict";
// GLOBALS
const quoteContainerEl = document.getElementById("quote-container");
const loaderEl = document.getElementById("loaderEl");
const xTwitterBtn = document.getElementById("twitter");

let apiQuotes = [];

//&
/**
 * @description this function shows the loading spinner
 * @param {string} loaderEl - The loaderEl
 * @param {string} quoteContainerEl - The quote container
 */
const showLoadSpinner = () => {
  console.log("Showing loaderEl...")
  console.log("loaderEl element:", loaderEl);
  console.log("Quote container element isHidden:", quoteContainerEl);
  loaderEl.hidden = false;
  quoteContainerEl.hidden = true;
};

//&
/**
 * @description this function hides the loading spinner and shows the quote container
 * @param {string} loaderEl - The loaderEl
 * @param {string} quoteContainerEl - The quote container
 */
const removeLoadSpinner = () => {
  console.log("Removing loaderEl...")
  console.log("loaderEl element:", loaderEl);
  console.log("Quote container element !isHidden:", quoteContainerEl.hidden);
  loaderEl.hidden = true;
  quoteContainerEl.hidden = false;
  // !loaderEl.hidden ? (quoteContainerEl.hidden = false) : (loaderEl.hidden = true);
};

//&
/**
 * @description this function gets a new quote from the API and displays it on the page when the new quote button is clicked
 
 * @param {string} randomNum - The random number
 * @param {string} quote - The quote
 * @param {string} author - The author
 * @param {string} text - The text
 * @param {string} quoteElement - The quote element
 * @param {string} authorElement - The author element
 * @param {string} error - The error
*/
const getNewQuote = () => {
  // showLoadSpinner();
  const quoteTxt = document.getElementById("quote");
  const authorTxt = document.getElementById("author");
  const newQuoteBtn = document.getElementById("new-quote");
  // get a random number between 0 and the length of the data array, essentially a random index number or random quote
  const randomNum = Math.floor(Math.random() * apiQuotes.length);
  //Picks a random quote from the apiQuotes array
  const quote = apiQuotes[randomNum];
  // check if author field is blank and replace it with unknown
  !author
  ? (authorTxt.textContent = "Unknown")
  : (authorTxt.textContent = quote.author);
  // check quote length to determine styling for long quotes
  quote.text.length > 120
  ? quoteTxt.classList.add("long-quote")
  : quoteTxt.classList.remove("long-quote");
  
  console.log("🪀")
  console.table(quote);
  authorTxt.textContent = quote.author;
  quoteTxt.textContent = quote.text;
  // Event Listener
  newQuoteBtn.addEventListener("click", getNewQuote);
  // removeLoadSpinner();
 
};

//& Get Quotes From API
/**
 * @description this is a async/await function that gets the quotes from the API 
 * @async
 * @param {string} apiUrl - The API URL
 * @param {string} response - The API response
 * @param {string} apiQuotes - The API quotes
 * @param {function} newQuote - The new quote function
*/
const getQuotes = async () => {
  console.log("🪀","🪀")
  showLoadSpinner();
  //store the api url in a variable called apiUrl
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    // store the response in a variable called response
    const response = await fetch(apiUrl);
    // store the data in a variable called apiQuotes, response.json() is a promise so we need to await it and store it in a variable called apiQuotes
    apiQuotes = await response.json();
    // you can use console.log to see the data in the console,
    // you can also use console.table to see the data in a table format
    // console.table(apiQuotes);
    // removeLoadSpinner();
    // throw new Error("Whoops");
  } catch (error) {
    // getNewQuote();
    // getQuotes();
    console.warn("Whoops, no quote", error);
  } finally {
    getNewQuote();
    removeLoadSpinner();
  }
};

//&
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
// newQuoteBtn.addEventListener("click", getNewQuote);
xTwitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuotes();
// showLoadSpinner();
