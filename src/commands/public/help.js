const Discord = require('discord.js');
module.exports = {
  name: "help",
  description: "",
  async run(message, mongoose, args, client, emo) {
    // message.reply('هذا الامر تحت الصيانة')

    const embed = new Discord.MessageEmbed()
      .setColor(`${emo.embedcolor}`)
      .setDescription(`**يـرجـى اخـتـيـار نـوع الأوامـر**`)

    const heloOpt = [
      { label: 'System', value: 'System', emoji: emo.settings1 },
      { label: 'Tickets', value: 'Ticket', emoji: emo.ticket },
      { label: 'Invites', value: 'Invite', emoji: emo.userPlus },
      { label: 'Staff', value: 'Staff', emoji: emo.staff },
      { label: 'Giveaways', value: 'Giveaways', emoji: emo.gift },
      { label: 'Security', value: 'Security', emoji: emo.handUp },
    ]

    let helpMenu = new Discord.MessageSelectMenu()
      .setCustomId(`helpMenu`)
      .setPlaceholder('الأوامـر')
      .addOptions(heloOpt)
      .setDisabled(false)
    const helpRow = new Discord.MessageActionRow().addComponents([helpMenu])

    const helpMsg = await message.channel.send({ embeds: [embed], components: [helpRow] })

    setTimeout(async () => {
      helpMenu.setDisabled(true);
      helpMsg.edit({components: [helpRow]})
    }, 90000);

  }
}