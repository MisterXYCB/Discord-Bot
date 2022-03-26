const { SlashCommandBuilder } = require(`@discordjs/builders`);
const { ChannelType } = require("discord-api-types/v9");

module.exports = {
    name: `tickethub`,
	category: "ticket",
	data: new SlashCommandBuilder()
	.setName(`tickethub`)
	.setDescription(`Let's you create a new tickethub`)
	.addStringOption(option =>
		option.setName(`description`)
		.setDescription(`The description of the embed!`)
		.setRequired(true))
	.addChannelOption(option => 
		option.setName(`channel`)
		.setDescription(`The channel where the messages should be sent!`)
		.setRequired(true)),
    /*...*/
	async execute(client, interaction, Discord){
        interaction.deferReply({ephemeral: true})
		if(interaction.options.getChannel(`channel`).type != "GUILD_TEXT") return interaction.editReply({content: "The channel was not a text channel!"})
		
		const msg = await interaction.options.getChannel(`channel`).send("Loading...")
		
		msg.edit({content: "\u200b", embeds: [new Discord.MessageEmbed() .setDescription(`${interaction.options.getString(`description`)}`) .setColor('7faaf0') .setFooter(`ID: ${msg.id}`)]})
		interaction.editReply("I created the message you can add ticket options per id!")
    },
};