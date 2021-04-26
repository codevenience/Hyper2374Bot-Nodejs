import dotenv  from "dotenv"
import tmi from "tmi.js"
import { Config } from './utils/config.js'
import { OPTIONS }  from './utils/const.js'
import { CommandsPreProcess } from './controllers/commands_pre_process.js'
import { CommandHandler } from './controllers/command_handler.js'

// Load the environment variable
dotenv.config()

// Constant variable
const VERSION = 'v0181.01';
const PREFIX = process.env['BOT_PREFIX'];
const COMMANDS_DATA = new Config ().get ();

// Create a client with our options
const CLIENT = new tmi.client(OPTIONS);

const COMMANDSPREPROCESS = new CommandsPreProcess (
  OPTIONS.channels,
  COMMANDS_DATA,
  CLIENT
);

// Global variable to store the object and data
var [ gCommands, gTimerArray ] = COMMANDSPREPROCESS.process ();

// Register our event handlers (defined below)
CLIENT.on('connected', onConnectedHandler);
CLIENT.on('message', onMessageHandler);

// Connect to Twitch:
CLIENT.connect();

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  OPTIONS.channels.forEach((element) =>  {
    CLIENT.say(element, `小烈專屬機器人上線囉！ (๑•̀ㅂ•́)و✧ (build: ${VERSION})`);
  });
  console.log(`* Connected to ${addr}:${port}`);
}

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.trim();
  if (commandName.charAt(0) != '!') { return; }

  // If the command is known, let's execute it
  if (commandName in gCommands) {
    let command_handler = new CommandHandler (
        target,
        gCommands[commandName],
        gCommands[commandName]['type'],
        CLIENT,
        context,
        gCommands[commandName]['msg']
    ).process ();

    // Free the handler
    command_handler = null;
  } else {
    // client.say(target, `機器人不知道這個指令(;\´༎ຶД༎ຶ\`)`);
    console.log(`* Unknown command ${commandName}`);
  }
}
