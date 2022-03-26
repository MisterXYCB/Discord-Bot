const profileModel = require('../../models/profileSchema');

module.exports = {
    name: "give",
    aliases: ['add'],
    description: "give command",
    category: "economy",
    adminonly: false,
    activ: false,
    async execute(client, message, args, cmd, Discord, text, profileData, serverData){
        if(message.author.roles.has(serverData.adminRole) || message.author.permissions.has("ADMINISTRATOR"))
        
        if(args[0] === 'coins'){
            if(!args[2]) return message.channel.send('Du musst ein Mitglied erwähen!')
            const amount = args[2]
            const target = message.mentions.users.first() || message.guild.users.cache.get(args[1]);
            if(!target) return message.channel.send('Dieses Mitglied existiert nicht!')
            if(amount % 1 != 0 || amount <= 0) return message.channel.send(new Discord.MessageEmbed() .setDescription(`<@${message.author.id}>, du kannst nur ganze Zahlen dazu addieren!`) .setColor('DARK_RED') .setTimestamp());

            try{
                const targetData = await profileModel.findOne({ userID: target.id})
                if(!targetData) return message.channel.send(new Discord.MessageEmbed() .setDescription(`<@${message.author.id}>,dieses Mitglied existiert nicht in der Database`) .setColor('DARK_RED') .setTimestamp());

                await profileModel.findOneAndUpdate({
                    userID: target.id,
                }, {
                    $inc: {
                        coins: amount,
                    },
                }
                );

                return message.channel.send(new Discord.MessageEmbed() .setDescription(`<@${target.id}>, hat ₿${amount} erhalten!`) .setColor('DARK_RED') .setTimestamp());
            }catch(err){
                console.log(err)
            }
        }else if(args[0] === "xp"){
            /* if(!args[2]) return message.channel.send('Du musst ein Mitglied erwähen!')
            const amount = args[2]
            const target = message.mentions.users.first() || message.guild.users.cache.get(args[1]);
            if(!target) return message.channel.send('Dieses Mitglied existiert nicht!')
            if(amount % 1 != 0 || amount <= 0) return message.channel.send(new Discord.MessageEmbed() .setDescription(`<@${message.author.id}>, du kannst nur ganze Zahlen dazu addieren!`) .setColor('DARK_RED') .setTimestamp());

            try{
                const targetData = await profileModel.findOne({ userID: target.id})
                if(!targetData) return message.channel.send(new Discord.MessageEmbed() .setDescription(`<@${message.author.id}>,dieses Mitglied existiert nicht in der Database`) .setColor('DARK_RED') .setTimestamp());

                await profileModel.findOneAndUpdate({
                    userID: target.id,
                }, {
                    $inc: {
                        coins: amount,
                    },
                }
                );

                return message.channel.send(new Discord.MessageEmbed() .setDescription(`<@${target.id}>, hat ₿${amount} erhalten!`) .setColor('DARK_RED') .setTimestamp());
            }catch(err){
                console.log(err)
            } */
        }else{     
            return message.channel.send(new Discord.MessageEmbed() .setDescription(`<@${message.author.id}>, baue den Command so auf: ${process.env.PREFIX}give coins [Mitglied] [amount]!`) .setColor('DARK_RED') .setTimestamp());
        }
    }
}