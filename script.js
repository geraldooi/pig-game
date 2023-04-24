'use strict';

// Selecting element
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');
const score0Element = document.getElementById('score--0');
const score1Element = document.getElementById('score--1');
const current0Element = document.getElementById('current--0');
const current1Element = document.getElementById('current--1');
const diceElement = document.querySelector('.dice');
const newBtn = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');

// Starting condition
let scores, currentScore, activePlayer, isPlaying;

const init = function () {
    score0Element.textContent = 0;
    score1Element.textContent = 0;
    diceElement.classList.add('hidden');

    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    isPlaying = true;

    score0Element.textContent = score1Element.textContent = 0;
    current0Element.textContent = current1Element.textContent = 0;
    diceElement.classList.add('hidden');
    player0Element.classList.remove('player--winner');
    player1Element.classList.remove('player--winner');
    player0Element.classList.add('player--active');
    player1Element.classList.remove('player--active');
};
init();

const switchPlayer = function () {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0Element.classList.toggle('player--active');
    player1Element.classList.toggle('player--active');
};

// Display
const displayDice = function (diceValue) {
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${diceValue}.png`;
};

// Rolling dice function
rollBtn.addEventListener('click', function () {
    if (isPlaying) {
        const diceValue = Math.trunc(Math.random() * 6) + 1;
        displayDice(diceValue);

        if (diceValue !== 1) {
            currentScore += diceValue;
            document.getElementById(`current--${activePlayer}`).textContent =
                currentScore;
        } else {
            switchPlayer();
        }
    }
});

// Hold dice value
holdBtn.addEventListener('click', function () {
    if (isPlaying) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent =
            scores[activePlayer];

        if (scores[activePlayer] >= 100) {
            isPlaying = false;
            diceElement.classList.add('hidden');
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add('player--winner');
        } else {
            switchPlayer();
        }
    }
});

// Resetting
newBtn.addEventListener('click', init);
