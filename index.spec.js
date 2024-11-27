describe('Final Project Tests', () => {
    it('should do math', () => {
        let testVal = 3;
        const results = doSomeMath(testVal);
        expect(results).toBe(-21);
    });

    it('eat dirt', () => {
        let dirt = 'eat dirt';
        const runIt = eatTheDirt(dirt);
        expect(runIt).toBe('yum');
    });
});