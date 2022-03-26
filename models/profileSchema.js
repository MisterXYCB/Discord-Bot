const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    userID: { type: String, require: true },
    serverID: { type: String, require: true },
    coins: { type: Number, default: 1000 },
    bank: { type: Number, default: 0 },
    guild: { type: String, default: "" },
    afk: { type: String, default: "" },
    afkReason: { type: String, default: "" },
    xp: {type: Number, default: 0},
    lifeTimeXp: {type: Number, default: 0},
    level: {type: Number, default: 0},
    lastmessage: {type: String, default: "0"}
})

const model = mongoose.model("ProfileModels", profileSchema);

module.exports = model;