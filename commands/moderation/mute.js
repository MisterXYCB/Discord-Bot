const ms = require('ms');
module.exports = {
    name: 'mute',
    permissions: [],
    description: "mute command",
    category: "moderation",
    adminonly: false,
    activ: false,
    execute(client, message, args, cmd, Discord){
        const member = message.mentions.users.first();
       
        if(message.member.roles.cache.has('818564471907811328')){
            if(member){
                let mainRole = message.guild.roles.cache.find(role => role.name === 'unmute');
                let muteRole = message.guild.roles.cache.find(role => role.name === 'mute');

                let memberTarget = message.guild.members.cache.get(member.id);

                if (!args[1]) {
                    memberTarget.roles.remove(mainRole.id);
                    memberTarget.roles.add(muteRole.id);
                    message.channel.send(new Discord.MessageEmbed() .setDescription(`<@${message.author.id}>, <@${memberTarget.user.id}> wurde auf unbestimmte Zeit gemutet!`) .setColor('25FE25') .setTimestamp());
                    return
                }
                memberTarget.roles.remove(mainRole.id);
                memberTarget.roles.add(muteRole.id);
                message.channel.send(new Discord.MessageEmbed() .setDescription(`<@${message.author.id}>, <@${memberTarget.user.id}> wurde für ${args[1]} gemutet!`) .setColor('25FE25') .setTimestamp());

                setTimeout(function() {
                    memberTarget.roles.remove(muteRole.id);
                memberTarget.roles.add(mainRole.id);
                }, ms(args[1]));
       } else {
        message.channel.send(new Discord.MessageEmbed() .setDescription(`<@${message.author.id}>, schreibe ${process.env.PREFIX}mute, dann den Account den du muten möchtest und dann wie lange du ihn muten möchtest(erst eine Zahl und dann eine einheit. Einheiten:s,m,h,d)!`) .setColor('DARK_RED') .setTimestamp());
        }

        } else {
            message.channel.send(new Discord.MessageEmbed() .setDescription(`<@${message.author.id}>, du hast nicht die benötigten Berechtigungen um den Mute Command auszuführen!`) .setColor('DARK_RED') .setTimestamp());
        }
       
    }
}