const Block = require("./block");

describe('Block', () => {
    const timestamp = 'a-date';
    const lastHash = 'foo-hash';
    const hash = 'bar-hash';
    const data = ['blockchain', 'data'];
    //shortcut way to write this below inline without the this.timestamp = timestamp
    const block = new Block({ timestamp, lastHash, hash, data});

    it('has a timestamp, lastHash, hash and data property', () => {
        expect(block.timestamp).toEqual(timestamp);
        expect(block.lastHash).toEqual(lastHash);
        expect(block.hash).toEqual(hash);
        expect(block.data).toEqual(data);
    });
});

