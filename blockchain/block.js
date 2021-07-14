const { GENESIS_DATA, MINE_RATE } = require('../config');
const cryptoHash = require('../util/crypto-hash');
const hexToBinary = require('hex-to-binary');


class Block {
    constructor({ timestamp, lastHash, hash, data, nonce, difficulty }) {
        this.timestamp = timestamp
        this.lastHash = lastHash
        this.hash = hash
        this.data = data
        this.nonce = nonce
        this.difficulty = difficulty
    }

    //this pattern used herer whereby we use a method to create an instance of a class directly using the constructor method
    //this is called the factory pattern
    static genesis() {
        return new this(GENESIS_DATA);
    }

    static mineBlock({ lastBlock, data }) {
        //https://passwordsgenerator.net/sha256-hash-generator/

        const lastHash = lastBlock.hash;
        let hash, timestamp;
        let { difficulty } = lastBlock;
        let nonce = 0;

        do {
            nonce++;
            timestamp = Date.now();
            difficulty = Block.adjustDifficulty({originalBlock: lastBlock, timestamp})
            hash = cryptoHash(timestamp, lastHash, data, nonce, difficulty);
            //below the hex code is converted to the binary version so as not to clutter the console 
            //but stuill give us that high quality fine grained control over the difficulty
            //i also just wrapped the hash digest with the hex to binary function which will read the hexadeciamla nd return it as binary
            //the reason this is important is beacuse using hex codes you miss out on a ton of opportunities to control the difficulty
            //the binary gives much finer grained control by having more spaces avaialble 0001 01010 01010
        } while (hexToBinary(hash).substring(0, difficulty) !== '0'.repeat(difficulty));

        return new this({
            timestamp, lastHash, data, difficulty, nonce, hash
        });
    }

    static adjustDifficulty({ originalBlock, timestamp }) {
        const { difficulty } = originalBlock;
    
        if (difficulty < 1) return 1;
    
        if ((timestamp - originalBlock.timestamp) > MINE_RATE ) return difficulty - 1;
    
        return difficulty + 1;
      }
}

module.exports = Block;

