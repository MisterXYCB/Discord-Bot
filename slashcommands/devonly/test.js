const { SlashCommandBuilder } = require(`@discordjs/builders`);
 
module.exports = {
    name: `test`,
    category: "devonly",
	data: new SlashCommandBuilder()
	.setName(`test`)
	.setDescription(`dev test`),
    /*...*/
	async execute(client, interaction, Discord){
        if(interaction.user.id !== '722790461751689327') return;
        const embed1 = new Discord.MessageEmbed() .setDescription(`Loading ...`) .addField("test", "test2", false) .setColor('DARK_RED') .setTimestamp();
        const embed2 = new Discord.MessageEmbed() .setDescription('text.translate["test"]["TEST_ANSWER"][serverData.language]') .setColor('DARK_RED') .setTimestamp();
        const msg = await interaction.reply({embeds: [embed1]});
        setTimeout(() =>{interaction.editReply({embeds: [embed2]})}, 5000)
    },
};