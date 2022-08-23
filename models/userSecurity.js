const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const user = new Schema({
  userID: { type: String, required: true },
  serverID: String,
  whitelisted: { type: Boolean, default: false },
  lastPunish: { type: Number, default: 0 },
  bans: { type: Number, default: 0 },
  kicks: { type: Number, default: 0 },
  created_channels: { type: Number, default: 0 },
  deleted_channels: { type: Number, default: 0 },
  created_roles: { type: Number, default: 0 },
  deleted_roles: { type: Number, default: 0 },

})

module.exports = mongoose.model("users", user);

