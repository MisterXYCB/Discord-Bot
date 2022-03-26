const mongoose = require('mongoose');

const levelRewardsSchema = new mongoose.Schema({
    guildID: {type: String},
    level: {type: Number},
    roleID: {type: String}
})

const model = mongoose.model("levelRewards", levelRewardsSchema);

module.exports = model;