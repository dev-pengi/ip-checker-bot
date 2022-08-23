const Discord = require('discord.js');
module.exports = {
  name: "line",
  permissions: {
    user: "MANAGE_MESSAGES",
  },
  aliases: ['خط','-'],
  description: "",
  async run(message, mongoose, args, client,emo) {
    message.delete().catch(err => console.log(err))
    message.channel.send(emo.line)
  }
}