
const Blockchain = require("./blockchain");

const blockchain = new Blockchain();

blockchain.addBlock({ data: 'inital' });

let prevTimestamp, nextTimeStamp, nextBlock, timeDiff, average;

const times = [];

for (let i = 0; i < 10000; i++) {
    prevTimestamp = blockchain.chain[blockchain.chain.length - 1].timestamp;

    blockchain.addBlock({ data: `block ${i}` });

    nextBlock = blockchain.chain[blockchain.chain.length - 1];

    nextTimeStamp = nextBlock.timestamp;
    timeDiff = nextTimeStamp - prevTimestamp;
    times.push(timeDiff);
    //TODO - research this reduce function
    average = times.reduce((total, num) => (total + num)) / times.length;

    console.log(`time to mine block ${timeDiff}ms. Diffuclty: ${nextBlock.difficulty}. AverageTime: ${average}ms`);
}
