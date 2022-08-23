const Discord = require('discord.js')
const staffs = require('../../models/staff')
 module.exports = async (client, mongoose, emo, message) => {

//     const guild = message.guild
//     const channel = message.channel
//     const author = guild.members.cache.get(message.author.id)


//     if (!author) return console.log('err in the variables');
//     if (!author.roles.cache.find(r => r.id === '977993427625070652')) return

//     staffs.findOne({ userID: author.id }, async (err, staff) => {
//         if (err) console.log(err);
//         if (!staff) {
//             new staffs({
//                 userID: author.id
//             })
//                 .save()
//                 .catch(err => console.log(err))
//         }
//         else {
//             if (getRndInteger(0, 10) <= 6) return;
//             staff.xp += getRndInteger(0, 4);
//             staff.save().catch(err => console.log(err))
//         }
//     })




    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}