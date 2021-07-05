const Block = require("./block");
const Blockchain = require("./blockchain");

describe('Blockchain', () => {
    const blockchain = new Blockchain();

   it('contains a `chain` Array instance', () => {
                                            //use to be when evaluating with booleans
       expect(blockchain.chain instanceof Array).toBe(true);
   }); 

   it('starts with the geneis block', () => {
       expect(blockchain.chain[0]).toEqual(Block.genesis());
   });

   it('adds a new block to the chain', () => {
        const newData = 'newDataTest'
        blockchain.addBlock({data: newData});
        
        expect(blockchain.chain[blockchain.chain.length-1].data).toEqual(newData);
   });


});