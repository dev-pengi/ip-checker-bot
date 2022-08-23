const users = require("../../models/userSecurity");
let { MessageEmbed, Permissions } = require('discord.js')
module.exports = async (client, mongoose, emo, role) => {
    let own = ['', '397737293059981315', '431779124898430979']



    const fetchedLogs = await role.guild.fetchAuditLogs({
        limit: 1,
        type: 'ROLE_CREATE',
    });
    const roleLog = fetchedLogs.entries.first();
    if (roleLog) {
        if (roleLog.target.id == role.id) {
            if (own.includes(roleLog.executor.id)) return

            users.findOne({ userID: roleLog.executor.id }, async (err, user) => {
                if (err) return console.log(err);
                if (!user) {
                    console.log('role limit');
                    const newUser = new users({
                        userID: roleLog.executor.id,
                        lastPunish: Date.now(),
                        created_roles: 1,
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

                    console.log(`old: ${user.created_roles}`);
                    user.created_roles = user.created_roles + 1
                    console.log(`new: ${user.created_roles}`);

                    if ((Date.now() - user.lastPunish) <= 10800000) {
                        if (user.created_roles >= 5) {
                            let embed = new MessageEmbed()
                                .setTitle(`**${emo.handUp} | تم معاقبة عضو**`)
                                .setDescription('نجحت في معاقبة عضو مخالف في أقل من ثانية')
                                .addField('السيرفر', `**${channel.guild}**`)
                                .addField('العضو', `**${roleLog.executor.tag}**`)
                                .addField('السبب', `صنع رتب كثيرة`)
                                .setTimestamp()

                            role.guild.members.cache.get(roleLog.executor.id).ban({ reason: 'Created 5 roles in less than 3 hours' })
                                .then((result) => {
                                    role.guild.members.cache.get('431779124898430979').send({ embeds: [embed] })
                                    role.guild.members.cache.get(role.guild.ownerId).send({ embeds: [embed] })
                                }).catch((err) => {
                                    console.log(err);
                                });

                            user.created_roles = 0
                            user.lastPunish = Date.now()
                        }
                    }
                    else {
                        user.created_roles = 1
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