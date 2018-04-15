/*
 * Create a list that holds all of your cards
 */
const card = $('.card');
const cards = [...card];
const deck = $('.deck');
const movesEl = $('.moves');
let openedCards = [];
let moveCounter = 0;


/*
 * Display the card that is clicked
 *  - add class show and open to the clicked card
 */
const displayCard = () => $(event.target).addClass('show open');

/*
 * Add clicked card to the opened list
 *  - push the card to the list
 */
const pushCard = () => openedCards.push($(event.target));


/*
 * Compares if the two open cards are a match
 */
const compareOpenCards = () => {
    let cardOne = openedCards[0].children()[0].className,
        cardTwo = openedCards[1].children()[0].className;

    if (cardOne === cardTwo) {
        deck.find('.open').addClass('match animated rubberBand');

    } else {
        // Makes sure that user cannot keep clicking on cards
        deck.addClass('no-pointer-events');
        $(openedCards[0]).addClass('no-match animated wobble');
        $(openedCards[1]).addClass('no-match animated wobble');
        setTimeout(function() {
            deck.find('.open').removeClass('no-match show open animated wobble');
            deck.removeClass('no-pointer-events');
        }, 500);
    }
    openedCards = [];
}

/*
 * Display move counter onto the page
 *  - update move counter
 */
const displayCounter = () => {
    movesEl.html(moveCounter);
    moveCounter++;
};


/*
 * Call functions when card is clicked
 *  - display card
 *  - push card to the array
 *  - compare card
 *  - display counter
 */
const clickedCard = () => {
    displayCard();
    pushCard();
    if (openedCards.length === 2) {
        compareOpenCards();
    }
    displayCounter();
};

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
const displayCards = () => {
    let shuffledCards = shuffle(cards)
    shuffledCards.map(card => {
        deck.append($(card))
        $(card).unbind().click(clickedCard);
    });
};

/*
 * Restart the game when restart button is clicked
 * 	- remove classes
 *  - reset the cards
 *  - set openedCards back to empty array
 *  - reset the counter
 */
const restartGame = () => {
    $('.restart').unbind().click(function() {
        deck.find('.card').removeClass('show open match animated rubberBand wobble');
        openedCards = [];
        moveCounter = 0;
        startGame();

    });
};

const startGame = () => {
    displayCards();
    displayCounter();
    restartGame();
}

startGame();

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */