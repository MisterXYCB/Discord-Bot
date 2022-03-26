const profileModel = require('../../models/profileSchema') 
module.exports = {
  name: "coinflip",
  aliases: [],
  permissions: [],
  cooldown: 1,
  description: "coinflip command",
  category: "economy",
  adminonly: false,
  activ: false,
  async execute(client, message, args, cmd, Discord, text, profileData, serverData){
      const coin = ['kopf','zahl']
      const side = Math.floor(Math.random()*coin.length)
      if(args[0].toLowerCase() !== 'kopf' && args[0].toLowerCase() !== 'zahl' && args[0].toLowerCase() !== 'head' && args[0].toLowerCase() !== 'tail') return message.reply(`Baue den Kommand so auf ${process.env.PREFIX}coinflip <Kopf/Head//Zahl/Tail> <ammount>`);
      if(isNaN(args[1])) return message.reply('Schreibe den Betrag als Zahl!')
      const ammount = args[1]
      if(ammount % 1 != 0 || ammount <= 0) return message.channel.send(new Discord.MessageEmbed() .setDescription(`<@${message.author.id}>, die Wette muss eine positive ganze Zahl sein!`) .setColor('DARK_RED') .setTimestamp());
      if(ammount > profileData.coins) return message.channel.send(new Discord.MessageEmbed() .setDescription(`<@${message.author.id}>, soviel hast du nicht in deinem Portmonee!`) .setColor('DARK_RED') .setTimestamp());
      if(side === 0){
        if(args[0] === 'kopf' || args[0] === 'Kopf' || args[0] === 'head' || args[0] === 'Head'){
          message.reply(`Du gewinnst ${ammount}`);
          await profileModel.findOneAndUpdate({
            userID: message.author.id
        }, {
            $inc: {
                coins: ammount,
            }
        });

        }else{
          message.reply(`Du verlierst ${ammount}`);
          await profileModel.findOneAndUpdate({
          userID: message.author.id
      }, {
          $inc: {
              coins: -ammount,
          }
      });
    }
      }else if(side === 1){
        if(args[0] === 'zahl' || args[0] === 'Zahl' || args[0] === 'tail' || args[0] === 'Tail'){
          message.reply(`Du gewinnst ${ammount}`);
          await profileModel.findOneAndUpdate({
            userID: message.author.id
        }, {
            $inc: {
                coins: ammount,
            }
        });
        }else{
          message.reply(`Du verlierst ${ammount}`);
          await profileModel.findOneAndUpdate({
          userID: message.author.id
      }, {
          $inc: {
              coins: -ammount,
          }
      });
      }
    }
  }
}