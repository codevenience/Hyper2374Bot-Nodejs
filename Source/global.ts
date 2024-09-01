/**
  @file
  Global varialbes of this application.

  @copyright
  Copyright (c) 2024, Codevenience Organization. All rights reserved.<BR>

  SPDX-License-Identifier: BSD-3-Clause

  @par Specification Reference:

**/

import { TwitchChannel } from "./config/twitch_channel";
import { TwitchCredential } from "./config/twitch_credential"
import { CommandConfig } from "./config/command_config";
import { CommandPrefix } from "./config/command_prefix";

//
// Path information.
//
export const WORKSPACE_PATH = __dirname;

//
// Twitch credential information.
//
export const TWITCH_CREDENTIAL = new TwitchCredential();

//
// Twitch channels information.
//
export const TWITCH_CHANNELS = new TwitchChannel();

//
// Command configuration information.
//
export const CMD_CFG_DATA = new CommandConfig (WORKSPACE_PATH);

//
// Prefix of the command.
//
export const CMD_PREFIX = new CommandPrefix ();
