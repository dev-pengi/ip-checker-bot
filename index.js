console.clear();
////////////////////////////////////////////////////////////////////////////////////////

const Discord = require('discord.js')
const fs = require('fs');
const { checkCommandModule, checkProperties } = require('./events/validData');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
////////////////////////////////////////////////////////////////////////////////////////

var moment = require('moment-timezone');
const date = require('date-and-time')
const mongoose = require('mongoose');
////////////////////////////////////////////////////////////////////////////////////////

const intents = new Discord.Intents(32767);
const client = new Discord.Client({ intents, });
////////////////////////////////////////////////////////////////////////////////////////

const InvitesTracker = require('@androz2091/discord-invites-tracker');
const tracker = InvitesTracker.init(client, {
  fetchGuilds: true,
  fetchVanity: true,
  fetchAuditLogs: true
});
////////////////////////////////////////////////////////////////////////////////////////

const prefix = '$'

let emo = {
  locked: '<:ev015:1008513330824101888>',
  unlocked: '<:ev018:1008513338906513458>',
  hidden: '<:ev050:1008513429503483905>',
  showen: '<:ev052:1008791079065243678>',
  time: '<:ev040:1008513401145790544>',
  warning: '<:ev039:1008513397911994428>',
  true: '<:ev019:1008513341699915826>',
  false: '<:ev022:1008513350633799791>',
  ticket: '<:ev077:1008791181565628446>',
  claim: '<:ev086:1008791229116448828>',
  delete: '<:ev002:1008513298867691640>',
  settings1: '<:ev069:1008791152348102687>',
  gift: '<:ev000:1008513293910024252>',
  tada: '<:ev084:1008791221407318076>',
  brodcast: '<:ev081:1008791202369388545>',
  handUp: '<:ev037:1008513392128053268>',
  staff: '<:ev076:1008791177547481088>',
  games: '<:ev074:1008791170396192798>',
  like: '<:ev082:1008791209516470333>',
  dislike: '<:ev091:1008791248355733534>',
  member:'<:ev001:1008513296489517098>',
  memberPlus:'<:ev009:1008513314655043654>',
  notice:'<:ev035:1008513386616725554>',
  supportRole: '1005881931344384102',
  line: 'https://cdn.discordapp.com/attachments/1008656168605986846/1008656805699784794/37-1.png',
  embedcolor: '#1d1d1d',
  prefix: prefix,
}





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
    activities: [{
      name: `Evolution back`,
      type: "STREAMING", url: "https://www.twitch.tv/onlymahmoud"
    }]
  })
  mongoose
    .connect('mongodb://sif:safsafsafIN2005@cluster0-shard-00-00.lub0e.mongodb.net:27017,cluster0-shard-00-01.lub0e.mongodb.net:27017,cluster0-shard-00-02.lub0e.mongodb.net:27017/EvolutionDb?ssl=true&replicaSet=atlas-6yptv9-shard-0&authSource=admin&retryWrites=true&w=majority')
    .then(res => console.log('Connected to the DataBase'))
    .catch(err => console.log(err))
})
////////////////////////////////////////////////////////////////////////////////////////
client.commands = new Discord.Collection()
client.scommands = new Discord.Collection()
client.buttons = new Discord.Collection()
client.modals = new Discord.Collection()
client.invite_traker = new Discord.Collection()
client.slash = []
////////////////////////////////////////////////////////////////////////////////////////

//------------------------------------------File Readder----------------------------------------

// Bot Commands

fs.readdir('./src/slash_commands', (err, folders) => {
  if (err) return
  folders.forEach(folder => {
    fs.readdir(`./src/slash_commands/${folder}`, (err, files) => {
      if (err) return console.log(err);
      files.forEach(file => {
        let cmdName = file.split('.')[0],
          cmdModule = require(`./src/slash_commands/${folder}/${file}`)
        if (checkCommandModule(cmdName, cmdModule)) {
          if (checkProperties(cmdName, cmdModule)) {
            //  console.log(cmdModule)
            client.slash.push(cmdModule)
            client.scommands.set(cmdModule.name, cmdModule)
          }
        }
        console.log(`Setting up ${folder} command {${cmdName}}`);
      })
    })
  })
})


