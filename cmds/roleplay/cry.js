const Discord = require('discord.js');
module.exports = {
    config: {
        name: "cry", //nombre del cmd
        alias: [], //Alias
        description: "Manda un gif llorando", //Descripción (OPCIONAL)
        usage: "z!cry",
        category: 'interacción',
        botPermissions: [],
        memberPermissions: []

    }, run: ({ client, message }) => {

        let link = client.star.cry();

        let embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(`${message.author.toString()} se ha puesto a llorar!`)
            .setImage(link)
            .setTimestamp()

        return message.channel.send({ embed: embed }).catch(() => { });

    }
}