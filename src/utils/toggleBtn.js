"use strict";
/**
 * @note this can be used for any button that needs to be toggled to open a new window, to do something.
 * @description This module exports two functions:
 * - `constructUrl`: constructs a 𝕏 (Twitter) URL with the current quote and author, when toggleXbtn is clicked, this func is called/invoked to open that URL in a new window, allowing the user to tweet the quote.
 * - `toggleXbtn`: adds an event listener to the 𝕏 (Twitter) button that calls the constructUrl function when clicked.
 * @module toggleBtn

 * @param {void} void This function does not accept any parameters.
  * @returns {void} void This function does not return anything.
 */
export function constructUrl() {
  const quoteTxt = document.getElementById("quote");
  const authorTxt = document.getElementById("author");

  const tweetBtn = document.getElementById("twitter");
  const twitterUrl = `https://twitter.com/intent/tweet?text="${quoteTxt.textContent}" - ${authorTxt.textContent}`;

  window.open(twitterUrl, "_blank");

  tweetBtn.removeEventListener("click", constructUrl);
  return;
}

/**
 * Attaches an event listener to the tweet button and calls the constructUrl function when clicked.
 * @param {void} void This function does not accept any parameters.
 * @returns {void} void This function does not return anything.
 */
export const toggleXbtn = () => {
  const tweetBtn = document.querySelector("#twitter");

  tweetBtn.addEventListener("click", constructUrl);

  return;
};
