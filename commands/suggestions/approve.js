//command to approve of a suggestion
const suggestionModel = require('../../models/suggestionSchema')

module.exports = {
    name: 'approve',
    aliases: [],
    permissions: [],
    description: "suggestion approve command",
    category: "suggestions",
    adminonly: true,
    activ: true,
    replaced: true,
    async execute(client, message, args, cmd, Discord, text, profileData, serverData){
        const permEmbed = new Discord.MessageEmbed() .setDescription(`${text.translate["general"]["NO_PERMISSION"][serverData.language]}`) .setColor('DARK_RED') .setTimestamp()
        if(!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(serverData.adminRole)) return message.reply({embeds: [permEmbed]})

        const channel = message.guild.channels.cache.get(serverData.acceptedChannel);
        
        const channelEmbed = new Discord.MessageEmbed() .setDescription(text.translate["approve"]["NO_CHANNEL"][serverData.language]) .setColor('DARK_RED') .setTimestamp();
        if(!channel) return message.reply({embeds: [channelEmbed]});
        const argsEmbed = new Discord.MessageEmbed() .setDescription(text.translate["approve"]["NO_ID"][serverData.language]) .setColor('DARK_RED') .setTimestamp();
        if(!args[0]) return message.reply({embeds: [argsEmbed]});
        
        const suggestionData = await suggestionModel.findOne({ messageID: args[0] })
        const author = client.users.cache.get(suggestionData.authorID)
        const channel2 = client.channels.cache.get(serverData.suggestionChannel)
        await channel2.messages.fetch(suggestionData.embedID)
        const oldEmbed = channel2.messages.cache.get(suggestionData.embedID)
        const likes = await oldEmbed.reactions.cache.get("✅")
        const dislikes = await oldEmbed.reactions.cache.get("❌")

        const embed = new Discord.MessageEmbed()
        .setColor('25FF25')
        .setAuthor(author.tag, author.displayAvatarURL({ dynamic: true }))
        .addFields(
            {name: "Suggestion:", value: suggestionData.suggestion},
            {name: `${text.translate["approve"]["REACTION"][serverData.language]}`, value: "✅ = " + (likes.count - 1) + "\n❌ = " + (dislikes.count - 1)}
        )
        .setTimestamp();
        
        if(suggestionData.comment !== "") embed.addField(`${text.translate["approve"]["COMMENT"][serverData.language]}`, suggestionData.comment)


        channel.send({embeds: [embed]})
        oldEmbed.delete()
        const replyEmbed = new Discord.MessageEmbed() .setDescription(text.translate["approve"]["ANSWER"][serverData.language]) .setColor('25FE25') .setTimestamp();
        message.reply({embeds: [replyEmbed]})
        await suggestionData.remove()
    }
}