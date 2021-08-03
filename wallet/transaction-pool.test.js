const TransactionPool = require('./transaction-pool');
const Transaction = require('./transaction');
const Wallet = require('.');

describe('TransactionPool', () => {
    let transactionPool, transaction, senderWallet;
  
    beforeEach(() => {
      transactionPool = new TransactionPool();
      senderWallet = new Wallet();
      transaction = new Transaction({
        senderWallet,
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

    describe('existingTransaction()', () => {
        it('returns an existing transaction given an input address', () => {
          transactionPool.setTransaction(transaction);
    
          expect(
            transactionPool.existingTransaction({ inputAddress: senderWallet.publicKey })
          ).toBe(transaction);
        });
      });

    describe('validTransactions()', () => {
      let validTransactions, errorMock;

      beforeEach(() => {
        validTransactions = []; 
        errorMock = jest.fn();
        global.console.error = errorMock;
      
      for (let i = 0; i < 10; i++) {
        transaction = new Transaction({
          senderWallet, 
          recipient: 'any-recipient',
          amount: 30
        });
        
        if(i%3===0){
          transaction.input.amount = 99999999;
        } else if ( i % 3 === 1){
          transaction.input.signature = new Wallet().sign('ballstack');
        } else {
          validTransactions.push(transaction);
        }

        transactionPool.setTransaction(transaction);
      }
      });

      it('returns valid transactions', () => { 
        expect(transactionPool.validTransactions()).toEqual(validTransactions);
      });

      it('logs errores for the invalid tranactions', () => {
        transactionPool.validTransactions();
        expect(errorMock).toHaveBeenCalled();
      });
    });
});
