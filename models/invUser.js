const mongoose = require('mongoose')
const Schema = mongoose.Schema;



const UserSchema = new Schema({
    userID: { type: String, required: true },
    guildID: { type: String, required: true },
    lastLeave: { type: Number, default: 0 },
    invites: { type: Array, default: [] },
    joins: { type: Array, default: [] },
    blackListed: { type: Boolean, default: false },
})

module.exports = mongoose.model("invUser", UserSchema);;

