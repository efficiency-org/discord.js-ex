# discord.js-ex
An npm package to extend on https://www.npmjs.com/package/discord.js, making it simpler and more compact.
## About
The npm package discord.js-ex is designed to make discord.js more compact and simple.
By making this package we don't intend to claim discord.js as ours, but we're trying to make it better; with another package.
We are looking for collaborators to help us make this package great.
## Installation
Once the package is published, you can go to https://www.npmjs.com/package/discord.js-ex to get information about it. 
To add the package to your own projects, go to your terminal and run `npm install discord.js-ex`. *See Required Packages.*
## Required Packages
The discord.js-ex package requires the discord.js package, because it is an extension.
## Example Code
**Note:** This package hasn't been published yet, so this is just how we plan to make it. This will probably change in the future.


const { Client } = require('discord.js-ex');
<br>
const token = 'your-token';
<br>
const client = new Client(token);
<br>
const prefix = '!';
<br>
client.once('ready', () => {
<br>
	console.log(`Logged in as ${client.tag}!`);
	<br>
});
<br>
client.on('msg', msg => {
<br>
	if (msg.text.startsWith(`${prefix}ping`)) {
	<br>
		msg.channel.send('Pong.');
		<br>
	}
	<br>
});
