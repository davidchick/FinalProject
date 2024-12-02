const shuffleButton = document.getElementById('shuffle');
const selectBooze = document.getElementById('poison');
const updatePlayer = document.getElementById('update-player');

shuffleButton.classList.add('hidden');

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
    const shuffle = document.getElementById('shuffle');
    shuffle.classList.remove('hidden');
    shuffle.value = `Shuffle ${booze} Cocktails`;
    while (drinksDiv.firstChild) {
      drinksDiv.removeChild(drinksDiv.firstChild);
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
      let cocktailText = document.createTextNode(cocktailName);
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

  //validate form

  let playerName = document.getElementById('name').value;
  let drinkOfChoice = '';
  let message = '';
  const drinksDiv = document.getElementById('drinks');

  for (const node of drinksDiv.childNodes) {
    if (node.classList.contains('selected')) {
      drinkOfChoice = node.childNodes[0].innerText;
    }
  }

  message = `${playerName} is served a delicious ${drinkOfChoice}. Let's play cards!`;
  
  const messageDiv = document.getElementById('message');
  const letsPlay = document.createTextNode(message);
  const h3El = document.createElement('h3');
  h3El.appendChild(letsPlay);
  messageDiv.innerHTML = '';
  messageDiv.appendChild(h3El);
  console.log(message);

});

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

let myDeck = getNewDeck();
let myCard = '';

const player1 = new CardPlayer('Buddy');
const player2 = new CardPlayer('Ree');

//Start the game, start rendering the page

let cardsDealt = 0;
let selectedCards = [];

renderHTML('h3', `${player1.name}'s hand`);

for (let i = 0; i < 6; i++) {

    myDeck = player1.drawACard(myDeck);
    renderCard(player1.hand[i]);

}

renderHTML('h3', `${player2.name}'s hand`);

for (let i = 0; i < 6; i++) {

    myDeck = player2.drawACard(myDeck);
    renderCard(player2.hand[i]);

}

console.log(myDeck.length);
