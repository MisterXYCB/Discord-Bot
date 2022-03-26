module.exports = {
    name: 'commands',
    aliases: ['cmd'],
    permissions: [],
    cooldown: 10,
    description: "commands command",
    category: "utility",
    adminonly: false,
    activ: true,
    execute(client, message, args, cmd, Discord, text, profileData, serverData){
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#304281')
        .setDescription(`${text.translate["commands"]["EMBED_DESC"][serverData.language]}`)
        .setTimestamp();


        let economytxt = `${text.translate["commands"]["NO_COMMAND"][serverData.language]}`;
        let guildtxt = `${text.translate["commands"]["NO_COMMAND"][serverData.language]}`;
        let misctxt = `${text.translate["commands"]["NO_COMMAND"][serverData.language]}`;
        let utilitytxt = `${text.translate["commands"]["NO_COMMAND"][serverData.language]}`;
        let suggestionstxt = `${text.translate["commands"]["NO_COMMAND"][serverData.language]}`;
        let levelingtxt = `${text.translate["commands"]["NO_COMMAND"][serverData.language]}`;

        let economy = [];
        let guild = [];
        let misc = [];
        let utility = [];
        let suggestions = [];
        let leveling = [];
        
        client.commands.forEach(c =>{
            if(c.category == "economy" && c.activ == true && c.adminonly == false){
                economy.push(c.name)
            }else if(c.category == "guild" && c.activ == true && c.adminonly == false){
                guild.push(c.name)
            }else if(c.category == "misc" && c.activ == true && c.adminonly == false){
                misc.push(c.name)
            }else if(c.category == "utility" && c.activ == true && c.adminonly == false){
                utility.push(c.name)
            }else if(c.category == "suggestions" && c.activ == true && c.adminonly == false){
                suggestions.push(c.name)
            }else if(c.category == "leveling" && c.activ == true && c.adminonly == false){
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
        for(let i = 0; i < leveling.length; i++){
            if(i == 0) levelingtxt = `**\`${leveling[i].toUpperCase()}\`**`
            else levelingtxt += ` **| \`${leveling[i].toUpperCase()}\`**`
        }
        newEmbed.addFields(
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
