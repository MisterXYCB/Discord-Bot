module.exports = {
    name: 'roleinfo',
    aliases: [],
    permissions: [],
    cooldown: 0,
    category: "moderation",
    adminonly: true,
    activ: false,
    async execute(client, message, args, cmd, Discord, text, profileData, serverData){
        const role = message.guild.roles.cache.get(message.mentions.roles.first().id);
        console.log(role)
        const roleEmbed = new Discord.MessageEmbed() .setDescription(`LOL`) .setColor(role.color) .setTimestamp() .addField("PERMISSIONS", `${role.permissions}`)
        message.reply({content: "checked the role", embeds: [roleEmbed]})
        console.log("permissions:", role.permissions)
    }
}