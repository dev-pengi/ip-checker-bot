const Discord = require('discord.js');
const tickets = require("../../../models/tickets");
module.exports = {
    name: "delete",
    description: "",
    async run(message, mongoose, args, client, emo) {

        tickets.findOne({ ticketID: message.channel.id }, async (err, ticket) => {
            if (err) console.log(err);
            if (!ticket) {
                return
            }
            else {
                let delete_embed = new Discord.MessageEmbed()
                .setColor(`${emo.embedcolor}`)
                .setDescription(`**سـيـتـم حـذف هـذه الـتـذكـره بـعـد ثـوانِ بـ واسـطـة <${message.author}>**`)
                message.delete()
                message.channel.send({embeds: [delete_embed]})
                setTimeout(() => {
                    message.channel.delete()
                }, 4000);
        
            }
        })
    }
}