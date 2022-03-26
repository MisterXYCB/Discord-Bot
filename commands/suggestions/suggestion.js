const suggestionModel = require('../../models/suggestionSchema')

module.exports = {
    name: 'suggestion',
    aliases: ['suggest'],
    permissions: [],
    description: "suggestion command",
    category: "suggestions",
    adminonly: false,
    activ: false,
    async execute(client, message, args, cmd, Discord, text, profileData, serverData){
        const channel = message.guild.channels.cache.get(serverData.suggestionChannel);
        
        const channelEmbed = new Discord.MessageEmbed() .setDescription(text.translate["suggestions"]["NO_SUGGESTION_CHANNEL"][serverData.language]) .setColor('DARK_RED') .setTimestamp();
        if(!channel) return message.reply({embeds: [channelEmbed]});
        const argsEmbed = new Discord.MessageEmbed() .setDescription(text.translate["suggestions"]["NO_SUGGESTION"][serverData.language]) .setColor('DARK_RED') .setTimestamp()
        if(!args[0]) return message.reply({embeds: [argsEmbed]});
    
        let messageArgs = args.join(' ');
        const embed = new Discord.MessageEmbed()
        .setColor('304281')
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(messageArgs)
        .setFooter("ID:" + message.id)
        .setTimestamp()
        const msg = await channel.send({embeds: [embed]})

            await msg.react('✅');
            await msg.react('❌');
            message.delete();
        
        await suggestionModel.create({
            authorID: message.author.id,
            messageID: message.id,
            guildID: message.guild.id,
            embedID: msg.id,
            suggestion: messageArgs
        })
    }
}