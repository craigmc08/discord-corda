/* eslint-disable */

const decache = require('decache')
const file = require('file')
const color = require('colors')
const fs = require('fs')
const path = require('path')

module.exports.commands = []

/**
 * Load command file
 * @param {string} filename
 * @return {object} The command class
 */
function parseCommand(filename) {
  if (/^.*\.js$/.test(filename)) {
    // Check to make sure it wants to be parsed as a command
    const data = fs.readFileSync(filename, 'utf8')
    if (data.startsWith('/* !COMMAND */')) {
      return {
        success: false,
        reason: '!command'
      }
    }
    decache(filename)
    const Command = require(filename)
    return {
      success: true,
      command: Command
    }
  } else {
    throw new Error('File should be a .js file')
  }
}
/**
 * Generate a CommandObject from the given command
 * @param {object} Command
 * @param {string} filename
 * @return {CommandObject}
 */
function generateCommandObject(Command, filename) {
  return {
    command: new Command(),
    filename: filename,
    details: {
      prefix: Command.prefix,
      aliases: Command.aliases,
    },
  }
}
/**
 * Update a command
 * @param {string} filename
 * @param {string} evt
 * @param {number} i - The position in the commands array
 */
function updateCommand(filename, evt, i) {
  if (evt === 'remove') {
    module.exports.commands.splice(i, 1)
  } else {
    const data = parseCommand(filename)
    if (data.success) {
      module.exports.commands[i] = generateCommandObject(data.command, filename)
    } else if (data.reason === '!command') {
      console.log('Found non-command file in commands folder, moving on')
    } else {
      console.log('Failed:'.red.bold, ' Parsing Command file, reason', data.msg)
    }
  }
}
/**
 * Create a command
 * @param {string} filename
 */
function createCommand(filename) {
  const data = parseCommand(filename)
  if (data.success) {
    module.exports.commands.push(generateCommandObject(data.command, filename))
  } else {
    console.log('Failed:'.red.bold, ' Parsing Command file, reason:', data.reason)
  }
}

/**
 * @type {WatcherCallback}
 * @param {string} evt
 * @param {string} filename
 */
module.exports.change = (evt, filename) => {
  let flavorMessage = ''
  if (evt === 'remove') {
    flavorMessage = 'Delete'.red.bold
  } else {
    flavorMessage = 'Change'.green.bold
  }
  console.log(flavorMessage, filename)

  for (let i = 0; i < module.exports.commands.length; i++) {
    const command = module.exports.commands[i]
    if (command.filename === filename) {
      updateCommand(filename, evt, i)
      return
    }
  }
  if (evt === 'update') {
    if (/^.*\.js$/.test(filename)) {
      createCommand(filename)
    }
  }
}
/**
 * Delete all commands and scan all files in the given folder for new commands
 * @param {string} folder
 */
module.exports.reset = (folder) => {
  module.exports.commands = []
  // Create help command
  createCommand(path.join(__dirname, '/HelpCommand.js'))
  file.walk(folder, (err, dirPath, dir, files) => {
    if (err) {
      throw err
    }
    for (let i = 0; i < files.length; i++) {
      const filename = files[i]
      if (/^.*\.js$/.test(filename)) {
        createCommand(filename)
      }
    }
  })
}

/**
 * @typedef {object} CommandObject
 * @property {function} command - The command constructor
 * @property {string} filename - The original file for the command
 * @property {CommandDetails} details
 */
/**
 * @typedef {object} CommandDetails
 * @property {string} prefix - The prefix for the command
 * @property {CommandAlias[]} aliases - List of aliases for this command
 * @property {CommandArgs[]} args - Array of expected arguments to command
 *    NOTE: args is not implemented anywhere yet
 */
