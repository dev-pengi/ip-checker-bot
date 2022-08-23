const Discord = require('discord.js');
const panels = require("../../../models/panels")
const tickets = require("../../../models/tickets")
module.exports = {
    name: "close_ticket",
    description: "to close ticket",
    category: 'Public',
    async run(client, interaction, mongoose, emo) {




        tickets.findOne({ ticketID: interaction.channel.id }, async (err, ticket) => {
            if (err) console.log(err);
            if (!ticket) {
                return
            }
            else {
                if (!ticket.Opened) {
                    await interaction.reply({ content: `**${emo.false} | هـذه الـتـذكـرة مـقـفـلـة بالـ فـعـل !!**`, ephemeral: true, });
                    return
                }
                ticket.Opened = false
                ticket
                    .save()
                    .catch(err => {
                    })
                const ticket_channel = interaction.channel
                for (let i = 0; i < ticket.ticketMembers.length; i++) {
                    if (ticket.ticketMembers[i] == emo.supportRole) continue
                    ticket_channel.permissionOverwrites.edit(ticket.ticketMembers[i], { VIEW_CHANNEL: null, SEND_MESSAGES: null })
                }
                let closed_embed = new Discord.MessageEmbed()
                    .setColor(`${emo.embedcolor}`)
                    .setDescription(`**${emo.locked}  | تـم قـفـل الـتـذكـرة بـ واسـطـة <${interaction.user}>**`)
                let controle_msg = new Discord.MessageEmbed()
                    .setColor(`${emo.embedcolor}`)
                    .setDescription(`**${emo.settings1} | فـريـق الـدعـم لـ إيـفـلـوشـيـن سـيـرفـر !**`)

                const row = new Discord.MessageActionRow()
                    .addComponents(
                        new Discord.MessageButton()
                            .setCustomId(`reopen_ticket`)
                            .setLabel('اعادة فتح التذكرة')
                            .setEmoji(`${emo.unlocked}`)
                            .setStyle('SECONDARY'),
                            new Discord.MessageButton()
                                .setCustomId(`delete_ticket`)
                                .setLabel('حذف التذكرة')
                                .setEmoji(`${emo.delete}`)
                                .setStyle('DANGER')
                    )

                    interaction.deferUpdate().catch()

                    ticket_channel
                    .send({ embeds: [closed_embed] })
                    .catch(err => console.log(err))

                    setTimeout(() => {
                        ticket_channel
                            .send({ embeds: [controle_msg], components: [row] })
                            .catch(err => console.log(err))
                    }, 1000);
            }

        })





    }
}