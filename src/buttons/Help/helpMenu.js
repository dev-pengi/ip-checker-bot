const Discord = require('discord.js');
module.exports = {
    name: "helpMenu",
    description: "",
    category: 'Public',
    async run(client, interaction, mongoose, emo) {
        interaction.deferUpdate().catch()
        const helpMenus = {
            System:
`> **\`${emo.prefix}ban\` - ban members**
> **\`${emo.prefix}unban\` - unban members**
> **\`${emo.prefix}kick\` - kick members**
> **\`${emo.prefix}role\` - give or take roles**
> **\`${emo.prefix}embed\` - send an embed**
> **\`${emo.prefix}lock\` - lock a channel**
> **\`${emo.prefix}unlock\` - unlock a channel**
> **\`${emo.prefix}hide\` - hide a channel**
> **\`${emo.prefix}show\` - show a channel**
> **\`${emo.prefix}emo\` - add emojis to the server**
> **\`${emo.prefix}line\` - send a line message**
> **\`${emo.prefix}join\` - join the competition**
> **\`${emo.prefix}connect\` - connect the bot to voice channel**`,

            Ticket:
`> **\`${emo.prefix}new\` - create new panel**
> **\`${emo.prefix}close\` - close the ticket**
> **\`${emo.prefix}delete\` - close the ticket**
> **\`${emo.prefix}add\` - add members to ticket**
> **\`${emo.prefix}remove\` - remove members from ticket**
> **\`${emo.prefix}rename\` - rename the ticket**`,

Invite:
`> **\`${emo.prefix}invites\` - Get user invites info**
> **\`${emo.prefix}resetInvites\` - delete all user invites**
> **\`${emo.prefix}verify\` - Verify the levels of all members invited by the member**`,

Staff:
`> **\`${emo.prefix}apply\` - send staff apply message**`,

            Giveaways:
`> **\`${emo.prefix}start\` - start a Giveaway**`,

            Security:
`> **\`${emo.prefix}whitelist\` - to add or remove members from whitelist**`,
        }


        let embed = new Discord.MessageEmbed()
            .setTitle(`${interaction.values[0]} Command List`)
            .setDescription(helpMenus[interaction.values[0]])

        interaction.message.edit({ embeds: [embed] })
    }
}