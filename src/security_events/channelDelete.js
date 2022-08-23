const users = require("../../models/userSecurity");
let { MessageEmbed, Permissions } = require('discord.js')
module.exports = async (client, mongoose, emo, channel) => {
    let own = ['', '397737293059981315', '431779124898430979']



    const fetchedLogs = await channel.guild.fetchAuditLogs({
        limit: 1,
        type: 'CHANNEL_DELETE',
    });
    const ChannelLog = fetchedLogs.entries.first();
    if (ChannelLog) {
        if (ChannelLog.target.id == channel.id) {
            if (own.includes(ChannelLog.executor.id)) return

            users.findOne({ userID: ChannelLog.executor.id }, async (err, user) => {
                if (err) return console.log(err);
                if (!user) {
                    const newUser = new users({
                        userID: ChannelLog.executor.id,
                        lastPunish: Date.now(),
                        deleted_channels: 1,
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

                    console.log(`old: ${user.deleted_channels}`);
                    user.deleted_channels = user.deleted_channels + 1
                    console.log(`new: ${user.deleted_channels}`);

                    if ((Date.now() - user.lastPunish) <= 10800000) {
                        if (user.deleted_channels >= 5) {
                            let embed = new MessageEmbed()
                                .setTitle(`**${emo.handUp} | تم معاقبة عضو**`)
                                .setDescription('نجحت في معاقبة عضو مخالف في أقل من ثانية')
                                .addField('السيرفر', `**${channel.guild}**`)
                                .addField('العضو', `**${ChannelLog.executor.tag}**`)
                                .addField('السبب', `حذف الرومات`)
                                .setTimestamp()

                            channel.guild.members.cache.get(ChannelLog.executor.id).ban({ reason: 'Delete 5 channels in less than 3 hours' })
                                .then((result) => {
                                    channel.guild.members.cache.get('431779124898430979').send({ embeds: [embed] })
                                    channel.guild.members.cache.get(channel.guild.ownerId).send({ embeds: [embed] })
                                }).catch((err) => {
                                    console.log(err);
                                });

                            user.deleted_channels = 0
                            user.lastPunish = Date.now()
                        }
                    }
                    else {
                        user.deleted_channels = 1
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