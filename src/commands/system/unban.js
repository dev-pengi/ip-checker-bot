const Discord = require('discord.js');
module.exports = {
  name: "unban",
  aliases: ['unban',"فك"],
  permissions: {
    user: "BAN_MEMBERS",
    bot: "BAN_MEMBERS"
  },
  description: "To prevent ban people",
  async run(message, mongoose, args, client,emo) {
      
    if (!args[0]) return message.reply(`**${emo.warning} - you must mention/specify the user id**`)
    
    if (args[0] == 'all')
    {
      const banList = await message.guild.bans.fetch();
      const size = banList.size;
      const msg = await message.reply(`**${emo.time} - unbaning ${size} member...**`);
      banList.forEach(member => {
        console.log(member.user.id);
        message.guild.members.unban(member.user.id);
        if (banList.size == 0);
        {
          msg.edit(`**${emo.true} - ${size} members has been unbanned**`)
        }
      });
      return;
    }

    const banList = await message.guild.bans.fetch();
    const member = banList.get(args[0]);
    if (member)
    {
       message.guild.members.unban(member.user.id);
      message.reply(`**${emo.true} - ${member.user.username} has been unbanned**`);
    } 
    else 
    {
      message.reply(`**${emo.false} - This user is not banned**`)
    }


  }
}    