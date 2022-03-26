const profileModel = require ('../../models/profileSchema')
const guildModel = require ('../../models/guildSchema')
module.exports = {
    name: 'g-close',
    aliases: [],
    permissions: [],
    cooldown: 6,
    description: "guild close command",
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
        const infoChannel = message.guild.channels.cache.find(c => c.name === profile.guild + "-info")
        const requestChannel = message.guild.channels.cache.find(c => c.name === profile.guild + "-requests")
        const textChannel = message.guild.channels.cache.find(c => c.name === profile.guild + "-chat")
        const voiceChannel = message.guild.channels.cache.find(c => c.name === profile.guild + "-talk")
        const category = message.guild.channels.cache.find(c => c.name === profile.guild)
        if(!category) return message.reply("Fehler1")
        if(!message.member.roles.cache.has(ownerRole.id)) return message.reply('Du kannst keine Gilde schließen wo du nicht der Owner bist!')
        
        await role.delete()
        await modRole.delete()
        await ownerRole.delete()
        await category.delete()
        await voiceChannel.delete()
        await textChannel.delete()
        await requestChannel.delete()
        await infoChannel.delete()
        await profile.updateOne({
            $set: {
                guild: ""
            }
        })
        await guildModel.findOneAndRemove({
            serverID: message.guild.id,
            name: profile.guild
        })
        setTimeout(members, 1000)
        async function members() {
            const target = await profileModel.findOneAndUpdate({
                serverID: message.guild.id,
                guild: profileData.guild
            }, {
                $set: {
                    guild: ""
            }})
            if(!target) return
            setTimeout(members, 1000)
        }
        message.reply('Du hast deine Gilde geschloßen!')
    }   
}