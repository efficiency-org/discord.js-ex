# discord.js-ex
An npm package to extend on <https://www.npmjs.com/package/discord.js>, making it simpler and more compact.

- [View on GitHub](https://github.com/efficiency-org/discord.js-ex/blob/master/README.md)
- [View on GitHub Pages](https://efficiency-org.github.io/discord.js-ex/)
## About
The npm package discord.js-ex is designed to make discord.js more compact and simple.
By making this package we don't intend to claim discord.js as ours, but we're trying to make it better; with another package.
We are looking for collaborators to help us make this package great.
## Installation
Once the package is published, you can go to <https://www.npmjs.com/package/discord.js-ex> to get information about it. 
To add the package to your own projects:
- [ ] [Install Node.js.](https://nodejs.org/download/current/)
- [ ] Go to your terminal and run `node -v`.
- [ ] Go to your terminal and run `npm --version`.
- [ ] *See Required Packages.*
- [ ] Go to your terminal and run `npm install discord.js-ex`.
## Required Packages
You need to run `npm install discord.js` to install the `discord.js` package on your desired project first, because this package uses `require('discord.js')`. 
## Example Code
***Note:** ALL examples of code below are coded in but not tested yet due to this package not yet being published. Features may need to be tweaked before making it into production code for the first version of the package. [If you're viewing this README.md file on GitHub](https://github.com/efficiency-org/discord.js-ex/blob/master/README.md), you can click on any function or reference to a class in this package to view its definition inside the actual code of this package.*

```js
// I don't need to use `require('discord.js');`, but I still need to install discord.js!
const { Bot } = require('discord.js-ex');
const token = 'your-token';
const bot = new Bot(token);
const prefix = '!';
bot.whenOnline(() => console.log(`Logged in as ${bot.tag}!`));
bot.whenMessageReceived(msg => if (msg.beginsWith(`${prefix}ping`)) msg.sendBack('Pong.'));
```

VS.

```js
const { Client } = require('discord.js');
const token = 'your-token';
const bot = new Client();
const prefix = '!';
bot.once('ready', () => console.log(`Logged in as ${bot.user.tag}!`));
bot.on('message', msg => if (msg.content.startsWith(`${prefix}ping`)) msg.channel.send('Pong.'));
bot.login(token);
```

***Pretty compact, right? This is even line 42! Amazing!***

But, oh, that's just the START! 1 line less? We plan to make this possible, too:

```js
// I don't need to use `require('discord.js');`, but I still need to install discord.js!
const { prefix, token } = require('./config.json'); // {"prefix":"!","token":"your-token"}
const { Bot, Data } = require('discord.js-ex'); // fs is a common module, so if I ever need to use it, I can just import it from discord.js-ex! Yay!
const bot = new Bot(token);
bot.cmds = new Data();
const commandFiles = bot.retrieveCommandFiles(); // ./commands/<command name>.js
for (const file of commandFiles) {
  const command = bot.retrieveCommandFile(file);
  bot.cmds.s(command.name, command);
}
bot.whenOnline(() => {
  bot.setBio('watch', `${prefix}help`);
  console.log(`Logged in as ${bot.tag}!`);
});
bot.whenMessageReceived(msg => {
  if (!msg.beginsWith(prefix) || msg.auth.bot || msg.webhookID) return;
  const args = bot.getArgs(msg, prefix);
  const cmdName = bot.parseCmdN(args);
  if (!bot.cmds.h(cmdName)) return;
  const cmd = bot.cmds.g(cmdName);
  try {
    cmd.exe(msg, args);
  } catch (err) {
    bot.error(msg, err); // No type necessary! The default is made just for this case.
  }
});
```

VS.

```js
const fs = require('fs'); // fs is a common module; c'mon, discord.js, just put an fs in your package's module.exports!
const { Client, Collection } = require('discord.js');
const { prefix, token } = require('./config.json'); // {"prefix":"!","token":"your-token"}
const bot = new Client();
bot.cmds = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  bot.cmds.set(command.name, command);
}
bot.once('ready', () => {
  bot.user.setActivity(`${prefix}help`, { type: 'WATCHING' });
  console.log(`Logged in as ${bot.user.tag}!`);
});
bot.on('message', msg => {
  if (!msg.content.startsWith(prefix) || msg.author.bot || msg.webhookID) return;
  const args = msg.content.slice(prefix.length).trim().split(' ');
  const cmdName = args.shift().toLowerCase();
  if (!bot.cmds.has(cmdName)) return;
  const cmd = bot.cmds.get(cmdName);
  try {
    cmd.exe(msg, args);
  } catch (err) {
    console.error(err);
    msg.reply(`:x: There was an error trying to execute that command! \`{err}\``);
  }
});
bot.login(token); // Ugh, this is getting old. Is there an npm package that's better than this?
```

Okay, we admit: It may only be punching out 3 lines of code, but if you look at the lines of code, how compact they are, how user-friendly they are, how well-laid-out they are, how simple they are, how easy they are, how convenient they are, how snippet-based they are, how expansive they are, and how EFFICIENT they are ([efficiency-org](https://github.com/efficiency-org), y'know), it has a **SUPERCALIFRAGILISTICEXPIALIDOCIOUS** reputation!

read more [via the wiki](https://github.com/efficiency-org/discord.js-ex/wiki)
