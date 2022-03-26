const util = require('minecraft-server-util');

module.exports = {
    name: 'mcserver',
    aliases: ['mc'],
    permissions: [],
    description: 'get information about a minecraft Server',
    category: "misc",
    adminonly: false,
    activ: true,
    execute(client, message, args, cmd, Discord, text, profileData, serverData){
        let port;
        const embed1 = new Discord.MessageEmbed() .setDescription(`${text.translate["mcserver"]["NO_IP"][serverData.language]}`) .setColor('DARK_RED') .setTimestamp();
        const embed2 = new Discord.MessageEmbed() .setDescription(`${text.translate["mcserver"]["NO_SERVER"][serverData.language]}`) .setColor('DARK_RED') .setTimestamp();
        if(!args[0]) return message.reply({ embeds: [embed1] });
        if(!args[1]) {
            port = "25565"
        }else{
            port = args[1]
        }

        util.status(args[0], {port: parseInt(port)}).then((response) =>{
            const embed = new Discord.MessageEmbed()
            .setColor('#25fe25')
            .setTitle('Mc Server Status')
            .addFields(
                {name: 'Server IP & Port', value: `${"IP: " + response.host + " Port: " + response.port}`},
                {name: 'Online Players', value: `${response.onlinePlayers}`},
                {name: 'Max Players', value: `${response.maxPlayers}`},
                {name: 'Version', value: `${response.version}`},
            )
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
            .setTimestamp()

            message.reply({ embeds: [embed] })
        })
        .catch((error) =>{
            message.reply({ embeds: [embed2] });
            console.error(error);
        })
    }

}

