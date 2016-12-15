/**
 * Whack-a-Mole!
 * A simple game made to explore Telegram Bot & Game API modules.
 */

/* DOM Elements */
const scoreBoard = document.querySelector('.score'),
      holes      = document.querySelectorAll('.hole'),
      moles      = document.querySelectorAll('.mole');

/* Other constants */
const timeToPlay = 30;

/* These act as funny victory/failure messages */
const messages = {
    victory: "Congratulations!",
    failure: "Better luck next time!",
    cheated: "The moles are ashamed of your filthy behavior!"
};

/* Variables */
let lastHole, timeUp = false, score = 0;

/* Functions */

/**
 * Returns a random number from [min, max] range to be represented as time.
 * @param  {float} min The lower range
 * @param  {float} max The upper range
 * @return {float}
 */
let randomTime = function(min, max) {
    return Math.random() * (max - min) + min;
};

/**
 * Picks a random 'hole' element from the document tree using randomTime()
 * @param  {NodeList} holes The list of node elements describing holes
 * @return {Object} The randomly picked hole
 */
let randomHole = function(holes) {
    const idx  = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];

    if (hole === lastHole) {
        return randomHole(holes);
    }

    lastHole = hole;
    return hole;
};

/**
 * Makes the mole go peep and raise its head from the dirt!
 * @return {void}
 */
let peep = function() {
    const time = randomTime(200, 1000);
    const hole = randomHole(holes);

    hole.classList.add('up');

    setTimeout(() => {
        hole.classList.remove('up');

        if (!timeUp) {
            peep();
        } else {
            gameOver(messages.victory);
        }
    }, time);
};

/**
 * Starts the game - gets called from DOM input element
 * @return {void}
 */
let startGame = function() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => timeUp = true, timeToPlay * 1000);
};

/**
 * Whacks the stinking mole!
 * @param  {Event} e The event the whacking control is bound to, currently a mouse-click
 */
let whack = function(e) {
    if (!e.isTrusted) {
        gameOver(messages.cheated);
    }

    score++;
    this.classList.remove('up');
    scoreBoard.textContent = score;
};

/**
 * Called when the game ends
 * @param  {string} text The informative message about why the game ended
 * @return {bool}
 */
let gameOver = function(text) {
    alert(`${text} You got ${score} points.`);

    if (confirm('Try again?')) {
        startGame();
    } else {
        /* Show a high score board */
        return false;
    }
};

moles.forEach(mole => mole.addEventListener('click', whack));
