const Discord = require('discord.js');
module.exports = {
  name: "unlock",
  aliases: ['فتح'],
  permissions: {
    user: "MANAGE_CHANNELS",
    bot: "MANAGE_CHANNELS"
  },
  description: "Let @everyone role sending messages in the channel",
  async run(message, mongoose, args, client,emo) {
    message.channel
    .permissionOverwrites.edit(message.channel.guild.roles.everyone, { SEND_MESSAGES: null })
    .then(res => {
      message.reply(`**${emo.unlocked} | تـم فـتـح الـشـات .**`)
    })
  }
}