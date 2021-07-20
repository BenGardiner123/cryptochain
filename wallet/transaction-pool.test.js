const TransactionPool = require('./transaction-pool');
const Transaction = require('./transaction');
const Wallet = require('.');

describe('TransactionPool', () =>{ 
    let transactionPool, transaction
    
    beforeEach(() => {
        transactionPool = new TransactionPool();
        transaction = new Transaction({
            senderWallet: new Wallet(),
            recipient: 'fake-recipient',
            amount: 50
        });
    });


    describe('setTransaction', () => {
        it('adds a transaction', () => {
            transactionPool.setTransaction(transaction);

            expect(transactionPool.transactionMap[transaction.id])
            //using the toBe check here makes sure that not only are they the same but it also checks that this is the original instance as well
            .toBe(transaction);
        });
    });
});
