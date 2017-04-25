module.exports = class Command {
  /**
   * @constructor
   */
  constructor(data) {
    this.name = data.name
    this.description = data.description

    if (!this.name) throw new TypeError('Command must provide name')
    if (!this.description) throw new TypeError('Command must provide description')
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
   * Get help for this command (do not override this, or do, whatever)
   * @param {discord.js.Message} message
   * @param {discord.js.Channel} channel
   * @param {object} args
   */
  async help(message, channel, args) {
    message.reply(`Help for: ${this.name}
${this.description}
[Usage]`)
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
 * @property {string} name - The name of the alias
 * @property {string} description - The description of the alias
 */
