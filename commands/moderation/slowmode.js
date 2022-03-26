const Discord = require('discord.js');
module.exports = {
    name: 'slowmode',
    cooldown: 10,
    aliases: ['sm'],
    permissions: [],
    description: 'Sets SlowMode for a Channel',
    category: "moderation",
    adminonly: false,
    activ: true,
    replaced: true,
    async execute(client, message, args){

        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]) || message.channel
        if(!message.member.hasPermission('MANAGE_CHANNELS')){
            message.channel.send(new Discord.MessageEmbed() .setDescription(`<@${message.author.id}>, du hast nicht die benötigten Berechtigungen um den Slowmode Command auszuführen!`) .setColor('DARK_RED') .setTimestamp())
            return;
        }

        if (!args[0]) return message.channel.send(new Discord.MessageEmbed() .setDescription(`<@${message.author.id}>, alle wie viel Sekunden soll geschreiben werden können?`) .setColor('DARK_RED') .setTimestamp());
        if(isNaN(args[0])){
            if(args[0] === 'off'){
                channel.setRateLimitPerUser('0')
                message.channel.send(new Discord.MessageEmbed() .setDescription(`@here, der Slowmode ist nun aus!`) .setColor('25FE25') .setTimestamp());
            } else {
                return message.channel.send(new Discord.MessageEmbed() .setDescription(`<@${message.author.id}>, bitte schreibe eine Zahl!`) .setColor('DARK_RED') .setTimestamp());
            }
        }
        if (args[0] > 21600 || args[0] < 1) return message.channel.send(new Discord.MessageEmbed() .setDescription(`<@${message.author.id}>, bitte schreibe eine Zahl zwischen 1 - 21600!`) .setColor('DARK_RED') .setTimestamp());

        if ( 21600 > args[0] && args[0] > 1){
            channel.setRateLimitPerUser(args[0])
            message.channel.send(new Discord.MessageEmbed() .setDescription(`@here, der Slowmode beträgt nun ${args[0]} Sekunden!`) .setColor('25FE25') .setTimestamp());
            return;
        }
    }
}