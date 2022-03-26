//command to clear a given number of messages in a chat
module.exports = {
    name: 'clear',
    permissions: ["MANAGE_MESSAGES"],
    category: "moderation",
    adminonly: false,
    activ: true,
    replaced: true,
    async execute(client, message, args, cmd, Discord, text, profileData, serverData){
        let amount;
        const embed1 = new Discord.MessageEmbed() .setDescription(`${text.translate["clear"]["NO_ARGS"][serverData.language]}`) .setColor('DARK_RED') .setTimestamp()
        const embed2 = new Discord.MessageEmbed() .setDescription(`${text.translate["clear"]["NO_PERMISSION"][serverData.language]}`) .setColor('DARK_RED') .setTimestamp()
        if(!args[0] || isNaN(args[0]) || args[0] < 1) return message.reply({ embeds: [embed1] }).then(m => setTimeout(() =>m.delete(), 3000));
        if(!message.guild.me.permissions.has("MANAGE_MESSAGES")) return message.reply({ embeds: [embed2] }).then(m => setTimeout(() =>m.delete(), 3000));
    
        if(args[0] > 100) amount = 100
        if(args[0] < 100) amount = args[0]
        await message.delete()
        message.channel.bulkDelete(amount, true).then(deleted => {
            const msg = text.translate["clear"]["DONE"][serverData.language].replace("deleted.amount", deleted.size)
            const embed3 = new Discord.MessageEmbed() .setDescription(`${msg}`) .setColor('25FE25') .setTimestamp();
            if(amount > deleted.size) embed3.setFooter(`${text.translate["clear"]["FOOTER"][serverData.language]}`);
            message.channel.send({ embeds: [embed3] }).then(m => setTimeout(() =>m.delete(), 5000))})
    }
}
