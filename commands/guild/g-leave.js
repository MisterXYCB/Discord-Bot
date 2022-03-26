const profileModel = require ('../../models/profileSchema')
module.exports = {
    name: 'g-leave',
    aliases: [],
    permissions: [],
    cooldown: 6,
    description: "guild leave command",
    category: "guild",
    adminonly: false,
    activ: false,
    async execute(client, message, args, cmd, Discord, profileData){
        const profile = await profileModel.findOne({
            userID: message.author.id,
            serverID: message.guild.id
        })
        if(profile.guild === "") return message.reply('Du bist in keiner Gilde!')
        const member = message.guild.members.cache.get(message.author.id)
        const role = message.guild.roles.cache.find(role => role.name === profile.guild)
        const modRole = message.guild.roles.cache.find(role => role.name === profile.guild + "mod")
        const ownerRole = message.guild.roles.cache.find(role => role.name === profile.guild + "owner")
        if(message.member.roles.cache.has(ownerRole.id)) return message.reply('Um die Gilde zu verlassen musst du die Owner Rolle abgeben alternativ kannst die gilde schließen!')
        if(message.member.roles.cache.has(modRole.id)) member.roles.remove(modRole.id)
        member.roles.remove(role.id)
        await profile.updateOne({
            $set: {
                guild: ""
            }
        })
        message.reply('Du hast deine Gilde verlassen!')
        
    }
}