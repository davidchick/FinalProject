let testVar = 9;

const doSomeMath = function(num) {
    num += num - Math.pow(num, 3);
    return num;
};

const eatTheDirt = function(line = 'nah') {

    if (line === 'eat dirt') {
      return 'yum';
    } else {
      return 'no thanks';
    }
  
  };

//console.log(doSomeMath(testVar));

//let's build a form




let myDeck = getNewDeck();
let myCard = '';
let counter = 1;

while (myDeck.length) {
  myDeck = drawACard(myDeck);
  myCard = myDeck.shift();
  //console.log(`counter: ${counter} my card: ${myCard.id} my deck has ${myDeck.length} cards left.`);
  counter++;
}


const fetchDrinks = function(booze) {

  const drinksDiv = document.getElementById('drinks');
  const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php';
  let url = `${BASE_URL}?i=${booze}`;

  fetch(url)
  .then(function(data) {
    return data.json();
  })
  .then(function(responseJson) {
    console.log(responseJson);

  let drinks = responseJson.drinks;
  let drinksHTML = '';

  for (let i=0; i < 3; i++) {
    let rnd = Math.floor(Math.random() * drinks.length);
    drinksHTML = drinksHTML.concat(`<div class="column">${drinks[rnd].strDrink}<br><img src="${drinks[rnd].strDrinkThumb}/preview"><br></div>`)
  };
    drinksDiv.innerHTML = drinksHTML;
  });
};

fetchDrinks('Gin');
