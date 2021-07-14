const crypto = require('crypto');


const cryptoHash = (...inputs) => {
    //crpyot is the inbuilt cryptogrpahy library in node.
    ///we can call the sha-256 like so
    const hash = crypto.createHash('sha256');

    hash.update(inputs.sort().join(' '));

    //digest is a term in cryptograpgy that refers to the result of a hash
    return hash.digest('hex');
};

module.exports = cryptoHash;