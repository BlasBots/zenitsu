const Discord = require("discord.js")

module.exports = {
    config: {
        name: "eval",
        alias: ['e'],
        description: "eval a code",
        usage: "z!eval return 1+1",
        category: 'developer'
    },
    run: async ({ client, message, args, embedResponse, Hora }) => {

        if (!["507367752391196682"].includes(message.author.id))
            return embedResponse('No puedes usar este comando!')
        let limit = 1950;
        try {
            let code = args.join(" ");
            let evalued = await eval(`(async() => {${code}})()`);
            let asd = typeof (evalued)
            evalued = require("util").inspect(evalued, { depth: 0 });
            let txt = "" + evalued;
            let limit = 1999
            if (txt.length > limit) return message.channel.send('Evaluación mayor a 1999 caracteres!')
            let embed = new Discord.MessageEmbed()
                .setTitle(`Eval`)
                .addField(`Entrada`, `\`\`\`js\n${code}\`\`\``)
                .addField(`Salida`, `\`\`\`js\n${evalued}\n\`\`\``.replace(client.token, "Contenido privado"))
                .addField(`Tipo`, `\`\`\`js\n${asd}\`\`\``.replace("number", "Number").replace("object", "Object").replace("string", "String").replace(undefined, "Undefined").replace("boolean", "Boolean").replace("function", "Function"))
                .setColor(client.color)
                .setTimestamp()
            message.channel.send({ embed: embed })
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`js\n${err}\n\`\`\``)
        };
    }
}
