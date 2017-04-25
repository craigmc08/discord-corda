/* eslint-disable */

const corda = require('../src/index.js') // This would be require('corda')
const keys = require('./keys') // Make sure to put your key in there if you want the example to work
const path = require('path')

corda.login_discord(keys.discord)
corda.set('command-folder', path.join(__dirname, '/commands'))

corda.on('ready', () => {
  console.log('Corda is ready')
})
