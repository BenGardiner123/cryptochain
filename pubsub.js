const PubNub = require('pubnub');

const credentials = {
    publishKey: 'pub-c-d8a5adad-c208-4182-8b74-cfd615ad4299',
    subscribeKey: 'sub-c-47604f8c-debf-11eb-93ac-9ef4385fbd63',
    secretKey: 'sec-c-OTAwNTUxMjQtYmQxNy00ZjI5LWFlZmMtOWU2YjQxOWFkNWE2'
}

const CHANNELS = {
    TEST: 'TEST',
    BLOCKCHAIN: "BLOCKCHAIN"
};

class PubSub {
    constructor({ blockchain }) {
        //makes the local instance of the blockchain = the incoming blockchain 
        this.blockchain = blockchain;
        this.pubnub = new PubNub(credentials);

        //auto mapping the channels as they get added to the CHANNELS map above
        this.pubnub.subscribe({ channels: Object.values(CHANNELS) });

        //using the built in pubnub add listener method 
        this.pubnub.addListener(this.listener());
    }

    //listen out for messages then report the message to the console
    listener() {
        return {
            message: messageObject => {
                //TODO really need to research this destructuring in Javascript
                const { channel, message } = messageObject;
                

                console.log(`Message recieved. Channel: ${channel}. Message: ${message}. `);

                const parsedMessage = JSON.stringify(message);
                if(channel == CHANNELS.BLOCKCHAIN){
                    //the logic to confirm the chain is valid is inside replaceChain already
                    this.blockchain.replaceChain(parsedMessage);
                }
            }
        }
    }

    subscribeToChannels() {
        this.pubnub.subscribe({
          channels: [Object.values(CHANNELS)]
        });
      }

    //publish the message across the selected channel
    //added this logic basically if you publish something to a channel you dont want to send it to yourself
    //so when you call this publish function the first tthing that happens is that you unsub from it - then publish, 
    //once the message has gone out you re-sub to the channel 
    publish({ channel, message }) {
        // there is an unsubscribe function in pubnub
        // but it doesn't have a callback that fires after success
        // therefore, redundant publishes to the same local subscriber will be accepted as noisy no-ops
        this.pubnub.publish({ message, channel });
      }

    broadcastChain(){
        this.publish({
            channel: CHANNELS.BLOCKCHAIN,
            //we can only publish string messages across the channels and blockchain.chain is an array - so JSON strinify it
            message: JSON.stringify(this.blockchain.chain)
        });
    }


}

// -------------------      test data --------------------------------------------
// const testPubSub = new PubSub();
// testPubSub.publish({ channel: CHANNELS.TEST, message: "This is a first test" });
// //to test this i used *** node pubsub.js *** in the console


module.exports = PubSub;