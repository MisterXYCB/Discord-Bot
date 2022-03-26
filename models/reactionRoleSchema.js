const mongoose = require('mongoose');

const ReactionRoleSchema = new mongoose.Schema({
    messageID: { type: String },
    reaction: { type: String },
    roleID: { type: String}
})

const model = mongoose.model("ReactionRoles", ReactionRoleSchema);

module.exports = model;