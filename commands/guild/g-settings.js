const profileModel = require ('../../models/profileSchema')
const guildModel = require ('../../models/guildSchema')
module.exports = {
    name: 'g-settings',
    aliases: [],
    permissions: [],
    cooldown: 6,
    description: "guild settings command",
    category: "guild",
    adminonly: false,
    activ: false,
    async execute(client, message, args, cmd, Discord, profileData){
        const guild = await guildModel.findOne({
            name: profileData.guild,
            serverID: message.guild.id
        })
        const modRole = message.guild.roles.cache.find(role => role.name === guild.name + "mod")
        if(!args[0]){
        message.channel.send(new Discord.MessageEmbed()
        .setColor('304281')
        .setTitle('Guild-Settings')
        .setDescription(`Das sind die Aktuellen Settings der Gilde ${guild.name}`)
        .addFields(
            { name: 'Openforall:', value: `${guild.openforall}`},
            { name: 'Allcanapprove:', value: `${guild.allcanapprove}`},
        )
        .setFooter(`Falls du eine Einstellung ändern möchtest mache ${process.env.PREFIX}g-settings [setting] [true/false]!`)
        .setTimestamp())
        return
    }else if(args[0].toLowerCase() === "openforall"){
        if(guild.openforall === "true"){
            if(!args[1]) return message.channel.send(new Discord.MessageEmbed() .setDescription(`<@${message.author.id}>, momentan ist \`Openforall\` auf \`true\` gestellt, das Bedeutet, dass jeder dieser Gilde beitreten kann!`) .setColor('304281') .setTimestamp());
            else if(args[1] === "true") return message.channel.send(new Discord.MessageEmbed() .setDescription(`<@${message.author.id}>, die Einstellung \`Openforall\` ist schon auf \`true\`!`) .setColor('304281') .setTimestamp());
            else if(args[1] === "false"){
                if(message.member.roles.cache.has(modRole.id)){
                    await guild.updateOne({
                        $set: {
                            openforall: false
                        }
                    })
                    message.channel.send(new Discord.MessageEmbed() .setDescription(`<@${message.author.id}>, die Einstellung \`Openforall\` wurde auf \`false\` aktualisiert!`) .setColor('304281') .setTimestamp());
                }else return message.channel.send(new Discord.MessageEmbed() .setDescription(`<@${message.author.id}>, du hast nicht die Mod-Rolle deiner Gilde!`) .setColor('DARK_RED') .setTimestamp());
            }
        }else if(guild.openforall === "false"){
            if(!args[1]) return message.channel.send(new Discord.MessageEmbed() .setDescription(`<@${message.author.id}>, momentan ist \`Openforall\` auf \`false\` gestellt, das Bedeutet, dass Leute die der Gilde joinen wollen müssen erst eine Beitritsanfragen senden müssen!`) .setColor('304281') .setTimestamp());
            else if(args[1] === "false") return message.channel.send(new Discord.MessageEmbed() .setDescription(`<@${message.author.id}>, die Einstellung \`Openforall\` ist schon auf \`false\`!`) .setColor('304281') .setTimestamp());
            else if(args[1] === "true"){
                if(message.member.roles.cache.has(modRole.id)){
                    await guild.updateOne({
                        $set: {
                            openforall: true
                        }
                    })
                    message.channel.send(new Discord.MessageEmbed() .setDescription(`<@${message.author.id}>, die Einstellung \`Openforall\` wurde auf \`true\` aktualisiert!`) .setColor('304281') .setTimestamp());
                }else return message.channel.send(new Discord.MessageEmbed() .setDescription(`<@${message.author.id}>, du hast nicht die Mod-Rolle deiner Gilde!`) .setColor('DARK_RED') .setTimestamp());
            }
        }
    }else if(args[0].toLowerCase() === "allcanapprove"){
        if(guild.allcanapprove === "true"){
            if(!args[1]) return message.channel.send(new Discord.MessageEmbed() .setDescription(`<@${message.author.id}>, momentan ist \`Allcanapprove\` auf \`true\` gestellt, das Bedeutet, dass jeder Beitritsanfragen annehmen/ablehnen kann!`) .setColor('304281') .setTimestamp());
            else if(args[1] === "true") return message.channel.send(new Discord.MessageEmbed() .setDescription(`<@${message.author.id}>, die Einstellung \`Allcanapprove\` ist schon auf \`true\`!`) .setColor('304281') .setTimestamp());
            else if(args[1] === "false"){
                if(message.member.roles.cache.has(modRole.id)){
                    await guild.updateOne({
                        $set: {
                            allcanapprove: false
                        }
                    })
                    message.channel.send(new Discord.MessageEmbed() .setDescription(`<@${message.author.id}>, die Einstellung \`Allcanapprove\` wurde auf \`false\` aktualisiert!`) .setColor('304281') .setTimestamp());
                }else return message.channel.send(new Discord.MessageEmbed() .setDescription(`<@${message.author.id}>, du hast nicht die Mod-Rolle deiner Gilde!`) .setColor('DARK_RED') .setTimestamp());
            }
        }else if(guild.allcanapprove === "false"){
            if(!args[1]) return message.channel.send(new Discord.MessageEmbed() .setDescription(`<@${message.author.id}>, momentan ist \`Allcanapprove\` auf \`false\` gestellt, das Bedeutet, dass nur Gilden Mods Beitritsanfragen annehmen/ablehnen kann!`) .setColor('304281') .setTimestamp());
            else if(args[1] === "false") return message.channel.send(new Discord.MessageEmbed() .setDescription(`<@${message.author.id}>, die Einstellung \`Allcanapprove\` ist schon auf \`false\`!`) .setColor('304281') .setTimestamp());
            else if(args[1] === "true"){
                if(message.member.roles.cache.has(modRole.id)){
                    await guild.updateOne({
                        $set: {
                            allcanapprove: true
                        }
                    })
                    message.channel.send(new Discord.MessageEmbed() .setDescription(`<@${message.author.id}>, die Einstellung \`Allcanapprove\` wurde auf \`true\` aktualisiert!`) .setColor('304281') .setTimestamp());
                }else return message.channel.send(new Discord.MessageEmbed() .setDescription(`<@${message.author.id}>, du hast nicht die Mod-Rolle deiner Gilde!`) .setColor('DARK_RED') .setTimestamp());
            }
        }
    }
}
}