async function level(Discord, client, message, profileData, serverData){
    const levelRewardsSchema = require('../models/levelrewards')
    if(message.member.id == "818539916488081408") return;
    if((Date.now() - profileData.lastmessage - 60000) > 0){
        const xp = (Math.floor(Math.random() * 15) + 15) * serverData.xpboost
        console.log(message.author.username + " got " + xp + " xp", "The boost is", serverData.xpboost)
        if((profileData.xp + xp) >= profileData.level * (200 + 200 * 0.05 * profileData.level) + 200){
            const levelReward = await levelRewardsSchema.findOne({guildID: message.guild.id, level: profileData.level + 1});
            if(levelReward) message.member.roles.add(levelReward.roleID)
            await profileData.updateOne({$set: {lastmessage: Date.now()}, $inc: {xp: (xp-(profileData.level * (200 + 200 * 0.05 * profileData.level) + 200)), level: 1, lifeTimeXp: xp}});
        }else{
            await profileData.updateOne({$set: {lastmessage: Date.now()}, $inc: {xp: xp, lifeTimeXp: xp}})
        }
    }
}

const suggestionModel = require('../models/suggestionSchema')

async function suggestion(Discord, client, message, serverData){
    const channel = message.guild.channels.cache.get(serverData.suggestionChannel);
        
    let messageArgs = message.content;
    const embed = new Discord.MessageEmbed()
    .setColor('304281')
    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    .setDescription(messageArgs)
    .setFooter("ID:" + message.id)
    .setTimestamp()
    const msg = await channel.send({embeds: [embed]})

        await msg.react('✅');
        await msg.react('❌');
        message.delete();
    
    await suggestionModel.create({
        authorID: message.author.id,
        messageID: message.id,
        guildID: message.guild.id,
        embedID: msg.id,
        suggestion: messageArgs
    })
    return
}

async function bannedwords(Discord, message){
    //await message.guild.invites.fetch()
    //console.log(message.guild.invites.cache)
    const bwords = ["mixo_max", "soos", "discord.gg/", "discord.com/invite/"]
    if(bwords.some(word => message.content.toLowerCase().includes(word))){
        message.delete()
        message.channel.send({embeds: [new Discord.MessageEmbed() .setDescription(`${message.member} you used a blacklisted word! Please don't do this in futer!`) .setColor('DARK_RED') .setTimestamp() .setFooter("THIS MESSAGE WILL BE DELTED IN 5 SECONDS")]}).then(m => setTimeout(() => {m.delete()}, 5000))
    }    
}

module.exports = {
    level,
    suggestion,
    bannedwords
}