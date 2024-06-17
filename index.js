// generate basic layoyt

const createElement = (elemType, elemClass ) => {
  const newElem = document.createElement(elemType)

  newElem.classList.add(elemClass);

  return newElem;
}

const generateKeyBoard = (block) => {
  const engLetters = ['a', 'b', 'c', 'd', 'e', 
                      'f', 'g', 'h', 'i', 'j', 
                      'k', 'l', 'm', 'n', 'o', 
                      'p', 'q', 'r', 's', 't', 
                      'u', 'v', 'w', 'x', 'y', 
                      'z'];
  for (let item of engLetters) {
    const newKey = createElement('div', 'key');
    newKey.textContent = item;
    block.appendChild(newKey);
  }
  return block;
}

const words = [
  {
    word: ['C' ,'h', 'i', 'n', 'a'],
    hint: 'Hint: We can produce everything!',
  },
  {
    word: ['U', 'S', 'A'],
    hint: 'Hint: Work hard. Dream big!',
  },
  {
    word: ['F', 'r', 'a', 'n', 'c', 'e'],
    hint: 'Hint: Croissants and wine',
  },
  {
    word: ['G', 'r', 'e', 'e', 'c', 'e'],
    hint: 'Hint: Would you like a gyros?',
  },
  {
    word: ['E', 'g', 'i', 'p', 't'],
    hint: 'Hint: There are not only pyramids here!',
  },
  {
    word: ['K', 'o', 'r', 'e', 'a'],
    hint: 'Hint: I need more kimchi!',
  },
  {
    word: ['V', 'a', 't', 'i', 'c', 'a', 'n'],
    hint: 'Hint: The smallest state',
  },
  {
    word: ['J', 'a', 'p', 'a', 'n'],
    hint: "Hint: You've definitely seen our animation!",
  },
  {
    word: ['M', 'e', 'x', 'i', 'c', 'o'],
    hint: 'Hint: Do you like tacos?',
  },
  {
    word: ['A', 'r', 'g', 'e', 'n', 't', 'i', 'n', 'a'],
    hint: 'Hint: Inflation is not a problem for football',
  },
 ];

 const allowedKeys = [
 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 
 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 
 'KeyP', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 
 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 
 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 
 'KeyN', 'KeyM',
];

const existedIndexces = [];

let attemptsCounter = 0;
const checkAttempts = (attemptsHTML, attemptsCounter) => {
  if (attemptsCounter <= 6) {
    return attemptsHTML.textContent = `${attemptsCounter} / 6`;
  }
}

const chooseRandom = (words, existedIndexces) => {
  if (existedIndexces.length === 10) {
    existedIndexces.length = 0;
  }
  const index = Math.floor(Math.random() * words.length);
  if (!existedIndexces.includes(index)) {
    existedIndexces.push(index);
    return words[index];
  }
  return  chooseRandom(words, existedIndexces);
};

const hangmanJob = (human, attemptsCounter) => {
  if (attemptsCounter <= 6) {
    for (let i = 0; i < attemptsCounter; i += 1) {
      if (!human[i].classList.contains('human-pies_visible')) {
        human[i].classList.add('human-pies_visible');
      }
    }
  }
}

const isWin = (letters, modal) => {
  let wordLength = letters.length;
  let counter = 0;
  for (let letter of letters) {
    if (letter.classList.contains('letter_visible')) {
      counter += 1;
    }
  }
  if (counter === wordLength && attemptsCounter < 7) {
    return gameOver(modal);
  }
}

const gameOver = (modal) => {
  openModal(modal);
  const result = document.querySelector('.modal__window__result');

  if (attemptsCounter < 6) {
    result.textContent = 'You win!'
  } else {
    result.textContent = 'You lose!'
  }

  const letters = document.querySelectorAll('.letter');
  let currentWord = 'Secret word: ';
  for (let letter of letters) {
    currentWord += letter.innerHTML;
  }
  const secretWord = document.querySelector('.modal__window__word');
  secretWord.textContent = currentWord;
}


