const mongoose = require('mongoose');

const ticketHubSchema = new mongoose.Schema({
    messageID: { type: String }
})

const model = mongoose.model("ticketHubs", ticketHubSchema);

module.exports = model;