/* eslint-disable */

const {Client} = require('discord.js')
const CommandParser = require('./CommandParser')
const CommandFinder = require('./util/CommandFinder')
let client = new Client()

module.exports.command_prefix = '!'

module.exports.set_key = (key) => {
  client.login(key)
}

client.on('message', (message) => {
  const isCommand = message.content.startsWith(module.exports.command_prefix)

  if (isCommand) {
    // const commands = CommandParser.commands
    const content = message.content.slice(1)
    const args = processArgs(content)
    try {
      const command = CommandFinder.find(args[0])
      command.run(message, message.channel, args.splice(1))
    } catch (e) {
      return
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
