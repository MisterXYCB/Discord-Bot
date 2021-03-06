module.exports = {
    name: 'codetest',
    permissions: [],
    description: "test command",
    category: "devonly",
    adminonly: false,
    activ: true,
    async execute(client, message, args, cmd, Discord, text, profileData, serverData){

const embed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Some title')
	.setURL('https://discord.js.org/')
	.setAuthor('Some name', 'https://i.imgur.com/AfFp7pu.png', 'https://discord.js.org')
	.setDescription('Some description here')
	.setThumbnail('https://i.imgur.com/AfFp7pu.png')
	.addFields(
		{ name: 'Regular field title', value: 'Some value here' },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
	)
	.addField('Inline field title', 'Some value here', true)
	.setImage('https://imgur.com/MRZN2WT.png')
	.setTimestamp()
	.setFooter('Some footer text here', 'https://i.imgur.com/AfFp7pu.png');

    return message.channel.send({ embeds: [embed] });
    }
}