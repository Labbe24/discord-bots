module.exports = {
	name: 'steffensen',
	description: '710!',
	execute(message, args) {
		message.channel.send('I think you meant 0 10', {tts: true});
	},
}