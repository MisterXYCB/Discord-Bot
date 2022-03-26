const profileModel = require('../../models/profileSchema');
module.exports = {
    name: "withdraw",
    permissions: [],
    cooldown: 30,
    description: "withdraw command",
    category: "economy",
    adminonly: false,
    activ: false,
    async execute(client, message, args, cmd, Discord, profileData){
        const ammount = args[0];
        if(ammount % 1 != 0 || ammount <= 0) return message.channel.send(new Discord.MessageEmbed() .setDescription(`<@${message.author.id}>, die Auszahlung muss eine positive Zahl sein!`) .setColor('DARK_RED') .setTimestamp());
    
        try{
            if(ammount > profileData.bank) return message.channel.send(new Discord.MessageEmbed() .setDescription(`<@${message.author.id}>, soviel ist nicht auf deinem Konto!`) .setColor('DARK_RED') .setTimestamp());
            await profileModel.findOneAndUpdate(
                {
                userID: message.author.id,               
            }, {
                $inc: {
                    coins: ammount,
                    bank: -ammount,
                }
            });
            return message.channel.send(new Discord.MessageEmbed() .setTitle('Beg') .setDescription(`Du hast ₿${ammount} von deinem Konto abgehoben!`) .setColor('304281') .setTimestamp() .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true })));
        }catch(err){
            console.log(err)
        }
    }
}