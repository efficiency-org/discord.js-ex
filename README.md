# discord.js-ex
An npm package to extend on <https://www.npmjs.com/package/discord.js>, making it simpler and more compact.
## About
The npm package discord.js-ex is designed to make discord.js more compact and simple.
By making this package we don't intend to claim discord.js as ours, but we're trying to make it better; with another package.
We are looking for collaborators to help us make this package great.
## Installation
Once the package is published, you can go to <https://www.npmjs.com/package/discord.js-ex> to get information about it. 
To add the package to your own projects:
- [Install Node.js.](https://nodejs.org/download/current/)
- Go to your terminal and run `node -v`.
- Go to your terminal and run `npm --version`.
- *See Required Packages.*
- Go to your terminal and run `npm install discord.js-ex`.
## Required Packages
You need to run `npm install discord.js` to install the `discord.js` package on your desired project first, because this package uses `require('discord.js')`. 
## Example Code
**Note:** This package hasn't been published yet, so this is just how we plan to make it. This will probably change in the future.

```js
// I don't need to use `require('discord.js');`, but I still need to install discord.js!
const { Client } = require('discord.js-ex');
const token = 'your-token';
const bot = new Client(token);
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
