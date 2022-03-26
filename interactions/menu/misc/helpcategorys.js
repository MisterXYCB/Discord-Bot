const { MessageActionRow } = require("discord.js");

module.exports = {
    async execute(client, interaction, Discord, text, profileData, serverData){
        await interaction.deferReply({ephemeral: true})
        const textcommands = []
        const slashcommands = []
        client.commands.forEach(command => {
            if(command.category == interaction.values) textcommands.push(command)
        });
        client.slashcommands.forEach(command => {
            if(command.category == interaction.values) slashcommands.push(command)
        });
        const options = []
        const row2 = new Discord.MessageActionRow()
        if(slashcommands.length != 0 && textcommands.length != 0) {
            options.push({label: "Slash command", value: interaction.values + "/slash"})
            options.push({label: "Text command", value: interaction.values + "/text"})
            row2 .addComponents(new Discord.MessageSelectMenu() .setCustomId(`misc/helpcommandtype`) .setPlaceholder("Choose a command type!") .addOptions(options))
        }else return
        const row1 = new Discord.MessageActionRow() .addComponents(new Discord.MessageButton() .setLabel(`VOTE(TOP.GG)`) .setStyle(`LINK`) .setURL(`https://top.gg/bot/819300001485684736/vote`),
        new Discord.MessageButton() .setLabel(`SUPPORT SERVER`) .setStyle(`LINK`) .setURL(`https://discord.gg/JsxrmE8kJS`))
        interaction.editReply({content: "\u200b", components: [row1, row2]})
    }
}