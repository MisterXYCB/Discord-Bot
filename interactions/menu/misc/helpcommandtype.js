module.exports = {
    async execute(client, interaction, Discord, text, profileData, serverData){
        await interaction.deferUpdate()
        const category = interaction.values[0].split("/")[0]
        const commandType = interaction.values[0].split("/")[1]
        const commands = []
        if(commandType == "slash"){
            client.slashcommands.forEach(command => {
                if(command.category == category) commands.push(command)
            });
        }
        if(commandType == "text"){
            client.commands.forEach(command => {
                if(command.category == category) commands.push(command)
            });
        }

        const options = []
        const row2 = new Discord.MessageActionRow()
        commands.forEach(command => {
            options.push({label: command.name, value: category + "/" + command.name.toLowerCase()})
        })
        row2 .addComponents(new Discord.MessageSelectMenu() .setCustomId(`misc/helpcommand`) .setPlaceholder("Choose a command!") .addOptions(options))
        const row1 = new Discord.MessageActionRow() .addComponents(new Discord.MessageButton() .setLabel(`VOTE(TOP.GG)`) .setStyle(`LINK`) .setURL(`https://top.gg/bot/819300001485684736/vote`),
        new Discord.MessageButton() .setLabel(`SUPPORT SERVER`) .setStyle(`LINK`) .setURL(`https://discord.gg/JsxrmE8kJS`))
        interaction.editReply({components: [row1, row2]})
    }
}
