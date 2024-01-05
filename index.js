/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
 */

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from "./games.js";

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
 */

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
  // loop over each item in the data
  for (let i = 0; i < games.length; i++) {
    let game = games[i];
    // create a new div element, which will become the game card
    const gameCard = document.createElement("div");
    // add the class game-card to the list
    gameCard.classList.add("game-card");

    // set the inner HTML using a template literal to display some info
    // about each game
    // TIP: if your images are not displaying, make sure there is space
    // between the end of the src attribute and the end of the tag ("/>")
    const displayInfo = `
        <img class="game-img" src=${game.img}>
        <h2>Name: ${game.name}</h2>
        <p>Description: ${game.description}</p>
        <div>Backers: ${game.backers}</div>
        `;
    gameCard.innerHTML = displayInfo;
    // append the game to the games-container
    gamesContainer.appendChild(gameCard);
  }
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);
/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
 */

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContri = GAMES_JSON.reduce(
  (indiContri, game) => indiContri + game.backers,
  0
);
// set the inner HTML using a template literal and toLocaleString to get a number with commas
const totalContriDiv = `<div>${totalContri.toLocaleString("en-US")}</div>`;
contributionsCard.innerHTML = totalContriDiv;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce(
  (raised, game) => raised + game.pledged,
  0
);
// set inner HTML using template literal
const totalRaisedDiv = `<div>$${totalRaised}</div>`;
raisedCard.innerHTML = totalRaisedDiv;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const gamesNum = `<div>${GAMES_JSON.length}</div>`;
gamesCard.innerHTML = gamesNum;
/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
 */

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
  deleteChildElements(gamesContainer);

  // use filter() to get a list of games that have not yet met their goal
  const gamesUnfunded = GAMES_JSON.filter((game) => game.pledged < game.goal);

  // use the function we previously created to add the unfunded games to the DOM
  addGamesToPage(gamesUnfunded);
}

// show only games that are fully funded
function filterFundedOnly() {
  deleteChildElements(gamesContainer);

  // use filter() to get a list of games that have met or exceeded their goal
  const gamesFunded = GAMES_JSON.filter((game) => game.pledged >= game.goal);
  // use the function we previously created to add unfunded games to the DOM
  addGamesToPage(gamesFunded);
}

// show all games
function showAllGames() {
  deleteChildElements(gamesContainer);

  // add all games from the JSON data to the DOM
  addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

// add event listeners with the correct functions to each button

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
 */

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const gamesUnfunded = GAMES_JSON.filter((game) => game.pledged < game.goal);
const numUnfunded = gamesUnfunded.reduce((num, game) => num + 1, 0);

// create a string that explains the number of unfunded games using the ternary operator
const displayStr = `A total of $${totalRaised.toLocaleString(
  "en-US"
)} has been raised for ${GAMES_JSON.length} ${
  GAMES_JSON.length > 1 ? "games" : "game"
}. Currently, ${numUnfunded} ${numUnfunded > 1 ? "games" : "game"} ${
  numUnfunded > 1 ? "remain" : "remains"
} unfunded. We need your help to fund these amazing games!`;
// create a new DOM element containing the template string and append it to the description container
const description = document.createElement("p");
description.innerHTML = displayStr;
descriptionContainer.appendChild(description);
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
  return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [{ name: mostFundedName }, { name: secondFundedName }, ...others] =
  sortedGames;
// create a new element to hold the name of the top pledge game, then append it to the correct element
const firstGame = document.createElement("div");
firstGame.innerHTML = mostFundedName;
firstGameContainer.appendChild(firstGame);
// do the same for the runner up item
const secondGame = document.createElement("div");
secondGame.innerHTML = secondFundedName;
secondGameContainer.appendChild(secondGame);

// Add this script at the end of your HTML body or in a separate script file.

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});
