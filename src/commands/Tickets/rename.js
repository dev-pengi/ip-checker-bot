const Discord = require('discord.js');
const tickets = require("../../../models/tickets");
module.exports = {
    name: "rename",
    description: "",
    category: 'Moderation',
    async run(message, mongoose, args, client, emo) {
        let closed_embed = new Discord.MessageEmbed()
            .setColor(`${emo.embedcolor}`)

        tickets.findOne({ ticketID: message.channel.id }, async (err, ticket) => {
            if (err) return
            if (!ticket) return
            if (!args[0]) return message.reply(`**${emo.warning} - يجب ان تذكر الاسم الجديد**`).catch()
            message.delete()
            oldName = message.channel.name
            message.channel
                .setName(args.join(' '))
                .catch((err) => {
                    return message.reply(`**${emo.false} - حدثت مشكلة اثناء تغيير الاسم يرجى المحاولة لاحقا**`).catch()
                });
 })
    }
}