module.exports = {
	class Client : DiscordClient {
		constructor(token : String) {
			this.token = new String(token);

			const { Client } = require('discord.js');
			const client = new Client();

			this.client = client;

			client.login(this.token);
		}
	}
}
