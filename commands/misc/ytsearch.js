const ytSearch = require('ytsr');

module.exports = {
    name: 'ytsearch',
    aliases: ["youtube", "yt"],
    permissions: [],
    category: "misc",
    adminonly: false,
    activ: true,
    async execute(client, message, args, cmd, Discord, text, profileData, serverData){
        const argsEmbed = new Discord.MessageEmbed() .setDescription(`${text.translate["ytsearch"]["NO_ARGS"][serverData.language]}`) .setColor('DARK_RED') .setTimestamp()
        if(!args[0]) return message.reply({embeds: [argsEmbed]});
        const options = {
            safeSearch: true,
            limit: 1
        }
        const video = await ytSearch(args.join(' '), options);
        if (video){
            message.reply({content: `${text.translate["ytsearch"]["VIDEO"][serverData.language]} \`${video.items[0].title}\`\n\n${video.items[0].url}`})

        } else {
            const noVideoEmbed = new Discord.MessageEmbed() .setDescription(`${text.translate["ytsearch"]["NO_VIDEO"][serverData.language]}`) .setColor('DARK_RED') .setTimestamp()
            message.reply({embeds: [noVideoEmbed]});
        }
    }
}