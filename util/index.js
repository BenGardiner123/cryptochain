const EC = require('elliptic').ec;
const cryptoHash = require('./crypto-hash')

const ec = new EC('secp256k1');

const verifySignature = ({ publicKey, data, signature }) => {
    const keyFromPublic = ec.keyFromPublic(publicKey, 'hex');
//this is a built in method from the sc library, but first it has to be hashed and you have to tell it what form it will be in
    return keyFromPublic.verify(cryptoHash(data), signature);
};

module.exports = { ec, verifySignature };