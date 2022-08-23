const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const panelSchema = new Schema({
    panelID: { type: String, required: true },
    ticketsContentMsg: { type: String, default: '**أهـلا وسـهـلاً بـك ({user}) ، انـتـظـر فـريـق الـدعـم مـن فـضـلـك !\n\n- {support}**' },
    ticketsEmbedMsg: { type: String, default: `**تم تنبيه فريق الدعم وسيتم الرد عليك في اقرب وقت\nيرجى الانتظار وعدم ازعاج المسؤولين بالمنشن او الخاص**` },
    catOpenID: { type: String, default: null },
    catCloseID: { type: String, default: null },
    Support: { type: Array, default: null },
    count: { type: Number, default: 0 }
})

module.exports = mongoose.model("panels", panelSchema);;

