const profileModel = require('../../models/profileSchema');
module.exports = {
    name: "remove",
    aliases: [],
    permissions: ['ADMINISTRATOR'],
    description: "remove command",
    category: "moderation",
    adminonly: false,
    activ: false,
    async execute(client, message, args, cmd, Discord, profileData){
        if(args[0] === 'coins'){
            if(!args.length) return message.channel.send('Du musst ein Mitglied erwähen!')
            const ammount = args[2]
            const target = message.mentions.users.first();
            if(!target) return message.channel.send('Dieses Mitglied existiert nicht!')
            if(ammount % 1 != 0 || ammount <= 0) return message.channel.send(new Discord.MessageEmbed() .setDescription(`<@${message.author.id}>, du kannst nur ganze Zahlen dazu addieren!`) .setColor('DARK_RED') .setTimestamp());

            try{
                const targetData = await profileModel.findOne({ userID: target.id})
                if(!targetData) return message.channel.send(new Discord.MessageEmbed() .setDescription(`<@${message.author.id}>,dieses Mitglied existiert nicht in der Database`) .setColor('DARK_RED') .setTimestamp());

                await profileModel.findOneAndUpdate({
                    userID: target.id,
                }, {
                    $inc: {
                        coins: -ammount,
                    },
                }
                );

                return message.channel.send(new Discord.MessageEmbed() .setDescription(`<@${target.id}>, wurde ₿${ammount} abgezogen!`) .setColor('DARK_RED') .setTimestamp());
            }catch(err){
            console.log(err)
            }
        }else{     
            return message.channel.send(new Discord.MessageEmbed() .setDescription(`<@${message.author.id}>, baue den Command so auf: ${process.env.PREFIX}remove coins [Mitglied] [ammount]!`) .setColor('DARK_RED') .setTimestamp());
        }
    }
}