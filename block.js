const {GENESIS_DATA} = require('./config');
class Block{
     constructor({timestamp, lastHash, hash, data}){
        this.timestamp = timestamp
        this.lastHash = lastHash
        this.hash = hash
        this.data = data
    }

    //this pattern used herer whereby we use a method to create an instance of a class directly using the constructor method
    //this is called the factory pattern
    static genesis(){
        return new this(GENESIS_DATA);
    }

    static mineBlock({ lastBlock, data }){
        return new this({
            timestamp: Date.now(),
            lastHash: lastBlock.hash,
            data
        });
    }
}



module.exports = Block;

