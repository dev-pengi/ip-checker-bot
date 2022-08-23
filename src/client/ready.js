const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
module.exports = async (client) => {
    console.log(
        `\nconnected to: ${client.user.tag}`,
    )
    // await client.guilds.cache
    //     .get("889560451959099392")
    //     .commands.set(client.slash).then(result => { console.log("done setting up all slash commands"); }).catch(err => { console.log(err); })
}