module.exports = {
    name: 'setprefix',
    aliases: [],
    permissions: [],
    cooldown: 6,
    description: "set prefix command",
    category: "moderation",
    adminonly: false,
    activ: true,
    replaced: true,
    async execute(client, message, args, cmd, Discord, text, profileData, serverData){
        const permEmbed = new Discord.MessageEmbed() .setDescription(`${text.translate["general"]["NO_PERMISSION"][serverData.language]}`) .setColor('DARK_RED') .setTimestamp()
        if(!message.member.permissions.has("ADMINISTRATOR")) return message.reply({embeds: [permEmbed]})
        const argsEmbed = new Discord.MessageEmbed() .setDescription(`${text.translate["setprefix"]["NO_ARGS"][serverData.language]}`) .setColor('DARK_RED') .setTimestamp()
        if(!args[0]) return message.reply({embeds: [argsEmbed]})
        await serverData.updateOne({
            $set: {
                prefix: args[0]
            }
        })
        const answerEmbed = new Discord.MessageEmbed() .setDescription(`${text.translate["setprefix"]["ANSWER"][serverData.language].replace("bot.newprefix", args[0])}`) .setColor('25FE25') .setTimestamp()
        message.reply({embeds: [answerEmbed]})
    }
}