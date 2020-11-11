const Discord = require('discord.js');
module.exports = {
    config: {
        name: "hug", //nombre del cmd
        alias: [], //Alias
        description: "Manda un gif lamiendo a alguien", //Descripción (OPCIONAL)
        usage: "z!kill @mencion",
        category: 'interacción'

    }, run: ({ client, message, embedResponse }) => {

        let link = client.star.hug();

        let miembro = message.mentions.members.first();

        if (!miembro) return embedResponse('Tienes que mencionar a alguien!')

        let embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(`${message.author.toString()} abrazó a ${miembro.user.toString()}!`)
            .setImage(link)
            .setTimestamp()

        return message.channel.send({ embed: embed }).catch(() => { });

    }
}