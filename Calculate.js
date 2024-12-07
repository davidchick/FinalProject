// https://www.cardplayer.com/rules-of-poker/hand-rankings
// 1. Royal flush
// 2. Straight flush
// 3. Four of a kind
// 4. Full house
// 5. Flush
// 6. Straight
// 7. Three of a kind
// 8. Two pair
// 9. Pair
// 10. High Card


// a function to calculate a player's hand

const calculateHand = function(hand) {

    const handAttributes = {
        handArray: [],
        suits: {},
        pair1: '',
        pair2: '',
        highCard: 0,
        lowCard: 15,
        straight: false,
        flush: false,
        pair: false,
        threeOfAKind: false,
        fourOfAKind: false,
        twoPair: false,
        fullHouse: false,
        straightFlush: false,
        royalFlush: false,
        kicker: {},
    };
    
    const result = {
        hand: '',
        rank: 0,
        kicker: {},
    };

    for (card of hand) {

        let val = card.val;
        let displayVal = card.displayVal;
        let suit = card.suit;

        handAttributes.suits[suit] = true;

        if (val > handAttributes.highCard) {
            handAttributes.highCard = val;
            handAttributes.kicker = card;
        }

        if (val < handAttributes.lowCard) {
            handAttributes.lowCard = val;
        }

        if (handAttributes.handArray[val]) {
            if ((handAttributes.pair) && (displayVal !== handAttributes.pair1)){
                handAttributes.twoPair = true;
                handAttributes.pair2 = displayVal;
            } else if (handAttributes.pair) {
                if (handAttributes.threeOfAKind) {
                    handAttributes.fourOfAKind = true;
                } else {
                    handAttributes.threeOfAKind = true;
                }
            } else {
                handAttributes.pair = true;
                handAttributes.pair1 = displayVal;
            }
        } else {
            handAttributes.handArray[val] = true;
        };

    };

    if (Object.keys(handAttributes.suits).length === 1) {
        handAttributes.flush = true;
    }

    if ((handAttributes.highCard - handAttributes.lowCard === 4) && (!handAttributes.pair)) {
        if ((handAttributes.highCard === 14) && (handAttributes.flush === true)) {
            handAttributes.royalFlush = true;
        } else if (handAttributes.flush === true) {
            handAttributes.straightFlush = true;
        } else {
            handAttributes.straight = true;
        }
    }
    
    if (handAttributes.threeOfAKind && handAttributes.twoPair) {
        handAttributes.fullHouse = true;
    }

    if (handAttributes.royalFlush) {
        result.hand = "Royal Flush!!!";
        result.rank = 0;
        result.kicker = handAttributes.highCard;
    } else if (handAttributes.straightFlush) {
        result.hand = "Straight Flush";
        result.rank = 1;
        result.kicker = handAttributes.highCard;
    } else if (handAttributes.fourOfAKind) {
        result.hand = "Four Of A Kind";
        result.rank = 2;
        result.kicker = handAttributes.highCard;
    } else if (handAttributes.fullHouse) {
        result.hand = "Full House";
        result.rank = 3;
        result.kicker = handAttributes.highCard;
        result.pair1 = handAttributes.pair1;
        result.pair2 = handAttributes.pair2;
    } else if (handAttributes.flush) {
        result.hand = "Flush";
        result.rank = 4;
        result.kicker = handAttributes.highCard;
        result.suit = Object.keys(handAttributes.suits)[0];
    } else if (handAttributes.straight) {
        result.hand = "Straight";
        result.rank = 5;
        result.kicker = handAttributes.highCard;
    } else if (handAttributes.threeOfAKind) {
        result.hand = "Three Of A Kind";
        result.rank = 6;
        result.kicker = handAttributes.highCard;
        result.pair1 = handAttributes.pair1;
    } else if (handAttributes.twoPair) {
        result.hand = "Two Pair";
        result.rank = 7;
        result.kicker = handAttributes.highCard;
        result.pair1 = handAttributes.pair1;
        result.pair2 = handAttributes.pair2;
    } else if (handAttributes.pair) {
        result.hand = "Pair";
        result.rank = 8;
        result.kicker = handAttributes.highCard;
        result.pair1 = handAttributes.pair1;
    } else {
        result.hand = `${handAttributes.kicker.displayVal} High`;
        result.rank = 9;
        result.kicker = handAttributes.kicker;
    }

    return result;

};

const determineWinner = function(player1, dealer) {

    let message = '';

    if (player1.rank < dealer.rank) {
        message = `${playerName()} wins!!! ${player1.hand} over ${dealer.hand}.`;
    } else if (player1.rank > dealer.rank) {
        message = `The Dealer wins. ${dealer.hand} over ${player1.hand}.`;
    } else if ((player1.rank === 9) && (player2.rank === 9)) {
        if (player1.kicker.val > player2.kicker.val) {
            message = `${playerName()} wins!!! ${player1.hand} over ${dealer.hand}.`;
        } else if (player2.kicker.val > player1.kicker.val) {
            message = `The Dealer wins. ${dealer.hand} over ${player1.hand}.`;
        } else {
            message = `Tie! ${dealer.hand} and ${player1.hand}.`;
        }
    } else {
        message = `Tie! ${dealer.hand} and ${player1.hand}.`;
    }

    return message;

}