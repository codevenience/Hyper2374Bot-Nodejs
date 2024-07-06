/**
  @file
  Class to obtain the information from configuration file.

  @copyright
  Copyright (c) 2024, Codevenience Organization. All rights reserved.<BR>

  SPDX-License-Identifier: BSD-3-Clause

  @par Specification Reference:

**/

import fs from 'fs'
import path from "path";
import YAML from 'yaml'
import { DEFAULT_CMD_CFG_FILE_NAME } from "../const/command_config_string";
import { EnvVar } from '../core/env_var';
import { ENV_CMD_CFG_FILE } from '../const/env_var_string';

export class CommandConfig {
  private _workspace: string;
  private _config_file_path: string;
  private _config_data: object;

  /**
   * Constructor of this class.
   *
   * @param workspace - Path to the root of the repository.
   *
   */
  constructor(workspace: string) {
    this._workspace = workspace
    this._config_file_path = this._getConfigFilePath();
    this._config_data = this._getConfigData();
  }

  /**
   * Return the path of configuration file.
   *
   * @note If ENV_CMD_CFG_FILE is set, takes it value as path.
   *       Otherwise, take the project default configuration file.
   *
   * @returns The path to the configuration file.
   *
   */
  private _getConfigFilePath(): string {
    let config_file_var: EnvVar = new EnvVar (ENV_CMD_CFG_FILE);

    if (config_file_var.isExist()) {
        return config_file_var.getValue();
    }

    return path.join(this._workspace, DEFAULT_CMD_CFG_FILE_NAME);
  }

  /**
   * Decode the configuration file with UTF-8 format.
   *
   * @returns Decoded YAML configuration file. Access by object.
   *
   */
  private _getConfigData(): object {
    const file = fs.readFileSync(this._config_file_path, 'utf8')

    return YAML.parse(file)
  }

  /**
   * The path of configuration file.
   *
   * @returns Path to the configuration file to be decoded.
   *
   */
  public path(): string {
    return this._config_file_path;
  }

  /**
   * The decoded YAML configuration file.
   *
   * @returns Decoded YAML configuration file.
   *
   */
  public data(): object {
    return this._config_data;
  }
}
