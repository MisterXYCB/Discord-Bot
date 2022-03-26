const suggestionModel = require('../../models/suggestionSchema')

module.exports = {
    name: 'comment',
    aliases: [],
    permissions: [],
    description: "suggestion comment command",
    category: "suggestions",
    adminonly: true,
    activ: true,
    replaced: true,
    async execute(client, message, args, cmd, Discord, text, profileData, serverData){
        const permEmbed = new Discord.MessageEmbed() .setDescription(`${text.translate["general"]["NO_PERMISSION"][serverData.language]}`) .setColor('DARK_RED') .setTimestamp()
        if(!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(serverData.adminRole)) return message.reply({embeds: [permEmbed]})
        
        const channel = message.guild.channels.cache.get(serverData.suggestionChannel);
        
        const channelEmbed = new Discord.MessageEmbed() .setDescription(text.translate["comment"]["NO_CHANNEL"][serverData.language]) .setColor('DARK_RED') .setTimestamp();
        if(!channel) return message.reply({embeds: [channelEmbed]});
        const argsEmbed = new Discord.MessageEmbed() .setDescription(text.translate["comment"]["NO_ID"][serverData.language]) .setColor('DARK_RED') .setTimestamp();
        if(!args[1]) return message.reply({embeds: [argsEmbed]});
        const comment = args.slice(1).join(" ")
        
        const suggestionData = await suggestionModel.findOne({ messageID: args[0] })
        const author = client.users.cache.get(suggestionData.authorID)
        await channel.messages.fetch(suggestionData.embedID)
        const oldEmbed = channel.messages.cache.get(suggestionData.embedID)

        const embed = new Discord.MessageEmbed()
        .setColor('304281')
        .setAuthor(author.tag, author.displayAvatarURL({ dynamic: true }))
        .setDescription(suggestionData.suggestion)
        .addField(`${text.translate["comment"]["COMMENT"][serverData.language]}`, comment)
        .setFooter("ID:" + suggestionData.messageID)
        .setTimestamp()

        oldEmbed.edit({embeds: [embed]})
        const replyEmbed = new Discord.MessageEmbed() .setDescription(text.translate["comment"]["ANSWER"][serverData.language]) .setColor('25FE25') .setTimestamp();
        message.reply({embeds: [replyEmbed]})
        await suggestionData.updateOne({$set: {comment: comment}})
    }
}