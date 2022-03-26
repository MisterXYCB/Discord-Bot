const mongoose = require('mongoose');

const serverSchema = new mongoose.Schema({
    serverID: { type: String },
    adminRole: { type: String, default: "" },
    modRole: { type: String, default: "" },
    prefix: { type: String, default: "-" },
    language: { type: String, default: "english" },
    suggestionChannel: { type: String, default: "" },
    suggestionCategory: { type: String, default: "" },
    deniedChannel: { type: String, default: "" },
    acceptedChannel: { type: String, default: "" },
    welcomeChannel: { type: String, default: "" },
    welcomeMessage: { type: String, default: "" },
    guilds: { type: String, default: false},
    economy: { type: String, default: false},
    leveling: {type: String, default: false},
    xpboost: {type: Number, dafault: 1},
    selfRoleCategorys: {type: Array},
})

const model = mongoose.model("servers", serverSchema);

module.exports = model;