const Discord = require('discord.js');
const panels = require("../../../models/panels")
const tickets = require("../../../models/tickets")
module.exports = {
    name: "open_ticket",
    description: "to open ticket",
    category: 'Public',
    async run(client, interaction, mongoose, emo) {





        tickets.find({ ticketOwner: `${interaction.user.id}` }, async (err, tic) => {
            if (err) console.log(err);
            for (let i = 0; i < tic.length; i++) {
                if (tic[i].ticketID && tic[i].Opened) {
                    if (interaction.guild.channels.cache.get(`${tic[i].ticketID}`)) {
                        await interaction.reply({ content: `**${emo.warning} - لايمكنك امتلاك اكثر من تذكرة في نفس الوقت**`, ephemeral: true, });
                        return
                    }
                }
            }

            panels.findOne({ panelID: interaction.message.id }, async (err, panel) => {
                if (err) console.log(err);
                if (!panel) {
                    await interaction.reply({ content: `**${emo.false} - هذه التكت لاتملك قاعدة بيانات يرجى التواصل مع المبرمج لحل المشكلة**`, ephemeral: true, });
                }
                else {
                    await interaction.reply({ content: `**${emo.time} | جـارِ فـتـح الـتـكـت !**`, ephemeral: true, });
                    if (!panel.count) {
                        panel.count = 0
                    }
                    panel.count = panel.count + 1
                    panel
                        .save()
                        .catch()
                    setTimeout(async () => {
                        let count = ""

                        if (panel.count < 10) {
                            count = `000${panel.count}`
                        }
                        else if (panel.count < 100) {
                            count = `00${panel.count}`
                        }
                        else if (panel.count < 1000) {
                            count = `0${panel.count}`
                        }
                        else {
                            count = `${panel.count}`
                        }

                        let ticketChannel = await interaction.guild.channels.create(`ticket - ${count}`, {
                            type: 'GUILD_TEXT',
                        });

                        const guild = interaction.guild;
                        const categoryChannel1 = guild.channels.cache.filter(channel => channel.type === "GUILD_CATEGORY").get('1008805382430392421')
                        const categoryChannel2 = guild.channels.cache.filter(channel => channel.type === "GUILD_CATEGORY").get('1008805403221557308')
                        const categoryChannel3 = guild.channels.cache.filter(channel => channel.type === "GUILD_CATEGORY").get('1008805421361922060')
                        const categoryChannel4 = guild.channels.cache.filter(channel => channel.type === "GUILD_CATEGORY").get('1008805441226166332')
                        const categoryChannel5 = guild.channels.cache.filter(channel => channel.type === "GUILD_CATEGORY").get('1008805464387096598')
                        if (categoryChannel1.children.size < 50)
                        {
                            ticketChannel.setParent(categoryChannel1.id).catch()
                        }
                        else if (categoryChannel1.children.size >= 50 && categoryChannel2.children.size < 50)
                        {
                            ticketChannel.setParent(categoryChannel2.id).catch()
                        }
                        else if (categoryChannel2.children.size >= 50)
                        {
                            ticketChannel.setParent(categoryChannel3.id).catch()
                        }
                        else if (categoryChannel3.children.size >= 50)
                        {
                            ticketChannel.setParent(categoryChannel4.id).catch()
                        }
                        else if (categoryChannel4.children.size >= 50)
                        {
                            ticketChannel.setParent(categoryChannel5.id).catch()
                        }
                        ticketChannel.permissionOverwrites.edit(interaction.guild.id, { VIEW_CHANNEL: false, SEND_MESSAGES: false })
                        ticketChannel.permissionOverwrites.edit(interaction.user.id, { VIEW_CHANNEL: true, SEND_MESSAGES: true, ATTACH_FILES: true })
                        ticketChannel.permissionOverwrites.edit(emo.supportRole, { VIEW_CHANNEL: true, SEND_MESSAGES: true, ATTACH_FILES: true })

                        await interaction.editReply({ content: `**${emo.true} | تـم فـتـح الـتـكـت (<#${ticketChannel.id}>) .**`, ephemeral: true, });
                        let msgContent = panel.ticketsContentMsg
                            .replace(/{user}/g, `<@${interaction.user.id}>`)
                            .replace(/{userID}/g, `${interaction.user.id}`)
                            .replace(/{userName}/g, `${interaction.user.username}`)
                            .replace(/{support}/g, `<@&${emo.supportRole}>`)
                            .replace(/{channel}/g, `<#${ticketChannel.id}>`)
                            .replace(/{channelName}/g, `${ticketChannel.name}`)
                            .replace(/{ticketCount}/g, `${panel.count}`)

                        let EmbedContent = panel.ticketsEmbedMsg
                            .replace(/{user}/g, `<@${interaction.user.id}>`)
                            .replace(/{userID}/g, `${interaction.user.id}`)
                            .replace(/{userName}/g, `${interaction.user.username}`)
                            .replace(/{support}/g, `<@&${emo.supportRole}>`)
                            .replace(/{channel}/g, `<#${ticketChannel.id}>`)
                            .replace(/{channelName}/g, `${ticketChannel.name}`)
                            .replace(/{ticketCount}/g, `${panel.count}`)


                        let OpenedEmbed = new Discord.MessageEmbed()
                            .setColor(`${emo.embedcolor}`)
                            .setDescription(`${EmbedContent}`)
                            .setFooter({ text: `بطريق وقت الضيق - Evolution ticket system`, iconURL: `${interaction.guild.members.cache.get('705871805906288655').user.avatarURL({ dynamic: true })}` })


                        const row = new Discord.MessageActionRow()
                            .addComponents(
                                new Discord.MessageButton()
                                    .setCustomId(`close_ticket`)
                                    .setLabel('قفل التذكرة')
                                    .setEmoji(`${emo.locked}`)
                                    .setStyle('SECONDARY'),
                                new Discord.MessageButton()
                                    .setCustomId(`claim_ticket`)
                                    .setLabel('استلام التذكرة')
                                    .setEmoji(`${emo.claim}`)
                                    .setStyle('SECONDARY')
                            )

                        ticketChannel.send({ content: `${msgContent}`, embeds: [OpenedEmbed], components: [row] })
                        tickets.findOne({ ticketID: ticketChannel.id }, async (err, ticket) => {
                            if (err) console.log(err);
                            if (!ticket) {
                                const newticket = new tickets({
                                    ticketID: ticketChannel.id,
                                    ticketOwner: `${interaction.user.id}`,
                                    ticketMembers: [`${interaction.user.id}`, `${emo.supportRole}`],
                                })
                                    .save()
                                    .catch(err => {
                                    })
                            }
                            else {
                                ticket = {
                                    ticketID: ticketChannel.id,
                                    ticketOwner: `${interaction.user.id}`,
                                    ticketMembers: [`${interaction.user.id}`, `${emo.supportRole}`],
                                }
                                ticket
                                    .save()
                                    .catch(err => {
                                    })
                            }
                        })

                    }, 1000);

                }
            })


        })












    }
}