module.exports = class Command {
  /**
   * @constructor
   */
  constructor() {
    // NOTHING
  }

  /**
   * Run command
   * @param {discord.js.Message} message
   * @param {discord.js.Channel} channel
   * @param {object} args
   */
  async run(message, channel, args) {
    // NOTHING
  }

  /**
   * @type {CommandAlias[]}
   */
  static get aliases() {
    return []
  }
}

/**
 * @typedef CommandAlias
 * @type {object}
 * @property {string} prefix - The alias beginning
 * @property {function} [run] - The (optional) function to run
 */
