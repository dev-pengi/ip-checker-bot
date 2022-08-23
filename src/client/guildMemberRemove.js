const Discord = require('discord.js')
const invUser = require('../../models/invUser')
const guildsDb = require('../../models/guilds')
module.exports = async (client, mongoose, emo, member) => {
    const guild = member.guild

    let user = await invUser.findOne({ userID: member.user.id, guildID: guild.id })
    if (!user) {
        await invUser.create({
            userID: member.id,
            guildID: guild.id,
            lastLeave: Date.now()
        }).catch(err => console.log(err))
    }
    else {
        user.lastLeave = Date.now()
        await user.save()
    }

}