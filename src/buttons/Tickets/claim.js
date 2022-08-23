const Discord = require('discord.js');
const panels = require("../../../models/panels")
const tickets = require("../../../models/tickets")
module.exports = {
    name: "claim_ticket",
    description: "to close ticket",
    category: 'Public',
    async run(client, interaction, mongoose, emo) {
        tickets.findOne({ ticketID: interaction.channel.id }, async (err, ticket) => {
            if (err) console.log(err);
            if (!ticket) {
                return
            }
            else {
                // console.log(ticket);
                let claimEmbed = new Discord.MessageEmbed()
                    .setColor(`${emo.embedcolor}`)

                if (!interaction.guild.members.cache.get(interaction.user.id).roles.cache.find(r => r.id === emo.supportRole)) {
                    await interaction.reply({ content: `**${emo.false} | فـقـط فـريـق الـدعـم يـمـكـنـه إسـتـلام الـتـذاكـر .**`, ephemeral: true, });
                    return
                }
                if (ticket.Claimed && ticket.ClaimedBy != interaction.user.id) {
                    await interaction.reply({ content: `**${emo.false} | تـم إسـتـلام الـتـذكـرة مـن إداري آخـر .**`, ephemeral: true, });
                    return
                }
                if (!ticket.Claimed) {
                    interaction.deferUpdate().catch()
                    ticket.Claimed = true;
                    ticket.ClaimedBy = `${interaction.user.id}`;
                    interaction.channel.permissionOverwrites.edit(emo.supportRole, { SEND_MESSAGES: false })
                    interaction.channel.permissionOverwrites.edit(interaction.user.id, { SEND_MESSAGES: true })
                    claimEmbed.setDescription(`**${emo.true} | تـم إسـتـلام الـتـكـت بـ واسـطـة <${interaction.user}>**`)
                    ticket.ticketMembers.push(interaction.user.id)
                }
                else {
                    interaction.deferUpdate().catch()
                    ticket.Claimed = false;
                    ticket.ClaimedBy = null;
                    interaction.channel.permissionOverwrites.edit(emo.supportRole, { SEND_MESSAGES: true })
                    interaction.channel.permissionOverwrites.edit(interaction.user.id, { SEND_MESSAGES: null })
                    claimEmbed.setDescription(`**${emo.true} | تـم إلـغـاء إلاسـتـلام بـ واسـطـة <${interaction.user}>**`)
                }

                ticket.save().catch(err => console.log(err))
                interaction.channel.send({ embeds: [claimEmbed] })
                    .catch(err => console.log(err))
            }
        })
    }
}