const cryptoHash = require("./crypto-hash");

describe('cryptoHash()', () => {
    it('generates a SHA-256 hashed output', () => {
        expect(cryptoHash('benshash'))
        .toEqual('5b6087607606b204c3994cc29711536022d65ac4aef7b9e78e848ea1052d3a3e');
    });
    it('produces the same hash with the same input arguments ni any order', () => {
        expect(cryptoHash('one', 'two', 'three')).toEqual(cryptoHash('three', 'one', 'two'));
    });
    it('produces a unique hash when the properties have changed on an input', () => {
        const foo = {};
        const originalHash = cryptoHash(foo);
        foo['a'] = 'a';
        
        expect(cryptoHash(foo)).not.toEqual(originalHash);

    });
});