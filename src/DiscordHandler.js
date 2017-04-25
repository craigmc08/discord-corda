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
    const args = processArgs(content)
    for (let i = 0; i < commands.length; i++) {
      const command = commands[i]
      if (args[0] === command.details.prefix) {
        command.command.run(message, message.channel, args.splice(1))
      }
      let foundAlias
      for (let j = 0; j < command.details.aliases.length; j++) {
        const alias = command.details.aliases[j]
        if (args[0] === alias.prefix) {
          if (alias.run) {
            alias.run(message, message.channel, args.splice(1))
          } else {
            command.command.run(message, message.channel, args.splice(1))
          }
          foundAlias = true
          break
        }
      }
      if (foundAlias) break
    }
  }
})

module.exports.on = (evt, cb) => {
  client.on(evt, cb)
}
module.exports.once = (evt, cb) => {
  client.once(evt, cb)
}

function processArgs(argsStr) {
  let args = argsStr.split(/((?:".*")|(?: ?[^ ]* ?))/g)
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
  return args
}
