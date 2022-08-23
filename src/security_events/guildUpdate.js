const users = require("../../models/userSecurity");
let { MessageEmbed, Permissions } = require('discord.js')
module.exports = async (client, mongoose, emo, oldGuild, newGuild) => {
    let own = ['', '431779124898430979', '397737293059981315']


    if (newGuild.vanityURLCode == oldGuild.vanityURLCode) return


    const fetchedLogs = await newGuild.fetchAuditLogs({
        limit: 1,
        type: 'GUILD_UPDATE',
    });
    const guildLog = fetchedLogs.entries.first();
    if (!guildLog) return

    if (own.includes(guildLog.executor.id)) return

    if (guildLog.changes) {
        for (let i = 0; i < guildLog.changes.length; i++) {
            if (guildLog.changes[i].key == 'vanity_url_code') {

                let embed = new MessageEmbed()
                    .setTitle(`**${emo.handUp} | تم معاقبة عضو**`)
                    .setDescription('نجحت في معاقبة عضو مخالف في أقل من ثانية')
                    .addField('السيرفر', `**${channel.guild}**`)
                    .addField('العضو', `**${guildLog.executor.tag}**`)
                    .addField('السبب', `تغيير رابط السيرفر`)
                    .setTimestamp()

                newGuild.members.cache.get(guildLog.executor.id).ban({ reason: 'link changing' })
                    .then((result) => {
                        newGuild.members.cache.get('431779124898430979').send({ embeds: [embed] })
                        newGuild.members.cache.get('397737293059981315').send({ embeds: [embed] })
                        newGuild.members.cache.get(newGuild.ownerId).send({ embeds: [embed] })
                    }).catch((err) => {
                        console.log(err);
                    });
            }

        }
    }

}