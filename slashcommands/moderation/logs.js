const { SlashCommandBuilder } = require(`@discordjs/builders`);

module.exports = {
    name: `logs`,
    category: "moderation",
	data: new SlashCommandBuilder()
	.setName(`logs`)
	.setDescription(`let's you enable/disable certain logs!!`)
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

    }
}