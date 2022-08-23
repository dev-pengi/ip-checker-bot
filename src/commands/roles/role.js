const Discord = require('discord.js');
module.exports = {
    name: `role`,
    aliases: ['رول', `role`],
    permissions: {
        user: `MANAGE_ROLES`,
        bot: `MANAGE_ROLES`
    },
    description: `To give/take roles from server members`,
    async run(message, mongoose, args, client, emo) {
        const rls = []



        if (!args[0]) return message.reply(`**${emo.warning} | مـنـشـن أحـد الأعـضـاء**`)
        const member = message.mentions.members.first() || message.guild.members.cache.get(`${args[0]}`)
        if (!member) return message.reply(`**${emo.warning} | هـذا الـعـضـو غـيـر مـوجـود !**`)
        if (!args[1]) return message.reply(`**${emo.warning} | اكـتـب إخـتـصـار الـرول او الايـدي !**`)
        const roleA = args[1]
            if (roleA.split('')[0] == '+' || roleA.split('')[0] == '-') {
                let pref = roleA.split('')[0]
                let rolename = roleA.split('').slice(1).join('')
                const role = message.guild.roles.cache.find(ro => ro.id === rolename) || message.guild.roles.cache.find(ro => ro.name.toLowerCase().includes(rolename.toLowerCase()))
                if (!role) return message.reply(`**${emo.warning} | إخـتـصـار او ايـدي الـرول خـطـأ !**`)
                if (message.member.roles.highest.comparePositionTo(role) < 0 && message.author.id != message.guild.owner.id) return message.reply(`**${emo.warning} - this role is higher than you**`)
                if (pref == '-') {
                    member.roles.remove(role).catch((err) => {
                        return console.log(err);;
                    });
                    return message.reply(`**${emo.true} | تـم سـحـب الـرولـ\`${role.name}\` مـن <@${member.id}>**`)
                }
                else if (pref == '+') {
                    member.roles.add(role).catch((err) => {
                        return console.log(err);;
                    });
                    return message.reply(`**${emo.true} | تـم إعـطـاء الـرولـ\`${role.name}\` لـ <@${member.id}>**`)
                }
            }
            else {
                const role = message.guild.roles.cache.find(ro => ro.id === roleA) || message.guild.roles.cache.find(ro => ro.name.toLowerCase().includes(roleA.toLowerCase()))
                if (!role) return message.reply(`**${emo.warning} | إخـتـصـار او ايـدي الـرول خـطـأ !**`)
                if (message.member.roles.highest.comparePositionTo(role) < 0 && message.author.id != message.guild.owner.id) return message.reply(`**${emo.warning} - this role is higher than you**`)
                if (member.roles.cache.find(r => r.id === role.id)) {
                    member.roles.remove(role).catch((err) => {
                        return;
                    });
                    return message.reply(`**${emo.true} | تـم سـحـب الـرولـ\`${role.name}\` مـن <@${member.id}>**`)
                }
                else {
                    member.roles.add(role).catch((err) => {
                        return;
                    });
                    return message.reply(`**${emo.true} | تـم إعـطـاء الـرولـ\`${role.name}\` لـ <@${member.id}>**`)
                }
            }


    }
}    