const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');
const PubSub = require('./app/pubsub');
const request = require('request');
const { response } = require('express');


const app = express();
const blockchain = new Blockchain();
const pubsub = new PubSub({ blockchain });

const DEFAULT_PORT = 3000;
const ROOT_NODE_ADDRESS = `http://localhost:${DEFAULT_PORT}`;


///----------------------------------------------------------

//this was a test be no longer required 
// setTimeout(() => pubsub.broadcastChain(), 1000);

app.use(express.json());

//get the current state of the blockchain
app.get('/api/blocks', (req, res) => {
  res.json(blockchain.chain);
});

//create a block and add it to the blockchain -  then view the entire new blockchain
app.post('/api/mine', (req, res) => {
    //destrucutre and add the data from the incoming req body 
  const { data } = req.body;
    //add the data to the instance of the blockchain
  blockchain.addBlock({ data });

  pubsub.broadcastChain();
    //redirect the user to the list of blocks in the above get requesrt
  res.redirect('/api/blocks');
});

const syncChains = () => {
    request({url: `${ROOT_NODE_ADDRESS}/api/blocks`}, (error, response, body) => {
        //check that the error object is null meaning no errors and that the http request was succesfull
        //then take the chain in the body and turn it into something that we can use
        if(!error && response.statusCode === 200){
            const rootChain = JSON.parse(body);

            console.log('replace chain on async with ', rootChain);
            blockchain.replaceChain(rootChain);
        }
    });
}


//make peer port dynamic
let PEER_PORT;

//generate a random port number to stop conflict
if(process.env.GENERATE_PEER_PORT === 'true'){
    PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
}
//if the eper port is undefined jsut set it to the deafault port
const PORT = PEER_PORT || DEFAULT_PORT;

app.listen(PORT, () => {
    console.log(`The application has been activated and listening on localhost:${PORT}`);

    //dont sync on the default port i.e the fist node - syncying with yourself is redundant
    if(PORT !== DEFAULT_PORT){
        syncChains();
    }
    
});




