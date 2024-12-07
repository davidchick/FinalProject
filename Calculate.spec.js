describe('Calculate Hands', () => {
    it('Royal Flush', () => {
        let hand = [
            {suit: 'hearts', val: 10, displayVal: '10'},
            {suit: 'hearts', val: 11, displayVal: 'Jack'},
            {suit: 'hearts', val: 12, displayVal: 'Queen'},
            {suit: 'hearts', val: 13, displayVal: 'King'},
            {suit: 'hearts', val: 14, displayVal: 'Ace'},
        ];
      const results = calculateHand(hand);
      expect(results.rank).toBe(0);
      expect(results.hand).toBe('Royal Flush!!!');
      hand.reverse();
      expect(results.rank).toBe(0);
      expect(results.hand).toBe('Royal Flush!!!');
    });

    it('Straight Flush', () => {
        let hand = [
            {suit: 'hearts', val: 7, displayVal: '7'},
            {suit: 'hearts', val: 4, displayVal: '4'},
            {suit: 'hearts', val: 6, displayVal: '6'},
            {suit: 'hearts', val: 8, displayVal: '8'},
            {suit: 'hearts', val: 5, displayVal: '5'},
        ];
      const results = calculateHand(hand);
      expect(results.rank).toBe(1);
      expect(results.hand).toBe('Straight Flush');
      hand.reverse();
      expect(results.rank).toBe(1);
      expect(results.hand).toBe('Straight Flush');
    });

    it('Four Of A Kind', () => {
        let hand = [
            {suit: 'clubs', val: 6, displayVal: '6'},
            {suit: 'hearts', val: 11, displayVal: 'Jack'},
            {suit: 'diamonds', val: 6, displayVal: '6'},
            {suit: 'spades', val: 6, displayVal: '6'},
            {suit: 'hearts', val: 6, displayVal: '6'},
        ];
      const results = calculateHand(hand);
      expect(results.rank).toBe(2);
      expect(results.hand).toBe('Four Of A Kind');
      hand.reverse();
      expect(results.rank).toBe(2);
      expect(results.hand).toBe('Four Of A Kind');
    });

    it('Full House', () => {
        let hand = [
            {suit: 'hearts', val: 7, displayVal: '7'},
            {suit: 'clubs', val: 7, displayVal: '7'},
            {suit: 'diamonds', val: 7, displayVal: '7'},
            {suit: 'clubs', val: 3, displayVal: '3'},
            {suit: 'spades', val: 3, displayVal: '3'},
        ];
      const results = calculateHand(hand);
      expect(results.rank).toBe(3);
      expect(results.hand).toBe('Full House');
      hand.reverse();
      expect(results.rank).toBe(3);
      expect(results.hand).toBe('Full House');
    });

    it('Flush', () => {
        let hand = [
            {suit: 'hearts', val: 4, displayVal: '4'},
            {suit: 'hearts', val: 7, displayVal: '7'},
            {suit: 'hearts', val: 2, displayVal: '2'},
            {suit: 'hearts', val: 12, displayVal: 'Queen'},
            {suit: 'hearts', val: 14, displayVal: 'Ace'},
        ];
      const results = calculateHand(hand);
      expect(results.rank).toBe(4);
      expect(results.hand).toBe('Flush');
      hand.reverse();
      expect(results.rank).toBe(4);
      expect(results.hand).toBe('Flush');
    });

    it('Straight', () => {
        let hand = [
            {suit: 'clubs', val: 3, displayVal: '3'},
            {suit: 'hearts', val: 5, displayVal: '5'},
            {suit: 'clubs', val: 4, displayVal: '4'},
            {suit: 'spades', val: 7, displayVal: '7'},
            {suit: 'diamonds', val: 6, displayVal: '6'},
        ];
      const results = calculateHand(hand);
      expect(results.rank).toBe(5);
      expect(results.hand).toBe('Straight');
      hand.reverse();
      expect(results.rank).toBe(5);
      expect(results.hand).toBe('Straight');
    });

    it('Three Of A Kind', () => {
        let hand = [
            {suit: 'clubs', val: 14, displayVal: 'Ace'},
            {suit: 'hearts', val: 2, displayVal: '2'},
            {suit: 'spades', val: 14, displayVal: 'Ace'},
            {suit: 'diamonds', val: 14, displayVal: 'Ace'},
            {suit: 'hearts', val: 3, displayVal: '3'},
        ];
      const results = calculateHand(hand);
      expect(results.rank).toBe(6);
      expect(results.hand).toBe('Three Of A Kind');
      hand.reverse();
      expect(results.rank).toBe(6);
      expect(results.hand).toBe('Three Of A Kind');
    });

    it('Two Pair', () => {
        let hand = [
            {suit: 'clubs', val: 6, displayVal: '6'},
            {suit: 'hearts', val: 6, displayVal: '6'},
            {suit: 'diamonds', val: 13, displayVal: 'King'},
            {suit: 'hearts', val: 13, displayVal: 'King'},
            {suit: 'spades', val: 14, displayVal: 'Ace'},
        ];
      const results = calculateHand(hand);
      expect(results.rank).toBe(7);
      expect(results.hand).toBe('Two Pair');
      hand.reverse();
      expect(results.rank).toBe(7);
      expect(results.hand).toBe('Two Pair');
    });

    it('Pair', () => {
        let hand = [
            {suit: 'spades', val: 10, displayVal: '10'},
            {suit: 'clubs', val: 2, displayVal: '2'},
            {suit: 'hearts', val: 12, displayVal: 'Queen'},
            {suit: 'clubs', val: 13, displayVal: 'King'},
            {suit: 'hearts', val: 2, displayVal: '2'},
        ];
      const results = calculateHand(hand);
      expect(results.rank).toBe(8);
      expect(results.hand).toBe('Pair');
      hand.reverse();
      expect(results.rank).toBe(8);
      expect(results.hand).toBe('Pair');
    });

    it('High Card', () => {
        let hand = [
            {suit: 'hearts', val: 10, displayVal: '10'},
            {suit: 'hearts', val: 11, displayVal: 'Jack'},
            {suit: 'hearts', val: 12, displayVal: 'Queen'},
            {suit: 'clubs', val: 3, displayVal: '3'},
            {suit: 'hearts', val: 14, displayVal: 'Ace'},
        ];
      const results = calculateHand(hand);
      expect(results.rank).toBe(9);
      expect(results.hand).toBe(`${results.kicker.displayVal} High`);
      hand.reverse();
      expect(results.rank).toBe(9);
      expect(results.hand).toBe(`${results.kicker.displayVal} High`);
    });


});
