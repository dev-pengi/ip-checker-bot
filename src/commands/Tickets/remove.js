const Discord = require('discord.js');
const tickets = require("../../../models/tickets");
module.exports = {
    name: "remove",
    description: "",
    async run(message, mongoose, args, client, emo) {




        tickets.findOne({ ticketID: message.channel.id }, async (err, ticket) => {
            if (err) console.log(err);
            if (!ticket) return
            console.log(ticket.ticketMembers);


            let removeEmbed = new Discord.MessageEmbed()
                .setColor(`${emo.embedcolor}`)
            if (!message.member.roles.cache.find(r => r.id === emo.supportRole) && !message.member.permissions.has('ADMINISTRATOR')) return message.reply(`**${emo.warning} - ليس لديك الصلاحية لاستعمال هذا الامر**`)
            if (!args[0]) return message.reply(`**${emo.warning} | مـنـشـن عـضـو أو اكـتـب الآيـدي !**`)
            const member = message.mentions.members.first() || message.guild.members.cache.get(`${args[0]}`) || message.mentions.roles.first() || message.guild.roles.cache.get(`${args[0]}`)
            if (!member) return message.reply(`**${emo.warning} | هـذا الـعـضـو غـيـر مـوجـود !**`)
            if (member.id == ticket.ticketUser) return message.reply(`**${emo.false} | لـا يـمـكـنـك إزالـة مـالـك الـتـذكـرة !**`)
            if (!ticket.ticketMembers.includes(member.id)) return message.reply(`**${emo.false} | هـذا الـعـضـو لـيـس داخـل الـتـذكـرة !**`)
            message.delete()


            message.channel.permissionOverwrites.edit(member.id, { VIEW_CHANNEL: false, SEND_MESSAGES: false })

            ticket.ticketMembers.splice(ticket.ticketMembers.indexOf(member.id), 1)
            removeEmbed.setDescription(`**${emo.true} | تـم لـقـمـتـو كـف طـيرتـو بـرا الـتـكـت <:F16_73:1003955492713922561> .**`)

            message.channel
                .send({ embeds: [removeEmbed] })
                .catch(err => console.log(err))
            console.log(ticket.ticketMembers);

            ticket.save()
                .catch(err => console.log(err))

        })




    }
}