import dotenv  from "dotenv"
import tmi from "tmi.js"
import { Config } from './utils/config.js'
import { OPTIONS }  from './utils/const.js'
import { CommandsPreProcess } from './controllers/commands_pre_process.js'
import { CommandHandler } from './controllers/command_handler.js'
import { DareGame } from './commands/dare_game.js'

// Load the environment variable
dotenv.config()

// Constant variable
const VERSION = 'v0186.00';
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
var DareGameObj = new Object ();

// Register our event handlers (defined below)
CLIENT.on('connected', onConnectedHandler);
CLIENT.on('message', onMessageHandler);

// Connect to Twitch:
CLIENT.connect();

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
    OPTIONS.channels.forEach((element) =>  {
        let channel = element.toLowerCase();
        DareGameObj[channel] = null;
        CLIENT.say(channel, `小烈專屬機器人上線囉！ (๑•̀ㅂ•́)و✧ (build: ${VERSION})`);
    });
    console.log(`* Connected to ${addr}:${port}`);
}

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
    if (self) { return; } // Ignore messages from the bot

    // Remove whitespace from chat message
    const commandName = msg.trim();

    let userId = context["username"];
    let identify = CheckUserIdentify (context);

    if (DareGameObj[target] != null) {
        console.log (`[DEBUG] 大冒險開啟`);
        console.log (commandName.charAt(0) == '+');
        if (commandName.charAt(0) == '+') {
            let second = parseInt(msg.split('+')[1], 10);
            
            if (second != NaN) {
                DareGameObj[target].add (
                    userId,
                    second,
                    identify
                )
                CLIENT.say(target, `${userId} 加入勇者行列 增加了 ${second} 秒`);
            }
        } else {
            
        }
    } else if (commandName.charAt(0) != '!') { 
        return;
    }

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
    } else if (commandName === "!大冒險") {
        if ((identify.includes("moderator")) || (identify.includes("broadcaster"))) {
            if (DareGameObj[target] === null) {
                DareGameObj[target] = new DareGame (target);
                setTimeout(
                    processDareGameCallback,
                    180000,
                    target,
                    DareGameObj
                    );
                CLIENT.say(target, `新的一輪大冒險開始囉！三分鐘倒計時開始！`);
            } else if (target in DareGameObj) {
                console.log (`該頻道未被註冊，無法開啟 !大冒險`);
            }
            else {
                console.log (`大冒險在 ${target} 頻道已經開啟，無法重複！`);
            }
        } else {
            CLIENT.say(target, `只有小烈和MOD才能開啟大冒險 (눈‸눈)`);
        }
    } else {
        // CLIENT.say(target, `機器人不知道這個指令(;\´༎ຶД༎ຶ\`)`);
        console.log(`* Unknown command ${commandName}`);
    }
}

function processDareGameCallback (target, DareGameObj) {
    let [total, timeout, user, userinfo] = DareGameObj[target].random();
    CLIENT.say(target, `/timeout ${user} ${timeout}`);
    CLIENT.say(target, `@${user} 原地爆炸了 ${timeout} 秒，幫QQ！`);
    // 重新設定大冒險
    DareGameObj[target] = null;
}

function CheckUserIdentify (ctx) {
    let BadgesList = [];
    if (ctx['badges-raw'] == null) {
        return BadgesList;
    } else {
        BadgesList = ctx['badges-raw'].split('/');
    }
    
    return BadgesList;
}
