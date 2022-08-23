const Discord = require('discord.js');
const panels = require("../../../models/panels")
const tickets = require("../../../models/tickets")
module.exports = {
    name: "delete_ticket",
    description: "to close ticket",
    category: 'Public',
    async run(client, interaction, mongoose, emo) {

        
        let closed_embed = new Discord.MessageEmbed()
        .setColor(`${emo.embedcolor}`)
        .setDescription(`**سـيـتـم حـذف هـذه الـتـذكـره بـعـد ثـوانِ بـ واسـطـة <${interaction.user}>**`)
        interaction.message.delete()
        interaction.deferUpdate().catch()
        interaction.channel.send({embeds: [closed_embed]})
        setTimeout(() => {
            interaction.channel.delete()
        }, 5000);

    }
}