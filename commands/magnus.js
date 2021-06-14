module.exports = {
	name: 'magnus',
	description: 'magnus!',
	execute(message, args) {
		message.channel.send("Ida's servant", {tts: true});
	},
}