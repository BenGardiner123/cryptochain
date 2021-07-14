const cryptoHash = require("./crypto-hash");

describe('cryptoHash()', () => {
    it('generates a SHA-256 hashed output', () => {
        expect(cryptoHash('benshash'))
        .toEqual('050c8bad06c3202d1285d40a9c9d55b1a96dad1d72ed43998ef4dbbfb4b7b5d8');
    });
    it('produces the same hash with the same input arguments ni any order', () => {
        expect(cryptoHash('one', 'two', 'three')).toEqual(cryptoHash('three', 'one', 'two'));
    });
});