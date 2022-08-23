const Discord = require('discord.js');
const moment = require('moment')
const invUserDb = require('../../../models/invUser')
const guildsDb = require('../../../models/guilds')
module.exports = {
    name: "resetinvites",
    permissions: {
        user: "MANAGE_GUILD",
        bot: "ADMINISTRATOR",
    },
    roles: ['1005881931344384102'],
    description: "",
    async run(message, mongoose, args, client, emo) {
        if (args[1]) return

        const guild = message.guild
        if (!args[0]) return message.reply(`**${emo.warning} | مـنـشـن أحـد الأعـضـاء**`)
        const member = message.mentions.members.first() || guild.members.cache.get(args[0])
        if (args[0].toLowerCase() == 'all'.toLowerCase()) {

            let invUsers = await invUserDb.find({ guildID: guild.id })
            let invCount = 0;
            for (let i = 0; i < invUsers.length; i++) {
                invCount += invUsers[i].invites.length
                invUsers[i].invites = []
                invUsers[i].save()
            }
            message.reply(`**${emo.true} | تـم حـذف ${invCount} دعـوة مـن الـسـيرفـر**`)
            return 
        }

        if (!member) return message.reply(`**${emo.warning} | هـذا الـعـضـو غـيـر مـوجـود !**`)
        let invUser = await invUserDb.findOne({ userID: member.id, guildID: guild.id })
        if (!invUser) {
            return message.reply(`**${emo.false} | هـذا الـعـضـو لايـمـلـك أي دعـوة**`)
        }
        else {
            let invCount = invUser.invites.length;
            invUser.invites = []
            await invUser.save()
            message.reply(`**${emo.true} | تـم حـذف ${invCount} دعـوة مـن هـذا الـعـضـو**`)
        }


    }
}