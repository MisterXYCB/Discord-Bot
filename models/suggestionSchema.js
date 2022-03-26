const mongoose = require('mongoose');

const suggestionSchmea = new mongoose.Schema({
    messageID: { type: String },
    embedID: { type: String },
    guildID: { type: String },
    suggestion: { type: String },
    authorID: { type: String },
    comment: { type: String, default: "" }
})

const model = mongoose.model("suggestions", suggestionSchmea);

module.exports = model;