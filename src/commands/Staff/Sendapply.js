const Discord = require('discord.js');
module.exports = {
    name: `apply`,
    permissions: {
        user: `ADMINISTRATOR`,
        bot: `ADMINISTRATOR`
    },
    description: ``,
    async run(message, mongoose, args, client, emo) {
        if (args[0]) return
        let embed = new Discord.MessageEmbed()
        .setTitle('تـقـديـم ادارة')
        .setDescription(`__مـلاحـظـات :__
        > **شـرط عـمـرك فـوق 13 سـنـة .**
        > **تـفـاعـلـك يـتـجـاوز 4 سـاعـات .**
        > **مـمـنـوع الخـروج مـن الإدارة ، يـعـرضـك لـلـبـاند!**`)
        .setColor(emo.embedcolor)

                
        const row = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
                .setCustomId(`staff_apply`)
                .setLabel('تـقـديـم ادارة')
                .setEmoji(`${emo.staff}`)
                .setStyle('SECONDARY')
        );
        message.delete()
        message.channel.send({ embeds: [embed], components: [row] })
    }
}    