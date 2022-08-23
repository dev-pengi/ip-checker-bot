const Discord = require('discord.js');
const tickets = require("../../../models/tickets");
module.exports = {
    name: "close",
    description: "",
    async run(message, mongoose, args, client, emo) {


        tickets.findOne({ ticketID: message.channel.id }, async (err, ticket) => {
            if (err) console.log(err);
            if (!ticket) {
                return
            }
            else {
                message.delete()
                if (!ticket.Opened) return message.reply({ content: `**${emo.false} | هـذه الـتـذكـرة مـقـفـلـة بالـ فـعـل !!**`});
                ticket.Opened = false
                ticket
                    .save()
                    .catch()
                const ticket_channel = message.channel
                for (let i = 0; i < ticket.ticketMembers.length; i++) {
                    if (ticket.ticketMembers[i] == emo.supportRole) continue
                    ticket_channel.permissionOverwrites.edit(ticket.ticketMembers[i], { VIEW_CHANNEL: null, SEND_MESSAGES: null })
                }
                let closed_embed = new Discord.MessageEmbed()
                    .setColor(`${emo.embedcolor}`)
                    .setDescription(`**${emo.locked}  | تـم قـفـل الـتـذكـرة بـ واسـطـة <${message.author}>**`)
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