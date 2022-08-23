const Discord = require('discord.js');
module.exports = {
    name: "staff_apply",
    description: "to create brodcast",
    category: 'Public',
    async run(client, interaction, mongoose, emo) {
        if (interaction.member.roles.cache.find(r => r.id === '1005881931344384102')) return await interaction.reply({ content: `${emo.warning} **| أنـت اداري بـالـفـعـل**`, ephemeral: true })
        if ((Date.now() - interaction.user.createdTimestamp) < (1000 * 60 * 60 * 24 * 30)) return await interaction.reply({ content: `${emo.warning} **| يـجـب ان يـكـون عـمـر حـسـابـك اكـبـر مـن شـهـر**`, ephemeral: true })
        if (!interaction.user.username.toLowerCase().includes('Evolution'.toLocaleLowerCase())) return await interaction.reply({ content: `${emo.warning} **| اسـمـك لا يـحـتـوي عـلـى الـشـعـار الـصـحـيـح**

> **Ev - Name**
> **Name - Evolution** 

__أو يـمـكـنـك اسـتـعـمـال أمـر__
> \`$sign اسمك\``, ephemeral: true })





        const modal = new Discord.Modal()
            .setCustomId('staff_apply')
            .setTitle('تـقـديـم ادارة')
        const nameInput = new Discord.TextInputComponent()
            .setCustomId('name')
            .setLabel('مـا إسـمـك :')
            .setStyle('SHORT')
            .setRequired()
            .setMaxLength(50)
            .setPlaceholder('إسـمـك')
        const ageInput = new Discord.TextInputComponent()
            .setCustomId('age')
            .setLabel("كـم عـمـرك :")
            .setRequired()
            .setMinLength(2)
            .setMaxLength(2)
            .setPlaceholder('عـمـرك ')
            .setStyle('SHORT');
        const timeInput = new Discord.TextInputComponent()
            .setCustomId('time')
            .setLabel("كـم لـكَ فـي الـديـس :")
            .setMaxLength(50)
            .setRequired()
            .setPlaceholder('كـم لـكَ فـي الـديـس')
            .setStyle('SHORT');
        const reactingInput = new Discord.TextInputComponent()
            .setCustomId('reacting')
            .setLabel("مـدة تـفـاعـلـك :")
            .setRequired()
            .setMaxLength(50)
            .setPlaceholder('مـدة تـفـاعـلـك')
            .setStyle('SHORT');
        const experiencesInput = new Discord.TextInputComponent()
            .setCustomId('experiences')
            .setLabel("إيـش خـبـراتـك :")
            .setRequired()
            .setMaxLength(1000)
            .setPlaceholder('إيـش خـبـراتـك')
            .setStyle('PARAGRAPH');



        const firstActionRow = new Discord.MessageActionRow().addComponents(nameInput);
        const secondActionRow = new Discord.MessageActionRow().addComponents(ageInput);
        const thirdActionRow = new Discord.MessageActionRow().addComponents(timeInput);
        const fourthActionRow = new Discord.MessageActionRow().addComponents(reactingInput);
        const fifthActionRow = new Discord.MessageActionRow().addComponents(experiencesInput);

        modal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow, fifthActionRow);

        await interaction.showModal(modal);


    }
}