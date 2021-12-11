'use strict';

const lowerAlph = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

var wordList = {
    radiohead: {
        picture: `./assert/images/radiohead.jpg`,
        genres: `Genres: Art rock, alternative rock, electronic, aexperimental rock`,
        years_active: `Years:
         1985–present`,
        members: `Members:
             Thom Yorke, Jonny Greenwood,
            Colin Greenwood, Ed O'Brien,
            Philip Selway,`,
    },

    // ................ More
}

/* 
============= 
Selections
=============
*/
// Words
const secret_word = document.querySelector('.secret-word');
const winOrLose = document.querySelector('.winOrLose');
let lettersAlreadyGuessed = document.querySelector('.letters-already-guessed');
// Scores
const winEl = document.querySelector('.wins');
const guess = document.querySelector('#guess');
// Buttons
const playAgainBtn = document.querySelector('#play-again');
const resetBtn = document.querySelector('.reset-game');
// Band info
const bandName = document.querySelector('.band-name');
const genres = document.querySelector('.genres');
const years = document.querySelector('.years-active');
const members = document.querySelector('.members');
// Game info
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelector('.game-intro');
/* 
===================
Starting conditions 
=================== 
*/

let gussesRemaining, isGame, currentWord, displayWord, selectedWord, lettersArr, randomValue;

const init = function () {
    secret_word.innerHTML = '';
    winOrLose.innerHTML = '';
    lettersAlreadyGuessed.innerHTML = '';
    bandName.innerHTML = '';
    genres.innerHTML = '';
    years.innerHTML = '';
    members.innerHTML = '';
    gussesRemaining = 10;
    guess.textContent = 10;
    isGame = true;
    //Selected randomly from wordList
    currentWord = [];
    //What appears on screen
    displayWord = [];
    // Letters already selected
    lettersArr = []
    // Generating random word
    let randomObj = Object.entries(wordList)[Math.floor(Math.random() * Object.keys(wordList).length)]
    randomValue = randomObj[1]
    selectedWord = randomObj[0]
    // selectedWord = wordList[Math.floor(Math.random() * wordList.length)]
    document.getElementById('displayImg').src = '/assert/images/hangman.jpg'


    //Display a hyphen on the screen
    for (var i = 0; i < selectedWord.length; i++) {
        displayWord[i] = '-'
        currentWord.push(selectedWord[i])
        secret_word.innerHTML += "-"
    }
    // If a player wins or loses, change the background color
    document.querySelector(`body`).classList.remove('player--winner');
    document.querySelector(`body`).classList.remove('player--loses');

    playAgainBtn.classList.add('display--none')
}
init()
// Also reset all scores
const reset = function () {
    winEl.innerHTML = 0
    init()
}

/* 
===================
Modal
=================== 
*/
const openModal = function () {
    modal.classList.remove('display--none');
    overlay.classList.remove('display--none');
};

const closeModal = function () {
    modal.classList.add('display--none');
    overlay.classList.add('display--none');
};

btnsOpenModal.addEventListener('click', openModal);
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('display--none')) {
        closeModal();
    }
});

/* 
===================
Game
=================== 
*/

// Display already guessed letters
function getUnique(userChoise) {
    lettersArr.push(userChoise)
    let mySet = new Set(lettersArr)
    lettersAlreadyGuessed.innerHTML = new Array(...mySet)
}
// If player wins the game
function winGame() {
    winOrLose.innerHTML = '🎉 Correct word!';
    isGame = false;
    winEl.innerHTML++
    document.querySelector(`body`).classList.add('player--winner');
    playAgainBtn.classList.remove('display--none')
    bandName.innerText = getFieldName(selectedWord);
    genres.innerText = randomValue.genres;
    years.innerText = randomValue.years_active;
    members.innerText = randomValue.members;
    document.getElementById('displayImg').src = randomValue.picture
}

// If player enters wrong letter
function wrongChoise() {
    gussesRemaining--;
    guess.textContent = gussesRemaining;
}
// If player loses the game
function loseGames() {
    winOrLose.innerHTML = '💥 You lost the game!';
    guess.textContent = 0;
    isGame = false
    document.querySelector(`body`).classList.add('player--loses');
    playAgainBtn.classList.remove('display--none')
    getUnique(userChoise) // => Display already guessed letters
}
// UpperCase first letter
function getFieldName(bandName) {
    return bandName.charAt(0).toUpperCase() + bandName.slice(1);
}

function game() {
    document.onkeydown = function (e) {
        let userChoise = e.key.toLowerCase();
        // Check if the word has the letter user inputs
        for (let i = 0; i < currentWord.length; i++) {
            if (currentWord[i] === userChoise) {
                displayWord[i] = currentWord[i];
                var onScreen = displayWord.join('');
            }
        }
        // If is game true, the game continues
        if (isGame) {
            if (onScreen && lowerAlph.includes(userChoise)) {
                secret_word.textContent = onScreen;
                console.log(secret_word.innerHTML)
                getUnique(userChoise) // => Display already guessed letters
                // If player wins
                if (onScreen === selectedWord) {
                    winGame()
                }
                // If player enters wrong letter
            } else if (gussesRemaining > 1 && lowerAlph.includes(userChoise)) {
                wrongChoise()
                // If player loses
            } else if (lowerAlph.includes(userChoise)) {
                loseGames()
            }
        }
    }
}

game()

console.log(displayWord)
console.log(currentWord)

// Reset game
playAgainBtn.addEventListener('click', init);
resetBtn.addEventListener('click', reset);





