const CommandParser = require('../CommandParser')

module.exports.find = (name) => {
  const commands = CommandParser.commands
  // Check through all commands
  for (let i = 0; i < commands.length; i++) {
    // Check the main command
    const command = commands[i]
    if (name === command.details.prefix) {
      return command.command
    }

    // Check through aliases for this command
    const aliases = command.details.aliases
    for (let j = 0; j < aliases.length; j++) {
      const alias = aliases[j]
      if (name === alias.prefix) {
        return {
          run: alias.run || command.command.run,
          help: alias.help || command.command.help,
          name: alias.name || command.command.name,
          description: alias.description || command.command.description,
        }
      }
    }
  }
  throw new Error('Could not find command')
}