const guessingGame = (e, attemptsHTML, human, modal, word) => {

  const letters = document.querySelectorAll('.letter');
  let isCorrectChose = false;
  const currentKey = e.target;
  
  const currentKeySimbol = e.target.textContent;
  if (!currentKey.classList.contains('key_checked')) {
    currentKey.classList.add('key_checked');
    letters.forEach((letter) => {
      if (letter.textContent.toLowerCase() === currentKeySimbol.toLowerCase()) {
        letter.classList.add('letter_visible');
        letter.closest('.letter__box').classList.add('letter__box_solved');
        isCorrectChose = true;
      }
    })
    if (!isCorrectChose) {
      attemptsCounter += 1;
      checkAttempts(attemptsHTML, attemptsCounter);
      hangmanJob(human, attemptsCounter);
    }
  }
  isCorrectChose = false;
  if (attemptsCounter >= 6) {
    gameOver(modal);
  }
  isWin(letters, modal);
}

const guessingGameKeyboard = (e, attemptsHTML, human, keys, modal, word) => {


  const letters = document.querySelectorAll('.letter');
  let isCorrectChose = false;
  const currentKeySimbol = e.code.slice(e.code.length - 1);
  let currentVirtualSimbol = '';

  for (let key of keys) {
    if (key.textContent.toUpperCase() === currentKeySimbol) {
      currentVirtualSimbol = key;
    }
  }
  if (!currentVirtualSimbol.classList.contains('key_checked')) {
    currentVirtualSimbol.classList.add('key_checked');
    
    letters.forEach((letter) => {
      if (letter.textContent.toLowerCase() === currentKeySimbol.toLowerCase()) {
        letter.classList.add('letter_visible');
        letter.closest('.letter__box').classList.add('letter__box_solved');
        isCorrectChose = true;
      }
  })
  if (!isCorrectChose) {
    attemptsCounter += 1;
    checkAttempts(attemptsHTML, attemptsCounter);
    hangmanJob(human, attemptsCounter);
  }
  }
  isCorrectChose = false;
  if (attemptsCounter >= 6) {
    gameOver(modal);
  }
  isWin(letters, modal);
}

const openModal = (modal) => {
  if (!modal.classList.contains('modal_opened')) {
    modal.classList.add('modal_opened');
    const body = document.querySelector('body');
    body.classList.add('body-modal');
  }
}

const closeModal = (modal) => {
  if (modal.classList.contains('modal_opened')) {
    modal.classList.remove('modal_opened');
    const body = document.querySelector('body');
    body.classList.remove('body-modal');
  }
}


const body = document.querySelector('body');
const addMain = (body) => {
  const mainTag = createElement('main', 'main-block')
  body.appendChild(mainTag);
}

document.addEventListener('DOMContentLoaded', () => {
  // addLayout();
  addMain(body);
  const main = document.querySelector('main');
  addGameBlock(main);
  // addKeyboard
  const keyBoard = document.querySelector('.keyboard');
  generateKeyBoard(keyBoard);


  const currenWord = chooseRandom(words, existedIndexces);

  const wordBox = document.querySelector('.guessing-word');
  getWord(wordBox, currenWord.word);

  const hintBlock = document.querySelector('.hint-block');
  getHint(hintBlock, currenWord.hint) 


  const human = document.querySelectorAll('.human');

  const attemptsHTML = document.querySelector('.attempts');

  const keys = document.querySelectorAll('.key');
  const letters = document.querySelectorAll('.letter');

  const newGameButton = document.querySelector('.modal__window__new-game');
  newGameButton.addEventListener('click', (e) => {
    newGame(wordBox, hintBlock, attemptsHTML, keys, human, modal);
  })
  const overlay = document.querySelector('.modal__overlay');
  overlay.addEventListener('click', (e) => {
    newGame(wordBox, hintBlock, attemptsHTML, keys, human, modal);
  });
  
  const modal = document.querySelector('.modal');

    keys.forEach((key) => {
      key.addEventListener('click', (e) => {
        guessingGame(e, attemptsHTML, human, modal);
      })
    })
    document.addEventListener('keydown', (e) => {
      if (!modal.classList.contains('modal_opened')) {
        if (allowedKeys.includes(e.code)) {
          guessingGameKeyboard(e, attemptsHTML, human, keys, modal);
        }
      }
    })
})

