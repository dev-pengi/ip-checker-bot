const Discord = require('discord.js');
module.exports = {
    name: `sign`,
    description: ``,
    async run(message, mongoose, args, client, emo) {
        if (!args[0]) return message.reply(`**${emo.warning} | يـجـب عـلـيـك كـتـابـة إسـمـك**`);
        if (args.join(' ').length >= 16) return message.reply(`**${emo.warning} | الاسم طويل جدا**`);
        message.reply(`> **${args.join(' ')} -  Evolution**`)
    }
}    