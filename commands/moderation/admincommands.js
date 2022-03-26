module.exports = {
    name: 'admincommands',
    aliases: ['acmd', 'acommands', 'admincmd'],
    permissions: [],
    cooldown: 10,
    description: "acommands command",
    category: "moderation",
    adminonly: true,
    activ: true,
    execute(client, message, args, cmd, Discord, text, profileData, serverData){
        const permEmbed = new Discord.MessageEmbed() .setDescription(`${text.translate["admincommands"]["NO_PERMISSION"][serverData.language]}`) .setColor('DARK_RED') .setTimestamp()
        if(!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(serverData.adminRole)) return message.reply({embeds: [permEmbed]})

        const newEmbed = new Discord.MessageEmbed()
        .setColor('#304281')
        .setDescription(`${text.translate["commands"]["EMBED_DESC"][serverData.language]}`)
        .setTimestamp();


        let economytxt = `${text.translate["commands"]["NO_COMMAND"][serverData.language]}`;
        let guildtxt = `${text.translate["commands"]["NO_COMMAND"][serverData.language]}`;
        let misctxt = `${text.translate["commands"]["NO_COMMAND"][serverData.language]}`;
        let utilitytxt = `${text.translate["commands"]["NO_COMMAND"][serverData.language]}`;
        let suggestionstxt = `${text.translate["commands"]["NO_COMMAND"][serverData.language]}`;
        let moderationtxt = `${text.translate["commands"]["NO_COMMAND"][serverData.language]}`;
        let levelingtxt = `${text.translate["commands"]["NO_COMMAND"][serverData.language]}`;

        let economy = [];
        let guild = [];
        let misc = [];
        let utility = [];
        let suggestions = [];
        let moderation = [];
        let leveling = [];
        
        client.commands.forEach(c =>{
            if(c.category == "economy" && c.activ == true){
                economy.push(c.name)
            }else if(c.category == "guild" && c.activ == true){
                guild.push(c.name)
            }else if(c.category == "misc" && c.activ == true){
                misc.push(c.name)
            }else if(c.category == "utility" && c.activ == true){
                utility.push(c.name)
            }else if(c.category == "suggestions" && c.activ == true){
                suggestions.push(c.name)
            }else if(c.category == "moderation" && c.activ == true){
                moderation.push(c.name)
            }else if(c.category == "leveling" && c.activ == true){
                leveling.push(c.name)
            }else{
                return
            }
        })
        for(let i = 0; i < economy.length; i++){
            if(i == 0) economytxt = `**\`${economy[i].toUpperCase()}\`**`
            else economytxt += ` **| \`${economy[i].toUpperCase()}\`**`
        }
        for(let i = 0; i < guild.length; i++){
            if(i == 0) guildtxt = `**\`${guild[i].toUpperCase()}\`**`
            else guildtxt += ` **| \`${guild[i].toUpperCase()}\`**`
        }
        for(let i = 0; i < misc.length; i++){
            if(i == 0) misctxt = `**\`${misc[i].toUpperCase()}\`**`
            else misctxt += ` **| \`${misc[i].toUpperCase()}\`**`
        }
        for(let i = 0; i < utility.length; i++){
            if(i == 0) utilitytxt = `**\`${utility[i].toUpperCase()}\`**`
            else utilitytxt += ` **| \`${utility[i].toUpperCase()}\`**`
        }
        for(let i = 0; i < suggestions.length; i++){
            if(i == 0) suggestionstxt = `**\`${suggestions[i].toUpperCase()}\`**`
            else suggestionstxt += ` **| \`${suggestions[i].toUpperCase()}\`**`
        }
        for(let i = 0; i < moderation.length; i++){
            if(i == 0) moderationtxt = `**\`${moderation[i].toUpperCase()}\`**`
            else moderationtxt += ` **| \`${moderation[i].toUpperCase()}\`**`
        }
        for(let i = 0; i < leveling.length; i++){
            if(i == 0) levelingtxt = `**\`${leveling[i].toUpperCase()}\`**`
            else levelingtxt += ` **| \`${leveling[i].toUpperCase()}\`**`
        }
        newEmbed.addFields(
            {name: "⚔️MODERATION⚔️", value: moderationtxt},
            {name: "💸ECONOMY💸", value: economytxt},
            {name: "🛡️GUILD🛡️", value: guildtxt},
            {name: "⬆️LEVELING⬆️", value: levelingtxt},
            {name: "🙍MISC🙍", value: misctxt},
            {name: "⚙️UTILITY⚙️", value: utilitytxt},
            {name: "💡SUGGESTIONS💡", value: suggestionstxt},
        )

        message.channel.send({ embeds: [newEmbed] });
    }
}
