const cardsArray = [
  "&#128525;",
  "&#128525;",
  "&#128561;",
  "&#128561;",
  "&#128564;",
  "&#128564;",
  "&#128520;",
  "&#128520;",
  "&#128545;",
  "&#128545;",
  "&#129313;",
  "&#129313;",
];

let live = 10;
let score = 0;
let wins = 0;
let games = 0;
let clicked = "0";
let second = "0";
const backs = document.querySelectorAll(".back");
const fronts = document.querySelectorAll(".front");
const cards = document.querySelectorAll(".inner");
const header = document.querySelector("header");
const body = document.querySelector("body");
const section = document.querySelector("section");
const title = document.querySelector("a");
const board = document.querySelector(".deck");
title.style.cursor = "unset";
const restartButton = document.createElement("button");
restartButton.style.cursor = "pointer";
restartButton.onclick = newGame;
const dashBoard = document.createElement("section");
const gamesWon = document.createElement("div");
const lives = document.createElement("div");
restartButton.innerHTML = "&#128257;";
gamesWon.innerText = `Wins: ${wins}/${games}`;
header.append(restartButton);
header.prepend(dashBoard);
header.classList.add("container");

// const randomaised = cardsArray.sort(() => Math.floor() - 0.5);
// console.log(randomaised);

function displayDashBoard() {
  lives.innerText = `Lives: ${live}`;
  if (score === 6) {
    wins++;
    games++;
    console.log(wins, games);
    title.innerText = "YOU WON!!!";
    title.style.color = "#b5e25a";
    title.style.fontWeight = "bold";
    board.style.visibility = "hidden";
  } else if (live === 0) {
    games++;
    title.innerText = "YOU LOSE...";
    title.style.fontWeight = "bold";
    title.style.color = "#F8312F";
    board.style.visibility = "hidden";
  }
  dashBoard.innerHTML = "";
  gamesWon.innerText = `Wins: ${wins}/${games}`;
  dashBoard.append(lives);
  dashBoard.append(gamesWon);
}

function newGame() {
  board.style.visibility = "visible";
  title.textContent = "Memory Game";
  score = 0;
  live = 10;
  const copyArray = cardsArray.slice(0);

  for (b of backs) {
    let randomCardIndex = Math.floor(Math.random() * copyArray.length);
    b.innerHTML = `${copyArray[randomCardIndex]}`;
    copyArray.splice(randomCardIndex, 1);
  }

  for (e of cards) {
    e.classList.remove("flipped");
    e.style.pointerEvents = "all";
    e.lastElementChild.classList.remove("foundCard");
    e.onclick = flipCard;
  }
  displayDashBoard();
}
newGame();

function flipCard() {
  if (second !== "0") {
    return;
  }
  this.classList.toggle("flipped");
  if (clicked === "0") {
    clicked = this;
  } else {
    second = this;
    compare(second);
  }
}

function compare() {
  setTimeout(check, 500);
}

function check() {
  if (clicked.innerText === second.innerText) {
    clicked.lastElementChild.classList.add("foundCard");
    second.lastElementChild.classList.add("foundCard");
    clicked.style.pointerEvents = "none";
    second.style.pointerEvents = "none";
    score++;
  } else {
    clicked.classList.toggle("flipped");
    second.classList.toggle("flipped");
    live--;
  }
  clicked = "0";
  second = "0";
  displayDashBoard();
}
