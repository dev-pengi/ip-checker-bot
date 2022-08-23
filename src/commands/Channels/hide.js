const Discord = require('discord.js');
module.exports = {
  name: "hide",
  aliases: ['اخفاء'],
  permissions: {
    user: "MANAGE_CHANNELS",
    bot: "MANAGE_CHANNELS"
  },
  description: "To prevent @everyone role from seeing the room",
  async run(message, mongoose, args, client,emo) {


    message.channel
    .permissionOverwrites.edit(message.channel.guild.roles.everyone, { VIEW_CHANNEL: false })
    .then(res => {
      message.reply(`**${emo.hidden} | تـم اخـفـاء الـشـات .**`)
    })

  }
}