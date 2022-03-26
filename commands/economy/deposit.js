module.exports = {
    name: "deposit",
    permissions: [],
    aliases: ['dep'],
    cooldown: 30,
    description: "deposit command",
    category: "economy",
    adminonly: false,
    activ: false,
    async execute(client, message, args, cmd, Discord, text, profileData, serverData){
        let amount = args[0];
        if(isNaN(amount) && amount.toLowerCase() != "all") return message.reply("NOT A NUMBER")
        if(amount.toLowerCase() === "all"){
            amount = profileData.coins;
            await profileData.updateOne({
                $inc: {
                    coins: -amount,
                    bank: amount,
                }
            });
            const embed1txt = text.translate["deposit"]["ANSWER"][serverData.language].replace("bot.amount", amount);
            const embed1 = new Discord.MessageEmbed() .setDescription(`${embed1txt}`) .setColor('304281') .setTimestamp() .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }));
            return message.channel.send({ embeds: [embed1] });
        }else{
            const embed2 = new Discord.MessageEmbed() .setDescription(`${text.translate["deposit"]["OVER_ZERO"][serverData.language]}`) .setColor('DARK_RED') .setTimestamp();
            if(amount % 1 != 0 || amount <= 0) return message.reply({ embeds: [embed2] });
            try{
                const embed3 = new Discord.MessageEmbed() .setDescription(`${text.translate["deposit"]["TOO_MUCH"][serverData.language]}`) .setColor('DARK_RED') .setTimestamp();
                if(amount > profileData.coins) return message.reply({ embeds: [embed3] });
                await profileData.updateOne({
                    $inc: {
                        coins: -amount,
                        bank: amount,
                    }
                });
                const embed4txt = text.translate["deposit"]["ANSWER"][serverData.language].replace("bot.amount", amount);
                const embed4 = new Discord.MessageEmbed() .setDescription(`${embed4txt}`) .setColor('304281') .setTimestamp() .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }));
                return message.channel.send({ embeds: [embed4] });
            }catch(err){
                console.log(err)
            }
        }
    }
}