const Discord = require('discord.js');
module.exports = {
    name: "make_bd",
    description: "to create brodcast",
    category: 'Public',
    async run(client, interaction, mongoose, vars) {
        // interaction.deferUpdate().catch()
        if (!interaction.member.permissions.has('ADMINISTRATOR')) return



        const modal = new Discord.Modal()
            .setCustomId('brodcast_Maker')
            .setTitle('صانع البرودكاست');


        const tokenInput = new Discord.TextInputComponent()
            .setCustomId('token')
            .setLabel('حـط تـوكـن الـبـوت :')
            .setStyle('PARAGRAPH')
            .setRequired()
            .setMaxLength(100)
            .setPlaceholder('تـوكـن الـبـوت')
        const prefixInput = new Discord.TextInputComponent()
            .setCustomId('prefix')
            .setLabel("بـرفـكـس الـبـوت :")
            .setRequired()
            .setMaxLength(3)
            .setPlaceholder('بـرفـكـس ')
            .setStyle('SHORT');
        const nameInput = new Discord.TextInputComponent()
            .setCustomId('name')
            .setLabel("اسـم الـبـوت :")
            .setMinLength(9)
            .setMaxLength(25)
            .setPlaceholder('الاسـم')
            .setStyle('SHORT');



        const firstActionRow = new Discord.MessageActionRow().addComponents(tokenInput);
        const secondActionRow = new Discord.MessageActionRow().addComponents(prefixInput);
        const thirdActionRow = new Discord.MessageActionRow().addComponents(nameInput);

        modal.addComponents(firstActionRow, secondActionRow, thirdActionRow);

        await interaction.showModal(modal);


    }
}