

class TransActionMiner {

    constructor( { blockchain, transactionPool, wallet, pubsub }) {
        this.blockchain = blockchain;
        this.transactionPool = transactionPool;
        this.wallet = wallet;
        this.pubsub = pubsub;
    }
    
    mineTransactions() {

//get the transactions pools valid transactions

//generate the miners reward

// add a block conisisting of these tranasrtions to the blockchain

//broadcast the updated blockchain

//clear the pool
    }
}

module.exports = TransactionMiner;