const Discord = require('discord.js');
const Owners = ['397737293059981315', '705871805906288655', '431779124898430979']
module.exports = {
  name: "brodcast_Maker",
  description: "to create brodcast",
  category: 'Public',
  async run(client, interaction, mongoose) {
    console.log('hi');
    // interaction.deferUpdate().catch()
    if (!Owners.includes(interaction.user.id)) return

    const token = interaction.fields.getTextInputValue('token')
    const name = interaction.fields.getTextInputValue('name')
    const prefix = interaction.fields.getTextInputValue('prefix') || '$'
    const intents = new Discord.Intents(32767);
    const clientBD = new Discord.Client({ intents });
    let embed = new Discord.MessageEmbed()
      .setColor(`#4b4f59`)
      .setDescription(`**جاري صناعة البوت...**`)
    await interaction.reply({ embeds: [embed], ephemeral: true });
    clientBD
      .login(token)
      .then(async (result) => {
        const url = `https://discord.com/oauth2/authorize?client_id=${clientBD.user.id}&scope=bot+applications.commands+applications.commands.permissions.update&guild_id=${interaction.guild.id}&permissions=8`
        const row = new Discord.MessageActionRow()
          .addComponents(
            new Discord.MessageButton()
              .setLabel('انفايت البوت')
              .setURL(url)
              .setStyle('LINK')
          );
        embed.setDescription(`**تم صنع البوت بنجاح\nبرفكس البوت : \`${prefix}\`**`)
        await interaction.editReply({ embeds: [embed], ephemeral: true, components: [row] });
        // await interaction.followUp({ embeds: [embed], ephemeral: true , components: [row] });

      }).catch(async (err) => {
        embed.setDescription(`**<:emoji112:983973525771665408> - حدث خطا اثناء صناعة البوت**`)
        await interaction.editReply({ embeds: [embed], ephemeral: true });
        console.log(err);
        clientBD.destroy()
      });


    clientBD.on("ready", () => {
      clientBD.user.setPresence({
        status: 'idle',
        activities: [{
          name: `Evolution back`,
          type: "STREAMING", url: "https://www.twitch.tv/onlymahmoud"
        }]
      })
      clientBD.user.setUsername(name).catch(err => { })
    });        /////Bc
    clientBD.on("messageCreate", async message => {
      let BdEmbed = new Discord.MessageEmbed()
        .setColor(`#4b4f59`)
      var command = message.content.split(" ")[0];
      if (!message.channel.guild) return;
      var args = message.content
        .split(" ")
        .slice(1)
        .join(" ");
      if (command == prefix + "bc") {
        if (!Owners.includes(interaction.user.id)) return
        if (!args) {
          BdEmbed.setDescription('يجب عليك كتابة االرسالة المراد نشرها')
          return message.reply({ embeds: [BdEmbed] });
        }

        const row2 = new Discord.MessageActionRow()
          .addComponents(
            new Discord.MessageButton()
              .setCustomId(`accept`)
              .setLabel('نشر')
              .setEmoji(`✅`)
              .setStyle('SUCCESS'),
            new Discord.MessageButton()
              .setCustomId(`cancel`)
              .setLabel('الغاء')
              .setEmoji(`❌`)
              .setStyle('DANGER')
          );
        BdEmbed.setDescription(`هل أنت متأكد من نشر هذه الرسالة؟\n\n\`\`\`${args}\`\`\``)
        const msg = await message.reply({ embeds: [BdEmbed], components: [row2] });


        const collector = msg.createMessageComponentCollector({ componentType: 'BUTTON', time: 10000 });

        collector.on('collect', async interaction => {
          if (interaction.user.id != message.author.id) return
          let total = 0
          let success = 0
          let fail = 0
          if (interaction.customId == 'accept') {
            msg.guild.members.cache
              .filter(members => members.user.bot === false && members.presence?.status === 'online' || members.user.bot === false && members.presence?.status === 'dnd' || members.user.bot === false && members.presence?.status === 'idle')
              .forEach(member => {
                total++
                member
                  .send(`${args}\n${member}`)
                  .then(res => { success++ })
                  .catch(err => { fail++ })
              });

            BdEmbed
              .setDescription(`**جاري ارسال رسالتك ل ${total} عضو **`)
            const statitcsMsg = await message.reply({ embeds: [BdEmbed] });
          }
          else if (interaction.customId == 'cancel') {
            msg.delete().catch()
            BdEmbed.setDescription('تم الغاء عملية النشر بنجاح')
            return message.reply({ embeds: [BdEmbed] }).catch()
          }
        });
        collector.on('end', collected => {
          if (msg) msg.delete().catch()
        });
      }
    });
    // clientBD.on("messageCreate", async message => {
    //     var command = message.content.split(" ")[0];
    //     command = command.slice(prefix.length);
    //     if (!message.channel.guild) return;
    //     var args = message.content
    //         .split(" ")
    //         .slice(1)
    //         .join(" ");



    //     if (command == "obc") {
    //         // message.guild.members.cache
    //         //     .filter(members => members.user.bot === false && members.presence?.status === 'online' || members.user.bot === false && members.presence?.status === 'dnd' || members.user.bot === false && members.presence?.status === 'idle')
    //         //     .forEach(member => {
    //         //         member.send(`${args}\n ${member}`)
    //         //     });
    //     }

    // });
  }
}