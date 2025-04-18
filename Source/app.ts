/**
  @file
  Entrypoint of this application.

  @copyright
  Copyright (c) 2024, Codevenience Organization. All rights reserved.<BR>

  SPDX-License-Identifier: BSD-3-Clause

  @par Specification Reference:

**/

import tmi from "tmi.js"
import { CMD_CFG_DATA, TWITCH_CREDENTIAL, TWITCH_CHANNELS, CMD_PREFIX } from "./global";
import { VERSION_STR } from "./version";

//
// Configuration of the Twitch BOT for tmi.js.
//
export const BOT_OPTIONS = {
  options: {
    debug: true,
    messagesLogLevel: "info"
  },
  identity: {
    username: TWITCH_CREDENTIAL.getUsername(),
    password: TWITCH_CREDENTIAL.getPassword(),
  },
  channels: TWITCH_CHANNELS.getChannels(),
}

//
// Twitch BOT client.
//
const CLIENT = new tmi.client(BOT_OPTIONS);

/**
 * Handler to process the "connected" event.
 *
 * @param addr - The address connected to Twitch IRC server.
 * @param port - The port number connected to Twitch IRC server.
 *
 */
function onConnectedHandler(addr: string, port: number) {
  console.log(`* Connected to ${addr}:${port}`);

  for (var channel of BOT_OPTIONS.channels) {
    console.log(`* Greeting to ${channel}!`)
    CLIENT.say(channel, `小烈專屬機器人上線囉！ (๑•̀ㅂ•́)و✧ (build: ${VERSION_STR})!`);
  }
}

/**
 * Handler to process the "message" event.
 *
 * @param channel - The channel which the message received from.
 * @param context - The detailed information of this message.
 * @param msg     - The message received from the specific channel.
 * @param self    - Boolean value to check if message is from BOT self.
 *
 */
function onMessageHandler(channel: string, context: object, msg: string, self: boolean) {
  //
  // No need to take action on bot self message.
  //
  if (self) {
    return;
  }

  //
  // No need to take action when message not started with assigned prefix.
  //
  if (!(msg.startsWith(CMD_PREFIX.prefix()))) {
    console.log ("no need process, not prefix")
    return;
  }
}

/**
 * Initial the Twitch BOT client.
 *
 * This function would help to register the event handler.
 *
 */
function initBotClient() {
  CLIENT.on('connected', onConnectedHandler);
  CLIENT.on('message', onMessageHandler);
}

/**
 * Main function to startup the Twitch BOT.
 *
 */
function main() {
  console.log(CMD_CFG_DATA.data());
  initBotClient();
  CLIENT.connect();
}

if (typeof require !== 'undefined' && require.main === module) {
  main();
}
