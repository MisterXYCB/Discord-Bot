const ticketHubModels = require('../../models/ticketHubSchema')

module.exports = {
    name: 'tickethub',
    permissions: [],
    category: "ticket",
    adminonly: true,
    activ: true,
    async execute(client, message, args, cmd, Discord, text, profileData, serverData){
        const desc = args.join(" ")
        const embed = new Discord.MessageEmbed() .setDescription(`${desc || "NO DESCRIPTION YET"}`) .setColor('7faaf0');
        const button = new Discord.MessageButton() .setCustomId("ticket/ticketCreate") .setStyle("SECONDARY") .setLabel("CREATE TICKET!")
        button.setEmoji("📩")
        const row = new Discord.MessageActionRow() .addComponents(button)
        const msg = await message.channel.send({embeds: [embed], components: [row]});
        message.delete();
        await ticketHubModels.create({messageID: msg.id})
    }
}