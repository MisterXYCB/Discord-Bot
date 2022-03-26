const requestModel = require ('../../models/requestSchema')
const guildModel = require ('../../models/guildSchema')
const profileModel = require ('../../models/profileSchema')
module.exports = {
    name: 'g-approve',
    aliases: [],
    permissions: [],
    cooldown: 6,
    description: "guild join command",
    category: "guild",
    adminonly: false,
    activ: false,
    async execute(client, message, args, cmd, Discord, profileData){
        const id = args[0]
        const request = await requestModel.findOne({
            ID: id
        })
        const applicant = await profileModel.findOne({
            userID: request.userID
        })
        const infoChannel = message.guild.channels.cache.find(c => c.name === request.guildID + "-info")
        if(applicant.guild !== "") return infoChannel.send(`<@${request.userID}> ist bereits in einer Gilde!`)
        const guild = await guildModel.findOne({
            name: request.guildID,
            serverID: message.guild.id
        })
        if(guild.allcanapprove === "true"){
            const role = message.guild.roles.cache.find(role => role.name === request.guildID)
            if(!message.member.roles.cache.has(role.id)) return message.reply("Du bist nicht in dieser Gilde!")
            const member = message.guild.members.cache.find(member => member.id === request.userID)
            await member.roles.add(role.id)
            await infoChannel.send(`<@${request.userID}> wurde in die Gilde auf genommen!`)
            await applicant.updateOne({
                $set: {
                    guild: request.guildID
                }
            })
            await request.remove()
        }else if(guild.allcanapprove === "false"){
            const modRole = await message.guild.roles.cache.find(role => role.name === request.guildID + "mod")
            if(!message.member.roles.cache.has(modRole.id)) return message.reply("Du bist in dieser Gilde kein Moderator!")
            const role = message.guild.roles.cache.find(role => role.name === request.guildID)
            const member = message.guild.members.cache.find(member => member.id === request.userID)
            await member.roles.add(role.id)
            await infoChannel.send(`<@${request.userID}> wurde in die Gilde auf genommen!`)
            await applicant.updateOne({
                $set: {
                    guild: request.guildID
                }
            })
            await request.remove()
        }
    }
}