// Required Help Command
const Command = require('./Command')
const CommandFinder = require('./util/CommandFinder')

module.exports = class HelpCommand extends Command {
  constructor() {
    super({
      name: 'Help',
      description: 'Get help with commands',
    })
  }

  /** @override */
  async run(message, channel, args) {
    try {
      const command = CommandFinder.find(args[0])
      command.help(message, channel, args)
    } catch (e) {
      message.reply('Couldn\'t find that command, maybe you spelled it wrong?')
    }
  }

  /** @override */
  static get prefix() {
    return 'help'
  }
}
