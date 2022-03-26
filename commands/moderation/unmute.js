module.exports = {
    name: 'unmute',
    permissions: [],
    description: "unmute command",
    category: "moderation",
    adminonly: false,
    activ: true,
    execute(client, message, args, cmd, Discord){
        const member = message.mentions.users.first();
       
        if(message.member.roles.cache.has('818564471907811328')){
            if(member){
                let mainRole = message.guild.roles.cache.find(role => role.name === 'unmute');
                let muteRole = message.guild.roles.cache.find(role => role.name === 'mute');

                let memberTarget = message.guild.members.cache.get(member.id);

                memberTarget.roles.remove(muteRole.id);
                memberTarget.roles.add(mainRole.id);
                message.channel.send(new Discord.MessageEmbed() .setDescription(`<@${message.author.id}>, <@${memberTarget.user.id}> wurde entmutet!`) .setColor('DARK_RED') .setTimestamp());
            }else{
                message.channel.send(new Discord.MessageEmbed() .setDescription(`<@${message.author.id}>, dieser Account ${args[0]} ist nicht gemutet!`) .setColor('DARK_RED') .setTimestamp());
            }
        }else{
            message.channel.send(new Discord.MessageEmbed() .setDescription(`<@${message.author.id}>, du hast nicht die benötigten Berechtigungen um den Unmute Command auszuführen!`) .setColor('DARK_RED') .setTimestamp());
        }
    }
}