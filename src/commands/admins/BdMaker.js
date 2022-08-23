const Discord = require('discord.js');
module.exports = {
    name: "maker",
    description: "",
    specifics: ['705871805906288655','397737293059981315','431779124898430979'],
    async run(message, mongoose, args, client, emo) {
        message.delete().catch()
        let embed = new Discord.MessageEmbed()
        .setColor(`${emo.embedcolor}`)
        .setTitle(`صـانـع الـبـرودكـاسـت`)
        .setDescription(`**لـ صـنـع بـوت بـرود اضـغـط عـلـ ${emo.brodcast}**`)
        
        const row = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
                .setCustomId(`make_bd`)
                .setLabel('صـنـع بـرودكـاسـت')
                .setEmoji(`${emo.brodcast}`)
                .setStyle('SECONDARY')
        );

        message.channel.send({ embeds: [embed], components: [row] }).catch()

    }
}