const Wallet = require('./index');
const { verifySignature} = require('../util');
const Transaction = require('./transaction');

describe ('Wallet', () => {
    let wallet;

    beforeEach(() => {
        wallet = new Wallet()
    });

    it('has a `balance`', () => {
        expect(wallet).toHaveProperty('balance');
    });

    it('has a `publicKey`', () => {
        console.log(wallet.publicKey);
        expect(wallet).toHaveProperty('publicKey');

    });

    describe('signing data', () => {
     const data = 'foo-bar';

     it('verifies a signiture', () => {
         expect(
            verifySignature({
                publicKey: wallet.publicKey,
                data, 
                signature: wallet.sign(data)
            })
         ).toBe(true);
     });
     
     it('it does not verify an invalid signiture', () => {
        expect(
            verifySignature({
                publicKey: wallet.publicKey,
                data, 
                signature: new Wallet().sign(data)
            })
         ).toBe(false);
        });
    });

    describe('createTransaction()', () => {
        describe('amount exceeds the balance', () => {
            it('throws an error', () => {
                expect(() => wallet.createTransaction({ amount: 847509348, recipient: 'fake guy' }))
                .toThrow('Amount exceeds balance');
            });
        });
        describe('and the amount is valid ', () => {
            let transaction, amount, recipient;

            beforeEach(() => {
                amount = 50;
                recipient = 'some-random-recipient';
                transaction = wallet.createTransaction({ amount, recipient });
            });

            it('creates an instance of `Transaction`', () => {
                expect(transaction instanceof Transaction).toBe(true)
            });

            it('matches the transaction input with the wallet ', () => {
                expect(transaction.input.address).toEqaul(wallet.publicKey);
            });

            it(' outputs the amount to the recipient  ', () => {
                expect(transaction.outputValue[recipient]).toEqaul(amount);
            });
        });
    });


});
    




