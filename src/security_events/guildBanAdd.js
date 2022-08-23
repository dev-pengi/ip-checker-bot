const users = require("../../models/userSecurity");
let { MessageEmbed, Permissions } = require('discord.js')
module.exports = async (client, mongoose, emo, ban) => {
    let own = ['', '397737293059981315', '431779124898430979']



    const fetchedLogs = await ban.guild.fetchAuditLogs({
        limit: 1,
        type: 'MEMBER_BAN_ADD',
    });
    const banLog = fetchedLogs.entries.first();
    if (banLog) {
        if (banLog.target.id == ban.user.id) {
            if (own.includes(banLog.executor.id)) return
            console.log("new baaan");
            users.findOne({ userID: banLog.executor.id }, async (err, user) => {
                if (err) return console.log(err);
                if (!user) {
                    const newUser = new users({
                        userID: banLog.executor.id,
                        lastPunish: Date.now(),
                        bans: 1,
                    })
                    newUser
                        .save()
                        .then(async res => {
                            console.log("new saved");
                        })
                        .catch(err => {
                            console.log(err);
                        })
                }
                else {
                    if (user.whitelisted) return;

                    console.log(`old: ${user.bans}`);
                    user.bans = user.bans + 1
                    console.log(`new: ${user.bans}`);

                    if ((Date.now() - user.lastPunish) <= 10800000) {
                        if (user.bans >= 2) {
                            let embed = new MessageEmbed()
                            .setTitle(`**${emo.handUp} | تم معاقبة عضو**`)
                            .setDescription('نجحت في معاقبة عضو مخالف في أقل من ثانية')
                            .addField('السيرفر', `**${channel.guild}**`)
                            .addField('العضو', `**${banLog.executor.tag}**`)
                                .addField('السبب', `حظر الأعضاء`)
                                .setTimestamp()

                                ban.guild.members.cache.get(banLog.executor.id).ban({ reason: 'Ban 2 members in less than 3 hours' })
                                .then((result) => {
                                    ban.guild.members.cache.get('431779124898430979').send({ embeds: [embed] })
                                    ban.guild.members.cache.get(ban.guild.ownerId).send({ embeds: [embed] })
                                }).catch((err) => {
                                    console.log(err);
                                });

                            user.bans = 0
                            user.lastPunish = Date.now()
                        }
                    }
                    else {
                        user.bans = 1
                        user.lastPunish = Date.now()
                    }
                    user
                        .save()
                        .then(res => {

                        })
                        .catch(err => {
                            console.log(err)
                        })
                }
            })
        }
    }




}