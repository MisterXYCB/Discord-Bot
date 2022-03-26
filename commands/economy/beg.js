module.exports = {
    name: "beg",
    permissions: [],
    cooldown: 900,
    description: "beg command",
    category: "economy",
    adminonly: false,
    activ: false,
    async execute(client, message, args, cmd, Discord, text, profileData, serverData){
        const randomNumber = Math.floor(Math.random() * 500) + 1;
        await profileData.updateOne({
            $inc: {
                coins: randomNumber,
            }
        });
        const embedtxt = text.translate["beg"]["ANSWER"][serverData.language].replace("bot.amount", randomNumber)
        const embed = new Discord.MessageEmbed() .setDescription(`${embedtxt}`) .setColor('304281') .setTimestamp() .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }));
        return message.reply({ embeds: [embed] });
    }
}