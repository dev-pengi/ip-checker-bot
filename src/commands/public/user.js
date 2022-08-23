const Discord = require('discord.js');
module.exports = {
  name: "user",
  description: "",
  aliases: ['user'],
  async run(message, mongoose, args, client, emo) {

    const embed = new Discord.MessageEmbed()
      .setColor(`${emo.embedcolor}`)
    if (!args[0]) {

      embed.addField(`Joined Discord:`, `<t:${parseInt(message.author.createdTimestamp / 1000, 10)}:R>`, true)
      embed.addField(`Joined Server:`, `<t:${parseInt(message.member.joinedTimestamp / 1000, 10)}:R>`, true)
      if (message.author.avatarURL({ dynamic: true })) {
        embed.setFooter({ text: `${message.author.tag}`, iconURL: `${message.author.avatarURL({ dynamic: true })}` })
        embed.setThumbnail(`${message.author.avatarURL({ dynamic: true })}`)
      }
      else {
        embed.setFooter({ text: `${message.author.tag}` })
      }
      message.reply({ embeds: [embed] })
    }
    else {

      const member = message.mentions.members.first() || message.guild.members.cache.get(`${args[0]}`)
      if (!member) return message.reply(`**${emo.warning} - I can't find this user**`)
      embed.addField(`Joined Discord:`, `<t:${parseInt(member.user.createdTimestamp / 1000, 10)}:R>`, true)
      embed.addField(`Joined Server:`, `<t:${parseInt(member.joinedTimestamp / 1000, 10)}:R>`, true)

      if (member.user.avatarURL({ dynamic: true })) {
        embed.setFooter({ text: `${member.user.tag}`, iconURL: `${member.user.avatarURL({ dynamic: true })}` })
        embed.setThumbnail(`${member.user.avatarURL({ dynamic: true })}`)
      }
      else {
        embed.setFooter({ text: `${member.user.tag}` })
      }
      message.reply({ embeds: [embed] })

    }



  }
}