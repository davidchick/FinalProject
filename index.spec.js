describe('Final Project Tests', () => {

    it('should remember a player name', () => {
        let newName = playerName('Johanna');
        const results = playerName();
        expect(results).toBe('Johanna');
    });

    it('should blah', () => {
        let num = 1;
        const results = num;
        expect(results).toBe(1);
    });

    it('should yaaaah', () => {
        const results = yahFunc();
        expect(results).toBe('Yaaaah');
    });

});