const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');


const app = express();
const blockchain = new Blockchain();

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
    //redirect the user to the list of blocks in the above get requesrt
  res.redirect('/api/blocks');
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`The application has been activated and listening on localhost:${PORT}`);
});


