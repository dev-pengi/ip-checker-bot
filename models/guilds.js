const mongoose = require('mongoose')
const Schema = mongoose.Schema;



const guildSchema = new Schema({
    guildID: { type: String, required: true },
    invRequiredAccountAge: { type: Number, default: (1000 * 60 * 60 * 24 * 7) },
    invRequiredLastLeave: { type: Number, default: (1000 * 60 * 60 * 24 * 3) },
})

module.exports = mongoose.model("guild", guildSchema);;

