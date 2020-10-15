const Discord = require("discord.js")

module.exports = {
    config: {
        name: "accept",
        alias: [],
        description: "Aceptar sugerencia",
        usage: "z!accept id comment",
        category: 'developer'
    },
    run: async ({ client, message, args, embedResponse, Hora }) => {

        if (!["507367752391196682", "374710341868847104"].includes(message.author.id))
            return embedResponse('No puedes usar este comando!')

        let user = client.users.cache.get(args[0]) || message.mentions.users.first();

        if (!user)
            return embedResponse('Usuario no encontrado.')

        let data = (await client.updateData({ id: user.id }, { $push: { insignias: args[1] } }, 'profile'));

        return embedResponse(`Insignia añadida a ${user.tag}\n\nActuales: ${data.insignias.join(', ')}`);
    }
};