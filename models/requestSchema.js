const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    ID: { type: String },
    userID: { type: String },
    guildID: { type: String }
})

const model = mongoose.model("requests", requestSchema);

module.exports = model;