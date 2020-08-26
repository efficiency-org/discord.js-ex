module.exports = {
	class Client {
		constructor(token) {
			this.token = token;
			if (typeof this.token !== 'string') {
				console.error(`Token must be of type string, not ${typeof this.token}.`);
			}
			const { Client } = require('discord.js');
			this.client = new Client();

			this.client.login(this.token);
		}
	}
};
