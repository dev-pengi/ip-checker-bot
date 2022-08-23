const Discord = require('discord.js');
const panels = require("../../../models/panels");
module.exports = {
    name: "new",
    description: "",
    permissions: {
        user: 'MANAGE_CHANNELS',
        bot: 'ADMINISTRATOR'
    },
    async run(message, mongoose, args, client, emo) {



        if (!args[0]) return message.reply(`**${emo.warning} | اكـتـب عـنـوان الـتـكـت .**`)
        if (args.join(' ').length >= 35) return message.reply(`**${emo.warning} | يـجـب أن لا يـتـجـاوز 35 حـرف 😒.**`)
        let embed = new Discord.MessageEmbed()
            .setColor(`${emo.embedcolor}`)
            .setTitle(`${args.join(' ')}`)
            .setFooter({ text: `Evolution ticket system`, iconURL: `${client.user.avatarURL()}` })
        message.reply(`**${emo.time} | الآن مـعـك 5 دقـائـق لـ كـتـابـه الـمـحـتـوى ( يُـمـكـنـك ارسـال صـورة إنـفـو ايـضـا ) .**`)
            .then(msg => {
                const filter = m => m.author.id == message.author.id;
                const collector = message.channel.createMessageCollector({ filter, time: 300000 });
                collector.on('collect', collected => {
                    collector.stop()
                    embed.setDescription(collected.content)
                    if (collected.attachments.size > 0) {
                        embed.setImage(`${[...(collected.attachments.values())][0].url}`)
                    }
                    
                    const row = new Discord.MessageActionRow()
                    .addComponents(
                        new Discord.MessageButton()
                            .setCustomId(`open_ticket`)
                            .setLabel('فـتـح تـذكـرة')
                            .setEmoji(`${emo.ticket}`)
                            .setStyle('SECONDARY')
                    );
                    message.channel.send({ embeds: [embed], components: [row] }).then(msg => {
                        panels.findOne({ panelID: msg.id }, async (err, panel) => {
                            if (err) console.log(err);
                            if (!panel)
                            {
                                const newticket = new panels({
                                    panelID: `${msg.id}`,
                                })
                                    .save()
                                    .catch( err => {
                                        msg
                                        .delete()
                                        .then(dmsg => {
                                            msg.channel.send(`**${emo.false} - حدثت مشكلة اثناء تخزين بيانات التكت**`)
                                        }).catch();
                                    })
                            }
                            else {
                                msg
                                .delete()
                                .then(dmsg => {
                                    msg.channel.send(`**${emo.false} - حدثت مشكلة اثناء تخزين بيانات التكت**`)
                                }).catch();
                            }
                        })
                    })
                    collector.stop()
                });
                collector.on('end', collected => {
                    msg.delete().catch()
                });
            }).catch((err) => {
                message.reply(`**${emo.false} - حدث خطأ يرجى المحاولة لاحقا**`)
            });
    }
}