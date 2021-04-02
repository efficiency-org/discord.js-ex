class CompactMessageObject {
	constructor(msg, client) {
		this.uncompacted = msg;
		this.text = msg.content;
		this.client = client;
	}
	beginsWith(text) {
		let stringText;
		try {
			stringText = text.toString();
		} catch (error) {
			throw new Error(error);
		} finally {
			if (this.text.startsWith(stringText)) return true; else return false;
		}
	}
	sendBack(text) {
		let stringText;
		try {
			stringText = text.toString();
		} catch (error) {
			throw new Error(error);
		} finally {
			this.uncompacted.channel.send(stringText);
		}
	}
}

module.exports = {
	class Client {
		constructor(token) {
			this.token = token;
			if (typeof this.token !== 'string') throw new Error(`Token must be of type string, not ${typeof this.token}.`);
			const { Client } = require('discord.js');
			this.client = new Client();
			this.uncompacted = this.client;

			this.client.login(this.token);
		}
		whenOnline(execution) {
			this.client.once('ready', execution());
		}
		whenMessageReceived(execution) {
			this.client.on('message', msg => execution(new CompactMessageObject(msg, this.client)));
		}
	}
};
