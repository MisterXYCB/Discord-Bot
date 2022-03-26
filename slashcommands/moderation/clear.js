const { SlashCommandBuilder } = require(`@discordjs/builders`);

module.exports = {
    name: `clear`,
    category: "moderation",
	data: new SlashCommandBuilder()
	.setName(`clear`)
	.setDescription(`Let's you delete a specific count message in a channel!`)
    .addNumberOption(option =>
        option.setName(`message-count`)
        .setDescription(`The count of messages that will be deleted!`)
        .setRequired(true))
    .addChannelOption(option =>
        option.setName(`channel`)
        .setDescription(`The channel where the messages will be deleted`)),
    /*...*/
	async execute(client, interaction, Discord, text, profileData, serverData){
        await interaction.deferReply({ephemeral: true});
        if(!interaction.member.permissions.has("ADMINISTRATOR") && !interaction.member.permissions.has("MANAGE_MESSAGES") && !interaction.member.roles.cache.has(serverData.modRole) && !interaction.member.roles.cache.has(serverData.adminRole)) return interaction.editReply(`${text.translate["general"]["NO_PERMISSION"][serverData.language]}`)
        let channel;
        if(interaction.options.getChannel(`channel`) && interaction.options.getChannel(`channel`).type == "GUILD_TEXT") channel = interaction.options.getChannel(`channel`);
        else channel = interaction.channel;
        if(interaction.options.getNumber(`message-count`) % 1 || interaction.options.getNumber(`message-count`) < 1 || interaction.options.getNumber(`message-count`) > 100) return interaction.editReply(`${text.translate["clear"]["COUNT"][serverData.language]}`);
        
        channel.bulkDelete(interaction.options.getNumber(`message-count`), true).then(deleted =>{
            const msg = text.translate["clear"]["DONE"][serverData.language].replace("deleted.amount", deleted.size)
            const embed3 = new Discord.MessageEmbed() .setDescription(`${msg}`) .setColor('25FE25') .setTimestamp();
            if(interaction.options.getNumber(`message-count`) > deleted.size) embed3.setFooter(`${text.translate["clear"]["FOOTER"][serverData.language]}`);
            interaction.editReply({ embeds: [embed3] })
        })
    },
};