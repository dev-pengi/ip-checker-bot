const Discord = require('discord.js');
module.exports = {
    name: "start",
    description: "",
    permissions: {
        user: `MANAGE_CHANNELS`,
    },
    aliases: ['$s'],
    async run(message, mongoose, args, client, vars) {

        if (!args[0]) {
            return message.reply(`**${vars.warning} |  please specify the time .**`)
        }
        if (!args[1]) {
            return message.reply(`**${vars.warning} |  | Please specify the number of winners .**`)
        }
        if (!args[2]) {
            return message.reply(`**${vars.warning} | Please specify the prize .**`)
        }

        time = args[0]
        winnersCount = args[1]
        prize = message.content.split(' ').slice(3).join(' ')
        timeExtention = time.split('')[time.length - 1]
        timeN = time.slice(0, -1);

        if (timeExtention != `s` && timeExtention != `m` && timeExtention != `h` && timeExtention != `d`) return message.reply(`**${vars.warning} | Please specify a valid time .**`)
        if (isNaN(timeN) || timeN <= 0) return message.reply(`**${vars.warning} | Please specify a valid time .**`)
        if (isNaN(winnersCount) || winnersCount <= 0) return message.reply(`**${vars.warning} | Please specify a valid number of winners**`)


        if (timeExtention == `s`) timeN *= 1000;
        else if (timeExtention == `m`) timeN *= (1000 * 60);
        else if (timeExtention == `h`) timeN *= (1000 * 60 * 60);
        else if (timeExtention == `d`) timeN *= (1000 * 60 * 60 * 24);
        else if (timeExtention == `w`) timeN *= (1000 * 60 * 60 * 24 * 7);
        if (timeN >= 1209400000) timeN = 1200000000
        message.delete().catch(err => console.log(err))






        const embed = new Discord.MessageEmbed()
            .setColor(`${vars.embedcolor}`)
            .setDescription(`**React with ${vars.tada} to enter the giveaway**`)
            .addField(`${vars.time} Time`, `<t:${parseInt(((Date.now() + timeN) / 1000), 10)}:R>`)
            .addField(`${vars.gift} Prize`, `${prize}`)
            .setFooter({ text: `${winnersCount} Winners` })
            .setTimestamp((Date.now() + timeN))
        if (message.author.avatarURL({ dynamic: true })) {
            embed.setAuthor({ name: `${message.author.username}`, iconURL: `${message.author.avatarURL({ dynamic: true })}` })
        }

        message.channel.send({ embeds: [embed] })
            .then(async msg => {
                msg.react(`${vars.tada}`)
                setTimeout(async () => {
                    if (msg.embeds[0].description) {
                        if (msg.embeds[0].description.includes(`The giveaway ended and I can't select a winner`)) return;
                    }
                    if (msg.embeds[0].fields[0]) {
                        if (msg.embeds[0].fields[0].name.includes('Winners')) return;
                    }

                    if (!msg) return
                    const { users } = await msg.reactions.cache.first().fetch();
                    const reaUsers = await users.fetch();
                    const possiblewinners = [];
                    reaUsers.forEach(user => {
                        possiblewinners.push(user);
                    })
                    if (possiblewinners.length - 1 >= winnersCount) {
                        const winners = [];
                        let i = 0;
                        while (i < winnersCount) {
                            let winner = possiblewinners[getRnd(0, possiblewinners.length)];
                            if (winner.id == client.user.id) continue;
                            if (winners.includes(`<@${winner.id}>`)) continue;
                            winners.push(`<@${winner.id}>`)
                            i++

                        }
                        msg.channel.send(`**${winners.join(' , ')} Congrats You Won \`${prize}\` ${vars.gift} .**`).catch(err => console.error())
                        const embedEdited = new Discord.MessageEmbed()
                            .setColor(`${vars.embedcolor}`)
                            .addField(`${vars.tada} Winners`, `${winners.join(', ')}`)
                            .addField(`${vars.gift} Prize`, `${prize}`)
                            .setFooter({ text: `${winnersCount} Winners` })
                            .setTimestamp()
                        if (message.author.avatarURL({ dynamic: true })) {
                            embedEdited.setAuthor({ name: `${message.author.username}`, iconURL: `${message.author.avatarURL({ dynamic: true })}` })
                        }
                        msg.edit({ embeds: [embedEdited] })
                    }
                    else if (msg && !msg.reactions || possiblewinners.length - 1 < winnersCount) {
                        const embedEdited = new Discord.MessageEmbed()
                            .setColor(`${vars.embedcolor}`)
                            .setDescription(`**${vars.false} The giveaway ended and I can't select a winner**`)
                            .setFooter({ text: `${winnersCount} Winners` })
                            .setTimestamp()
                        if (message.author.avatarURL({ dynamic: true })) {
                            embedEdited.setAuthor({ name: `${message.author.username}`, iconURL: `${message.author.avatarURL({ dynamic: true })}` })
                        }
                        msg.edit({ embeds: [embedEdited] })
                        return msg.reply(`**${vars.false} |  The giveaway ended and I can't select a winner**`);
                    }


                }, timeN);
            })
            .catch()
        function getRnd(min, max) {
            return Math.floor(Math.random() * (max - min)) + min
        }

    }
}