fs.readdir('./src/commands', (err, folders) => {
  folders.forEach(folder => {
    fs.readdir(`./src/commands/${folder}`, (err, files) => {
      if (err) return
      files.forEach(file => {
        let cmdName = file.split('.')[0],
          cmdModule = require(`./src/commands/${folder}/${file}`)
        if (checkCommandModule(cmdName, cmdModule)) {
          if (checkProperties(cmdName, cmdModule)) {
            //  console.log(cmdModule)
            client.commands.set(cmdModule.name, cmdModule)
          }
        }
        console.log(`Setting up ${folder} command {${cmdName}}`);
      })
    })
  })
})



fs.readdir('./src/buttons', (err, folders) => {
  folders.forEach(folder => {
    fs.readdir(`./src/buttons/${folder}`, (err, files) => {
      if (err) return console.log(err);
      files.forEach(file => {
        let cmdName = file.split('.')[0],
          cmdModule = require(`./src/buttons/${folder}/${file}`)
        if (checkCommandModule(cmdName, cmdModule)) {
          if (checkProperties(cmdName, cmdModule)) {
            //  console.log(cmdModule)
            client.buttons.set(cmdModule.name, cmdModule)
          }
        }
        console.log(`Setting up ${folder} button {${cmdName}}`);
      })
    })
  })
})


fs.readdir('./src/modals', (err, folders) => {
  folders.forEach(folder => {
    fs.readdir(`./src/modals/${folder}`, (err, files) => {
      if (err) return console.log(err);
      files.forEach(file => {
        let cmdName = file.split('.')[0],
          cmdModule = require(`./src/modals/${folder}/${file}`)
        if (checkCommandModule(cmdName, cmdModule)) {
          if (checkProperties(cmdName, cmdModule)) {
            //  console.log(cmdModule)
            client.modals.set(cmdModule.name, cmdModule)
          }
        }
        console.log(`Setting up ${folder} button {${cmdName}}`);
      })
    })
  })
})


fs.readdir('./src/invite_traker', (err, folders) => {
  folders.forEach(folder => {
    fs.readdir(`./src/invite_traker/${folder}`, (err, files) => {
      if (err) return console.log(err);
      files.forEach(file => {
        let cmdName = file.split('.')[0],
          cmdModule = require(`./src/invite_traker/${folder}/${file}`)
        if (checkCommandModule(cmdName, cmdModule)) {
          if (checkProperties(cmdName, cmdModule)) {
            client.invite_traker.set(cmdModule.name, cmdModule)
          }
        }
        console.log(`Setting up ${folder} event {${cmdName}}`);
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
      command.run(message, mongoose, args, client, emo)
    }
  });
})





// Client Events Handler

fs.readdir('./src/client/', (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./src/client/${file}`);
    let eventName = file.split('.')[0];
    client.on(eventName, event.bind(null, client, mongoose, emo));
    console.log(`Setting up event {${eventName}}`);
  });
});
fs.readdir('./src/security_events/', (err, files) => {
  if (err) return console.error(err);
  if (!files) return
  files.forEach(file => {
    const event = require(`./src/security_events/${file}`);
    let eventName = file.split('.')[0];
    client.on(eventName, event.bind(null, client, mongoose, emo));
    console.log(`Setting up event {${eventName}}`);
  });
});




tracker.on('guildMemberAdd', (member, type, invite) => {
  if (member.user.bot) return;
  client.invite_traker.find(invite_traker => {
    invite_traker.run({ member: member, type: type, inviteCode: invite }, mongoose, client, emo)
  });
});








//------------------------------------------File Readder----------------------------------------


//
client.login('OTc5MzIxMTgzODI2NzYzODE2.Gg--5q.P2pbG9r4RXqt1ZRlV9FrSBdZ0T3oS65zAZfa7c')