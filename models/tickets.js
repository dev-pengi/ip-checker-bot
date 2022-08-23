const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const ticketSchema = new Schema({
    ticketID: { type: String, required: true },
    ticketOwner: { type: String, required: true },
    ticketMembers: { type: Array },
    Opened: { type: Boolean, default: true },
    Claimed: { type: Boolean, default: false },
    ClaimedBy: { type: String, default: null }
})

module.exports = mongoose.model("tickets", ticketSchema);


