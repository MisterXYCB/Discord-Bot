const levelRewardsSchema = require('../../models/levelrewards')

module.exports = {
    name: 'addlevelreward',
    aliases: [],
    permissions: [],
    category: "leveling",
    adminonly: true,
    activ: true,
    async execute(client, message, args, cmd, Discord, text, profileData, serverData){
        const permEmbed = new Discord.MessageEmbed() .setDescription(`${text.translate["general"]["NO_PERMISSION"][serverData.language]}`) .setColor('DARK_RED') .setTimestamp();
        if(!message.member.roles.cache.has(serverData.adminRole) && !message.member.roles.cache.has(serverData.modRole) && !message.member.permissions.has("ADMINISTRATOR")) return message.reply({embeds: [permEmbed]});
        const argsEmbed = new Discord.MessageEmbed() .setDescription(`${text.translate["addlevelreward"]["ARGS"][serverData.language]}`) .setColor('DARK_RED') .setTimestamp();
        if(!args[1] || isNaN(args[0])) return message.reply({embeds: [argsEmbed]});
        const level = args[0]
        const role = message.guild.roles.cache.get(args[1]) || message.mentions.roles.first()
        await levelRewardsSchema.create({ guildID: message.guild.id, level: level, roleID: role.id})
        const answerEmbed = new Discord.MessageEmbed() .setDescription(`${text.translate["addlevelreward"]["ANSWER"][serverData.language].replace("bot.role", role.id).replace("bot.level", level)}`) .setColor('25FE25') .setTimestamp();
        message.reply({embeds: [answerEmbed]});
    }
}