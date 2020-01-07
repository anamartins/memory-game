document.addEventListener("DOMContentLoaded", onDOMReady);

let numberCards = 5;
let level;
let control=[];
let pair = [];
let tries = 3;

function onDOMReady() {
    createControlArray();
    createContainer();
    
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
        setTimeout(showAllCards,1000);
        setTimeout(flipAllCards,4000);
    }

    
    
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
            console.log(tries);

            if (tries === 0) {
                
                setTimeout(flipAllCards, 1500);

                setTimeout(collectCards, 2500);
                
                console.log('game over!');
            }

        } else {
            console.log('yay!');
            console.log(tries);
            pair=[];

        }
    }


}




function flipCards() {
    for (let i=0; i<pair.length; i++){
        let div = pair[i].childNodes[0];
        div.classList.remove('spin-click');
    }
    pair=[];
}

function flipAllCards() {
    let div = document.querySelectorAll('.spin-click');
    console.log(div);

    for (let i=0; i<div.length; i++) {
        div[i].classList.remove('spin-click');
    }

}

function showAllCards() {
    let div = document.querySelectorAll('.spin');
    for (let i=0; i<div.length; i++) {
        div[i].classList.add('spin-click');
    }
    
}

function collectCards() {
    for (let i=0; i<numberCards*2; i++) {
        let card = document.querySelectorAll('.card');
        card[i].style.transform = `translateX(-${i*111}px)`;
        card[i].style.transitionDuration = '1s';
    }
    

}
