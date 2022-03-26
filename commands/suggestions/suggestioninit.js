module.exports = {
    name: 'suggestioninit',
    aliases: ['suggestinit'],
    permissions: [],
    description: "suggestion command",
    category: "suggestions",
    adminonly: true,
    activ: true,
    replaced: true,
    async execute(client, message, args, cmd, Discord, text, profileData, serverData){
        const permEmbed = new Discord.MessageEmbed() .setDescription(`${text.translate["general"]["NO_PERMISSION"][serverData.language]}`) .setColor('DARK_RED') .setTimestamp()
        if(!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(serverData.adminRole)) return message.reply({embeds: [permEmbed]})

        let suggestionChannel = message.guild.channels.cache.get(serverData.suggestionChannel);
        let suggestionCategory = message.guild.channels.cache.get(serverData.suggestionCategory);
        let deniedChannel = message.guild.channels.cache.get(serverData.deniedChannel);
        let acceptedChannel = message.guild.channels.cache.get(serverData.acceptedChannel);
        
        if(!suggestionChannel){
            suggestionChannel = await message.guild.channels.create("suggestions", {type: 'GULD_TEXT'});
            await serverData.updateOne({ $set: { suggestionChannel: suggestionChannel.id }})
            if(suggestionCategory){
                await suggestionChannel.setParent(suggestionCategory)
            }
        }
        
        if(!acceptedChannel){
            acceptedChannel = await message.guild.channels.create("✅ accepted-suggestions", {type: 'GUILD_TEXT', });
            await serverData.updateOne({ $set: { acceptedChannel: acceptedChannel.id }})
            if(suggestionCategory){
                await acceptedChannel.setParent(suggestionCategory)
                acceptedChannel.permissionOverwrites.create(message.guild.roles.everyone, {
                    SEND_MESSAGES: false
                })
            }
        }
        
        if(!deniedChannel){
            deniedChannel = await message.guild.channels.create("❌ denied-suggestions", {type: 'GUILD_TEXT',});
            await serverData.updateOne({ $set: { deniedChannel: deniedChannel.id }})
            if(suggestionCategory){
                await deniedChannel.setParent(suggestionCategory)
                deniedChannel.permissionOverwrites.create(message.guild.roles.everyone, {
                    SEND_MESSAGES: false
                })
            }
        }
        
        if(!suggestionCategory){
            suggestionCategory = await message.guild.channels.create("Suggestions", {type: 'GUILD_CATEGORY'});
            await serverData.updateOne({ $set: { suggestionCategory: suggestionCategory.id }})
            await suggestionChannel.setParent(suggestionCategory)
            await acceptedChannel.setParent(suggestionCategory)
            await deniedChannel.setParent(suggestionCategory)
            deniedChannel.permissionOverwrites.create(message.guild.roles.everyone, {
                SEND_MESSAGES: false
            })
            acceptedChannel.permissionOverwrites.create(message.guild.roles.everyone, {
                SEND_MESSAGES: false
            })
        }
        const embed = new Discord.MessageEmbed() .setDescription(text.translate["suggestioninit"]["ANSWER"][serverData.language]) .setColor('25FE25') .setTimestamp()
        message.reply({embeds: [embed]})
    }
}