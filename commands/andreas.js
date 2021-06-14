module.exports = {
	name: 'andreas',
	description: 'andreas!',
	execute(message, args) {
		message.channel.send('Andreas is a bot', {tts: true});
    },
}