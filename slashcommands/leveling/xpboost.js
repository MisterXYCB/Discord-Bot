const { SlashCommandBuilder } = require(`@discordjs/builders`);

module.exports = {
    name: 'xpboost',
    category: "leveling",
    data: new SlashCommandBuilder()
	.setName(`xpboost`)
	.setDescription(`Change the server's xp rate`)
    .addNumberOption(option =>
        option.setName(`boost`)
        .setDescription(`The new rate multiplier for the xp someone gets`)
        .addChoice("extrem slow (10%)", 0.1)
        .addChoice("very slow (25%)", 0.25)
        .addChoice("slow (50%)", 0.5)
        .addChoice("bit slower (75%)", 0.75)
        .addChoice("normal (100%)", 1)
        .addChoice("bit faster (150%)", 1.5)
        .addChoice("fast (200%)", 2)
        .addChoice("very fast (300%)", 3)
        .addChoice("extrem fast (400%)", 4)
        .setRequired(true)),
    async execute(client, interaction, Discord, text, profileData, serverData){
        const permEmbed = new Discord.MessageEmbed() .setDescription(`${text.translate["general"]["NO_PERMISSION"][serverData.language]}`) .setColor('DARK_RED') .setTimestamp();
        if(!interaction.member.roles.cache.has(serverData.adminRole) && !interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({embeds: [permEmbed], empheral: true});
        await serverData.updateOne({$set: {xpboost: interaction.options.getNumber(`boost`)}});
        const answerEmbed = new Discord.MessageEmbed() .setDescription(`${text.translate["xpboost"]["ANSWER"][serverData.language].replace("bot.amount", interaction.options.getNumber(`boost`))}`) .setColor('25FE25') .setTimestamp()
        interaction.reply({embeds: [answerEmbed]})
    }
}