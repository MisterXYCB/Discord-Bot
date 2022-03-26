const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
})

const model = mongoose.model("tickets", ticketSchema);

module.exports = model;