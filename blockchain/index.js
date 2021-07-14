const Block = require('./block');
const cryptoHash = require('../util/crypto-hash');

class Blockchain{
    constructor(){
        this.chain = [Block.genesis()];
    }

    addBlock({ data }){
        const newBlock = Block.mineBlock({
            lastBlock: this.chain[this.chain.length-1], 
            data
        });
        this.chain.push(newBlock);
    }

    static isValidChain(chain){
        //first rule - geneis block is correct
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())){
            return false;
        };

        //second rule check the entire chain is valid
        for (let i=1; i<chain.length; i++) {
            //ghet the last diffculty level - we need to use ths when we check for jumped or cheesed diffuclty levels
            const lastDifficulty = chain[i-1].difficulty;
             ///setup constants for all the feilds in the block using JS destructuring syntax in one line
            const { timestamp, lastHash, nonce, difficulty, hash, data} = chain[i];

            const actualLastHash = chain[i-1].hash;
           
        
            if(lastHash !== actualLastHash) return false;

            ///rebuild the crypto-hash and check for eqaulity 
            const valiatedHash = cryptoHash(timestamp, lastHash, data, nonce, difficulty);

            if(hash !== valiatedHash) return false;

            //check for jumped or cheesed difculty
            //using th eabsolute number heer it stops the number geinb jumped to high and slowing down the entire blockchain
            //becasue the hash youwls take too long to create becasue its so hard
            if(Math.abs(lastDifficulty - difficulty) > 1) return false;

        }
        
        return true;
    }

    replaceChain(chain){
        //enforec the rules for chain replcaement - chain has to be longer than the existing chain
        if(chain.length <= this.chain.length){
            console.error('the incoming chain must be longer!')
            return;
        }

        //enforece the rule wherby the chain wont be replcaed if the incoming chain is invalid
        if(!Blockchain.isValidChain(chain)){
            console.error('the incoming chain must be valid')
            return;
        }

        console.log('replacing chain with ', chain);
        this.chain = chain;
    }

}

module.exports = Blockchain;