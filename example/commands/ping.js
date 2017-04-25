/* eslint-disable */

const {Command} = require('../../src/index.js') // This would be require('corda')
const lib = require('./lib')

/** Basic Command Example */
module.exports = class PingCommand extends Command {
  constructor() {
    super({
      name: "Ping",
      description: "Ping the bot"
    })
  }

  async run(message, channel, args) {
    lib.pong(message, channel, args)
  }

  static get prefix() {
    return 'ping'
  }
}
