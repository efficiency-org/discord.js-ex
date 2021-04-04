class CompactUserObject {
	constructor(user) {
		this.uncompacted = user;
		this.username = this.uncompacted.username;
		this.bot = this.uncompacted.bot;
		this.id = this.uncompacted.id;
	}
}

class CompactMemberObject {
	constructor(member) {
		this.uncompacted = member;
		this.username = this.uncompacted.username;
		this.user = new CompactUserObject(this.uncompacted.user);
		this.bot = this.user.bot;
		this.id = this.uncompacted.id;
	}
}

class CompactChannelObject {
	constructor(channel) {
		this.uncompacted = channel;
		this.type = this.uncompacted.type.toString();
		this.server = this.uncompacted.guild;
		this.id = this.uncompacted.id;
	}
}

class CompactMessageObject {
	constructor(msg, client) {
		this.uncompacted = msg;
		this.text = this.uncompacted.content;
		this.client = client;
		this.auth = new CompactUserObject(this.uncompacted.author);
		this.mem = if (!this.isDM()) new CompactMemberObject(this.uncompacted.member); else null;
		this.webhookID = this.uncompacted.webhookID;
		this.channel = new CompactChannelObject(this.uncompacted.channel);
		this.server = this.uncompacted.guild;
		this.id = this.uncompacted.id;
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
	getChannelType() {
		return this.channel.type;
	}
	isDM() {
		if (this.getChannelType() === 'dm') return true; else return false;
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
				msg.sendBackWithMention(`:x: There was an error trying to execute that command! \`${err}\``);
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
