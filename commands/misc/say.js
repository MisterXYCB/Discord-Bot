module.exports = {
    name: "say",
    permissions: [],
    aliases: ['send'],
    description: "says something",
    category: "misc",
    adminonly: false,
    activ: false,
    async execute(client, message, args, cmd, Discord){  
        msg = args.slice(1).join(" ");        
        if(msg.includes("@everyone")){
            return message.channel.send(new Discord.MessageEmbed() .setDescription(`<@${message.author.id}>, ich darf nicht everyone erwähnen`) .setColor('DARK_RED') .setTimestamp());
        } else if(msg.includes("@here")){
            return message.channel.send(new Discord.MessageEmbed() .setDescription(`<@${message.author.id}>, ich darf nicht here erwähnen!`) .setColor('DARK_RED') .setTimestamp());
        } else if(msg.includes(process.env.PREFIX)){
            return message.channel.send(new Discord.MessageEmbed() .setDescription(`<@${message.author.id}>, ich darf keine Befehle senden!`) .setColor('DARK_RED') .setTimestamp());
        } else if(!message.member.hasPermission('MANAGE_MESSAGES')){ 
            return message.channel.send(new Discord.MessageEmbed() .setDescription(`<@${message.author.id}>, du hast nicht die benötigten Berechtigungen um den Say Command auszuführen!`) .setColor('DARK_RED') .setTimestamp());
        }

        let textChannel = message.mentions.channels.first() 
        if(!args[0]) return message.channel.send(new Discord.MessageEmbed() .setDescription(`<@${message.author.id}>, lege eine Channel fest wo ich die Nachricht senden soll!`) .setColor('DARK_RED') .setTimestamp());
        if(!args[1]) return message.channel.send(new Discord.MessageEmbed() .setDescription(`<@${message.author.id}>, lege die Nachricht die ich sagen soll fest!!`) .setColor('DARK_RED') .setTimestamp());
        if (!message.guild.channels.cache.has(textChannel.id)) return;
        message.delete()

        textChannel.send(msg) 

        }
    }