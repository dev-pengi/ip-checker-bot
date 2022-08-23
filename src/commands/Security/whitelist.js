const Discord = require('discord.js');
const users = require('../../../models/userSecurity')
module.exports = {
    name: `whitelist`,
    specifics: ['705871805906288655', '397737293059981315', '431779124898430979'],
    description: ``,
    category: 'Moderation',
    async run(message, mongoose, args, client, vars) {
        

        if (!args[0]) {

            let embed = new Discord.MessageEmbed()
            .setTitle('قائمة الأعضاء الموجودين في الوايت ليست')
            .setColor(`${vars.embedcolor}`)
            users.find({ whitelisted: true })
            .then((result) => {
                let whiteusers = []
                for (let i = 0; i < result.length; i++) {
                    whiteusers.push(`<@!${result[i].userID}>`)
                }

                if (result.length > 0)
                {
                    embed.setDescription(whiteusers.join('\n'))
                }
                else
                {
                    embed.setDescription('قائمة الوايت ليست فارغة')
                }
                message.reply({embeds: [embed]})
                
            }).catch((err) => {
                message.reply(`**${vars.false} - حدث خطأ اثناء معالجة البيانات يرجى المحاولة مجددا**`)
                console.log(err);
            });

        }
        else {

            const member = message.mentions.members.first() || message.guild.members.cache.get(`${args[0]}`)
            if (!member) return message.reply(`**${vars.warning} - لم استطع ايجاد هذا العضو**`)



            users.findOne({ userID: member.user.id }, async (err, user) => {
                if (err) return console.log(err);
                if (!user) {
                    const newUser = new users({
                        userID: member.user.id,
                        whitelisted: true,
                        lastPunish: 0,
                        bans: 0,
                        kicks: 0,
                        created_channels: 0,
                        deleted_channels: 0,
                        created_roles: 0,
                        deleted_roles: 0,
                    })
                    newUser
                        .save()
                        .then(res => {
                            message.reply(`**${vars.true} - تم تسجيل هذا المستخدم في قائمة الوايت ليست**`)
                        })
                        .catch(err => {
                            message.reply(`**${vars.false} - حدث خطأ اثناء معالجة البيانات يرجى المحاولة مجددا**`)
                        })

                }
                else {

                    if (user.whitelisted) {
                        user.whitelisted = false
                        user.save()
                            .then((result) => {
                                message.reply(`**${vars.true} - تم ازالة هذا المستخدم من قائمة الوايت ليست**`)
                            })
                            .catch((err) => {
                                message.reply(`**${vars.false} - حدث خطأ اثناء معالجة البيانات يرجى المحاولة مجددا**`)
                            });
                    }
                    else {
                        user.whitelisted = true
                        user.save()
                            .then((result) => {
                                message.reply(`**${vars.true} - تم تسجيل هذا المستخدم في قائمة الوايت ليست**`)
                            })
                            .catch((err) => {
                                message.reply(`**${vars.false} - حدث خطأ اثناء معالجة البيانات يرجى المحاولة مجددا**`)
                            });
                    }

                }
            })


        }

    }
}