const canvacord = require("canvacord");
const proflieSchema = require('../../models/profileSchema')

module.exports = {
    name: 'rank',
    aliases: [],
    permissions: [],
    cooldown: 10,
    category: "leveling",
    adminonly: false,
    activ: true,
    replaced: true,
    async execute(client, message, args, cmd, Discord, text, profileData, serverData){
        const profiles = await proflieSchema.find({ serverID: message.guild.id}).sort({ lifeTimeXp: -1})
        const rank = profiles.findIndex(profile => profile.userID == message.author.id) + 1;
        const level = profileData.level
        const requiredXp = level * (200 + 200 * 0.05 * level)  + 200
        let status = "offline"
        if(message.member.presence) status = message.member.presence.status
        
        const card = new canvacord.Rank()
        .setAvatar(message.author.displayAvatarURL({dynamic: false, format: 'png'}))
        .setCurrentXP(profileData.xp)
        .setRequiredXP(requiredXp)
        .setStatus(status)
        .setProgressBar("#FFFFFF", "COLOR")
        .setUsername(message.author.username)
        .setDiscriminator(message.author.discriminator)
        .setLevel(level)
        .setRank(rank);

        card.build()
            .then(buffer => {
                const rankCard = new Discord.MessageAttachment(buffer, `rank.png`)
                message.channel.send({files: [rankCard]})
        });
    }
}