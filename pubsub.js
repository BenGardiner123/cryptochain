const PubNub = require('pubnub');

const credentials = {
    publishKey: 'pub-c-d8a5adad-c208-4182-8b74-cfd615ad4299',
    subscribeKey: 'sub-c-47604f8c-debf-11eb-93ac-9ef4385fbd63',
    secretKey: 'sec-c-OTAwNTUxMjQtYmQxNy00ZjI5LWFlZmMtOWU2YjQxOWFkNWE2'
}

const CHANNELS = {
    TEST: 'TEST'
};

class PubSub {
    constructor() {
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
            }
        }
    }

    //publish the message across the selected channel
    publish({ channel, message }) {
        this.pubnub.publish({ channel, message });
    }
}

const testPubSub = new PubSub();
testPubSub.publish({ channel: CHANNELS.TEST, message: "This is a first test" });

module.exports = PubSub;