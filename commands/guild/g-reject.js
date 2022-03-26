const requestModel = require ('../../models/requestSchema')
const guildModel = require ('../../models/guildSchema')
const profileModel = require ('../../models/profileSchema')
module.exports = {
    name: 'g-reject',
    aliases: [],
    permissions: [],
    cooldown: 6,
    description: "guild reject join command",
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
        const commandChannel = message.guild.channels.cache.find(c => c.name === "commands")
        const guild = await guildModel.findOne({
            name: request.guildID,
            serverID: message.guild.id
        })
        if(guild.allcanapprove === "true"){
        await infoChannel.send(`<@${request.userID}> wurde von <@${message.author.id}> abgelehnt!`)
        await commandChannel.send(`<@${request.userID}> die Gilde(${guild.name}) hat deine Beitritsanfrage abgeleht!`)
        await request.remove()
        } else if(guild.allcanapprove === "false"){
            const modRole = await message.guild.roles.cache.find(role => role.name === request.guildID + "mod")
            if(!message.member.roles.cache.has(modRole.id)) return message.reply("Du bist in dieser Gilde kein Moderator!")
        await infoChannel.send(`<@${request.userID}> wurde von <@${message.author.id}> abgelehnt!`)
        await commandChannel.send(`<@${request.userID}> die Gilde(${guild.name}) hat deine Beitritsanfrage abgeleht!`)
        await request.remove()
        }
    }
}