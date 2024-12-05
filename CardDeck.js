//returns a new, ordered deck of 52 cards

const getNewDeck = function() {
    const deck = [];
    const suits = ['hearts', 'spades', 'clubs', 'diamonds'];

    for (suit of suits) {
      
      for (let j = 1; j <= 13; j++) {
  
        let displayVal = '';
        let value = 0;
  
        switch (j) {
          case 1:
            displayVal = 'Ace';
            value = 1;
            break
          case 11:
            displayVal = 'Jack';
            value = 10;
            break
          case 12:
            displayVal = 'Queen';
            value = 10;
            break
          case 13:
            displayVal = 'King';
            value = 10;
            break
          default:
            displayVal = j;
            value = j;
        }
  
        const card = {
          val: value,
          displayVal: displayVal.toString(),
          suit: suit,
          id: `${displayVal.toString()}of${suit}`
        }
        deck.push(card);
      }
    }
    return deck;
}

// draws a random card and puts it on top of the deck

const drawACard = function(deck) {

  let cardsLeft = deck.length;
  let cardNumber = Math.floor(Math.random() * cardsLeft);
  let chosenCard = deck[cardNumber];
 
  deck.splice(cardNumber, 1);
  deck.unshift(chosenCard);

  return (deck);

}

// renders card html, face up or face down. returns an HTML element.

const renderCard = function(card, faceUp) {

  const suitCodes = {
    spades: '\u2660',
    hearts: '\u2665',
    clubs: '\u2663',
    diamonds: '\u2666'
  };

  const divEl = document.createElement("div");
  divEl.id = card.id;

  divEl.myParam = card;

  if (faceUp) {

    divEl.className = "rcorners";

    const displayText = document.createTextNode(card.displayVal);
    divEl.appendChild(displayText);

    const brEl = document.createElement("br");
    divEl.appendChild(brEl);

    const displaySuit = document.createTextNode(suitCodes[card.suit]);
    divEl.appendChild(displaySuit);

    divEl.style.background = 'white';

    if (card.suit === 'hearts' || card.suit === 'diamonds') {
        divEl.style.color = 'red';
    }

    divEl.addEventListener('click', selectCards);

  } else {

    divEl.className = "rcorners-facedown";

    let filler = '';

    for (let i=0; i < 15; i++) {
      filler = filler.concat(suitCodes.diamonds)
    }

    for (let j = 0; j < 11; j++) {
      const fillerText = document.createTextNode(filler);
      const fillerP = document.createElement('p');
      fillerP.appendChild(fillerText);
      divEl.appendChild(fillerP);
    }

    divEl.addEventListener('click', flipCard);

  }

  return divEl;

}

// what happens when a face-up card is clicked

const selectCards = function(evt) {

  const targetCard = evt.currentTarget.myParam;
  const cardDiv = evt.currentTarget;

  if (cardDiv.style.background === 'white') {
    
    cardDiv.style.background = 'lightblue';

    selectedCards.push(targetCard);

    if (selectedCards.length > 4) {

      document.getElementById(selectedCards[0].id).style.background = "white";
      selectedCards.shift();

    }        

  } else {

    cardDiv.style.background = 'white';
    selectedCards = selectedCards.filter((card) => card.id !== cardDiv.getAttribute('id'));

  }

  if (selectedCards.length > 1) {
    document.getElementById('tradeButton').disabled = false;
  } else {
    document.getElementById('tradeButton').disabled = true;
  }

  const selectedCardsJSON = JSON.stringify(selectedCards);
  localStorage.setItem('selectedCards', selectedCardsJSON);

}

//  what happens when a face-down card is clicked

const flipCard = function(evt) {

  let targetCard = evt.currentTarget.myParam;
  evt.currentTarget.insertAdjacentElement('afterend', renderCard(targetCard, true));
  evt.currentTarget.remove();

  const timeFunc = function() {
    document.getElementById(targetCard.id).insertAdjacentElement('afterend', renderCard(targetCard));
    document.getElementById(targetCard.id).remove();
  }

  setTimeout(function() {
    timeFunc();
  }, 1000);

}

// build an HTML element with or without text

const renderHTML = function(tag, text) {

  const tagEl = document.createElement(tag);
  if (text) {
      const tagTextNode = document.createTextNode(text);
      tagEl.appendChild(tagTextNode);
  }
  return tagEl;

}

// get or set cards from local storage

const getSetCards = function(player, cards) {

  if (cards) {
    let cardsJSON = JSON.stringify(cards);
    localStorage.setItem(player, cardsJSON);
    return cards;
  } else {
    let cardsJSON = localStorage.getItem(player);
    return JSON.parse(cardsJSON);
  }

}