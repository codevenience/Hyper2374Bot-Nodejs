/**
  @file
  Class to obtain the command prefix.

  @copyright
  Copyright (c) 2024, Codevenience Organization. All rights reserved.<BR>

  SPDX-License-Identifier: BSD-3-Clause

  @par Specification Reference:

**/

import { ENV_CMD_PREFIX } from "../const/env_var_string";
import { EnvVar } from "../core/env_var";

export const DEFAULT_PREFIX: string = '!';

/**
 *
 */
export class CommandPrefix {
  private _prefix: string;

  /**
   * Constructor of this class.
   *
   */
  constructor() {
    this._prefix = this._getPrefixString();
  }

  /**
   * Returns the string of the prefix to be used to decode the command.
   *
   * @returns String of the prefix to be used to decode the command.
   *
   */
  public prefix(): string {
    return this._prefix;
  }

  /**
   * Initial the string of prefix from environment variable.
   *
   * @returns String of the prefix to be used to decode the command.
   *
   */
  private _getPrefixString(): string {
    let env_var: EnvVar = new EnvVar(ENV_CMD_PREFIX);

    if (!env_var.isExist()) {
      console.log(`Not set command prefix, use default - ${DEFAULT_PREFIX}`)
      return DEFAULT_PREFIX;
    }

    return env_var.getValue();
  }
}
