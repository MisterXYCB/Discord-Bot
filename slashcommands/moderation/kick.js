const { SlashCommandBuilder } = require(`@discordjs/builders`);

module.exports = {
    name: `kick`,
    category: "moderation",
	data: new SlashCommandBuilder()
	.setName(`kick`)
	.setDescription(`Let's you kick a user!`)
    .addUserOption(option =>
        option.setName(`user`)
        .setDescription(`The user that will be kicked!`)
        .setRequired(true))
    .addStringOption(option =>
        option.setName(`reason`)
        .setDescription(`The Reason that the user is kicked!`)),
    /*...*/
	async execute(client, interaction, Discord, text, profileData, serverData){
        await interaction.deferReply({ephemeral: true})
        if(!interaction.member.permissions.has("ADMINISTRATOR") && !interaction.member.permissions.has("KICK_MEMBERS") && !interaction.member.roles.cache.has(serverData.modRole) && !interaction.member.roles.cache.has(serverData.adminRole)) return interaction.editReply(`${text.translate["general"]["NO_PERMISSION"][serverData.language]}`)
        const member = interaction.guild.members.cache.get(interaction.options.getUser(`user`).id);
        if(member.kickable == false) return interaction.editReply({content: `${text.translate["kick"]["CAN_NOT_KICK"][serverData.language]}`, ephemeral: true})
        try{
            interaction.guild.members.kick(interaction.options.getUser(`user`).id, {reason: interaction.options.getString(`reason`) || "XY_CBOT[AUTOMATED]: No reason given!"});
        }catch(err){
            console.log(err)
            interaction.editReply({content: `${text.translate["kick"]["ERROR"][serverData.language]}`, ephemeral: true})
            return
        }
        const successEmbed = new Discord.MessageEmbed() .setDescription(`${text.translate["kick"]["SUCCESS"][serverData.language].replace("bot.member", interaction.options.getUser(`user`)).replace("bot.reason", `\`${interaction.options.getString(`reason`) || "XY_CBOT[AUTOMATED]: No reason given!"}\``)}`) .setColor('25FE25') .setTimestamp()
        interaction.editReply({embeds: [successEmbed], ephemeral: false});
    },
};