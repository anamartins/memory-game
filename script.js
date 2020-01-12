document.addEventListener("DOMContentLoaded", onDOMReady);

let numberCards = 2;
let level;
let control = [];
let pair = [];
let maxTries = 3;
let tries = 3;
let position = [];
let flippedCards = 0;

function onDOMReady() {
  setHearts();
  createControlArray();
  createContainer();
}

function setHearts() {
  let hearts = document.querySelector(".hearts");

  for (let i = 0; i < maxTries; i++) {
    let random = Math.floor(Math.random() * 2);

    let div = document.createElement("div");
    hearts.appendChild(div);
    div.className = "heart";

    let img = document.createElement("img");
    img.src = "../img/heart" + random + ".svg";
    div.appendChild(img);

    let p = document.createElement("p");
    div.appendChild(p);
  }
}

function createControlArray() {
  for (let i = 0; i < numberCards; i++) {
    control[i] = 0;
  }
}

function createContainer() {
  let container = document.querySelector(".container");
  for (let i = 0; i < numberCards * 2; i++) {
    let card = document.createElement("div");
    card.classList = "card";
    card.dataset.number = i;
    container.appendChild(card);
    card.dataset.id = "empty";

    placeCards(i);
  }
  setTimeout(showAllCards, 500);
  setTimeout(flipAllCards, 2500);
}

function placeCards(num) {
  let card = document.querySelectorAll(".card");
  let raffle = Math.floor(Math.random() * numberCards);

  while (control[raffle] === 2) {
    raffle = Math.floor(Math.random() * numberCards);
  }

  let spin = document.createElement("div");
  spin.className = "spin";
  card[num].appendChild(spin);
  spin.addEventListener("click", onCardClick);

  let cardFront = document.createElement("div");
  cardFront.className = "card-front";
  spin.appendChild(cardFront);
  let cardImg = document.createElement("img");
  cardImg.src = `cards/card-${raffle}.svg`;
  card[num].dataset.id = raffle;
  cardFront.appendChild(cardImg);

  let cardBack = document.createElement("div");
  cardBack.className = "card-back";
  spin.appendChild(cardBack);
  let imgBack = document.createElement("img");
  imgBack.src = "cards/back.svg";
  cardBack.appendChild(imgBack);

  control[raffle] += 1;
}

function showAllCards() {
  let div = document.querySelectorAll(".spin");
  for (let i = 0; i < div.length; i++) {
    div[i].classList.add("spin-click");
  }
}

function flipAllCards() {
  let div = document.querySelectorAll(".spin-click");

  for (let i = 0; i < div.length; i++) {
    div[i].classList.remove("spin-click");
  }
  getCardPosition();
  setCardsOnPlace();
}

function getCardPosition() {
  let cards = document.querySelectorAll(".card");

  for (let i = 0; i < numberCards * 2; i++) {
    let card = cards[i];
    position[i] = card.getBoundingClientRect();
  }
}

function setCardsOnPlace() {
  let cards = document.querySelectorAll(".card");
  let container = document.querySelector(".container");
  let containerPosition = container.getBoundingClientRect();
  let { top, left } = containerPosition;
  for (let i = 0; i < numberCards * 2; i++) {
    let card = cards[i];

    card.style.left = `${position[i].left - left}px`;
    card.style.top = `${position[i].top - top}px`;
    card.style.transitionDuration = "1s";

    card.style.position = "absolute";
  }
}

function onCardClick() {
  this.classList.add("spin-click");

  if (pair.length === 0) {
    pair.push(this.parentNode);
  } else if (pair.length === 1) {
    pair.push(this.parentNode);

    if (pair[0].dataset.id !== pair[1].dataset.id) {
      setTimeout(flipCards, 1000);
      tries -= 1;
      crossHeart();
      if (tries === 0) {
        gameOver();
      }
    } else {
      pair = [];
      flippedCards += 1;

      if (flippedCards === numberCards) {
        hasWon();
      }
    }
  }
}

function crossHeart() {
  let container = document.querySelector(".hearts");
  let hearts = container.querySelectorAll(".heart");
  let number = maxTries - tries - 1;

  let crossed = hearts[number].querySelector("p");
  crossed.innerText = "x";
}

function flipCards() {
  for (let i = 0; i < pair.length; i++) {
    let div = pair[i].childNodes[0];
    div.classList.remove("spin-click");
  }
  pair = [];
}

function gameOver() {
  finish("game-over", 0);
}

function hasWon() {
  finish("win", 500);
}

function finish(className, delay) {
  let div = document.querySelector(`.${className}`);

  setTimeout(() => {
    div.style.visibility = "visible";
    let button = div.querySelector("button");
    button.addEventListener("click", playAgain);
  }, 4500 + delay);

  setTimeout(flipAllCards, 1500 + delay);
  setTimeout(collectCards, 2500 + delay);
}

function collectCards() {
  let cards = document.querySelectorAll(".card");

  for (let i = 0; i < numberCards * 2; i++) {
    let left = window.innerWidth / 2 - position[0].width;
    let top = window.innerHeight / 2 - position[0].height;
    let card = cards[i];

    card.style.top = top + "px";
    card.style.left = left + "px";
    card.style.transitionDuration = "1s";
  }
}

function playAgain() {
  let gameOverDiv = document.querySelector(".game-over");
  let winnerDiv = document.querySelector(".win");

  tries = maxTries;
  pair = [];
  control = [];
  flippedCards = 0;

  setTimeout(() => {
    gameOverDiv.style.visibility = "hidden";
    winnerDiv.style.visibility = "hidden";
  }, 200);

  drawCards();
  cleanHearts();

  setTimeout(putCardsOnPlace, 1000);
  setTimeout(showAllCards, 2500);
  setTimeout(flipAllCards, 4500);
}

function cleanHearts() {
  let container = document.querySelector(".hearts");
  let hearts = container.querySelectorAll(".heart");

  for (let i = 0; i < maxTries; i++) {
    let crossed = hearts[i].querySelector("p");
    crossed.innerText = "";
  }
}

function drawCards() {
  let cards = document.querySelectorAll(".card");
  createControlArray();

  for (let i = 0; i < numberCards * 2; i++) {
    let card = cards[i];
    let raffle = Math.floor(Math.random() * numberCards);

    while (control[raffle] === 2) {
      raffle = Math.floor(Math.random() * numberCards);
    }

    let parent = card.querySelector(".spin");
    let cardFront = parent.querySelector(".card-front");
    let cardImg = cardFront.querySelector("img");
    cardImg.src = `cards/card-${raffle}.svg`;
    card.dataset.id = raffle;

    control[raffle] += 1;
  }
}

function putCardsOnPlace() {
  let cards = document.querySelectorAll(".card");
  let container = document.querySelector(".container");
  let containerPosition = container.getBoundingClientRect();
  let { top, left } = containerPosition;
  for (let i = 0; i < numberCards * 2; i++) {
    let card = cards[i];

    card.style.left = `${position[i].left - left}px`;
    card.style.top = `${position[i].top - top}px`;

    card.style.transitionDuration = "1s";
  }
}
