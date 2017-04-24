/* eslint-disable */

const {Client} = require('discord.js')
const CommandParser = require('./CommandParser')
let client = new Client()

module.exports.command_prefix = '!'

module.exports.set_key = (key) => {
  client.login(key)
}

client.on('message', (message) => {
  if (message.content.startsWith(module.exports.command_prefix)) {
    const commands = CommandParser.commands
    const content = message.content.slice(1)
    for (let i = 0; i < commands.length; i++) {
      const command = commands[i]
      if (content.startsWith(command.details.prefix)) {
        // Split command content into arguments
        const argscont = content.slice(command.details.prefix.length + 1)
        let args = argscont.split(/((?:".*")|(?: ?[^ ]* ?))/g)
        for (let j = args.length - 1; j >= 0; j--) {
          const arg = args[j]
          if (arg === '') {
            args.splice(j, 1)
            continue
          } else if (/^".*"$/.test(arg)) {
            args[j] = args[j].slice(1).slice(0, -1)
          }
          args[j] = arg.trim()
        }

        // Run command
        command.command.run(message, message.channel, args)
        break
      }
    }
  }
})

module.exports.on = (evt, cb) => {
  client.on(evt, cb)
}
module.exports.once = (evt, cb) => {
  client.once(evt, cb)
}
