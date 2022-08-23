const Discord = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
module.exports = {
    name: `connect`,
    permissions: {
        user: `ADMINISTRATOR`,
        bot: `ADMINISTRATOR`
    },
    aliases: ['تعال'],
    description: `To join the bot in a voice channel`,
    category: 'Moderation',
    async run(message, mongoose, args, client,emo) {

        if (!args[0]) return message.reply(`**${emo.warning} | اكـتـب أيـدي الـروم !**`)
        const Vchannel = message.mentions.channels.first() || message.guild.channels.cache.get(`${args[0]}`)
        if (!Vchannel) return message.reply(`**${emo.warning} | ٱيـدي الـروم خـطـأ 😑.**`)
        if (Vchannel.type != `GUILD_VOICE`) return message.reply(`**${emo.warning} | يـبـنـي أيـدي روم صـوتـي بـسـبـك هـاااا 😒.**`)
        let msg = await message.reply(`**${emo.time} | انـتـظـر بـخـش 🙂.**`)
        joinVoiceChannel({
            channelId: Vchannel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator
        })
          msg.edit(`**${emo.true} | تـم دخـلـت دزهـا الـحـيـن وخـلـنـي فـ حـالـي 😒.**`)

    }
}