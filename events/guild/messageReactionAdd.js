const reactionRoleModel = require('../../models/reactionRoleSchema')

module.exports = async (Discord, client, reaction, user) =>{
    if(reaction.message.partial) await reaction.message.fetch();
    if(reaction.partial) await reaction.fetch();
    if(user.bot) return;
    const reactionData = await reactionRoleModel.findOne({ messageID: reaction.message.id, reaction: `<:${reaction._emoji.name}:${reaction._emoji.id}>` })
    if(reactionData){
        const guild = await client.guilds.fetch(reaction.message.guild.id)
        const member = await guild.members.fetch(user.id)
        member.roles.add(reactionData.roleID)
    } 
}