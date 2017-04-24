const colors = require('colors') // eslint-disable-line no-unused-vars
const path = require('path')
const corda = require('./src/')
const keys = require('./keys')

corda.login_discord(keys.discord) // Required
corda.set('watch-commands', true) // Default: true
corda.set('recursive-watch', true) // Default: false
corda.set('command-folder', path.join(__dirname, '/commands')) // Should be set
corda.set('command-prefix', '!') // Default '!'

corda.on('ready', () => {
  console.log('Bot ready!'.cyan.bold)
})
