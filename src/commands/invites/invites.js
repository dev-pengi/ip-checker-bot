const Discord = require('discord.js');
const moment = require('moment')
const invUserDb = require('../../../models/invUser')
const guildsDb = require('../../../models/guilds')
module.exports = {
    name: "invites",
    permissions: {
        bot: "ADMINISTRATOR",
    },
    description: "",
    async run(message, mongoose, args, client, emo) {
        const guild = message.guild
        const member = message.mentions.members.first() || guild.members.cache.get(args[0]) || guild.members.cache.get(message.author.id)





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
        if (!invUser) {
            invInfo.all = 0;
            invInfo.leaves = 0;
            invInfo.fakes = 0;
            invInfo.valid = 0;
        }
        else {
            
                invInfo.all = invUser.invites.length;
                invInfo.leaves = () => {
                    let leaves = [];
                    for (let i = 0; i < invUser.invites.length; i++) {
                        if (!guild.members.cache.get(invUser.invites[i].member)) leaves.push(invUser.invites[i].member)
                    }
                    return leaves
                };
                invInfo.fakes = () => {
                    let fakes = [];
                    for (let i = 0; i < invUser.invites.length; i++) {
                        if (invUser.invites[i].fake) fakes.push(invUser.invites[i].member)
                        if (invInfo.fakesArr.includes(invUser.invites[i].member) && !fakes.includes(invUser.invites[i].member)) fakes.push(invUser.invites[i].member)
                    }
                    return fakes
                };
                invInfo.valid = () => { 
                    let valid = 0
                    for (let i = 0; i < invUser.invites.length; i++) {
                        if (invInfo.fakes().includes(invUser.invites[i].member) || invInfo.leaves().includes(invUser.invites[i].member)) continue
                        valid++
                    }
                    return valid
                }
        }













        let invEmbed = new Discord.MessageEmbed()
            .setAuthor({ name: member.user.username, iconURL: member.user.displayAvatarURL() })
            .setDescription(`Invites information of ${member}

${emo.member} **${invInfo.all}** Joins in total
${emo.false} **${invInfo.leaves().length}** Leaves
${emo.dislike} **${invInfo.fakes().length}** Fake

This user has **${invInfo.valid()}** valid invite.

${emo.notice} You can verify the level of all invited members by the user by typing \`$verify @user\`
`)
            .setThumbnail(member.user.displayAvatarURL())
            .setFooter({ text: `Asked by : ${member.user.tag}`, iconURL: client.user.displayAvatarURL() })
            .setTimestamp()

        message.reply({ embeds: [invEmbed], allowedMentions: { repliedUser: false } })

    }
}