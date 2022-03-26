//command to kick a user
module.exports = {
    name: 'kick',
    permissions: [],
    description: "kick command",
    category: "moderation",
    adminonly: false,
    activ: true,
    replaced: true,
    execute(client, message, args, cmd, Discord, text, profileData, serverData){
        const member = message.mentions.users.first() || client.users.cache.get(args[0]);
        const permEmbed = new Discord.MessageEmbed() .setDescription(`${text.translate["general"]["NO_PERMISSION"][serverData.language]}`) .setColor('DARK_RED') .setTimestamp()
        if(!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has[serverData.adminRole]) return message.reply({embeds: [permEmbed]})
        
        const noMemberEmbed = new Discord.MessageEmbed() .setDescription(`${text.translate["kick"]["NO_MEMBER"][serverData.language]}`) .setColor('DARK_RED') .setTimestamp()
        if(!member) return message.reply({embeds: [noMemberEmbed]});
        const ownerEmbed = new Discord.MessageEmbed() .setDescription(`${text.translate["kick"]["OWNER"][serverData.language]}`) .setColor('DARK_RED') .setTimestamp()
        if(member.id === message.guild.ownerId) return message.reply({embeds: [ownerEmbed]});
        
        
        const reason = args.slice(1).join(" ") || `${text.translate["kick"]["NO_REASON"][serverData.language]}`
        
        try{
            message.guild.members.kick(member.id, {reason: reason});
            const kickEmbed = new Discord.MessageEmbed() .setDescription(`${text.translate["ban"]["SUCCESS"][serverData.language].replace("bot.memberid", member.id).replace("bot.reason", reason)}`) .setColor('DARK_RED') .setTimestamp()
            message.reply({embeds: [kickEmbed]})
        }catch(err){
            console.error(err)
            const errorEmbed = new Discord.MessageEmbed() .setDescription(`${text.translate["ban"]["ERROR"][serverData.language]}`) .setColor('DARK_RED') .setTimestamp()
            message.reply({embeds: [errorEmbed]});
        }
    }
}