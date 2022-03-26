module.exports = {
    name: 'adminrole',
    aliases: ["arole"],
    permissions: [],
    cooldown: 6,
    description: "adminrole command",
    category: "moderation",
    adminonly: false,
    activ: true,
    async execute(client, message, args, cmd, Discord, text, profileData, serverData){
        let role = await message.guild.roles.cache.get(serverData.adminRole);
        let description = ""
        if(!role) description = text.translate["adminrole"]["NO_ROLE"][serverData.language]
        if(role) description = text.translate["adminrole"]["ANSWER"][serverData.language].replace("bot.adminrole", `<@&${role.id}>`);
        const embed = new Discord.MessageEmbed() .setDescription(description) .setColor("25FE25") .setTimestamp()
        message.reply({embeds: [embed]})
    }
}