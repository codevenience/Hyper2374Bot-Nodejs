// Load the environment variable
require('dotenv').config();
const fs = require('fs');
const yaml = require('js-yaml')
const VERSION = 'v0177.2';
const tmi = require('tmi.js');
const PREFIX = process.env['BOT_PREFIX'];
var commands = Object();
var timerArray = Array();

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

function processSingleCommand (data) {
  /**
   * Default command. Each alias also need.
   * 
   * <command>: {
   *  "type": "single",
   *  "msg": <message content>
   * }
   */
  let result = Object();
  let name = data['name'];
  let alias = data['alias'];
  let message = data['text'];

  alias.push(name);
  alias.forEach((element) => {
    result[PREFIX + element] = {
      "type": "single",
      "msg": message
    }
  })

  return result;
}

function processRandomCommand (data) {
  /**
   * Default command. Each alias also need.
   * <command>: {
   *  "type": "random",
   *  "msg": <options array>
   * }
   */
  let result = Object();
  let name = data['name'];
  let alias = data['alias'];
  let message = data['text'];

  alias.push(name);
  alias.forEach((element) => {
    result[PREFIX + element] = {
      "type": "random",
      "msg": message
    }
  })

  return result;
}

function processTimerCommand (data) {
  /**
   * Default command. Each alias also need.
   * 
   * <command>: {
   *  "type": "timer",
   *  "msg": <message content>,
   *  "interval": <time>
   * }
   */
   let name = data['name'];
   let alias = data['alias'];
   let message = data['text'];
   let interval = Number(data['time']);

   timerArray.push(
    setInterval(() => {
      opts['channels'].forEach((channel) => {
        client.say(channel, message);
      })
    }, interval)
   );

}

try {
  let fileContents = fs.readFileSync('./config/commands.yml', 'utf8');
  let data = yaml.load(fileContents);

  data['single'].forEach((element) => {
    commands = Object.assign(commands, processSingleCommand(element));
  });

  data['random'].forEach((element) => {
    commands = Object.assign(commands, processRandomCommand(element));
  });

  data['timer'].forEach((element) => {
    commands = Object.assign(commands, processSingleCommand(element));
    processTimerCommand(element);
  });
  console.log(commands);
} catch (e) {
  console.log(e);
}

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
  let user = context['display-name'];
  if (self) { return; } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.trim();
  if (commandName.charAt(0) != '!') { return; }

  // If the command is known, let's execute it
  if (commandName in commands) {
    let type = commands[commandName]['type'];
    if (type === 'single') {
      singleCommandCallback (target, commands[commandName]['msg']);
    } else if (type === 'random') {
      randomCommandCallback (target, commands[commandName]['msg'], user);
    }
  } else {
    client.say(target, `機器人不知道這個指令(;\´༎ຶД༎ຶ\`)`);
    console.log(`* Unknown command ${commandName}`);
  }
}

function singleCommandCallback (target, msg) {
  client.say(target, msg);
}

function randomCommandCallback (target, msg, user) {
  let result = String(msg[Math.floor(Math.random() * msg.length)]);
  client.say(target, `${user} 抽中了「 ${result}」Σ(｀д′*ノ)ノ`);
}
