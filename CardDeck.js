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

    //console.log(`chosen card: ${chosenCard.id} cards remaining: ${deck.length}`)
  return (deck);

}

// render card html

const renderCard = function(card, faceUp) {

  const suitCodes = {
    spades: '\u2660',
    hearts: '\u2665',
    clubs: '\u2663',
    diamonds: '\u2666'
  };

  const divEl = document.createElement("div");
  divEl.id = card.id;

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
    divEl.myParam = card;

  }

  return divEl;

}

// tbd - what happens when a face-up card is clicked

let selectedDiv = [];

const selectCards = function() {

  const divEl = this;

  if (divEl.style.background === 'white') {
    
    divEl.style.background = 'lightblue';

    selectedDiv.push(divEl);

    if (selectedDiv.length > 2) {

      selectedDiv[0].style.background = "white";
    
      selectedDiv.shift();

      }        

    } else {

      divEl.style.background = 'white';

      selectedDiv = selectedDiv.filter((div) => div.getAttribute('id') !== divEl.getAttribute('id'));

    }

}

//  what to do with a face down card

const flipCard = function(evt) {

  //window.alert(evt.currentTarget.myParam.id);

  let targetCard = evt.currentTarget.myParam;
  evt.currentTarget.insertAdjacentElement('afterend', renderCard(targetCard, true));
  evt.currentTarget.remove();

  const timeFunc = function(thing) {
    document.getElementById(targetCard.id).insertAdjacentElement('afterend', renderCard(targetCard));
    document.getElementById(targetCard.id).remove();

  }

  setTimeout(function() {
    timeFunc();
  }, 1000);

}

// render any tag within the cards div

const renderHTML = function(tag, text) {

  const pEl = document.createElement(tag);
  
  if (text) {
      const pTextNode = document.createTextNode(text);
      pEl.appendChild(pTextNode);
  }

  cardsDiv.appendChild(pEl);

}

// get or set cards

const getSetCards = function(player, cards) {
  if (cards) {
    let cardsJSON = JSON.stringify(cards);
    localStorage.setItem(player, cardsJSON);
    //console.log(cardsJSON);
    return cards;
  } else {
    let cardsJSON = localStorage.getItem(player);
    return JSON.parse(cardsJSON);
  }
}