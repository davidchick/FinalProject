const theForm = document.getElementsByTagName('form')[0];
const inputName = document.getElementById('name');
const nameSmall = inputName.parentElement.getElementsByTagName('small')[0];
const selectBooze = document.getElementById('poison');
const boozeSmall = selectBooze.parentElement.getElementsByTagName('small')[0];
const drinksDiv = document.getElementById('drinks');
const drinksSmall = drinksDiv.getElementsByTagName('small')[0];
const shuffleButton = document.getElementById('shuffle');
const updatePlayer = document.getElementById('update-player');
const messageDiv = document.getElementById('message');
const cardsDiv = document.getElementById('cards');
shuffleButton.classList.add('hidden');

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

const playerName = function(name) {
  if (name) {
    localStorage.setItem('player1name', name);
    return name;
  } else {
    return localStorage.getItem('player1name');
  }
}

const drinkOfChoice = function(drink) {
  if (drink) {
    localStorage.setItem('p1drinkofchoice', drink);
    return drink;
  } else {
    return localStorage.getItem('p1drinkofchoice');
  }
}

const fetchDrinks = function(booze) {

  const drinksDiv = document.getElementById('drinks');
  const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php';
  let url = `${BASE_URL}?i=${booze}`;
  booze === 'Non_Alcoholic'? url = `${BASE_URL}?a=${booze}`: `${BASE_URL}?i=${booze}`;

  fetch(url)
  .then(function(data) {
    return data.json();
  })
  .then(function(responseJson) {
    console.log(responseJson);
    let drinks = responseJson.drinks;
    shuffleButton.classList.remove('hidden');

    let i = 0;
    while (drinksDiv.firstChild) {
        drinksDiv.removeChild(drinksDiv.firstChild);
        i++;
        //console.log(`${i} ${drinksDiv.firstChild}`);
    }

    let picked = [];

    for (let i=0; i < 5; i++) {
      let rnd = Math.floor(Math.random() * drinks.length);
      while (picked[rnd]) {
        rnd = Math.floor(Math.random() * drinks.length);
      }
      picked[rnd] = true;
      let cocktailName = drinks[rnd].strDrink;

      let cocktailDiv = document.createElement('div');
      cocktailDiv.classList.add('form-group');
      cocktailDiv.classList.add('column');
      cocktailDiv.setAttribute('id', cocktailName);
      drinksDiv.append(cocktailDiv);
      let p = document.createElement('p');
      p.innerText = cocktailName;
      cocktailDiv.appendChild(p);
      let cocktailImg = document.createElement('img');
      cocktailImg.setAttribute('src', `${drinks[rnd].strDrinkThumb}/preview`);
      cocktailDiv.appendChild(cocktailImg);

      cocktailDiv.addEventListener('click', (e) => {
        for (const node of drinksDiv.childNodes) {
          node.classList.remove('selected');
        }
        cocktailDiv.classList.add('selected');
      });

    };
  });
};

selectBooze.addEventListener('change', (e) => {
  fetchDrinks(selectBooze.value);  
});

shuffleButton.addEventListener('click', (e) => {
  fetchDrinks(selectBooze.value);
});

updatePlayer.addEventListener('click', (e) => {
  e.preventDefault();

  if (formIsValid()) {
    playGame();
  }

});

const formIsValid = function() {

  let nameIsValid = false;

  if (inputName.value.length < 2) {
    inputName.classList.add('invalid');
    nameSmall.textContent = 'Name must be at least two characters.';
  } else {
    inputName.classList.remove('invalid');
    nameSmall.textContent = '';
    playerName(inputName.value);
    nameIsValid = true;
  }

  let boozeIsValid = false;

  if (selectBooze.value === 'choose') {
    selectBooze.classList.add('invalid');
    boozeSmall.textContent = 'Please choose one.';
  } else {
    selectBooze.classList.remove('invalid');
    boozeSmall.textContent = '';
    boozeIsValid = true;
  }

  let cocktailIsValid = false;

  for (const node of drinksDiv.childNodes) {
    //console.log('contains: ' + node.classList.contains('selected'));
    if (node.classList.contains('selected')) {
      drinkOfChoice(node.childNodes[0].innerText);
      cocktailIsValid = true;
      break;
    }
  }

  if (!cocktailIsValid) {
    drinksDiv.classList.add('invalid');
    drinksSmall.textContent = 'Please select a cocktail.';
  } else {
    drinksDiv.classList.remove('invalid');
    drinksSmall.textContent = '';
  }

  if (nameIsValid && boozeIsValid && cocktailIsValid) {
    return true;
  } else {
    return false;
  }

};



let playGame = function() {

  const player1 = new CardPlayer(playerName());
  const player2 = new CardPlayer('The Dealer');

  let myDeck = getSetCards('thedeck') || getNewDeck();
  //player1.name = playerName();

  player1.drinkOfChoice = drinkOfChoice();
  player2.drinkOfChoice = 'Gin and Tonic';

  player1.hand = getSetCards('player1hand') || [];
  player2.hand = getSetCards('player2hand') || [];

  inputName.value = playerName();

  let message = `${player1.name} is served a delicious ${player1.drinkOfChoice}. Let's play cards!`;
  
  const letsPlay = document.createTextNode(message);
  const h3El = document.createElement('h3');
  h3El.appendChild(letsPlay);
  messageDiv.innerHTML = '';
  messageDiv.appendChild(h3El);

  cardsDiv.innerHTML = '';

  renderHTML('h4', `${player1.name}'s hand:`);

  while (player1.hand.length < 6) {
    myDeck = player1.drawACard(myDeck);
  }

  getSetCards('player1hand', player1.hand);

  for (const card of player1.hand) {
    renderCard(card);
  }

  renderHTML('h4', `${player2.name}'s hand:`);

  while (player2.hand.length < 6) {
    myDeck = player2.drawACard(myDeck);
  }

  getSetCards('player2hand', player2.hand);

  for (const card of player2.hand) {
    renderCard(card);
  }

  getSetCards('thedeck', myDeck);

  console.log(`cards left: ${myDeck.length}`)

}

if (getSetCards('player1hand')) {
  //console.log(getSetCards('player1hand'));
  playGame();
}
