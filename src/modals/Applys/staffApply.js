const Discord = require('discord.js');
const ApplyChannel = '1010719039842164818'
const ResultChannel = '1010739805975478292'
module.exports = {
    name: "staff_apply",
    description: "",
    category: 'Public',
    async run(client, interaction, mongoose, emo) {
        const name = interaction.fields.getTextInputValue('name')
        const age = interaction.fields.getTextInputValue('age')
        const time = interaction.fields.getTextInputValue('time')
        const reacting = interaction.fields.getTextInputValue('reacting')
        const experiences = interaction.fields.getTextInputValue('experiences')

        let embed = new Discord.MessageEmbed()
            .addField('الاسـم', `> ${name}`)
            .addField('العمر', `> ${age}`)
            .addField('كـم لـك فـي الدـيـس', `> ${time}`)
            .addField('مـدة الـتـفـاعـل', `> ${reacting}`)
            .addField('الـخبـرات', `> ${experiences}`)
            .setTimestamp()

        if (interaction.user.avatarURL()) embed.setAuthor({ name: interaction.user.username, iconURL: interaction.user.avatarURL({ dynamic: true }) })
        else embed.setAuthor({ name: interaction.user.username })

        let row = new Discord.MessageActionRow()
        let acceptBtn = new Discord.MessageButton()
            .setCustomId('accept')
            .setStyle('SUCCESS')
            .setLabel('قبول')
        let refuseBtn = new Discord.MessageButton()
            .setCustomId('refuse')
            .setStyle('DANGER')
            .setLabel('رفض')
        row.addComponents(acceptBtn, refuseBtn)

        const applyChannel = interaction.guild.channels.cache.get(ApplyChannel)
        const resultChannel = interaction.guild.channels.cache.get(ResultChannel)
        if (!applyChannel) return await interaction.reply({ content: `${emo.true} **| حـدث خـطـأ أثـنـاء الـتـقـديـم يـرجـى الـتـواصـل مـع الـمبـرمـج**`, ephemeral: true })
        await interaction.reply({ content: `${emo.true} **| تـم ارسـال الـقـديـم الـى الـمـسـؤولـيـن يـرجـى انـتـظـار الـرد**`, ephemeral: true })
        const applyMessage = await applyChannel.send({ content: `الـمـقـدم: ${interaction.user}`, embeds: [embed], components: [row] })
        const LineMessage = await applyChannel.send({ content: emo.line })
        const filter = i => i.message.id == applyMessage.id
        const collector = applyMessage.createMessageComponentCollector({ filter, time: (1000 * 60 * 60 * 24) });

        collector.on('collect', inter => {
            if (inter.customId == 'accept') {
                const role1 = inter.guild.roles.cache.get('1005881931344384102')
                const role2 = inter.guild.roles.cache.get('1005811050756706377')
                interaction.member.roles.add(role1)
                interaction.member.roles.add(role2)
                resultChannel.send(`**${emo.true} | ${interaction.user}\nتـم قـبـولـك فـي ادارة ايـفـلـوشـن.**`)
                resultChannel.send(emo.line)
                interaction.user.send({
                    content: `**${emo.staff} | تـم قـبـولـك فـي ادارة ايـفـلـوشـن **

__يـرجـى مـراجـعـة الـرومـات الـتـالـيـة__
> <#1006145065929932890>
> <#1006145517694222407>
> <#1006145426866589706>
> <#1006145171001442325>`}).catch(err => { return })
                interaction.user.send(emo.line).catch(err => { return })
                inter.reply({ content: `**${emo.true} | تـم الـقـبـول بـنـجـاح**`, ephemeral: true })
                collector.stop()
            }
            if (inter.customId == 'refuse') {
                resultChannel.send(`**${emo.false} | ${interaction.user}\nتـم رفـضـك مـن ادارة ايـفـلـوشـن.**`)
                resultChannel.send(emo.line)
                inter.reply({ content: `**${emo.true} | تـم الـرفـض بـنـجـاح**`, ephemeral: true })
                collector.stop()
            }
        });
        collector.on('end', collected => {
            applyMessage.delete().catch(err => { return })
            LineMessage.delete().catch(err => { return })
        });
    }
}