const Discord = require("discord.js");
//Después de Alias es opcional.
module.exports = {
    config: {
        name: "muteall",//Nombre del cmd
        alias: [], //Alias
        description: "Silenciar a todos en el canal de voz", //Descripción (OPCIONAL)
        usage: "z!muteall",
        category: 'among us'
    }, run: async ({ client, message, args, embedResponse }) => {

        let canalVoz = message.member.voice.channel;
        await client.among(message, message.member, canalVoz, message.channel, true)//

    }
}