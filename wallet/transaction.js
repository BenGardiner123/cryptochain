const uuid = require('uuid/dist/v1');

class Transaction {
    constructor({ senderWallet, recipient, amount}) {
        this.id = uuid();
        this.outoutMap = this.createOutputMap({ senderWallet, recipient, amount});
    }

    createOutputMap({ senderWallet, recipient, amount}) {
        const outputMap = {};

        outputMap[recipient] = amount;
        outputMap[senderWallet.publicKey] = senderWallet.balance - amount;

        return outputMap;
    }
}

module.exports = Transaction;