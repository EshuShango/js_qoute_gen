"use strict";
// Get Quotes From API
import "../css/style.css";

const quoteContainer = document.getElementById("quote-container");
// const quoteTxt = document.getElementById("quote");
// const authorTxt = document.getElementById("author");
const xTwitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");

let apiQuotes = [];

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
 * @param {string} console - The console
 */

const newQuote = () => {
  const quoteTxt = document.getElementById("quote");
  const authorTxt = document.getElementById("author");
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
    
  console.table(quote);

  // //?how to remove parts of the string in javascript

  authorTxt.textContent = quote.author;
  quoteTxt.textContent = quote.text;
  // const quoteElement = quoteTxt
  // const authorElement = authorTxt
  // quoteElement.innerHTML = text;
  // authorElement.innerHTML = author; // if author is null, then display unknown
};

const getQuotes = async () => {
  {
    const apiUrl = "https://type.fit/api/quotes";
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
  }
};

// On Load
getQuotes();
