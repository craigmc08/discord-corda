/* eslint-disable */

const Watcher = require('./Watcher')
const CommandParser = require('./CommandParser')
const DiscordHandler = require('./DiscordHandler')

let watcher
let watch_commands = true
let recursive_watch

/**
 * Set the discord key and start the bot
 * @param {string} key
 */
module.exports.login_discord = (key) => {
  DiscordHandler.set_key(key)
}
/**
 * Listen to an event on the Discord client
 * @param {string} evt - The name of the event
 * @param {DiscordCallback} callback
 */
module.exports.on = (evt, callback) => {
  DiscordHandler.on(evt, callback)
}
/**
 * Listen to an event once on the Discord client
 * @param {string} evt - The name of the event
 * @param {DiscordCallback} callback
 */
module.exports.once = (evt, callback) => {
  DiscordHandler.once(evt, callback)
}
/**
 * Set a property
 * @param {string} key
 * @param {*} val - The value
 */
module.exports.set = (key, val) => {
  if (key === 'command-prefix') {
    DiscordHandler.command_prefix = val
  } else if (key === 'command-folder') {
    folder = val
    if (!watcher && watch_commands) {
      watcher = new Watcher(folder, CommandParser.change, {
        recursive_search: recursive_watch
      })
    } else {
      watcher.set(folder)
    }
    CommandParser.reset(folder)
  } else if (key === 'watch-commands') {
    watch_commands = val
  } else if (key === 'recursive-watch') {
    recursive_watch = val
  }
}
module.exports.Command = require('./Command')

/**
 * Used for event triggering from the Discord client
 * @callback DiscordCallback
 * @param {object} event
 */
