//set global mine rate value ** in miliseconds
const MINE_RATE = 1000;
const STARTING_BALANCE = 1000;

//seed the inital difficulty level for the hash
const INITIAL_DIFFICULTY = 3;


//this is screen case - use this when making a hardcoded global value
const GENESIS_DATA = {
    timestamp: 1, 
    lastHash: "28934592847",
    hash: 'hash-one',
    difficulty: INITIAL_DIFFICULTY,
    nonce: 0,
    data: []
};

const REWARD_INPUT = { address: '*authorized-reward*' };

const MINING_REWARD = 50;

module.exports = { GENESIS_DATA, MINE_RATE, STARTING_BALANCE, REWARD_INPUT, MINING_REWARD };
