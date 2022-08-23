const Discord = require('discord.js');
const invUser = require('../../../models/invUser')
const guildsDb = require('../../../models/guilds')
module.exports = {
    name: "",
    description: "",
    async run(invite, mongoose, client, emo) {
        const invType = invite.type
        if (invType != 'normal') return

        const member = invite.member;
        const inviter = invite.inviteCode.inviter;
        const guild = invite.member.guild;
        let invRequiredAccountAge = (1000 * 60 * 60 * 24 * 7);
        let invRequiredLastLeave = (1000 * 60 * 60 * 24 * 3);

        let guilds = await guildsDb.findOne({ guildID: guild.id })

        invInfo = { member: member.user.id, invTime: Date.now(), fake: false }
        joinInfo = { inviter: inviter.id, joinTime: Date.now() }

        if (!guilds) {
            await guildsDb.create({
                guildID: guild.id,
            }).catch(err => console.log(err))
        }
        else {
            invRequiredAccountAge = guilds.invRequiredAccountAge || (1000 * 60 * 60 * 24 * 7);
            invRequiredLastLeave = guilds.invRequiredLastLeave || (1000 * 60 * 60 * 24 * 3);
        }

        if ((Date.now() - member.user.createdTimestamp) <= (invRequiredAccountAge)) invInfo.fake = true;

        let joinedUser = await invUser.findOne({ userID: member.user.id, guildID: guild.id })
        if (!joinedUser) {
            await invUser.create({
                userID: member.id,
                guildID: guild.id,
                joins: [joinInfo]
            }).catch(err => console.log(err))
        }
        else {
            joinedUser.joins.push(joinInfo)
            joinedUser.save()
            if ((Date.now() - joinedUser.lastLeave) <= invRequiredLastLeave) invInfo.fake = true;
        }


        let user = await invUser.findOne({ userID: inviter.id, guildID: guild.id })
        if (!user) {
            await invUser.create({
                userID: inviter.id,
                guildID: guild.id,
                invites: [invInfo]
            }).catch(err => console.log(err))
        }
        else {
            const checkIndex = user.invites.map(obj => obj.member).indexOf(invInfo.member)
            if (checkIndex >= 0) return
            user.invites.push(invInfo)
            await user.save()
        }





    }
}