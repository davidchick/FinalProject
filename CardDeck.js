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


  