const newGame = (wordBox, hintBlock, attemptsHTML, keys, human, modal) => {

  attemptsCounter = 0;
  const newWord = chooseRandom(words, existedIndexces);
  wordBox.innerHTML = '';
  hintBlock.textContent = '';
  getWord(wordBox, newWord.word);
  getHint(hintBlock, newWord.hint);
  attemptsHTML.textContent = `0 / 6`;
  for (let key of keys) {
    key.classList.remove('key_checked');
  }
  for (let pies of human) {
    pies.classList.remove('human-pies_visible');
  }
  closeModal(modal);
}



const getWord = (wordBox, word) => {
  for (let letter of word){
    const letterBox = createElement('div', 'letter__box');
    const letterHTML = createElement('span', 'letter');
    letterHTML.textContent = letter;
    letterBox.appendChild(letterHTML);
    wordBox.appendChild(letterBox);
  }
  return wordBox;
}

const getHint = (hintBlock, currentWord) => {
  const hintText = currentWord;
  hintBlock.textContent = hintText;
  return hintBlock;
}


const addGameBlock = (mainElem) => {
  const section = createElement('div', 'block');

  const gallowsBlock = createElement('div', 'gallows');

  const gallows = createElement('div', 'gallows__item');
  const gallowsItemOne = createElement('span', 'gallows__item_one');
  const gallowsItemTwo = createElement('span', 'gallows__item_two');
  const gallowsItemThree = createElement('span', 'gallows__item_three');
  const gallowsItemFour = createElement('span', 'gallows__item_four');
  const humanBox = createElement('div', 'gallows__item__human-box');
  gallows.appendChild(gallowsItemOne);
  gallows.appendChild(gallowsItemTwo);
  gallows.appendChild(gallowsItemThree);
  gallows.appendChild(gallowsItemFour);
  
  const humanHead = createElement('div', 'human-head');
  const humanBody = createElement('div', 'human-body');
  const humanLeftHand = createElement('div', 'human-left-hand');
  const humanRightHand = createElement('div', 'human-right-hand');
  const humanLeftLeg = createElement('div', 'human-left-leg');
  const humanRightLeg = createElement('div', 'human-right-leg');
  humanBox.appendChild(humanHead);
  humanBox.appendChild(humanBody);
  humanBox.appendChild(humanLeftHand);
  humanBox.appendChild(humanRightHand);
  humanBox.appendChild(humanLeftLeg);
  humanBox.appendChild(humanRightLeg);
  for(let human_pies of humanBox.children) {
    human_pies.classList.add('human');
  }
  gallows.appendChild(humanBox);

  const gameNameBlock = createElement('div', 'gallows-name__block');
  gallowsBlock.appendChild(gallows);
  gallowsBlock.appendChild(gameNameBlock);

  const gameName = createElement('p', 'game-name')
  gameName.innerText = 'HANGMAN GAME: COUNTRIES';
  gameNameBlock.appendChild(gameName);

  section.appendChild(gallowsBlock);
  const guessingBlock = createElement('div', 'guessing');

  const wordBlock = createElement('div', 'guessing-word');
  const hintBlock = createElement('div', 'hint-block');
  const incorrectCount = createElement('div', 'incorrect-block');
  incorrectCount.innerHTML = `<p>Incorrect guesses: <span class='attempts'>0 / 6</span></p>`
  const keyBoardBlock = createElement('div', 'keyboard');
  
  guessingBlock.appendChild(wordBlock);
  guessingBlock.appendChild(hintBlock);
  guessingBlock.appendChild(incorrectCount);
  guessingBlock.appendChild(keyBoardBlock);
  section.appendChild(guessingBlock);


  mainElem.appendChild(section);

  const modal = createElement('div', 'modal');
  const modalOverlay = createElement('div', 'modal__overlay');

  const modalWindow = createElement('div', 'modal__window');
  const result = createElement('div', 'modal__window__result');
  const secretWord = createElement('div', 'modal__window__word');
  const newGame = createElement('div', 'modal__window__new-game');
  newGame.textContent = 'New game'
  modalWindow.appendChild(result);
  modalWindow.appendChild(secretWord);
  modalWindow.appendChild(newGame);
  modal.appendChild(modalWindow);

  modal.appendChild(modalOverlay);

  mainElem.appendChild(modal);
}
