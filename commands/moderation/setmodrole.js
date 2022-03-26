module.exports = {
    name: 'setmodrole',
    aliases: [],
    permissions: [],
    cooldown: 6,
    description: "set modrole command",
    category: "moderation",
    adminonly: false,
    activ: true,
    async execute(client, message, args, cmd, Discord, text, profileData, serverData){
        const permEmbed = new Discord.MessageEmbed() .setDescription(`${text.translate["general"]["NO_PERMISSION"][serverData.language]}`) .setColor('DARK_RED') .setTimestamp()
        if(!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has[serverData.adminRole]) return message.reply({embeds: [permEmbed]})
        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
        const roleEmbed = new Discord.MessageEmbed() .setDescription(`${text.translate["setmodrole"]["NO_ROLE"][serverData.language]}`) .setColor('DARK_RED') .setTimestamp()
        if(!role) return message.reply({embeds: [roleEmbed]})
        await serverData.updateOne({
            $set: {
                modRole: role.id
            }
        })
        const embed = new Discord.MessageEmbed() .setDescription(`${text.translate["setmodrole"]["ANSWER"][serverData.language].replace("bot.role", role.id)}`) .setColor('25FE25') .setTimestamp()
        message.reply({embeds: [embed]})
    }
}