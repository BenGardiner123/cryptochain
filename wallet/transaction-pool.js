const Transaction = require('./transaction');

class TransactionPool {
    constructor() {
        this.transactionMap = {};
    }

    setTransaction(transaction) {
        this.transactionMap[transaction.id] = transaction;
    }
    
    setMap(transactionMap){
        this.transactionMap = transactionMap;
    }

    
  existingTransaction({ inputAddress }) {
    const transactions = Object.values(this.transactionMap);

    return transactions.find(transaction => transaction.input.address === inputAddress);
  }

  validTransactions(){
    //using the built in filter method below that will put eh value into a new array if true
    return Object.values(this.transactionMap).filter(
      transaction => Transaction.validTransaction(transaction)
    );
  }
}

module.exports = TransactionPool;