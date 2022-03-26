//command to ban a user
module.exports = {
    name: 'ban',
    permissions: [],
    description: "ban command",
    category: "moderation",
    adminonly: false,
    activ: true,
    replaced: true,
    execute(client, message, args, cmd, Discord, text, profileData, serverData){
        const member = message.mentions.users.first() || client.users.cache.get(args[0]);
        const permEmbed = new Discord.MessageEmbed() .setDescription(`${text.translate["general"]["NO_PERMISSION"][serverData.language]}`) .setColor('DARK_RED') .setTimestamp()
        if(!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has[serverData.adminRole]) return message.reply({embeds: [permEmbed]})
        
        const noMemberEmbed = new Discord.MessageEmbed() .setDescription(`${text.translate["ban"]["NO_MEMBER"][serverData.language]}`) .setColor('DARK_RED') .setTimestamp()
        if(!member) return message.reply({embeds: [noMemberEmbed]});
        const ownerEmbed = new Discord.MessageEmbed() .setDescription(`${text.translate["ban"]["OWNER"][serverData.language]}`) .setColor('DARK_RED') .setTimestamp()
        if(member.id === message.guild.ownerId) return message.reply({embeds: [ownerEmbed]});
        
        
        const reason = args.slice(1).join(" ") || `${text.translate["ban"]["NO_REASON"][serverData.language]}`
        
        try{
            message.guild.members.ban(member.id, {reason: reason});
            const banEmbed = new Discord.MessageEmbed() .setDescription(`${text.translate["ban"]["SUCCESS"][serverData.language].replace("bot.memberid", member.id).replace("bot.reason", reason)}`) .setColor('DARK_RED') .setTimestamp()
            message.reply({embeds: [banEmbed]})
        }catch(err){
            console.error(err)
            const errorEmbed = new Discord.MessageEmbed() .setDescription(`${text.translate["ban"]["ERROR"][serverData.language]}`) .setColor('DARK_RED') .setTimestamp()
            message.reply({embeds: [errorEmbed]});
        }
    }
}