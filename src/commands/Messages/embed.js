const Discord = require('discord.js');
module.exports = {
  name: "embed",
  permissions: {
    user: "MANAGE_CHANNELS",
  },
  description: "",
  async run(message, mongoose, args, client,emo) {
      let title = null
      let color = null
      let image = null


      if (args[0]) title = args[0]
      if (args[1]) color = args[1]
      if (args[2]) image = message.content.split(' ').slice(3).join(' ')
      
      message.delete()
          .catch(console.error)
      
      message
          .channel.send(`**${emo.time} | الآن مـعـك 5 دقـائـق لـ كـتـابـه الـمـحـتـوى .**`)
          .then(msg => {
                const filter = m => m.author.id == message.author.id;
                const collector = message.channel.createMessageCollector({ filter, time: 300000 });
                collector.on('collect', collected => {
                    collector.stop()
                    let embed = new Discord.MessageEmbed()
                    .setDescription(collected.content)
                    
                    if (title != null && title != '00') embed.setTitle(title)
                    if (color != null && color != '00') embed.setColor(color)
                    if (image != null && image != '00') embed.setImage(image)
                    message.channel.send({embeds: [embed]}) 
                    collected.delete()              
                })
                collector.on('end', collected => {
                    msg.delete().catch()
                });
      })
          .catch(console.error)
      
      
      

  }
}