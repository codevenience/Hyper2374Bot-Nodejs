/**
  @file
  Define constant environment variable string.

  @copyright
  Copyright (c) 2024, Codevenience Organization. All rights reserved.<BR>

  SPDX-License-Identifier: BSD-3-Clause

  @par Specification Reference:

**/

//
// Split symbol to deliver multiple value via environment variable.
//
export const ENV_VAR_SPLIT_SYMBOL: string = ','

//
// Credential information for Twitch authentication.
//
export const ENV_TWITCH_USERNAME: string = 'ENV_TWITCH_USERNAME';
export const ENV_TWITCH_PASSWORD: string = 'ENV_TWITCH_TOKEN';

//
// Twitch channels to be joined.
//
export const ENV_TWTICH_CHANNELS: string = 'ENV_TWTICH_CHANNELS';
