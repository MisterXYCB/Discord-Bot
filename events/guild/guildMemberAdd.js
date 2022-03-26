const profileModel = require('../../models/profileSchema');
//const serverModel = require('../../models/serverSchema');

module.exports = async (Discord, client, guildMember) =>{
    const profileData = await profileModel.findOne({ userID: guildMember.id, serverID: guildMember.guild.id })
    if(!profileData){
        let profile = await profileModel.create({
            userID: guildMember.id,
            serverID: guildMember.guild.id
        });
        profile.save();
    }

    /* const serverData = await serverModel.findOne({ serverID: guildMember.guild.id })
    if(!serverData.welcomeChannel) return;
    let welcomeMessage
    let userName = guildMember.user.username
    let userPing = `<@${guildMember.user.id}>`
    let guildName = guildMember.guild.name
    if(serverData.welcomeMessage){
        welcomeMessage = serverData.welcomeMessage
        welcomeMessage = welcomeMessage.replace("user.name", userName)
        welcomeMessage = welcomeMessage.replace("user.ping", userPing)
        welcomeMessage = welcomeMessage.replace("guild.name", guildName)
    }
    if(!serverData.welcomeMessage) welcomeMessage = `Hello <@${guildMember.user.id}> welcome to ${guildMember.guild.name}!`
    setTimeout(() =>{
        guildMember.guild.channels.cache.get(serverData.welcomeChannel).send(welcomeMessage);
    }, 3000) */
}