const { SlashCommandBuilder } = require(`@discordjs/builders`);

module.exports = {
    name: `set`,
    category: "moderation",
	data: new SlashCommandBuilder()
	.setName(`set`)
	.setDescription(`let's you set things!`)
    .addSubcommand(subcommand =>
        subcommand.setName(`language`)
        .setDescription(`Let's you change the language`)
        .addStringOption(option =>
            option.setName(`language`)
            .setDescription(`The language in which the bot should answer!`)
            .setRequired(true)
            .addChoice(`English`, `english`).addChoice(`Deutsch`, `deutsch`)))
    .addSubcommand(subcommand =>
        subcommand.setName(`prefix`)
        .setDescription(`Set the prefix for text commands!`)
        .addStringOption(option =>
            option.setName(`prefix`)
            .setDescription(`The text commands prefix`)
            .setRequired(true)))
    .addSubcommand(subcommand =>
        subcommand.setName(`xpboost`)
        .setDescription(`The xpboost sets how fast members get xp!`)
        .addNumberOption(option =>
            option.setName(`boost`)
            .setDescription(`The boost how fast members get xp (15-30 * boost)`)
            .addChoice(`0.25(very slow)`, 0.25).addChoice(`0.5(slow)`, 0.5).addChoice(`0.75(a bit slower)`, 0.75).addChoice(`1(normal)`, 1)
            .addChoice(`1.5(a bit faster)`, 1.5).addChoice(`2(fast)`, 2).addChoice(`3(very fast)`, 3).addChoice(`4(extrem fast)`, 4)
            .setRequired(true))),
    /*...*/
	async execute(client, interaction, Discord, text, profileData, serverData){
        await interaction.deferReply({ephemeral: true})
        if(interaction.options.getSubcommand() == "language"){
            if(!interaction.member.permissions.has("ADMINISTRATOR") && !interaction.member.roles.cache.has(serverData.modRole) && !interaction.member.roles.cache.has(serverData.adminRole)) return interaction.editReply(`${text.translate["general"]["NO_PERMISSION"][serverData.language]}`)
            await serverData.updateOne({ $set: { language: interaction.options.getString(`language`) }})
            const successEmbed = new Discord.MessageEmbed() .setDescription(`${text.translate["setlanguage"]["DONE"][interaction.options.getString(`language`)]}`) .setColor('25FE25') .setTimestamp()
            interaction.editReply({embeds: [successEmbed], ephemeral: true});
        }else if(interaction.options.getSubcommand() == "prefix"){
            if(!interaction.member.permissions.has("ADMINISTRATOR") && !interaction.member.roles.cache.has(serverData.modRole) && !interaction.member.roles.cache.has(serverData.adminRole)) return interaction.editReply(`${text.translate["general"]["NO_PERMISSION"][serverData.language]}`)
            await serverData.updateOne({ $set: { prefix: interaction.options.getString(`prefix`) }})
            const successEmbed = new Discord.MessageEmbed() .setDescription(`${text.translate["setprefix"]["ANSWER"][serverData.language].replace(`bot.newprefix`, interaction.options.getString(`prefix`))}`) .setColor('25FE25') .setTimestamp()
            interaction.editReply({embeds: [successEmbed], ephemeral: true});
        }else if(interaction.options.getSubcommand() == "xpboost"){
            if(!interaction.member.permissions.has("ADMINISTRATOR") && !interaction.member.roles.cache.has(serverData.modRole) && !interaction.member.roles.cache.has(serverData.adminRole)) return interaction.editReply(`${text.translate["general"]["NO_PERMISSION"][serverData.language]}`)
            await serverData.updateOne({ $set: { xpboost: interaction.options.getNumber(`boost`) }})
            const successEmbed = new Discord.MessageEmbed() .setDescription(`${text.translate["xpboost"]["ANSWER"][serverData.language].replace(`bot.amount`, interaction.options.getNumber(`boost`))}`) .setColor('25FE25') .setTimestamp()
            interaction.editReply({embeds: [successEmbed], ephemeral: true});
        }
    },
};