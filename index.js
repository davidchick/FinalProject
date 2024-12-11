const theForm = document.getElementsByTagName('form')[0];
const inputName = document.getElementById('name');
const nameSmall = inputName.parentElement.getElementsByTagName('small')[0];
const selectBooze = document.getElementById('poison');
const boozeSmall = selectBooze.parentElement.getElementsByTagName('small')[0];
const enclosingDrinksDiv = document.getElementById('enclosing-drinks');
const drinksDiv = document.getElementById('drinks');
const drinksSmall = drinksDiv.parentElement.getElementsByTagName('small')[0];
const shuffleButton = document.getElementById('shuffle');
const savePlayer = document.getElementById('save-player');
const messageDiv = document.getElementById('message');
const cardsDiv = document.getElementById('cards');
const actionsDiv = document.getElementById('actions');
const updatePlayerButton = document.getElementById('update-player');
const newGameButton = document.getElementById('new-game');
const callButton = document.getElementById('call');

shuffleButton.classList.add('hidden');
enclosingDrinksDiv.classList.add('hidden');

let selectedCards = [];
let player1 = {};
let player2 = {};
let cocktailID = 0;
let numberOfPeeks = 2;
let numberOfDraws = 2;

class CardPlayer {
  constructor (name) {
    this.name = name;
    this.hand = [];
    this.drinkOfChoice = '';
  };

  drawACard(deck) {
   const {hand} = this;
      deck = drawACard(deck);
      hand.push(deck.shift());
      return deck;
   };
};

//sets or gets player one's name from local storage

const playerName = function(name) {
  if (name) {
    localStorage.setItem('player1name', name);
    return name;
  } else {
    return localStorage.getItem('player1name');
  }
}

// sets or gets player one's  drink of choice from local storage

const drinkOfChoice = function(drink) {
  if (drink) {
    localStorage.setItem('player1drinkofchoice', drink);
    return drink;
  } else {
    return localStorage.getItem('player1drinkofchoice');
  }
}

// play the game

const playGame = function() {

  theForm.classList.add('hidden');
  actionsDiv.classList.remove('hidden');

  player1.name ? player1.name = inputName.value : player1 = new CardPlayer(playerName(inputName.value));
  player2.name ? player2.name = 'The Dealer' : player2 = new CardPlayer('The Dealer');
  
  let myDeck = getSetCards('thedeck') || getNewDeck();

  player1.hand = getSetCards('player1hand') || [];
  player2.hand = getSetCards('player2hand') || [];

  player2.drinkOfChoice = 'Gin and Tonic';

  inputName.value = playerName();

  let message = `Welcome, ${playerName()}! Please enjoy this delicious ${drinkOfChoice()}.`;

  messageDiv.innerHTML = '';
  messageDiv.appendChild(renderHTML('h3', message));

  cardsDiv.innerHTML = '';
  cardsDiv.appendChild(renderHTML('h4', 'Your hand:'));

  
  while (player1.hand.length < 5) {
    myDeck = player1.drawACard(myDeck);
  }

  getSetCards('player1hand', player1.hand);

  for (const card of player1.hand) {
    cardsDiv.appendChild(renderCard(card, true));
  }

  const tradeButton = document.createElement('button');
  tradeButton.innerText = 'Draw';
  tradeButton.classList.add('btn');
  tradeButton.classList.add('btn-primary');
  tradeButton.id = 'tradeButton';
  tradeButton.disabled = true;

  
  tradeButton.addEventListener('click', () => {

    if (numberOfDraws) {

      numberOfDraws--;
      
      const selectedCardsJSON = localStorage.getItem('selectedCards'); 
      selectedCards = JSON.parse(selectedCardsJSON) || [];

      player1.hand = getSetCards('player1hand', selectedCards);

      localStorage.removeItem('selectedCards');
      selectedCards = [];

      //console.log(numberOfDraws);

      playGame();

    } else {
      tradeButton.disabled = true;
    }
  
  });

  cardsDiv.appendChild(tradeButton);
  cardsDiv.appendChild(renderHTML('p', 'Pick the cards you want to keep, then click \'Draw\' (you must keep at least 2).'));
  cardsDiv.appendChild(renderHTML('h4', `${player2.name}'s hand:`));

  while (player2.hand.length < 5) {
    myDeck = player2.drawACard(myDeck);
  }

  getSetCards('player2hand', player2.hand);

  for (const card of player2.hand) {
    cardsDiv.appendChild(renderCard(card));
  }

  getSetCards('thedeck', myDeck);

  //console.log(getSetCards('player1hand'));
  console.log(`cards left: ${myDeck.length}`);

}

if (playerName() && drinkOfChoice()) {
  playGame();
}
