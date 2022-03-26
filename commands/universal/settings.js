module.exports = {
    name: 'settings',
    aliases: [],
    permissions: [],
    cooldown: 0,
    category: "universal",
    adminonly: false,
    activ: true,
    async execute(client, message, args, cmd, Discord, text, profileData, serverData){
        const leveling = new Discord.MessageButton() .setCustomId("leveling") .setStyle("SECONDARY") .setLabel("CREATE TICKET!")
        button.setEmoji("📩")
        const row = new Discord.MessageActionRow() .addComponents(button)


        message.reply({embeds: [], components: []})
    }
}