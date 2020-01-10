document.addEventListener("DOMContentLoaded", onDOMReady);

let numberCards = 15;
let level;
let control=[];
let pair = [];
let maxTries = 3;
let tries = 3;
let position = [];

function onDOMReady() {
    setHearts();
    createControlArray();
    createContainer();
    
}

function setHearts() {
    let hearts = document.querySelector('.hearts');

    for (let i=0; i<maxTries; i++) {
        let img = document.createElement('img');
        let random = Math.floor(Math.random()*2);
        img.src = '../img/heart' + random + '.svg';
        hearts.appendChild(img);

        let p = document.createElement('p');
        img.appendChild(p);

    }

}

function createControlArray() {
    for (let i=0; i<numberCards; i++) {
        control[i] = 0;
    }
}


function createContainer() {
    let container = document.querySelector('.container'); 
    for (let i=0; i<numberCards*2; i++) {
        let card = document.createElement('div');
        card.classList='card';
        card.dataset.number = i;
        container.appendChild(card);
        card.dataset.id = 'empty';

        placeCards(i);
        
    }
    setTimeout(showAllCards,500);
    setTimeout(flipAllCards,2500);

}

function placeCards(num) {
    let card = document.querySelectorAll('.card');
    let raffle = Math.floor(Math.random() * numberCards);


    while (control[raffle] === 2) {
        raffle = Math.floor(Math.random() * numberCards);
    }

    let spin = document.createElement('div');
    spin.className = 'spin';
    card[num].appendChild(spin);
    spin.addEventListener('click', onCardClick);

    let cardFront = document.createElement('div');
    cardFront.className = 'card-front';
    spin.appendChild(cardFront);
    let cardImg = document.createElement('img');
    cardImg.src = `cards/card-${raffle}.svg`;
    card[num].dataset.id = raffle;
    cardFront.appendChild(cardImg);

    let cardBack = document.createElement('div');
    cardBack.className = 'card-back';
    spin.appendChild(cardBack);
    let imgBack = document.createElement('img');
    imgBack.src='cards/back.svg';
    cardBack.appendChild(imgBack);

    


    control[raffle] += 1;
 
}


function showAllCards() {
    let div = document.querySelectorAll('.spin');
    for (let i=0; i<div.length; i++) {
        div[i].classList.add('spin-click');
    }
    
}

function flipAllCards() {
    let div = document.querySelectorAll('.spin-click');

    for (let i=0; i<div.length; i++) {
        div[i].classList.remove('spin-click');
    }
    getCardPosition();
    setCardsOnPlace();

}

function getCardPosition() {
    let cards = document.querySelectorAll('.card');

    for (let i=0; i<numberCards*2; i++) {
        let card = cards[i];
        position[i]= card.getBoundingClientRect();

    }
    
}


function setCardsOnPlace() {
    let cards = document.querySelectorAll('.card');
    let container = document.querySelector('.container');
    let containerPosition = container.getBoundingClientRect();
    let {top,left} = containerPosition; 
    for (let i=0; i<numberCards*2; i++) {
        let card = cards[i];

        card.style.left = `${position[i].left - left}px`;
        card.style.top = `${position[i].top - top}px`;
        card.style.transitionDuration = '1s';

        card.style.position = 'absolute';

    }

}


function onCardClick() {
    this.classList.add('spin-click');
   

    if (pair.length === 0) {
        pair.push(this.parentNode);

    } else if (pair.length === 1) {
        pair.push(this.parentNode);

        if (pair[0].dataset.id !== pair[1].dataset.id) {
            console.log('flip!');
            setTimeout(flipCards, 1000);
            tries -= 1;

            crossHeart();




            console.log(tries);

            if (tries === 0) {
                
                gameOver();
            }

        } else {
            console.log('yay!');
            console.log(tries);
            pair=[];

        }
    }


}

function crossHeart() {
    let container = document.querySelector('.hearts');
    let hearts = container.querySelectorAll('img');
    let heart = maxTries - tries - 1;

    let crossed = hearts[heart].querySelector('p');
    crossed.innerText = '/';

    
}


function flipCards() {
    for (let i=0; i<pair.length; i++){
        let div = pair[i].childNodes[0];
        div.classList.remove('spin-click');
    }
    pair=[];
    
}

function gameOver () {

    let div = document.querySelector('.game-over');

    setTimeout(function() {div.style.visibility = 'visible';
    let button = div.querySelector('button');
    button.addEventListener('click', playAgain);},4500);
    
    setTimeout(flipAllCards, 1500);
    setTimeout(collectCards, 2500);
                
}


function collectCards() {
    let cards = document.querySelectorAll('.card');

    for (let i=0; i<numberCards*2; i++) {
        let left = window.innerWidth/2 - position[0].width;
        let top = window.innerHeight/2 - position[0].height;
        let card = cards[i];
  
        card.style.top =top + 'px';
        card.style.left = left +'px';
        card.style.transitionDuration = '1s';

    }

}

function playAgain() {
    let div = document.querySelector('.game-over');
   
    tries = maxTries;
    pair = [];
    control=[];

    setTimeout(function(){div.style.visibility = 'hidden';},200);

    drawCards();


    setTimeout(putCardsOnPlace, 1000);
    setTimeout(showAllCards,2500);
    setTimeout(flipAllCards,4500);


}

function drawCards() {
    let cards = document.querySelectorAll('.card');
    createControlArray();

    for (let i=0; i<numberCards*2; i++) {
        let card = cards[i];
        let raffle = Math.floor(Math.random() * numberCards);


        while (control[raffle] === 2) {
            raffle = Math.floor(Math.random() * numberCards);
        }

        let parent = card.querySelector('.spin');
        let cardFront = parent.querySelector('.card-front');
        let cardImg = cardFront.querySelector('img');
        cardImg.src = `cards/card-${raffle}.svg`;
        card.dataset.id = raffle;

        control[raffle] += 1;

    }
    
}

function putCardsOnPlace() {

    let cards = document.querySelectorAll('.card');
    let container = document.querySelector('.container');
    let containerPosition = container.getBoundingClientRect();
    let {top,left} = containerPosition; 
    for (let i=0; i<numberCards*2; i++) {
        let card = cards[i];

        card.style.left = `${position[i].left - left}px`;
        card.style.top = `${position[i].top - top}px`;

        card.style.transitionDuration = '1s';
    }
}
