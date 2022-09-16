console.clear();
////////////////////////////////////////////////////////////////////////////////////////
const Discord = require('discord.js')
const fs = require('fs');
const { checkCommandModule, checkProperties } = require('./events/validData');
const intents = new Discord.Intents(32767);
const client = new Discord.Client({ intents });
require('dotenv').config()
const prefix = '+'



process.on("unhandledRejection", (reason, promise) => {
  console.log("Unhandled Rejection at: " + promise)
  console.log("🟥 Reason: " + reason)
})
process.on("uncaughtException", (err, origin) => {
  console.log("Caught exception: " + err)
  console.log("🟥 Origin: " + origin)
})
process.on('uncaughtExceptionMonitor', (err, origin) => {
  console.log(err);
  console.log("🟥 Origin: " + origin)
});
process.on('multipleResolves', (type, promise, reason) => {
  console.log(type, promise);
});





client.on('ready', async () => {
  client.user.setPresence({
    status: 'idle',
  })
  console.log(`\nconnected to client: ${client.user.tag}`,)
})

client.commands = new Discord.Collection()
fs.readdir('./src/commands', (err, folders) => {
  if (!folders) return
  folders.forEach(folder => {
    fs.readdir(`./src/commands/${folder}`, (err, files) => {
      if (err) return
      files.forEach(file => {
        let cmdName = file.split('.')[0],
          cmdModule = require(`./src/commands/${folder}/${file}`)
        if (checkCommandModule(cmdName, cmdModule)) {
          if (checkProperties(cmdName, cmdModule)) {
            client.commands.set(cmdModule.name, cmdModule)
          }
        }
        console.log(`Setting up ${folder} command {${cmdName}}`);
      })
    })
  })
})




client.on('messageCreate', async message => {
  const [cmd] = message.content.split(' ');
  if (message.author.bot) return;
  client.commands.find(command => {
    if (`${prefix}${command.name.toLowerCase()}` == `${cmd.slice(0).toLowerCase()}` && !command.name.startsWith('$P') || command.aliases && command.aliases.includes(cmd.slice(0).toLowerCase()) && !command.name.startsWith('$P')) {
      const args = message.content.slice(cmd.slice(0).length).trim().split(/ +/);
      if (command.specifics) if (!command.specifics.includes(message.author.id)) return
      if (command.roles) {
        for (let i = 0; i < command.roles.length; i++) {

          if (message.guild.members.cache.get(message.author.id).roles.cache.find(r => r.id === command.roles[i])) {
            return command.run(message, mongoose, args, client, vars)
          }
        }
      }
      if (command.permissions) {
        if (!message.member.permissions.has(command.permissions.user)) return
        if (!message.guild.members.cache.get(`${client.user.id}`).permissions.has(command.permissions.bot)) return message.reply(`**${emo.false} | أحـتـاج صـلاحـيـة \`\`\`${command.permissions.bot}\`\`\` لـتـنـفـيـذ هـذا الأمـر**`);
      }
      command.run(message, args, client, prefix)
    }
  });
})


//------------------------------------------File Readder----------------------------------------


//
client.login(process.env.token) //tests 