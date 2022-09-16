const Discord = require('discord.js');
const ipInfo = require("ipinfo")
const axios = require('axios').default;
const moment = require('moment')
const dns = require('dns')
module.exports = {
    name: "check",
    description: "",
    async run(message, args, client) {

        if (!args[0]) return message.reply('> **Please provide an IP address**')
        let IP = args[0]

        dns.lookup(args[0], async (err, address, family) => {
            if (err) return message.reply('> **Please provide a valid IP address**');

            await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.apiKEY}&ip=${address}`)
                .then(async (res) => {
                    const ipI = await ipInfo(address)
                    let info = res.data
                    let embed = new Discord.MessageEmbed()
                        .setColor('#ffff00')
                        .setTitle(`information of ${address}`)
                        .setDescription(`
> **IP address** : \`${info.ip}\`
> **Hostname** : \`${ipI.hostname}\`
> **Organization** : \`${info.organization}\`
> **ISP   ** : \`${info.isp}\`
> **Country** : \`${info.country_name}\`
> **Region** : \`${info.state_prov}\`
> **City** : \`${info.city}\`
> **Time zone** : \`${info.time_zone.name}\`
> **Local time** : \`${info.time_zone.current_time}\`
> **Code Postal** : \`${info.zipcode}\`
                                 `)
                        .setThumbnail(info.country_flag)
                    message.reply({ embeds: [embed] })
                })
                .catch((err) => {
                     console.log(err.data);
                    return message.reply('> **Please provide a valid IP address**')
                })
        });
    }
}





/* 
                 */