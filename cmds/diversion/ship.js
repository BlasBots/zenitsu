const Discord = require('discord.js');
module.exports = {
    config: {
        name: "ship",//Nombre del cmd
        alias: [], //Alias
        description: "Manda una imagen comparando el amor", //Descripción (OPCIONAL)
        usage: "z!ship @mencion",
        category: 'diversion'

    }, run: async ({ client, message, args, embedResponse, Hora }) => {

        let mencionado = message.mentions.users.first()
        if (!mencionado) return embedResponse('Menciona a alguien!')
        return message.channel.send(
            new Discord.MessageEmbed()
                .setTimestamp()
                .setImage(`https://api.alexflipnote.dev/ship?user=${message.author.displayAvatarURL({ format: 'png', size: 2048 })}&user2=${mencionado.displayAvatarURL({ format: 'png', size: 2048 })}`)
                .setColor(client.color)
                .setDescription(`Hmm, creo que se quieren un ${Math.floor(Math.random() * 99) + 1}%\n\n¿Eso es amor?`)
        )
    }
}