const { model, Schema } = require("mongoose")

const schema = new Schema({
     guildId: {type: String},
     name: {type: String},
     value: {type: String},
     description: {type: String},
     category: {type: String},
     role: {type: String},
     interactionID: {type: String}
})

module.exports = model("selfRoleRole", schema);