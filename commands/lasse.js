module.exports = {
	name: 'lasse',
	description: 'Lasse!',
	execute(message, args) {
		message.channel.send('Lasse is not a bot', {tts: true});
	},
}