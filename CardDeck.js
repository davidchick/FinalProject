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

const renderCard = function(card) {

  const suitCodes = {
    spades: '\u2660',
    hearts: '\u2665',
    clubs: '\u2663',
    diamonds: '\u2666'
  };

  //cardsDealt++;

  const divEl = document.createElement("div");

  const divTextNode = document.createTextNode(`${card.displayVal}`);
  divEl.appendChild(divTextNode);

  const brEl = document.createElement("br");
  divEl.appendChild(brEl);

  const divText2Node = document.createTextNode(`${suitCodes[card.suit]}`);
  divEl.appendChild(divText2Node);

  divEl.className = "rcorners";
  divEl.id = card.id;
  divEl.tabIndex = cardsDealt;
  divEl.style.background = 'white';

  if (card.suit === 'hearts' || card.suit === 'diamonds') {
      divEl.style.color = 'red';
  }

  divEl.addEventListener("click", (event) => {

      if (divEl.style.background === 'white') {
      
          divEl.style.background = 'lightblue';

          selectedCards.push(card);

          if (selectedCards.length > 2) {

              document.getElementById(selectedCards[0].id).style.background = "white";
      
              selectedCards.shift();

          }        

      } else {

          divEl.style.background = 'white';

          selectedCards = selectedCards.filter((scard) => scard.id !== card.id);

      }

  }); 

  const body = document.getElementById('cards');
  body.appendChild(divEl);

}

const renderHTML = function(tag, text) {

  const pEl = document.createElement(tag);
  
  if (text) {
      const pTextNode = document.createTextNode(text);
      pEl.appendChild(pTextNode);
  }

  const body = document.getElementById('cards');
  body.appendChild(pEl);

}