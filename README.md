# Corda
A half decent discord bot framework

### Features
- Easy to add new commands

### Installation
```
npm install corda
```

### Usage
Create a main file (let's call it index.js), put this in there (and adjust it to suit you):
```js
const corda = require('discord-corda');
const key = 'your_discord_key';

corda.login_discord(key);
corda.set('watch-commands', true); // Look for changes in commands folder and update commands
corda.set('recursive-watch', false); // Look for commands in folders in commands folder (and deeper)
corda.set('command-prefix', '!'); // What to look for at the start of a command
corda.set('commands-folder', '/path/to/your/commands/folder');

corda.on('ready', () => {console.log('Bot ready!');});
```
In your commands folder, create a new file (call it anything you want, make sure it ends with .js)
```js
const {Command} = require('discord-corda');
module.exports = class SomeCommand {
  constructor() {}
  async run(message, channel, args) {
    channel.send('Hooray! This command worked');
    // This will be executed when your command is called
  }
  static get prefix() {
    return 'test';
  }
};
```
Start your server
```
node index.js
```
After a couple of seconds, you should see 'Bot Ready!' appear in your console. Head to a Discord server with your bot in it, and try out your new command with '!test'. You should see it respond however you told it to. Now you can do whatever you please from here.
