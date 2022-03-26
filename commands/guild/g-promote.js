const guildModel = require ('../../models/guildSchema')
const profileModel = require ('../../models/profileSchema')
module.exports = {
    name: 'g-promote',
    aliases: [],
    permissions: [],
    cooldown: 6,
    description: "guild promote command",
    category: "guild",
    adminonly: false,
    activ: false,
    async execute(client, message, args, cmd, Discord, profileData){
        const authorProfile = await profileModel.findOne({
            userID: message.author.id,
            serverID: message.guild.id
        })
        const guildName = authorProfile.guild
        const modRole = message.guild.roles.cache.find(role => role.name === guildName + "mod")        
        const ownerRole = message.guild.roles.cache.find(role => role.name === guildName + "owner")
        const member = message.mentions.users.first()
        const author = message.guild.members.cache.get(message.author.id)
        const memberTarget = message.guild.members.cache.get(member.id)
        const targetProfile = await profileModel.findOne({
            userID: memberTarget.id,
            serverID: message.guild.id
        })        
        const infoChannel = message.guild.channels.cache.find(c => c.name === guildName + "-info")        
        if(guildName === "") return message.reply('Du bist in keiner Gilde!')
        if(!message.member.roles.cache.has(modRole.id)) return message.reply('Du bist in deiner Gilde kein Moderator!')
        if(authorProfile.guild !== targetProfile.guild) return message.reply('Ihr seid nicht in der selben Gilde!')
        if(message.member.roles.cache.has(ownerRole.id)){
            if(!memberTarget.roles.cache.has(modRole.id)){
                memberTarget.roles.add(modRole.id)
                infoChannel.send(`<@${memberTarget.id}> wurde von <@${message.author.id}> zum Moderator befördert!`)
                return
            }else if(memberTarget.roles.cache.has(modRole.id)){
                const toCollect = ["ja"];

                const filter = (m) => {
                    return toCollect.some((answer) => answer.toLowerCase() === m.content.toLowerCase()) && m.author.id === message.author.id;
                };

                const COLLECTOR = message.channel.createMessageCollector(filter, { max: 1, time: 10000 });
                
                COLLECTOR.on("collect", async (m) => {
                    memberTarget.roles.add(ownerRole.id)
                    author.roles.remove(ownerRole.id)
                    await infoChannel.send(`<@${memberTarget.id}> ist nun neuer Owner dieser Gilde!`)
                })

                COLLECTOR.on("end", (collected) => {
                    if (collected.size == 0) {
                      return message.channel.send("Da du nicht mit \`ja\` geantwortet hast wurde der Vorgang abgebrochen!");
                    }
                })
                message.channel.send(`Willst du wirklich <@${memberTarget.id}> zum Owner dieser Gilde machen? Du bist dann nur noch Mod und kannst es nicht rückgängig machen!`)
            }
        }else if(!message.member.roles.cache.has(ownerRole.id)){
        if(memberTarget.roles.cache.has(modRole.id)) return message.reply('Dieses Mitglied ist schon Mod!')
        memberTarget.roles.add(modRole.id)
        infoChannel.send(`<@${memberTarget.id}> wurde von <@${message.author.id}> zum Moderator befördert!`)
        }
    }
}