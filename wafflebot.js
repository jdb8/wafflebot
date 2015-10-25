 "use strict";

/* Dependencies */
var MessageHandler = require('./handlemessage.js');
var connection     = require('./ircconnect.js');

/* Initialise connection vars */
var server, password, handler;
server   = process.env.WBSERVER;
password = process.env.WBPASSWORD;

if (!server || !password) {
    console.log('Pleae provide valid IRC server and password as such:');
    console.log('$ WBSERVER=serverhere WBPASSWORD=passwordhere node wafflebot.js');
    return ;
}

/* Connect to server */
var client = connection.begin({server, password).then(function () {
    console.log('Succesfully connected to ' + server + '...');
}, function (err) {
    console.log('There was an error connecting to ' + server + ':');
    console.log(err);
});

handle = new MessageHandler(client);

/* Handle incoming messages */
client.addListener('message', handle.message);
client.addListener('pm', handle.pm);

client.addListener('error', function(err) {
    console.log('Error: ' + err);
});

client.addListener('pm', function (from, message) {
    
    if (from.indexOf("mark") == -1) {
        client.say(from, "sorry, you are not a wafflemaster");
        return ;
    }

    if (message.indexOf("join") > -1) {
        var channelToJoin = message.split(' ')[1];
        client.join(channelToJoin);
    }

});

client.addListener('error', function(message) {
    console.log('error: ', message);
});