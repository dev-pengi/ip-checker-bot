const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const staffSchema = new Schema({
    userID: { type: String, required: true, unique: true },
    xp: { type: Number, default: 0 },
    level: { type: Number, default: 0 },
    messagesCount: { type: Number, default: 0 },
    reputation: { type: Number, default: 0 },
    blackListed: { type: Boolean, default: false },
    vipStaff: { type: Boolean, default: false },
})

module.exports = mongoose.model("staff", staffSchema);;

