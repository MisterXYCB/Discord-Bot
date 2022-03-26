const { SlashCommandBuilder } = require(`@discordjs/builders`);
const { translate } = require

module.exports = {
    name: `ban`,
    category: "moderation",
	data: new SlashCommandBuilder()
	.setName(`ban`)
	.setDescription(`Let's you ban a user!`)
    .addUserOption(option =>
        option.setName(`user`)
        .setDescription(`The user that will be banned!`)
        .setRequired(true))
    .addNumberOption(option =>
        option.setName(`days`)
        .setDescription(`The messages for these days will automaticcally deleted!`)
        .setRequired(true)
        .addChoice(`0`, 0)
        .addChoice(`3`, 3)
        .addChoice(`7`, 7))
    .addStringOption(option =>
        option.setName(`reason`)
        .setDescription(`The Reason that the user is banned!`)),
    /*...*/
	async execute(client, interaction, Discord, text, profileData, serverData){
        await interaction.deferReply({ephemeral: true})
        if(!interaction.member.permissions.has("ADMINISTRATOR") && !interaction.member.permissions.has("BAN_MEMBERS") && !interaction.member.roles.cache.has(serverData.modRole) && !interaction.member.roles.cache.has(serverData.adminRole)) return interaction.editReply(`${text.translate["general"]["NO_PERMISSION"][serverData.language]}`)
        const member = interaction.guild.members.cache.get(interaction.options.getUser(`user`).id);
        if(member.bannable == false) return interaction.editReply({content: `${text.translate["ban"]["CAN_NOT_BAN"][serverData.language]}`, ephemeral: true})
        try{
            interaction.guild.members.ban(interaction.options.getUser(`user`).id, {reason: interaction.options.getString(`reason`) || "XY_CBOT[AUTOMATED]: No reason given!", days: interaction.options.getNumber(`days`)});
        }catch(err){
            console.log(err)
            interaction.editReply({content: `${text.translate["ban"]["ERROR"][serverData.language]}`, ephemeral: true})
            return
        }
        const successEmbed = new Discord.MessageEmbed() .setDescription(`${text.translate["ban"]["SUCCESS"][serverData.language].replace("bot.member", interaction.options.getUser(`user`)).replace("bot.days", interaction.options.getNumber(`days`)).replace("bot.reason", `\`${interaction.options.getString(`reason`) || "XY_CBOT[AUTOMATED]: No reason given!"}\``)}`) .setColor('25FE25') .setTimestamp()
        interaction.editReply({embeds: [successEmbed], ephemeral: false})
    },
};