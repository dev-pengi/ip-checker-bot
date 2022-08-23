const Discord = require('discord.js');
module.exports = {
  name: "show",
  aliases: ['اظهار'],
  permissions: {
    user: "MANAGE_CHANNELS",
    bot: "MANAGE_CHANNELS"
  },
  description: "Let @everyone role see the room",
  async run(message, mongoose, args, client,emo) {


    message.channel
    .permissionOverwrites.edit(message.channel.guild.roles.everyone, { VIEW_CHANNEL: null })
    .then(res => {
      message.reply(`**${emo.showen} | تـم اظـهـار الـشـات .**`)
    })

  }
}