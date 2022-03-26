const profileModel = require ('../../models/profileSchema')
module.exports = {
    name: "balance",
    aliases: ['bal', 'bl'],
    permissions: [],
    cooldown: 30,
    description: "balence command",
    category: "economy",
    adminonly: false,
    activ: false,
    async execute(client, message, args, cmd, Discord, text, profileData, serverData){
        const errorEmbed = new Discord.MessageEmbed() .setDescription(`${text.translate["balance"]["ERROR"][serverData.language]}`) .setColor('DARK_RED') .setTimestamp();
        if(!profileData) return message.reply({ embeds: [errorEmbed] })
        const embed1 = new Discord.MessageEmbed() .setTitle(`${message.author.username}'s Balence`) .addField(`${text.translate["balance"]["WALLET"][serverData.language]}`, `₿${profileData.coins}`) .addField(`${text.translate["balance"]["BANK"][serverData.language]}`, '₿' + profileData.bank) .addField(`${text.translate["balance"]["NET_WORTH"][serverData.language]}`, '₿' + [profileData.coins + profileData.bank]) .setColor('304281') .setTimestamp() .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }));
        let mention;
        if(args[0]) mention = message.mentions.users.first() || message.guild.users.cache.get(args[0]);
        if(!args[0]) mention = "no";
        if(mention === "no"){
            return message.reply({ embeds: [embed1] });
        }else{
            const mentionData = await profileModel.findOne({ userID: mention.id, serverID: message.guild.id })
            const embed2 = new Discord.MessageEmbed() .setTitle(`${mention.username}'s Balence`) .addField(`${text.translate["balance"]["WALLET"][serverData.language]}`, `₿${mentionData.coins}`) .addField(`${text.translate["balance"]["BANK"][serverData.language]}`, '₿' + mentionData.bank) .addField(`${text.translate["balance"]["NET_WORTH"][serverData.language]}`, '₿' + [mentionData.coins + mentionData.bank]) .setColor('304281') .setTimestamp() .setAuthor(mention.tag, mention.displayAvatarURL({ dynamic: true }));
            message.reply({ embeds: [embed2] })
        }
    }
}