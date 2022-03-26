const { model, Schema } = require("mongoose")

const schema = new Schema({
     guildId: {type: String},
     name: {type: String},
     value: {type: String},
     description: {type: String},
     roles: {type: Array},
     onlyOne: {type: String},
     requiredRole: {type: String},
     interactionID: {type: String},
     emoji: {type: String, default: ""}
})

module.exports = model("selfRoleCat", schema);