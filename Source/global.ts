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

//
// Twitch credential information.
//
export const TWITCH_CREDENTIAL = new TwitchCredential();

//
// Twitch channels information.
//
export const TWITCH_CHANNELS = new TwitchChannel();
