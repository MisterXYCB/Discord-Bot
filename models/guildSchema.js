const mongoose = require('mongoose');

const guildSchema = new mongoose.Schema({
    name: { type: String, require: true },
    serverID: { type: String, require: true },
    openforall: { type: String, default: "false" },
    allcanapprove:{ type: String, default: "false" }
})

const model = mongoose.model("guilds", guildSchema);

module.exports = model;