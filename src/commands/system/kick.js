const Discord = require('discord.js');
module.exports = {
  name: `kick`,
  aliases: ['kick'],
  permissions: {
    user: `KICK_MEMBERS`,
    bot: `KICK_MEMBERS`
  },
  description: `To kick people`,
  async run(message, mongoose, args, client,emo) {
      
    if (!args[0]) return message.reply(`**${emo.warning} | مـنـشـن أحـد الأعـضـاء**`)
    const member = message.mentions.members.first() || message.guild.members.cache.get(`${args[0]}`)
    if (!member) return message.reply(`**${emo.warning} | هـذا الـعـضـو غـيـر مـوجـود !**`)
    if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 0 && message.author.id != message.guild.owner.id) return message.reply(`**${emo.warning} | يـبـوي حـرك الـي تـبـي تـطـرده اعـلـى مـنـك 😂.**`)
     if (!member.kickable) return message.reply(`**${emo.warning} | خـطـأ شـيـك تـرتـيـب رتـبـتـي**`)
    const reason = message.content.split(' ').slice(2).join(' ')
     member.kick({reason:`BY : ${message.author.tag} | REASON : ${reason}`}).then((result) => {
      return message.reply(`**${emo.true} | الـقـم يـهـطـف <:F16_73:1003955492713922561> .**`)
     }).catch((err) => {
      return message.reply(`**${emo.false} |  مـاقـدرت أطـردو مـدري لـيـش <:F16_73:1003955492713922561> .**`)
     });

  }
}    