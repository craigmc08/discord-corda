/* eslint-disable */

const {Command} = require('../../src/index.js') // This would be require('corda')

/** Command with aliases */
module.exports = class GreetingCommand extends Command {
  constructor() {
    super({
      name: "Greetings",
      description: "Say hello or goodbye to the bot"
    })
  }

  async run(message, channel, args) {
    if (args[0] === 'hello') {
      this.commandHello(message, channel, args)
    } else if (args[0] === 'goodbye') {
      this.commandGoodbye(message, channel, args)
    }
  }
  async commandHello(message, channel, args) {
    message.reply('Hello!')
  }
  async commandGoodbye(message, channel, args) {
    message.reply('Goodbye!')
  }

  static get prefix() {
    return 'greeting'
  }
  static get aliases() {
    return [
      {
        prefix: 'hello',
        run: new this().commandHello
      },
      {
        prefix: 'goodbye',
        run: new this().commandGoodbye
      }
    ]
  }
}
