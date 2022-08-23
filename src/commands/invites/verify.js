const Discord = require('discord.js');
const moment = require('moment')
const invUserDb = require('../../../models/invUser')
const guildsDb = require('../../../models/guilds')
module.exports = {
    name: "verify",
    permissions: {
        user: "MANAGE_GUILD",
        bot: "ADMINISTRATOR",
    },
    roles: ['1005881931344384102'],
    description: "",
    async run(message, mongoose, args, client, emo) {
        const guild = message.guild

        if (!args[0]) return message.reply(`**${emo.warning} | مـنـشـن أحـد الأعـضـاء**`)
        const member = message.mentions.members.first() || guild.members.cache.get(args[0])
        if (!member) return message.reply(`**${emo.warning} | هـذا الـعـضـو غـيـر مـوجـود !**`)




        let invRequiredAccountAge = (1000 * 60 * 60 * 24 * 7);
        let invRequiredLastLeave = (1000 * 60 * 60 * 24 * 3);
        let invInfo = {};
        let guilds = await guildsDb.findOne({ guildID: guild.id })

        if (!guilds) {
            await guildsDb.create({
                guildID: guild.id,
            }).catch(err => console.log(err))
        }
        else {
            invRequiredAccountAge = guilds.invRequiredAccountAge || (1000 * 60 * 60 * 24 * 7);
            invRequiredLastLeave = guilds.invRequiredLastLeave || (1000 * 60 * 60 * 24 * 3);
        }



        let invUser = await invUserDb.findOne({ userID: member.id, guildID: guild.id })
        invInfo.fakesArr = []
        for (let i = 0; i < invUser.invites.length; i++) {
            let joinedUser = await invUserDb.findOne({ userID: invUser.invites[i].member, guildID: guild.id })
            if (!joinedUser) continue;
            if ((Date.now() - joinedUser.lastLeave) <= invRequiredLastLeave) invInfo.fakesArr.push(invUser.invites[i].member);
        }
        if (!invUser) return message.reply(`**${emo.false} | هـذا الـعـضـو لايـمـلـك أي دعـوة**`)

        if (!invUser.invites.length) return message.reply(`**${emo.false} | هـذا الـعـضـو لايـمـلـك أي دعـوة**`)




        for (let i = 0; i < invUser.invites.length; i++) {
            let left = '';
            const InvitedUser = guild.members.cache.get(invUser.invites[i].member)
            if (!InvitedUser) left = '\n**❌ هذا العضو طلع من السيرفر ❌**'
            profilePic = `https://api.probot.io/profile/${invUser.invites[i].member}`
            content = `**منشن : ** <@!${invUser.invites[i].member}>\n**الأيـدي : ** ${invUser.invites[i].member}${left}\n\n${profilePic}`
            message.channel.send({ content })
        }



    }
}