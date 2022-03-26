module.exports = {
    name: "bugreport",
    aliases: ['bug', 'reportbug'],
    permissions: [],
    description: 'let users report bugs',
    category: "utility",
    adminonly: false,
    activ: true,
    async execute(client, message, args, cmd, Discord, text, profileData, serverData){
        const channel = client.channels.cache.get('892496141546061885') || client.channels.cache.get('892497081711886440')

        const bug = args.join(' ');
        const no_embed = new Discord.MessageEmbed() .setDescription(`${text.translate["bugreport"]["NO_BUG"][serverData.language]}`) .setColor('DARK_RED') .setTimestamp()
        if(!bug) return message.reply({embeds: [no_embed]});
        
        //create an embed for the bug report
        const reportEmbed = new Discord.MessageEmbed()
        .setTitle('New Bug!')
        .addField('Author', message.author.toString(), true)
        .addField('Server', message.guild.name, true)
        .addField('Report', bug)
        .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
        .setTimestamp()
        .setColor('DARK_RED')
        channel.send({embeds: [reportEmbed]});
        const embed = new Discord.MessageEmbed() .setDescription(`${text.translate["bugreport"]["ANSWER"][serverData.language].replace("bot.bug", bug)}`) .setColor('25Fe25') .setTimestamp()
        message.reply({embeds: [embed]}).then(m => {message.delete(), setTimeout(() => {m.delete()}, 7000)});
    }
}