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
        this.pubnub.subscribe({ channels: [Object.values(CHANNELS)] });
    }
}