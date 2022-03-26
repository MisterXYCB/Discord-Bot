module.exports = {
    name: 'modrole',
    aliases: ["mrole"],
    permissions: [],
    cooldown: 6,
    description: "modrole command",
    category: "moderation",
    adminonly: false,
    activ: true,
    async execute(client, message, args, cmd, Discord, text, profileData, serverData){
        let role = await message.guild.roles.cache.get(serverData.modRole);
        let description = ""
        if(!role) description = text.translate["modrole"]["NO_ROLE"][serverData.language]
        if(role) description = text.translate["modrole"]["ANSWER"][serverData.language].replace("bot.modrole", `<@&${role.id}>`);
        const embed = new Discord.MessageEmbed() .setDescription(description) .setColor("25FE25") .setTimestamp()
        message.reply({embeds: [embed]})
    }
}