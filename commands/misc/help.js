module.exports = {
    name: 'help',
    aliases: [],
    permissions: [],
    description: "help command",
    category: "misc",
    adminonly: false,
    activ: true,
    execute(client, message, args, cmd, Discord, text, profileData, serverData){
        const categorys = []
        client.commands.forEach(c => {
            if(categorys.some(cat => c.category == cat)) return
            else categorys.push(c.category)       
        });
        client.slashcommands.forEach(c => {
            if(categorys.some(cat => c.category == cat)) return
            else categorys.push(c.category)       
        });

        const options = []; 
        categorys.forEach(async (category) => {
            const newOption = {label: category, value: category};
            options.push(newOption)
        })

        const embed = new Discord.MessageEmbed() .setDescription(`You need more help or want to suggest something? Join the support server!\n\nYou need help with a command? Choose the category then the command type and the command!\n\n You want to support this bot vote for it on top.gg!`) .setColor('304281')
        const row1 = new Discord.MessageActionRow() .addComponents(new Discord.MessageButton() .setLabel(`VOTE(TOP.GG)`) .setStyle(`LINK`) .setURL(`https://top.gg/bot/819300001485684736/vote`),
        new Discord.MessageButton() .setLabel(`SUPPORT SERVER`) .setStyle(`LINK`) .setURL(`https://discord.gg/JsxrmE8kJS`))
        const row2 = new Discord.MessageActionRow() .addComponents(new Discord.MessageSelectMenu() .setCustomId(`misc/helpcategorys`) .setPlaceholder("Choose a category!") .addOptions(options))
        message.channel.send({embeds: [embed], components: [row1, row2]}) 
    }
}

