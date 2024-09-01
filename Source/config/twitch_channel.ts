/**
  @file
  Class to obtain the Twitch channel information.

  @copyright
  Copyright (c) 2024, Codevenience Organization. All rights reserved.<BR>

  SPDX-License-Identifier: BSD-3-Clause

  @par Specification Reference:

**/

import { ENV_TWTICH_CHANNELS, ENV_VAR_SPLIT_SYMBOL } from '../const/env_var_string'
import { EnvVar } from '../core/env_var';

export class TwitchChannel {
  private _channels: Array<string>;

  /**
   * Constructor of this class.
   *
   */
  constructor() {
    this._channels = this.initChannels();
  }

  /**
   * Returns the array of channels to be joined.
   *
   * @note Caller needs to provide valid channel name.
   *
   * @returns Array of channels to be joined.
   *
   */
  public getChannels(): Array<string> {
    return this._channels;
  }

  /**
   * Initial the array of channels from environment variable.
   *
   * @returns Array of channels to be joined.
   *
   */
  private initChannels(): Array<string> {
    let channels: EnvVar = new EnvVar(ENV_TWTICH_CHANNELS);
    let channels_str: String = channels.getValue();

    if(channels_str.includes(ENV_VAR_SPLIT_SYMBOL)) {
        return channels.getValue().split(ENV_VAR_SPLIT_SYMBOL);
    } else {
        return [`${channels_str}`];
    }
  }
}
