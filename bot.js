// Load the environment variable
require('dotenv').config();

const VERSION = 'v0187.00';
const tmi = require('tmi.js');

// Define configuration options
const opts = {
  options: { debug: true, messagesLogLevel: "info" },
  connection: {
    reconnect: true,
    secure: true
  },
  identity: {
    username: process.env['BOT_NICK'],
    password: process.env['TMI_TOKEN']
  },
  channels: process.env['CHANNEL'].split(',')
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('connected', onConnectedHandler);
client.on('message', onMessageHandler);

// Connect to Twitch:
client.connect();

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
    opts.channels.forEach((element) =>  {
      client.say(element, `小烈專屬機器人上線囉！ (๑•̀ㅂ•́)و✧ (build: ${VERSION})`);
    });
    console.log(`* Connected to ${addr}:${port}`);
  }

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.trim();

  // If the command is known, let's execute it
  if (commandName === '!dice') {
    const num = rollDice();
    client.say(target, `You rolled a ${num}`);
    console.log(`* Executed ${commandName} command`);
  } else if (commandName === '!version') {
    client.say(target, `Current Bot version is ${VERSION}.`);
  } else {
    console.log(`* Unknown command ${commandName}`);
  }
}

// Function called when the "dice" command is issued
function rollDice () {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}

