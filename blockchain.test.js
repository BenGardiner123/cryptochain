const Block = require("./block");
const Blockchain = require("./blockchain");

describe('Blockchain', () => {
    let blockchain, newChain, originalChain;

    beforeEach(() => {
        blockchain = new Blockchain();
        newChain = new Blockchain();
        originalChain = blockchain.chain;
    });

    it('contains a `chain` Array instance', () => {
        //use to be when evaluating with booleans
        expect(blockchain.chain instanceof Array).toBe(true);
    });

    it('starts with the geneis block', () => {

        expect(blockchain.chain[0]).toEqual(Block.genesis());
    });

    it('adds a new block to the chain', () => {
        const newData = 'newDataTest'
        blockchain.addBlock({ data: newData });

        expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(newData);
    });

    describe('isValidChain', () => {

        describe('when the chain does not start with the genesis block', () => {
            it('returns false', () => {
                blockchain.chain[0] = { data: 'fake-ogeneisis-blockoo' };

                expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
            });
        });

        describe('when the chain starts with the genesis block and has multiple blocks', () => {
            //using the before each here will populate out the data objects - saves repeating the liens of code for every test DRY principle
            beforeEach(() => {
                blockchain.addBlock({ data: 'funny-block' });
                blockchain.addBlock({ dataL: 'tst-blocko' });
                blockchain.addBlock({ data: 'si=egjkrhfgw' });
            });
            describe('and a lastHash reference has changed', () => {
                it('returns false', () => {

                    blockchain.chain[2].lastHash = 'broken-lastHash';

                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
                });
            });
            describe('and the chain conatins a block with an invalid field', () => {
                it('returns false', () => {

                    blockchain.chain[2].data = 'bad-evil-data';

                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
                });
            });
            describe('and the chain does not contain any invalid blocks', () => {
                it('returns true', () => {

                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(true);
                });

            });
        });
    });


    describe('replaceChain()', () => {
        let errorMock, logMock;

        beforeEach(() => {
            //jest method below fn() allows us to create temporty methods for tests
            //they dont naturally output o the console so you can track if msseages were 
            //fired without always having to look at tons of out put in the console

            errorMock = jest.fn();
            logMock = jest.fn();

            global.console.error = errorMock;
            global.console.log = logMock;

        })

        describe('where the new chain is not longer', () => {
            beforeEach(() => {
                newChain.chain[0] = { new: 'chain' };
                blockchain.replaceChain(newChain.chain);
            })

            it('does not replace the chain', () => {
                expect(blockchain.chain).toEqual(originalChain);
            });

            it('logs an error', () => {
                expect(errorMock).toHaveBeenCalled();
            });
        });

        describe('where the chain is longer', () => {
            beforeEach(() => {
                newChain.addBlock({ data: 'funny-block' });
                newChain.addBlock({ dataL: 'tst-blocko' });
                newChain.addBlock({ data: 'si=egjkrhfgw' });
            });

            describe('and the chain is invalid', () => {
                beforeEach(() => {
                    newChain.chain[2].hash = 'some-fake-hash';

                    blockchain.replaceChain(newChain.chain);

                });

                it('does not replace the chain', () => {
                    expect(blockchain.chain).toEqual(originalChain);
                });
                it('logs an error', () => {
                    expect(errorMock).toHaveBeenCalled();
                });
            });

            describe('and the chain is valid', () => {
                beforeEach(() => {
                    blockchain.replaceChain(newChain.chain);
                })
                it('replaces the chain', () => {
                    expect(blockchain.chain).toEqual(newChain.chain);
                });
                it('logs about the chain replacement', () => {
                    expect(logMock).toHaveBeenCalled();
                })
            });
        });
    });
});