const Discord = require('discord.js');
module.exports = {
  name: "lock",
  aliases: ['قفل'],
  permissions: {
    user: "MANAGE_CHANNELS",
    bot: "MANAGE_CHANNELS"
  },
  description: "To prevent @everyone role from sending messages in the channel",
  async run(message, mongoose, args, client,emo) {


    message.channel
    .permissionOverwrites.edit(message.channel.guild.roles.everyone, { SEND_MESSAGES: false })
    .then(res => {
      message.reply(`**${emo.locked} | تـم قـفـل الـشـات .**`)
    })

  }
}