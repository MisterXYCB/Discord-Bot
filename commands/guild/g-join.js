const requestModel = require ('../../models/requestSchema')
const guildModel = require ('../../models/guildSchema')
const profileModel = require ('../../models/profileSchema')
module.exports = {
    name: 'g-join',
    aliases: [],
    permissions: [],
    cooldown: 6,
    description: "guild join command",
    category: "guild",
    adminonly: false,
    activ: false,
    async execute(client, message, args, cmd, Discord, profileData){
        const guildName = args[0]
        const requestChannel = message.guild.channels.cache.find(c => c.name === guildName + "-requests")
        if(profileData.guild !== "") return message.reply(`${profileData.guild}`)
        const guild = await guildModel.findOne({
            name: guildName,
            serverID: message.guild.id
        })
    if(!guild) return message.reply('Exsitiert nicht')
    const infoChannel = message.guild.channels.cache.find(c => c.name === guild.name + "-info")
    if(guild.openforall === "false"){
        const request = await requestModel.create({
            ID: message.id,
            userID: message.author.id,
            guildID: guildName
        })
        requestChannel.send(`<@${request.userID}>, möchte der Gilde beitreten mache ${process.env.PREFIX}g-approve [ID] um ihn anzunehmen oder ${process.env.PREFIX}g-deny [ID] um ihn anbzulehnen\n ID:${request.ID}`)
        message.reply('Da diese Gilde keinen Zugang für alle hat wurde eine Anfrage geschickt!')
        message.delete({
            timeout: 5000
        })
    } else if(guild.openforall === "true"){
        const role = message.guild.roles.cache.find(role => role.name === guild.name)
        const member = message.guild.members.cache.find(member => member.id === message.author.id)
        await member.roles.add(role.id)
        await infoChannel.send(`<@${message.author.id}> wurde in die Gilde auf genommen!`)
        await profileModel.findOneAndUpdate({
                userID: message.author.id,
                serverID: message.guild.id
            }, {
                $set: {
                    guild: guild.name
            }
        })
    }
    }
}