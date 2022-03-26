//command to deleta a channel
module.exports = {
    name: 'deletechannel',
    aliases: ["delchannel"],
    permissions: [],
    category: "moderation",
    adminonly: false,
    activ: false,
    async execute(client, message, args, cmd, Discord, text, profileData, serverData){
        const permissionEmbed = new Discord.MessageEmbed()
        if(!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(serverData.adminRole)) return message.reply("YOU DONT HAVE PERMISSIONS")
        const name = args.join(" ")
        const channel = message.guild.channels.cache.find(c => c.name === name);
        if(!channel) return message.channel.send(`Ein Channel mit dem Namen ${name} existiert nicht!`)
        channel.delete(channel)
        message.reply()
    }
}