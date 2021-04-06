// https://discord.js.org/#/docs/main/stable/general/welcome

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

class CompactVoiceStateObject {
	constructor(voiceState) {
		this.uncompacted = voiceState;
		this.channel = new CompactChannelObject(this.uncompacted.channel);
		this.channelID = this.uncompacted.channelID;
		// this.myConnection = new CompactVoiceConnectionObject(this.uncompacted.connection);
		this.deaf = this.uncompacted.deaf;
		this.server = new CompactServerObject(this.uncompacted.guild);
		this.me = this.server.me;
		this.id = this.uncompacted.id;
		this.member = new CompactMemberObject(this.uncompacted.member);
		this.muted = this.uncompacted.mute;
		this.memDeaf = this.uncompacted.selfDeaf;
		this.memMuted = this.uncompacted.selfMute;
		this.video = this.uncompacted.selfVideo;
		this.servDeaf = this.uncompacted.serverDeaf;
		this.servMuted = this.uncompacted.serverMute;
		this.sessionID = this.uncompacted.sessionID;
		this.speaking = this.uncompacted.speaking;
		this.streaming = this.uncompacted.streaming;
		if (this.member.id !== this.me.id) this.myVoiceState = new CompactVoiceStateObject(this.uncompacted.connection.status); else this.myVoiceState = this;
	}
	kick(reason) {
		this.uncompacted.kick(reason ?? 'Unspecified');
	}
        setChannel(channel, reason) {
		if (channel) this.uncompacted.setChannel(channel.uncompacted, reason ?? 'Unspecified'); else this.uncompacted.setChannel(null, reason ?? 'Unspecified');
	}
	deafen(reason) {
		this.uncompacted.setDeaf(true, reason ?? 'Unspecified');
	}
	undeafen(reason) {
		this.uncompacted.setDeaf(false, reason ?? 'Unspecified');
	}
	toggleDeafen(reason) {
		this.uncompacted.setDeaf(!this.deaf, reason ?? 'Unspecified');
	}
	mute(reason) {
		this.uncompacted.setMute(true, reason ?? 'Unspecified');
	}
	unmute(reason) {
		this.uncompacted.setMute(false, reason ?? 'Unspecified');
	}
	toggleMute(reason) {
		this.uncompacted.setMute(!this.muted, reason ?? 'Unspecified');
	}
	deafenMe(reason) {
		this.uncompacted.setSelfDeaf(true, reason ?? 'Unspecified');
	}
	undeafenMe(reason) {
		this.uncompacted.setSelfDeaf(false, reason ?? 'Unspecified');
	}
	toggleMyDeafen(reason) {
		this.uncompacted.setSelfDeaf(!this.myVoiceState.deaf, reason ?? 'Unspecified');
	}
	muteMe(reason) {
		this.uncompacted.setSelfMute(true, reason ?? 'Unspecified');
	}
	unmuteMe(reason) {
		this.uncompacted.setSelfMute(false, reason ?? 'Unspecified');
	}
	toggleMyMute(reason) {
		this.uncompacted.setSelfMute(!this.myVoiceState.muted, reason ?? 'Unspecified');
	}
}

class CompactServerObject {
	constructor(server) {
		this.uncompacted = server;
		this.isUp = this.uncompacted.available;
		this.name = this.uncompacted.name;
		this.acronym = this.uncompacted.nameAcronym;
		this.verified = this.uncompacted.verified;
		this.id = this.uncompacted.id;
		this.me = new CompactMemberObject(this.uncompacted.me);
		this.myID = this.me.id;
		this.myUser = this.me.user;
		this.owner = new CompactMemberObject(this.uncompacted.owner);
		this.ownerUser = this.owner.user;
		this.ownerID = this.uncompacted.ownerID;
		this.area = this.uncompacted.region;
		this.myJoin = this.uncompacted.joinedAt;
		this.myJoinTimestamp = this.uncompacted.joinedTimestamp;
		this.myVoiceState = new CompactVoiceStateObject(this.uncompacted.voice);
	}
	check() {
		if (this.isUp) return true; else return false;
	}
	leave() {
		if (this.check()) this.uncompacted.leave(); else throw new Error(`Cannot leave server ${this.name}: Server not available due to outage`);
	}
}

class CompactMessageObject {
	constructor(msg) {
		this.uncompacted = msg;
		this.text = this.uncompacted.content;
		this.bot = this.uncompacted.client;
		this.auth = new CompactUserObject(this.uncompacted.author);
		this.mem = if (!this.isDM()) new CompactMemberObject(this.uncompacted.member); else null;
		this.webhookID = this.uncompacted.webhookID;
		this.channel = new CompactChannelObject(this.uncompacted.channel);
		this.server = new CompactServerObject(this.uncompacted.guild);
		this.id = this.uncompacted.id;
		this.cleanText = this.uncompacted.cleanContent;
		this.created = this.uncompacted.createdAt;
		this.createdTimestamp = this.uncompacted.createdTimestamp;
		this.deletable = this.uncompacted.deletable;
		this.gone = this.uncompacted.deleted;
		this.editable = this.uncompacted.editable;
		this.lastEdited = this.uncompacted.editedAt;
		this.lastEditedTimestamp = this.uncompacted.editedTimestamp;
		this.edits = this.uncompacted.edits;
		this.embeds = this.uncompacted.embeds;
		this.flags = this.uncompacted.flags;
		// this.mentions = new CompactMentionsObject(this.uncompacted.mentions);
		this.nonce = this.uncompacted.nonce;
		this.partial = this.uncompacted.partial;
		this.pinnable = this.uncompacted.pinnable;
		this.pinned = this.uncompacted.pinned;
		// this.reacts = new CompactReactObject(this.uncompacted.reactions);
		this.crosspostable = this.uncompacted.crosspostable;
		// this.ref = new CompactRefObject(this.uncompacted.reference);
		this.sys = this.uncompacted.system; // a message sent from Discord itself, e.g. `<b>${username}</b> pinned <b><a href="xxx">a message</a></b> to this channel. <a href="xxx"><b>See all the pins.</b></a>`
		this.tts = this.uncompacted.tts;
		this.type = this.uncompacted.type;
		this.jumpURL = this.uncompacted.url;
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
	edit(newContent) {
		const refinedNewContent = newContent.replace('${text}', this.text);
		if (this.auth.id === this.bot.id) this.uncompacted.edit(); else throw new Error(`Tried to edit message containing ${this.cleanText} sent by ${this.auth} in ${this.server.name} to be ${refinedNewContent}, but must be the sender of that message.`);
	}
}

module.exports = {
	fs: require('fs'), // recommended: const { ..., fs, ... } = require('discord.js-ex');
	uncompacted: require('discord.js'), // recommended: const { ..., uncompacted: Discord, ... } = require('discord.js-ex');
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
			this.client.on('message', msg => execution(new CompactMessageObject(msg)));
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
		numberIsEven(number) {
			if (Number.parseFloat(number % 2)) /* odd */ return false; else /* even */ return true;
		}
		numberIsOdd(number) {
			return !this.numberIsEven(number); // opposite of this.numberIsEven(number)
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
