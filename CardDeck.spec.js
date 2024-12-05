describe('CardDeck tests', () => {
    it('should create a deck', () => {
      let myDeck = getNewDeck();
      const results = myDeck.length;
      expect(results).toBe(52);
    });

    it('26th card should ace of clubs', () => {
      let myDeck = getNewDeck();
      const results = myDeck[26];
      expect(results.displayVal).toBe('Ace');
      expect(results.suit).toBe('clubs');
    });

});