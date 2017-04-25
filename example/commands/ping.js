/* eslint-disable */

const {Command} = require('../../src/index.js') // This would be require('corda')

/** Basic Command Example */
module.exports = class PingCommand extends Command {
  constructor() {
    super()
  }

  async run(message, channel, args) {
    message.reply('Pong!')
  }

  static get prefix() {
    return 'ping'
  }
}
