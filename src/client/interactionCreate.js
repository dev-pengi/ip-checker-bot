module.exports = async (client, mongoose, emo, interaction) => {
    if (interaction.isCommand()) {

        await interaction.deferReply().catch(() => {})

        const cmd = client.scommands.get(interaction.commandName);

        if (!cmd) return interaction.followUp(`There is no \`${interaction.commandName}\` command`);

        let args = []

        for (let option of interaction.options.data) {

            if (option.type === "SUB_COMMAND") {

                if (option.name) args.push(option.name.toLowerCase());

                option.options?.forEach((x) => {

                    if (x.value) args.push(x.value);

                });

            } else if (option.value) args.push(option.value);
        }

        if(cmd.permissions) {
            if(cmd.permissions.user && !interaction.guild.me.permissions.has(cmd.permissions.user)) return
            if(cmd.permissions.bot && !interaction.guild.me.permissions.has(cmd.permissions.bot)) return interaction.followUp(`**احتتاج الى صلاحية \`${cmd.permissions.bot}\` لتنفيذ هذا الأمر`)
        }

        cmd.run(client, interaction, args,mongoose)

    }
    else if (interaction.isButton() || interaction.isSelectMenu()) {
        const cmd = client.buttons.get(interaction.customId);
        if (!cmd) return;
        cmd.run(client, interaction,mongoose,emo)
    }
    else if (interaction.isModalSubmit()) {
        const cmd = client.modals.get(interaction.customId);
        if (!cmd) return
        cmd.run(client, interaction,mongoose,emo)
    }

}