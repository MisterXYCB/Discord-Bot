const ticketModels = require('../../../models/ticketSchema');
const ticketHubModels = require('../../../models/ticketHubSchema');

module.exports = {
    id: "ticketCreate",
    activ: true,
    async execute(client, interaction, Discord){
        interaction.reply("NICE")
        const ticketHub = await ticketHubModels.findOne({interaction})
    }
}