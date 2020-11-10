const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
let cooldownC = new Set()
module.exports = {
    config: {
        name: "virus", //Nombre del cmd
        alias: [], //Alias
        description: "Ver que tan dañino es un archivo", //Descripción (OPCIONAL)
        usage: "z!virus link (tambien puedes adjuntar un archivo)",
        category: 'utiles'
    },
    run: async ({ client, message, embedResponse, args }) => {

        let url = message.attachments.map(a => a)[0]?.proxyURL || args[0]

        if (cooldownC.has(message.author.id)) { return embedResponse('Aun se esta escaneando un archivo.') }

        else {

            cooldownC.add(message.author.id)

        }

        if (!(`${url}`.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/gi)))
            return embedResponse('URL invalido.')

        embedResponse(`Escaneando: ${url}`);
        let cl = require('easymaty').clave()
        let res = await scan(url, cl);

        let embed = new MessageEmbed()
            .setColor(client.color)
            .setDescription(`Resultado:\n${res.message}`)
            .setFooter(`Link: ${res.url}`)
            .setTimestamp()
        cooldownC.delete(message.author.id)
        message.channel.send({ embed: embed }).catch(() => { })

    }
}

async function scan(url, pass) {


    const fetch = require('node-fetch');
    const req = await xd(url);
    const splited = url.split('.');
    const extension = splited[1] ? splited[1] : 'html'
    await require('fs').writeFileSync(`${cl}.${extension}`, (await req.text()));
    let archivo = require(`../../${cl}.${extension}`);
    const virustotal = require('virustotal.js');

    virustotal.setKey('0fe9737a7713725aa5236edac769fb2b04fc0c530060d62505bbb496461396ff');

    let check = await require("util").promisify(virustotal.scanFile)(archivo).catch(() => { })

    if (!check)
        return await scan(url, pass)

    let res = await require("util").promisify(virustotal.getFileReport)(archivo).catch(() => { })

    if (!res || (res?.total <= 1))
        return await scan(url, pass)

    else {
        //console.log(res)
        return { message: `Positives: ${res.positives}\nScans: ${res.total}`, url: url }
    }

}