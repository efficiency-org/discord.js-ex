class CompactMessageObject {
	constructor(msg, client) {
		this.uncompacted = msg;
		this.text = this.uncompacted.content;
		this.client = client;
		this.auth = this.uncompacted.author;
		this.webhookID = this.uncompacted.webhookID;
	}
	beginsWith(text) {
		let stringText;
		try {
			stringText = text.toString();
		} catch (error) {
			throw new Error(error);
		} finally {
			return this.text.startsWith(stringText); // already boolean
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
	sendBackWithMention(text) {
		let stringText;
		try {
			stringText = text.toString();
		} catch (error) {
			throw new Error(error);
		} finally {
			this.uncompacted.reply(stringText);
		}
	}
}

module.exports = {
	fs: require('fs'),
	Client: class Client {
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
		retrieveCommandFiles() {
			try {
				const returnValue = require('fs').readdirSync('./commands').filter(file => file.endsWith('.js'));
				return returnValue;
			} catch (err) {
				throw new Error(err);
			}
		}/*
		retrieveCommandFilesWithinFolders() {
			// ...
		}*/
		retrieveCommandFile(file) {
			try {
				const returnValue = require(`./commands/${file}`);
				return returnValue;
			} catch (err) {
				throw new Error(err);
			}
		}
		setBio(type, text) {
			this.client.user.setActivity(text.toString(), { type: type.toString() });
		}
		getArgs(msg, prefix) {
			/* ....................................................................................................................................................................................................... */ return msg.text.slice(prefix.length).trim().split(' ');
		}
		parseCmdN(args) {
			return args.shift().toLowerCase();
		}
		error(msg, err, type) {
			if (!type) {
				console.error(err);
				msg.sendBackWithMention('there was an error trying to execute that command!');
			}
		}
	},
	Collection: class Collection {
		constructor() {
			const { Collection } = require('discord.js');
			this.uncompacted = new Collection();
		}
		s(key, value) {
			this.uncompacted.set(key, value);
		}
		h(key) {
			return this.uncompacted.has(key); // already boolean
		}
		g(key) {
			return this.uncompacted.get(key); // We need to cover normal discord.js stuff being in classes, though!
		}
	}
};
