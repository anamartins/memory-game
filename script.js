document.addEventListener("DOMContentLoaded", onDOMReady);

let cards = 10;
let level;
let control=[];


function onDOMReady() {
    createControlArray();
    createGrid();
    
}

function createControlArray() {
    for (let i=0; i<cards; i++) {
        control[i] = 0;
    }
}


function createGrid() {
    let grid = document.querySelector('.grid');
    for (let i=0; i<cards*2; i++) {
        let place = document.createElement('div');
        place.classList='place';
        place.dataset.number = i;
        grid.appendChild(place);
        place.dataset.card = 'empty';

        placeCards(i);
    }

    
    
}


function placeCards(num) {
    let place = document.querySelectorAll('.place');
    let raffle = Math.floor(Math.random() * cards);


    while (control[raffle] === 2) {
        raffle = Math.floor(Math.random() * cards);
    }



    let card = document.createElement('img');
    card.src = `cards/card-${raffle}.svg`;
    place[num].dataset.card = raffle;
    place[num].appendChild(card);
    
    control[raffle] += 1;



 
}

