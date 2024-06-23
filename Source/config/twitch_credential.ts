/**
  @file
  Class to obtain the Twitch credential information.

  @copyright
  Copyright (c) 2024, Codevenience Organization. All rights reserved.<BR>

  SPDX-License-Identifier: BSD-3-Clause

  @par Specification Reference:

**/

import { ENV_TWITCH_USERNAME, ENV_TWITCH_PASSWORD } from '../const/env_var_string'
import { EnvVar } from '../core/env_var';

export class TwitchCredential {
  private _username: string;
  private _password: string;

  /**
   * Constructor of this class.
   *
   * Caller needs to input the username and password in same time.
   * Without any inputting is allowed and try to fetch from environment.
   *
   * @param username - Username of Twitch credential.
   * @param password - Password of Twitch credential.
   *
   */
  constructor(username?: string | undefined, password?: string | undefined) {
    this._IsInputValid(username, password);

    this._username = this._initVariable(ENV_TWITCH_USERNAME, username);
    this._password = this._initVariable(ENV_TWITCH_PASSWORD, password);
  }

  /**
   * Check caller input value is valid.
   *
   * @param username - Username of Twitch credential.
   * @param password - Password of Twitch credential.
   *
   */
  private _IsInputValid(username: string | undefined, password: string | undefined) {
    if ((username !== undefined) && (password === undefined)) {
        throw new Error (`username and password must input in same time.`)
    }

    if ((username === undefined) && (password !== undefined)) {
        throw new Error (`username and password must input in same time.`)
    }
  }

  /**
   * Initial the variable of this class.
   *
   * @param key      - Correpond environment variable.
   * @param variable - Caller provided variable value.
   *
   * @returns Initialized variable value.
   *
   */
  private _initVariable(key: string, variable: string | undefined): string {
    let env_var: EnvVar = new EnvVar(key);

    if (variable !== undefined) {
      return variable;
    }

    if (!env_var.isExist()) {
      throw new Error(`Access not exist environment variable - ${key}`)
    }

    return env_var.getValue();
  }

  /**
   * Returns the username of Twitch credential.
   *
   * @returns Username of Twitch credential.
   *
   */
  public getUsername(): string {
    return this._username;
  }

  /**
   * Returns the password of Twitch credential.
   *
   * @returns Password of Twitch credential.
   *
   */
  public getPassword(): string {
    return this._password;
  }
}
