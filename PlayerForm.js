// calls the cocktail api and renders cocktails based on selected booze

const fetchDrinks = function(booze) {

  const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php';
  let url = '';
  booze === 'Non_Alcoholic' ? url = `${BASE_URL}?a=${booze}` : url = `${BASE_URL}?i=${booze}`;
  
  fetch(url)
    .then(function(data) {
      return data.json();
    })
    .then(function(responseJson) {

      //console.log(responseJson);

      let drinks = responseJson.drinks;

      shuffleButton.classList.remove('hidden');
      enclosingDrinksDiv.classList.remove('hidden');
      drinksDiv.classList.remove('invalid');
      drinksSmall.textContent = '';
      while (drinksDiv.firstChild) {
        drinksDiv.removeChild(drinksDiv.firstChild);
      }
  
      let picked = [];

      for (let j=0; j < 5; j++) {

        let rnd = Math.floor(Math.random() * drinks.length);
        while (picked[rnd]) {
          rnd = Math.floor(Math.random() * drinks.length);
        }
        picked[rnd] = true;

        let cocktailName = drinks[rnd].strDrink;
  
        let cocktailDiv = document.createElement('div');
        cocktailDiv.classList.add('column');
        cocktailDiv.setAttribute('id', cocktailName);
        drinksDiv.append(cocktailDiv);

        let pEl = document.createElement('p');
        pEl.innerText = cocktailName;
        cocktailDiv.appendChild(pEl);

        let cocktailImg = document.createElement('img');
        cocktailImg.setAttribute('src', `${drinks[rnd].strDrinkThumb}/preview`);
        cocktailDiv.appendChild(cocktailImg);
  
        cocktailDiv.addEventListener('click', () => {
          for (const childNode of drinksDiv.childNodes) {
            childNode.classList.remove('selected');
          }
        cocktailDiv.classList.add('selected');
        });
      };
    });

};
  
// event listeners for form elements

selectBooze.addEventListener('change', (e) => {
  fetchDrinks(selectBooze.value);  
});
  
shuffleButton.addEventListener('click', (e) => {
  fetchDrinks(selectBooze.value);
});
  
savePlayer.addEventListener('click', (e) => {
  e.preventDefault();
  
  if (formIsValid()) {
    playGame();
  }
  
});

updatePlayerButton.addEventListener('click', (e) => {
  theForm.classList.remove('hidden');
});

newGameButton.addEventListener('click', (e) => {
  localStorage.removeItem('player1hand');
  localStorage.removeItem('player2hand');
  localStorage.removeItem('selectedCards');
  localStorage.removeItem('thedeck');
  playGame();
  window.location.reload();

});

callButton.addEventListener('click', (e) => {
  let result = '';
  console.log('Who won?');
  let player1result = calculateHand(getSetCards('player1hand'));
  let player2result = calculateHand(getSetCards('player2hand'));

  result = `${playerName()}: ${player1result.hand} The Dealer: ${player2result.hand}`;
  window.alert(result);

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
  
}

  