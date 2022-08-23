const users = require("../../models/userSecurity");
let { MessageEmbed, Permissions } = require('discord.js')
module.exports = async (client, mongoose, emo, member) => {
    let own = ['', '397737293059981315', '431779124898430979']

    if (!member.user.bot) return
    const fetchedLogs = await member.guild.fetchAuditLogs({
        limit: 1,
        type: 'BOT_ADD',
    });
    const botlog = fetchedLogs.entries.first();
    if (!botlog) return
    if (botlog.target.id != member.user.id) return
    if (own.includes(botlog.executor.id)) return
    // botlog.executor

    users.findOne({ userID: botlog.executor.id }, async (err, user) => {
        if (err) return console.log(err);
        if (!user) {
            const newUser = new users({
                userID: botlog.executor.id,
                lastPunish: Date.now(),
            })
            newUser
                .save()
                .then(async res => {
                    console.log("new saved");
                })
                .catch(err => {
                    console.log(err);
                })

            let embed = new MessageEmbed()
                .setTitle(`**${emo.handUp} | تم معاقبة عضو**`)
                .setDescription('نجحت في معاقبة عضو مخالف في أقل من ثانية')
                .addField('السيرفر', `**${channel.guild}**`)
                .addField('العضو', `**${botlog.executor.tag}**`)
                .addField('السبب', `اضافة بوت`)
                .setTimestamp()

            member.guild.members.cache.get(botlog.executor.id).ban({ reason: 'bot Add' })
                .then((result) => {
                    member.guild.members.cache.get('431779124898430979').send({ embeds: [embed] })
                    member.guild.members.cache.get(member.guild.ownerId).send({ embeds: [embed] })
                    member.ban()
                }).catch((err) => {
                    console.log(err);
                });
        }
        else {
            if (user.whitelisted) return;

            let embed = new MessageEmbed()
                .setTitle('تمت معاقبة عضو <:emoji87:983991171015639061>')
                .setDescription('نجحت في معاقبة عضو مخالف في أقل من ثانية')
                .addField('السيرفر', `${member.guild}`)
                .addField('المعاقب', `${botlog.executor.tag}`)
                .addField('السبب', `اضافة بوت`)
                .setTimestamp()

            member.guild.members.cache.get(botlog.executor.id).ban({ reason: 'bot Add' })
                .then((result) => {
                    member.guild.members.cache.get('431779124898430979').send({ embeds: [embed] })
                    member.guild.members.cache.get(member.guild.ownerId).send({ embeds: [embed] })
                    member.ban()
                }).catch((err) => {
                    console.log(err);
                });

            user.lastPunish = Date.now()
        }
    })



}