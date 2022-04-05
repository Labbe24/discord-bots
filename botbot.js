const fs = require('fs');
const { token, commandPrefix, ytPrefix, googleApiKey } = require('./config.json');
const Discord = require('discord.js');
const ytdl = require('ytdl-core-discord');
const YouTube = require("discord-youtube-api");

const youtube = new YouTube(googleApiKey);
const client = new Discord.Client();
client.commands = new Discord.Collection();
client.ytCommands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

var connection;
var dispatcher;
var songQueue = [];

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

async function searchYouTube(query) {
	try {
		return await youtube.searchVideos(query);			

	} catch (error) {
		console.error(error);
		return;
	}
}

async function playYouTube(song) {
	try {
		dispatcher = connection.play(await ytdl('https://www.youtube.com/watch?v='+song.id), { type: 'opus', filter: 'audioonly' });
		dispatcher.setVolume(0.25);
<<<<<<< HEAD

		dispatcher.on('start', () => {
			console.log('music is now playing!');
		});

=======

		dispatcher.on('start', () => {
			console.log('music is now playing!');
		});

>>>>>>> 660156bac55c9a3c497a17cce71c2aeec1ff984e
		dispatcher.on('finish', async () => {
			console.log('music has finished playing!');
			// if queue not empty, play next song in queue
			if(songQueue.length > 0){
				const searchResult = await searchYouTube(songQueue.shift());
				playYouTube(searchResult);
			}
		});
		dispatcher.on('error', console.error);			

	} catch (error) {
		console.error(error);
	}
}

client.on('message', async message => {
    if (message.content.startsWith(commandPrefix)){
		const args = message.content.slice(commandPrefix.length).trim().split(/ +/);
		const commandName = args.shift().toLowerCase();

		if (client.commands.has(commandName)) {
			const command = client.commands.get(commandName);

			try {

				command.execute(message, args);

			} catch (error) {
				console.error(error);
				message.reply('there was an error trying to execute that command!');
			}
		}
	}

	if (message.content.startsWith(ytPrefix)){
		const commandName = message.content.slice(ytPrefix.length).trim().split(/ +/).shift().toLowerCase();
		console.log("command " + commandName);

		if(commandName == "search"){
			const args = message.content.substr(message.content.indexOf(" ") + 1);
			searchYouTube(args);
		}

		if(commandName == "play"){
			const args = message.content.substr(message.content.indexOf(" ") + 1);
			const searchResult = await searchYouTube(args);
			playYouTube(searchResult);
		}

		if(commandName == "pause"){
			dispatcher.pause();
		}

		if(commandName == "resume"){
			dispatcher.resume();
		}

		if(commandName == "volume"){
			const args = message.content.substr(message.content.indexOf(" ") + 1);
			dispatcher.setVolume(args);
		}

		if(commandName == "queue"){
			const args = message.content.substr(message.content.indexOf(" ") + 1);
			songQueue.push(args);
		}

		if(commandName == "skip"){
			if(songQueue.length > 0){
				const searchResult = await searchYouTube(songQueue.shift());
				playYouTube(searchResult);
			}
		}

		if(commandName == "playlist"){
			const args = message.content.substr(message.content.indexOf(" ") + 1);		
		}
	}

	if (message.guild){
		if (message.content === '/joint') {
		if (message.member.voice.channel) {
			connection = await message.member.voice.channel.join();
		} 
		else {
			message.reply('You need to join a voice channel first!');
		}
	}
  }
});

// Successful login
client.on('ready', () => {
   console.log('Ready!'); 
});

// Login with the bot
client.login(token);


