const Discord = require('discord.js');
module.exports = {
  name: `emo`,
  permissions: {
    user: `MANAGE_EMOJIS_AND_STICKERS`,
    bot: `MANAGE_EMOJIS_AND_STICKERS`
  },
  aliases: ['ايموجي'],
  description: `To add emojies to your server`,
  async run(message, mongoose, args, client,emo) {

    
    if (!args[0]) return message.reply(`**${emo.warning} | إخـتـر إيـمـوجـي لـ إضـافـتـه .**`)

    for (let i = 0; i < args.length; i++) {
      if (i >= 30) {
        message.reply(`**${emo.warning} - you can't add more than 30 emoji in a single command**`)
        break;
      }
      const emoji = args[i];
      const getEmoji = Discord.Util.parseEmoji(emoji)

      if (getEmoji && getEmoji.id)
       {
        const emojiExt = getEmoji.animated ? `.gif` : `.png`;
        const emojiURL = (`https://cdn.discordapp.com/emojis/${getEmoji.id + emojiExt}`);
        const emoji = await message.guild.emojis.create(emojiURL, getEmoji.name)
        message.channel.send(`**${emo.true} | تـم إضـافـه الإيـمـوجـي < ${emoji} > بـ نـجـاح .**`).catch(err => {
          message.channel.send(`**${emo.false}> | مـاقـدرت أضـيـف الايـمـوجـي رقـم ${i + 1}**`)
        })
      }
      else 
      {
        message.channel.send(`**${emo.false}> | مـاقـدرت أضـيـف الايـمـوجـي رقـم ${i + 1}**`)
      }
    }

  }
}