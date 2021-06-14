module.exports = {
	name: 'jens',
	description: 'Jens!',
	execute(message, args) {
		message.channel.send('Jens is a bot', {tts: true});
	},
}