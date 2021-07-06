const Block = require("./block");
const { GENESIS_DATA } = require("./config");
const cryptoHash = require("./crypto-hash");

describe('Block', () => {
    const timestamp = 'a-date';
    const lastHash = 'foo-hash';
    const hash = 'bar-hash';
    const data = ['blockchain', 'data'];
    const nonce = 1;
    const difficulty =1;
    //shortcut way to write this below inline without the this.timestamp = timestamp
    const block = new Block({ timestamp, lastHash, hash, data, nonce, difficulty});

    it('has a timestamp, lastHash, hash and data property', () => {
        expect(block.timestamp).toEqual(timestamp);
        expect(block.lastHash).toEqual(lastHash);
        expect(block.hash).toEqual(hash);
        expect(block.data).toEqual(data);
        expect(block.nonce).toEqual(nonce);
        expect(block.difficulty).toEqual(difficulty);
    });

    describe('genesis()', () => {
        const genesisBlock = Block.genesis();
        // console.log('this is the genesis block', genesisBlock)

        it('returns a Block instance', () => {
            expect(genesisBlock instanceof Block).toBe(true);
        });
        
        it('returns the genesis data', ()=> {
            expect(genesisBlock).toEqual(GENESIS_DATA);
        });

    });

    describe('mineBlock()', ()=>{
        const lastBlock = Block.genesis();
        const data = 'mined data';
        const mineBlock = Block.mineBlock({lastBlock, data});

        it('returns a Block istance', () => {
            expect(mineBlock instanceof Block).toBe(true);
        });
        it('sets the `lastHash` to be the `hash` of the lastBlock', () =>{
            expect(mineBlock.lastHash).toEqual(lastBlock.hash); 
        });
        it('sets the data', () => {
            expect(mineBlock.data).toEqual(data);
        });
        it('sets a `timestamp`', ()=> {
            expect(mineBlock.timestamp).not.toEqual(undefined);
        });
        it('creates a SHA-256 `hash` based on the proper inputs', ()=> {
            expect(mineBlock.hash)
            .toEqual(
                cryptoHash(
                    mineBlock.timestamp, 
                    mineBlock.nonce,
                    mineBlock.difficulty,
                    lastBlock.hash, 
                    data
                )
            );
        });
        it('sets a `hash` that meets the difficulty critera', ()=>{
            expect(mineBlock.hash.substring(0, mineBlock.difficulty))
                .toEqual('0'.repeat(minedBlock.difficulty));
        })
    });

    
});

