module.exports = {
    name: 'xpboost',
    aliases: [],
    permissions: [],
    category: "leveling",
    adminonly: true,
    activ: true,
    replaced: true,
    async execute(client, message, args, cmd, Discord, text, profileData, serverData){
        const permEmbed = new Discord.MessageEmbed() .setDescription(`${text.translate["general"]["NO_PERMISSION"][serverData.language]}`) .setColor('DARK_RED') .setTimestamp();
        if(!message.member.roles.cache.has(serverData.adminRole) && !message.member.roles.cache.has(serverData.modRole) && !message.member.permissions.has("ADMINISTRATOR")) return message.reply({embeds: [permEmbed]});
        const argsEmbed = new Discord.MessageEmbed() .setDescription(`${text.translate["xpboost"]["ARGS"][serverData.language]}`) .setColor('DARK_RED') .setTimestamp();
        if(!args[0] || args[0] < 0.25 || args[0] > 5 || isNaN(args[0])) return message.reply({embeds: [argsEmbed]});
        await serverData.updateOne({$set: {xpboost: args[0]}});
        const answerEmbed = new Discord.MessageEmbed() .setDescription(`${text.translate["xpboost"]["ANSWER"][serverData.language].replace("bot.amount", args[0])}`) .setColor('25FE25') .setTimestamp()
        message.reply({embeds: [answerEmbed]})
    }
}