/**
  @file
  Core class to handle the operation to access environment variable.

  @copyright
  Copyright (c) 2024, Codevenience Organization. All rights reserved.<BR>

  SPDX-License-Identifier: BSD-3-Clause

  @par Specification Reference:

**/

export class EnvVar {
  private _key: string;
  private _value: string;

  /**
   * Constructor of this class.
   *
   * @param key - The key to fetch from environment variable.
   *
   */
  constructor(key: string) {
    this._key = key;
    this._value = this._initValue();
  }

  /**
   * Check if the environment variable is exist.
   *
   * @retval false - Assigned environment variable is not exist.
   * @retval true  - Assigned environment variable is exist.
   *
   */
  public isExist(): boolean {
    if (this._key in process.env) {
      return true;
    }

    return false;
  }

  /**
   * Returns the value stored in this environment variable.
   *
   * @returns The value of the assigned environment variable.
   *
   */
  public getValue(): string {
    this._initValue(); // Refresh to ensure it is exist when calling.

    return this._value;
  }

  /**
   * Initial the environment variable value of this object.
   *
   * @returns The value of the assigned environment variable.
   *
   */
  private _initValue(): string {
    let value: string | undefined;

    value = process.env[this._key];

    if (value === undefined) {
      return String();
    }

    return value;
  }
}
