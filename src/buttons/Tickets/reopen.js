const Discord = require('discord.js');
const panels = require("../../../models/panels")
const tickets = require("../../../models/tickets")
module.exports = {
    name: "reopen_ticket",
    description: "to close ticket",
    category: 'Public',
    async run(client, interaction, mongoose, emo) {
        tickets.findOne({ ticketID: interaction.channel.id }, async (err, ticket) => {
            if (err) console.log(err);
            if (!ticket) {
                return
            }
            else {
                if (ticket.Opened) {
                    await interaction.reply({ content: `**${emo.false} | هـذه الـتـذكـرة مـفـتـوحـة بالـ فـعـل !!**`, ephemeral: true, });
                    return
                }

                interaction.message.delete().catch()
                ticket.Opened = true
                ticket
                    .save()
                    .catch(err => {
                    })
                const ticket_channel = interaction.channel
                for (let i = 0; i < ticket.ticketMembers.length; i++) {
                    if (ticket.ticketMembers[i] == '0') continue
                    if (ticket.ticketMembers[i] == emo.supportRole && ticket.Claimed) continue
                    ticket_channel.permissionOverwrites.edit(ticket.ticketMembers[i], { VIEW_CHANNEL: true, SEND_MESSAGES: true })
                }
                let opened_embed = new Discord.MessageEmbed()
                    .setColor(`${emo.embedcolor}`)
                    .setDescription(`**${emo.true} | تـم إعـادة فـتـح هـذه الـتـذكـرة بـ واسـطـة < ${interaction.user} > .**`)


                interaction.deferUpdate().catch()
                ticket_channel
                    .send({ embeds: [opened_embed] })
                    .catch()
            }

        })





    }
}