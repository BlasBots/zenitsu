const Discord = require('discord.js');
module.exports = {
    config: {
        name: "profile", //nombre del cmd
        alias: [], //Alias
        description: "Manda el perfil de un miembro", //Descripción (OPCIONAL)
        usage: "z!profile",
        category: 'diversion'

    }, run: async ({ client, message, args }) => {

        let member = message.guild.members.cache.find(a => a.user.username === args.join(' ')) || message.guild.members.cache.find(a => a.user.tag === args.join(' ')) || message.guild.members.cache.find(a => a.displayName === args.join(' ')) || message.guild.members.cache.get(args[0]) || message.mentions.members.first() || message.member

        let data = (await client.getData({ id: member.user.id }, 'profile'));

        let { color, description, insignias, img, thumbnail, nick, footer, footertext, likes, seguidores } = data;

        let guild = client.guilds.cache.get('645463565813284865');

        if (guild.members.cache.get(member.user.id)) {
            insignias.push(`<:zDiscordMember:766650472508817448>`)
        }

        let embed = new Discord.MessageEmbed()
            .setImage(img)
            .setThumbnail(thumbnail)
            .setAuthor(`Perfil de ${member.user.tag}`, member.user.displayAvatarURL({ dynamic: true }))
            .setColor(color)
            .addField(`Descripción`, description)
            .addField('Insignias', insignias.length == 0 ? 'No tiene insignias.' : insignias.join(', '))
            .addField('Apodo', nick)
            .addField('Seguidores', seguidores.length)
            .addField('Likes', likes.length)
            .setFooter(footertext, footer)
            .setTimestamp()
        return message.channel.send({ embed: embed })
    }
}