const theForm = document.getElementsByTagName('form')[0];
const inputName = document.getElementById('name');
const nameSmall = inputName.parentElement.getElementsByTagName('small')[0];
const selectBooze = document.getElementById('poison');
const boozeSmall = selectBooze.parentElement.getElementsByTagName('small')[0];
const enclosingDrinksDiv = document.getElementById('enclosing-drinks');
const drinksDiv = document.getElementById('drinks');
const drinksSmall = drinksDiv.parentElement.getElementsByTagName('small')[0];
const shuffleButton = document.getElementById('shuffle');
const updatePlayer = document.getElementById('update-player');
const messageDiv = document.getElementById('message');
const cardsDiv = document.getElementById('cards');

shuffleButton.classList.add('hidden');
enclosingDrinksDiv.classList.add('hidden');

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

//sets or gets a player name from local storage

const playerName = function(name) {
  if (name) {
    localStorage.setItem('player1name', name);
    return name;
  } else {
    return localStorage.getItem('player1name');
  }
}

// sets or gets a drink of choice from local storage

const drinkOfChoice = function(drink) {
  if (drink) {
    localStorage.setItem('p1drinkofchoice', drink);
    return drink;
  } else {
    return localStorage.getItem('p1drinkofchoice');
  }
}

// play the game

const playGame = function() {

  const player1 = new CardPlayer(playerName());
  const player2 = new CardPlayer('The Dealer');

  let myDeck = getSetCards('thedeck') || getNewDeck();

  player1.drinkOfChoice = drinkOfChoice();
  player2.drinkOfChoice = 'Gin and Tonic';

  player1.hand = getSetCards('player1hand') || [];
  player2.hand = getSetCards('player2hand') || [];

  inputName.value = playerName();

  let message = `Welcome, ${player1.name}! Please enjoy this delicious ${player1.drinkOfChoice}. Let's play cards!`;

  messageDiv.innerHTML = '';
  messageDiv.appendChild(renderHTML('h3', message));

  cardsDiv.innerHTML = '';
  cardsDiv.appendChild(renderHTML('h4', 'Your hand:'));

  while (player1.hand.length < 6) {
    myDeck = player1.drawACard(myDeck);
  }

  getSetCards('player1hand', player1.hand);

  for (const card of player1.hand) {
    cardsDiv.appendChild(renderCard(card, true));
  }

  cardsDiv.appendChild(renderHTML('h4', `${player2.name}'s hand:`));

  while (player2.hand.length < 6) {
    myDeck = player2.drawACard(myDeck);
  }

  getSetCards('player2hand', player2.hand);

  for (const card of player2.hand) {
    cardsDiv.appendChild(renderCard(card));
  }

  getSetCards('thedeck', myDeck);

  //console.log(`cards left: ${myDeck.length}`)

}

if (getSetCards('player1hand')) {
  playGame();
}
