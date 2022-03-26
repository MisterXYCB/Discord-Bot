const { SlashCommandBuilder } = require(`@discordjs/builders`);
const ms = require('ms')

module.exports = {
    name: `timeout`,
    category: "moderation",
	data: new SlashCommandBuilder()
	.setName(`timeout`)
	.setDescription(`Let's you timeout a user!`)
    .addUserOption(option =>
        option.setName(`user`)
        .setDescription(`The user that will be timeouted!`)
        .setRequired(true))
    .addStringOption(option =>
        option.setName(`time`)
        .setDescription(`The time a user will be timed out (format: s=seconds, m=minutes, h=hours, d=days)!`)
        .setRequired(true))
    .addStringOption(option =>
        option.setName(`reason`)
        .setDescription(`The Reason that the user is timeouted for!`)),
    /*...*/
	async execute(client, interaction, Discord, text, profileData, serverData){
        await interaction.deferReply({ephemeral: true})
        if(!interaction.member.permissions.has("ADMINISTRATOR") && !interaction.member.permissions.has("MODERATE_MEMBERS") && !interaction.member.roles.cache.has(serverData.modRole) && !interaction.member.roles.cache.has(serverData.adminRole)) return interaction.editReply(`${text.translate["general"]["NO_PERMISSION"][serverData.language]}`)
        let time = null;
        if(interaction.options.getString(`time`) != "0") time = ms(interaction.options.getString(`time`))
        try{
            await interaction.guild.members.cache.get(interaction.options.getUser(`user`).id).timeout(time, (interaction.options.getString(`reason`) || "XY_CBOT[AUTOMATED]: No reason given!"));
        }catch(err){
            console.log(err)
            interaction.editReply({content: `${text.translate["ban"]["ERROR"][serverData.language]}`, ephemeral: true})
            return
        }
        if(interaction.options.getString(`time`) != "0"){
            const successEmbed1 = new Discord.MessageEmbed() .setDescription(`${text.translate["timeout"]["ADD"][serverData.language].replace("bot.member", interaction.options.getUser(`user`)).replace("bot.time", ms(time, {long: false})).replace("bot.reason", `\`${interaction.options.getString(`reason`) || "XY_CBOT[AUTOMATED]: No reason given!"}\``)}`) .setColor('25FE25') .setTimestamp()
            interaction.editReply({embeds: [successEmbed1], ephemeral: false})
        }else{
            const successEmbed2 = new Discord.MessageEmbed() .setDescription(`${text.translate["timeout"]["REMOVE"][serverData.language].replace("bot.member", interaction.options.getUser(`user`))}`) .setColor('25FE25') .setTimestamp()
            interaction.editReply({embeds: [successEmbed2], ephemeral: false})
        }
    },
};