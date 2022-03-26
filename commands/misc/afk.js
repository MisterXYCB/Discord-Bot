module.exports = {
    name: 'afk',
    aliases: [],
    permissions: [],
    cooldown: 0,
    description: 'Set you afk!',
    category: "misc",
    adminonly: false,
    activ: true,
    async execute(client, message, args, cmd, Discord, text, profileData, serverData){
        if(profileData.afk === "true") return
        const ownerEmbed = new Discord.MessageEmbed() .setDescription(`${text.translate["afk"]["OWNER"][serverData.language]}`) .setColor('DARK_RED') .setTimestamp();
        if(message.guild.ownerId === message.author.id) return message.reply({embeds: [ownerEmbed]})
        
        const answerEmbed = new Discord.MessageEmbed() .setDescription(`${text.translate["afk"]["ANSWER"][serverData.language]}`) .setColor('DARK_RED') .setTimestamp()
        await message.reply({embeds: [answerEmbed]}).then(m => {setTimeout(() => {m.delete()}, 5000)})
        const member = message.guild.members.cache.get(message.author.id)
        member.setNickname(`[AFK] ${message.author.username}`)
        await profileData.updateOne({ $set:{afk: "true", afkReason: args.join(" ")}})
    }
}