const fs = require('fs');
const { token, prefix } = require('./config.json');
const Discord = require('discord.js');
const ytdl = require('ytdl-core-discord');


const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

client.on('message', async message => {
    if (message.content.startsWith(prefix) || message.author.bot){
		const args = message.content.slice(prefix.length).trim().split(/ +/);
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

	if (message.guild){
		if (message.content === '/join') {
		// Only try to join the sender's voice channel if they are in one themselves
		if (message.member.voice.channel) {
			const connection = await message.member.voice.channel.join();
			const dispatcher = connection.play(await ytdl('https://www.youtube.com/watch?v=bWXazVhlyxQ'), { type: 'opus' });
			dispatcher.setVolume(0.25);
			dispatcher.on('start', () => {
				console.log('music is now playing!');
			});
			
			dispatcher.on('finish', () => {
				console.log('music has finished playing!');
			});
			
			// Always remember to handle errors appropriately!
			dispatcher.on('error', console.error);
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


