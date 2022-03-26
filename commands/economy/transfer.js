const profileModel = require('../../models/profileSchema');
module.exports = {
    name: "transfer",
    permissions: [],
    cooldown: 300,
    description: "transfer command",
    category: "economy",
    adminonly: false,
    activ: false,
    async execute(client, message, args, cmd, Discord, profileData){
        const target = message.mentions.users.first();
        const ammount = args[1];
        const tax = (args[1] * 0.9)
        if(ammount % 1 != 0 || ammount <= 0) return message.channel.send(new Discord.MessageEmbed() .setDescription(`<@${message.author.id}>, die Auszahlung muss eine positive Zahl sein!`) .setColor('DARK_RED') .setTimestamp());
    
        try{
            if(ammount > profileData.bank) return message.channel.send(new Discord.MessageEmbed() .setDescription(`<@${message.author.id}>, soviel ist nicht auf deinem Konto!`) .setColor('DARK_RED') .setTimestamp());
            await profileModel.findOneAndUpdate(
                {
                userID: message.author.id,               
            }, {
                $inc: {
                    bank: -ammount,
                }
            });
            await profileModel.findOneAndUpdate(
                {
                userID: target.id,               
            }, {
                $inc: {
                    bank: ammount,
                }
            });
            return message.channel.send(new Discord.MessageEmbed() .setTitle('Beg') .setDescription(`Du hast ₿${ammount} von deinem Konto abgehoben!`) .setColor('304281') .setTimestamp() .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true })));
        }catch(err){
            console.log(err) 

        }
    }
}