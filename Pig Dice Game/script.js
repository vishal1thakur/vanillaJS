'use strict';

// Variables to select the elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting conditions

let currentScore, scores, activePlayer, playing;

const init = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;
    
    current0El.textContent = 0;
    current1El.textContent = 0;
    score0El.textContent = 0;
    score1El.textContent = 0;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
};

init();

// Switch player function
const switchPlayer = function () {
    // Deduct all the score from the active player
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    // Set current score to 0
    currentScore = 0;
    // Switch to next player
    activePlayer = activePlayer === 0 ? 1 : 0;
    // Change background of the active player
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
    if (playing) {
        // 1. Generate a random number from 1 - 6
        const dice = Math.trunc(Math.random() * 6) + 1;
        // 2. Display the corresponding dice image
        diceEl.classList.remove('hidden');
        diceEl.src = `/Pig-Dice-Game/Images/dice-${dice}.png`;
        // 3. Check if rolled 1: if true, change the player
        // 3.1 When the dice is not 1, add it to the players score
        if (dice !== 1) {
        // Add dice to current score
        currentScore += dice;
        // Add score to the current player
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    
        } else {
        // Switch Player
        switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function () {
    // 1. Add current score to active player score
    if (playing) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        // 2. check if the players score is >= 100
        if (scores[activePlayer] >= 100) {
        // Finish the game
            playing = false;
            diceEl.classList.add('hidden');
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
        // Switch to the next player
        switchPlayer();
        }   
    }
});

// Resetting the game
btnNew.addEventListener('click', init);