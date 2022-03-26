const { SlashCommandBuilder } = require(`@discordjs/builders`);
const canvacord = require("canvacord");
const proflieSchema = require('../../models/profileSchema')

module.exports = {
    name: 'rank',
    category: "leveling",
    data: new SlashCommandBuilder()
	.setName(`rank`)
	.setDescription(`Check your current rank and level`),
    async execute(client, interaction, Discord, text, profileData, serverData){
        const profiles = await proflieSchema.find({ serverID: interaction.guild.id}).sort({ level:-1, xp: -1 })
        const rank = profiles.findIndex(profile => profile.userID == interaction.user.id) + 1;
        const level = profileData.level
        const requiredXp = level * (200 + 200 * 0.05 * level)  + 200
        let status = "offline"
        if(interaction.member.presence) status = interaction.member.presence.status
        
        const card = new canvacord.Rank()
        .setAvatar(interaction.user.displayAvatarURL({dynamic: false, format: 'png'}))
        .setCurrentXP(profileData.xp)
        .setRequiredXP(requiredXp)
        .setStatus(status)
        .setProgressBar("#FFFFFF", "COLOR")
        .setUsername(interaction.user.username)
        .setDiscriminator(interaction.user.discriminator)
        .setLevel(level)
        .setRank(rank);

        card.build()
            .then(buffer => {
                const rankCard = new Discord.MessageAttachment(buffer, `rank.png`)
                interaction.reply({files: [rankCard]})
        });
    }
}