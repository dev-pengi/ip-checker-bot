const Discord = require('discord.js');
const tickets = require("../../../models/tickets");
module.exports = {
    name: "add",
    description: "",
    async run(message, mongoose, args, client, emo) {

        tickets.findOne({ ticketID: message.channel.id }, async (err, ticket) => {
            if (err) console.log(err);
            if (!ticket) {
                return
            }
            else {
                let AddEmbed = new Discord.MessageEmbed()
                .setColor(`${emo.embedcolor}`)
                if (!message.member.roles.cache.find(r => r.id === emo.supportRole) && !message.member.permissions.has('ADMINISTRATOR')) return message.reply(`**${emo.warning} | لـيـس لـديـك الـصـلاحـيـات الـكـافـيـة !**`)
                if (!args[0]) return message.reply(`**${emo.warning} | مـنـشـن عـضـو أو اكـتـب الآيـدي !**`)
                const member = message.mentions.members.first() || message.guild.members.cache.get(`${args[0]}`) || message.mentions.roles.first() || message.guild.roles.cache.get(`${args[0]}`) 
                if (!member) return message.reply(`**${emo.warning} | هـذا الـعـضـو غـيـر مـوجـود !**`)
                message.delete()
                .catch(err => console.log(err))
                ticket.ticketMembers.push(member.id)
                message.channel.permissionOverwrites.edit(member.id, { VIEW_CHANNEL: true, SEND_MESSAGES: true })
                AddEmbed.setDescription(`**${emo.true} | تـم إضـافـة الـعـضـو <${member}>**`)
                message.channel.send({embeds: [AddEmbed]})
                .catch(err => console.log(err))
                ticket.save()
                .catch(err => console.log(err))
            }
        })
    }
}