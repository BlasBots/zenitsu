const { join } = require('path');
const color = "#E09E36";
const LogsModel = require('../src/Guild.js');
const PrefixsModel = require('../src/Prefix.js');
const SnipeModel = require('../src/Snipe.js')
require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const mongoose = require('mongoose');
const { info, error } = require('console');
const mil = require("ms")
const tresenraya = require('tresenraya');
const express = require('express');
const juego = new tresenraya();
const mal = '<:ohno:721174460073377804>';
const bien = '<:correcto:721174526930714634>';
const ayuda = 'elsuperduperincreibleseparadordearraysencaminoxdxd:v:vxdxdestonadieloescribiranuncaxdxdhdsbasudkjbsdjnasiudhaskkdhbdjfasdfilshdvfaciludvshfilahsdvfcliuasdbvfcilukjbsdvfiulKJVIUHJIOSDHADUJohifjbdsofihbsfihjbsdfiohbaiaslhabodhb'

/*function duration(s) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;
    if (hrs <= 0) {
        if (mins <= 0) {
            return secs + " s";
        } else {
            return mins + " m " + secs + " s";
        }
    } else {
        return hrs + " h " + mins + " m " + secs + " s";
    }
}*/

client.on('ready', () => {
    console.log(`${client.user.tag} está listo!`)
    client.user.setPresence({
        activity: {
            status: "dnd",
            name: "z!help",
            type: "WATCHING"
        }

    })

    let embed = new Discord.MessageEmbed()
        .setColor(color)
        .addField('Color', color, true)
        .addField('Nombre', client.user.tag, true)
        .addField('Versión', Discord.version, true)
        .addField('Servidores', client.guilds.cache.size, true)
        .addField('Usuarios', client.users.cache.size, true)
        .addField('Canales', client.channels.cache.size, true)
        .setTimestamp()
        .setThumbnail(client.user.displayAvatarURL({ format: 'png', size: 2048 }))
        .setFooter(client.users.cache.get('507367752391196682').tag, client.users.cache.get('507367752391196682').displayAvatarURL({ format: 'png', size: 2048 }));
    client.users.cache.get('507367752391196682').send({ embed: embed }).catch(err => console.log(err))
    //GitHub
    client.channels.cache.get('723247210531258430')
        .messages
        .fetch(client.channels.cache.get('723247210531258430').lastMessageID)
        .then(m => client.users.cache.get('507367752391196682')
            .send(m.embeds)
        );
});
let cooldown = new Set()
client.on('message', async (message) => {
    if (!message.guild) return;
    function errorEmbed(argumentoDeLaDescripcion) {
        return message.channel.send(new Discord.MessageEmbed()
            .setDescription(`¡<:ohno:721174460073377804> => \`Error\`: ${argumentoDeLaDescripcion}!`)
            .setColor(color)
            .setTimestamp()
        )
    }

    function embedResponse(argumentoDeLaDescripcion, opcion) {
        let canal_a_enviar = opcion || message.channel
        return canal_a_enviar.send(new Discord.MessageEmbed()
            .setDescription(argumentoDeLaDescripcion)
            .setColor(color)
            .setTimestamp()
        )
    }
    let prefix = 'z!';
    await PrefixsModel.findOne({ id: message.guild.id }, async (err, data) => {
        if (err) return console.log(err);
        if (!data) prefix = 'z!'
        else prefix = data.prefix || 'z!'

    });
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    if (message.author.bot) return;

    var mmm = message.mentions.users.first()
    if (!mmm) { } else {
        if (mmm.id === client.user.id && message.mentions.users.size === 1) return embedResponse('El prefix del servidor es ' + prefix);
    }

    if (!message.content.startsWith(prefix)) return;
    if (message.content.length < prefix.length + 1) return;
    /*const blacklist = []
    if (blacklist.includes(message.author.id)) return;*/

    //inicio de help
    if (command === 'help') {
        message.channel.send({
            embed: new Discord.MessageEmbed()
                .setColor(color)
                .addField('Comandos', `${prefix}help, ${prefix}suggest, ${prefix}bugreport, ${prefix}invite`)
                .addField('Extras', `${prefix}txt, ${prefix}ping, ${prefix}chat, ${prefix}canal/channel, ${prefix}snipe, ${prefix}serverlist`)
                .addField('Moderación', `${prefix}clear, ${prefix}voicekick, ${prefix}voicemute, ${prefix}voiceunmute, ${prefix}voicedeaf, ${prefix}voiceundeaf`)
                .addField('Administración', `${prefix}blockchannels, ${prefix}setprefix/changeprefix,  ${prefix}setlogs/logschannel`)
                .addField('Diversión', `${prefix}challenge, ${prefix}achievement, ${prefix}ship, ${prefix}supreme, ${prefix}didyoumean, ${prefix}captcha`)
                .setThumbnail(client.user.displayAvatarURL({ format: 'png', size: 2048 }))
                .setFooter('Recomendamos que el bot tenga todos los permisos para que no haya problemas!', client.user.displayAvatarURL({ format: 'png', size: 2048 }))
        });
    }
    //fin de help

    //inicio de invite
    else if (command === 'invite') {
        let link = 'https://discordapp.com/oauth2/authorize?client_id=721080193678311554&scope=bot&permissions=2146958847';
        let invitacionLink = 'https://discord.gg/hbSahh8';
        let embed = new Discord.MessageEmbed()
            .setThumbnail(client.user.displayAvatarURL({ format: 'png', size: 2048 }))
            .setDescription(`Link de invitación del bot => [Link](${link})\nLink de invitación al servidor de soporte => [Link](${invitacionLink})`)
            .setColor(color)
            .setFooter('Gracias por apoyar!', message.author.displayAvatarURL({ format: 'png', size: 2048 }))
        message.channel.send({ embed: embed })
    }
    //fin de invite

    //inicio de voicekick
    else if (command === 'voicekick') {
        if (!message.member.hasPermission('MOVE_MEMBERS')) return errorEmbed('No tienes el permiso `MOVE_MEMBERS`.');
        if (!message.guild.me.hasPermission('MOVE_MEMBERS')) return errorEmbed('No tengo el permiso `MOVE_MEMBERS`.');
        let member = message.mentions.members.first();
        if (!member) return embedResponse('Menciona a alguien!');
        if (!member.voice.channel) return embedResponse('El miembro mencionado no esta en un canal de voz!');
        embedResponse('El usuario ya no está en el canal de voz.');
        member.voice.setChannel(null)
    }
    //fin de voicekick

    //inicio de voicemute
    else if (command === 'voicemute') {
        if (!message.member.hasPermission('MUTE_MEMBERS')) return errorEmbed('No tienes el permiso `MUTE_MEMBERS`.');
        if (!message.guild.me.hasPermission('MUTE_MEMBERS')) return errorEmbed('No tengo el permiso `MUTE_MEMBERS`.');
        let member = message.mentions.members.first();
        if (!member) return embedResponse('Menciona a alguien!');
        if (!member.voice.channel) return embedResponse('El miembro mencionado no esta en un canal de voz!');
        if (member.voice.serverMute === true) return embedResponse('El miembro ya está silenciado!');
        embedResponse(`El miembro \`${member.displayName}\` se ha silenciado correctamente!`);
        member.voice.setMute(true)
    }
    //fin de voicemute

    //inicio de voiceunmute
    else if (command === 'voiceunmute') {
        if (!message.member.hasPermission('MUTE_MEMBERS')) return errorEmbed('No tienes el permiso `MUTE_MEMBERS`.');
        if (!message.guild.me.hasPermission('MUTE_MEMBERS')) return errorEmbed('No tengo el permiso `MUTE_MEMBERS`.');
        let member = message.mentions.members.first();
        if (!member) return embedResponse('Menciona a alguien!');
        if (!member.voice.channel) return embedResponse('El miembro mencionado no esta en un canal de voz!');
        if (member.voice.serverMute === false) return embedResponse('El miembro ya podia hablar!')
        embedResponse(`El miembro \`${member.displayName}\` ya puede hablar!`);
        member.voice.setMute(false)
    }
    //fin de voiceunmute

    //inicio de voicedeaf
    else if (command === 'voicedeaf') {
        if (!message.member.hasPermission('DEAFEN_MEMBERS')) return errorEmbed('No tienes el permiso `DEAFEN_MEMBERS`.');
        if (!message.guild.me.hasPermission('DEAFEN_MEMBERS')) return errorEmbed('No tengo el permiso `DEAFEN_MEMBERS`.');
        let member = message.mentions.members.first();
        if (!member) return embedResponse('Menciona a alguien!');
        if (!member.voice.channel) return embedResponse('El miembro mencionado no está en un canal de voz!');
        if (member.voice.serverDeaf === true) return embedResponse('El miembro ya está ensordecido!')
        embedResponse(`El miembro \`${member.displayName}\` se ha ensordecido correctamente!`);
        member.voice.setDeaf(true)
    }
    //fin de voicedeaf

    //inicio de voiceundeaf
    else if (command === 'voiceundeaf') {
        if (!message.member.hasPermission('DEAFEN_MEMBERS')) return errorEmbed('No tienes el permiso `DEAFEN_MEMBERS`.');
        if (!message.guild.me.hasPermission('DEAFEN_MEMBERS')) return errorEmbed('No tengo el permiso `DEAFEN_MEMBERS`.');
        let member = message.mentions.members.first();
        if (!member) return embedResponse('Menciona a alguien!');
        if (!member.voice.channel) return embedResponse('El miembro mencionado no está en un canal de voz!');
        if (member.voice.serverDeaf === false) return embedResponse('El miembro ya podia escuchar!')
        embedResponse(`El miembro \`${member.displayName}\` ya puede escuchar!`);
        member.voice.setDeaf(false)
    }
    //fin de voiceundeaf

    //incio de chat
    else if (command === 'chat') {
        const chatbot = require("espchatbotapi");
        if (!args[0]) return embedResponse("Escribe algo!");

        message.channel.startTyping();

        chatbot.hablar(args).then(respuesta => {
            message.channel.stopTyping();

            message.channel.send(respuesta);
        }).catch(e => message.channel.send(e));
    }
    //fin de chat

    //!inicio de blockchannels
    else if (command === 'blockchannels') {
        if (!message.member.hasPermission('MANAGE_CHANNELS')) return errorEmbed('No tienes el permiso `MANAGE_CHANNELS`.');
        if (!message.guild.me.hasPermission('MANAGE_CHANNELS')) return errorEmbed('No tengo el permiso `MANAGE_CHANNELS`.');
        if (cooldown.has(message.guild.id)) {
            embedResponse(message.author.username + ", utilice el comando despues de 5 minutos!");
            return;
        }
        let id = message.mentions.roles.first() || message.mentions.users.first()
        if (!id) return embedResponse('Menciona un rol o usuario!\nEjemplo:\n' + prefix + 'blockchannels <mencion de rol o user> <true | false | null>')
        id = id.id
        let canales = message.guild.channels.cache.filter(a => a.type === 'text');
        if (canales.size >= 101) return errorEmbed('Este servidor tiene más de 100 canales de texto!')
        if (!args[1]) return embedResponse('Ejemplo:\n' + prefix + 'blockchannels <mencion de rol o user> <true | false | null>');
        if (!message.guild.roles.cache.get(id) && !message.guild.members.cache.get(id)) return errorEmbed('Error en encontrar la ID de usuario/rol');
        if (!['true', 'false', 'null'].includes(args[1])) return errorEmbed('Escoge entre true, false, null');
        message.channel.send(`Editando canales...`);
        cooldown.add(message.guild.id);
        setTimeout(() => {
            cooldown.delete(message.author.id);
        }, 300000); //5 minutos
        canales.forEach(ch => {
            try {
                ch.updateOverwrite(id, {
                    SEND_MESSAGES: args[1]
                });
            } catch (e) {
                return;
            };
        });
    }
    //!fin de blockchannels

    //inicio bugreport
    else if (command === 'bugreport') {
        if (!args[0]) return embedResponse('Escribe algo!')
        embedResponse(`${message.author.tag} ha reportado el siguente \"bug\":\n${args.join(' ')}`, client.channels.cache.get('725053091522805787')).then(a => {
            embedResponse('Reporte enviado!')
        })
    }

    //fin de bugreport

    //inicio de suggest
    else if (command === 'suggest') {
        if (!args[0]) return embedResponse('Escribe algo!')
        embedResponse(`${message.author.tag} ha sugerido:\n${args.join(' ')}`, client.channels.cache.get('727948582556270682')).then(a => {
            embedResponse('Sugerencia enviada!')
        });
    }
    //fin suggest

    //inicio de txt
    else if (command === 'txt') {
        if (!message.member.hasPermission('ATTACH_FILES')) return errorEmbed('No tienes el permiso `ATTACH_FILES`');
        if (!message.guild.me.hasPermission('ATTACH_FILES')) return errorEmbed('No tengo el permiso `ATTACH_FILES`');
        if (!args[0]) return embedResponse('Escribe algo!')
        message.channel.send({
            files: [{
                attachment: Buffer.from(args.join(' ')),
                name: "Text.txt"
            }]
        })
    }
    //fin de txt

    //inicio de eval
    else if (command === 'eval') {
        if (!["507367752391196682", "374710341868847104"].includes(message.author.id))
            return embedResponse('No puedes usar este comando!')
        let limit = 1950;
        try {
            let code = args.join(" ");
            let evalued = await eval(`(async() => {${code}})()`);
            let asd = typeof (evalued)
            evalued = require("util").inspect(evalued, { depth: 0 });
            let txt = "" + evalued;
            let limit = 1999
            if (txt.length > limit) return console.log('¿?').then(p => {
                let embed = new Discord.MessageEmbed()
                    .setDescription('Evaluacion mayor a 1999 caracteres!')
                    .setColor(color)
                message.channel.send(embed)
            }).catch(err => console.log(err))
            let embed = new Discord.MessageEmbed()
                .setTitle(`Eval`)
                .addField(`Entrada`, `\`\`\`js\n${code}\`\`\``)
                .addField(`Salida`, `\`\`\`js\n${evalued}\n\`\`\``.replace(client.token, "Contenido privado"))
                .addField(`Tipo`, `\`\`\`js\n${asd}\`\`\``.replace("number", "Number").replace("object", "Object").replace("string", "String").replace(undefined, "Undefined").replace("boolean", "Boolean").replace("function", "Function"))
                .setColor(color)
                .setTimestamp()
            message.channel.send(embed).catch(err => console.log(err))
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`js\n${err}\n\`\`\``).catch(err => console.log(err));
        };
    }
    //fin de eval

    //inicio de ping
    else if (command === 'ping') {
        embedResponse(`Ping: ${client.ws.ping}ms`)
    }
    //fin de ping

    //comienzo de setlogs
    else if (command === 'setlogs' || command === 'logschannel') {
        if (!message.member.hasPermission("ADMINISTRATOR")) return errorEmbed("No tienes el permiso `ADMINISTRATOR`")
        let channel = message.mentions.channels.first();
        if (!channel) return embedResponse("No has mencionado un canal/Ese canal no existe.")
        if (!message.guild.channels.cache.filter(a => a.type === "text").map(a => a.id).includes(channel.id)) return embedResponse('El canal tiene que ser del Servidor donde estas!')
        let data = await LogsModel.findOne({ id: message.guild.id });
        if (!data) {
            try {
                const configLogs = new LogsModel({
                    id: message.guild.id,
                    channellogs: channel.id
                });
                configLogs.save().catch(e => { return console.log(e); });
            } catch { return; }
        } else {
            try {
                data.channellogs = channel.id;
                data.save().catch(e => { return console.log(e); });
            } catch { return; }
        }
        return embedResponse(`Canal establecido en <#${channel.id}>`)
    }
    //fin de setlogs

    //inicio de setprefix
    else if (command === 'setprefix' || command === 'changeprefix') {
        if (!message.member.hasPermission("ADMINISTRATOR")) return errorEmbed("No tienes el permiso `ADMINISTRATOR`")
        if (!args[0] || args[0].length >= 4) return embedResponse('El prefix debe tener menos de 3 caracteres!');

        let data = await PrefixsModel.findOne({ id: message.guild.id });
        if (!data) {
            try {
                const configLogs = new PrefixsModel({
                    id: message.guild.id,
                    prefix: args[0]
                });
                configLogs.save().catch(e => { return console.log(e); });
            } catch { return; }
        } else {
            try {
                data.prefix = args[0];
                data.save().catch(e => { return console.log(e); });
            } catch { return; }
        }
        return embedResponse(`Prefix establecido a ${args[0]}`)
    }
    //fin de setprefix

    //inicio de canal
    else if (command === 'canal' || command === 'channel') {
        await LogsModel.findOne({ id: message.guild.id }, async (err, data) => {
            if (err) return console.log(err);

            if (!data) return embedResponse("Este servidor no tiene definido un canal de logs")
            if (!message.guild.channels.cache.filter(a => a.type === 'text').map(a => a.id).includes(data.channellogs)) return embedResponse('El canal en la base de datos no existe!')
            else return embedResponse(`Logs: <#${data.channellogs}>(${data.channellogs})`)
        });
    }
    //fin de canal

    //inicio de snipe
    else if (command === 'snipe') {
        await SnipeModel.findOne({ id: message.channel.id }, async (err, data) => {

            if (err) return console.log(err);
            if (!data) return embedResponse("Nada en la base de datos");
            else {
                let la_data = data.snipe
                let separador = la_data.split(ayuda)
                let embed = new Discord.MessageEmbed()
                    .addField('Mensaje', separador[0])
                    .addField('Autor', separador[1])
                    .setColor(color)
                    .setTimestamp()
                    .setTitle('Snipe')
                    .setThumbnail('https://media1.tenor.com/images/8c3e8a0a3c7b0afc22624c9278be6a89/tenor.gif?itemid=5489827')
                return message.channel.send({ embed: embed });
            }
        });
    }
    //fin de snipe

    //inicio de clear
    else if (command === 'clear') {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return errorEmbed('No tienes el permiso `MANAGE_MESSAGES`!');
        if (!message.guild.me.hasPermission('MANAGE_MESSAGES')) return errorEmbed('No tengo el permiso `MANAGE_MESSAGES`');
        if (!args[0]) return embedResponse('Escribe un numero!');
        if (isNaN(args[0])) return embedResponse('' + mal + ' Escribe un numero!')
        if (args[0] >= 100 || args[0] === 0) return embedResponse('Un numero del 1 al 99');
        await message.delete();
        await message.channel.bulkDelete(args[0]).then(d => {
            if (d.size < args[0]) return d.size === 0 ? errorEmbed('Ningun mensaje fue eliminado!') : embedResponse('Mensajes eliminados: ' + d.size)
            else return embedResponse('Mensajes eliminados: ' + args[0])
        });

    }
    //fin de clear

    //inicio de serverlist
    else if (command === 'serverlist') {
        let servidores = client.guilds.cache.map(a => a.name).join(' **`<=|=>`** ')
        let embed = new Discord.MessageEmbed()
            .setTitle('Lista de servidores')
            .setColor(color)
            .setDescription(servidores.length >= 1996 ? `${servidores.slice(0, 1996)}...` : `${servidores}`)
            .setFooter(`Total de servidores: ${client.guilds.cache.size}`)
        message.channel.send({ embed: embed });
    }
    //fin de serverlist

    //inicio de challenge
    else if (command === 'challenge') {
        let argumento = args.join(' ')
        let txt = encodeURIComponent(argumento);
        let link = `https://api.alexflipnote.dev/challenge?text=${txt}`;
        if (!argumento) return embedResponse('Escribe algo!')
        let embed = new Discord.MessageEmbed()
            .setImage(link)
            .setColor(color)
        message.channel.send({ embed: embed })
    }
    //fin de challenge

    //inicio de achievement
    else if (command === 'achievement') {
        let argumento = args.join(' ')
        let txt = encodeURIComponent(argumento);
        let link = `https://api.alexflipnote.dev/achievement?text=${txt}`;
        if (!argumento) return embedResponse('Escribe algo!')
        let embed = new Discord.MessageEmbed()
            .setImage(link)
            .setColor(color)
        message.channel.send({ embed: embed })
    }
    //fin de achievement

    //inicio de supreme
    else if (command === 'supreme') {
        let argumento = args.join(' ')
        let txt = encodeURIComponent(argumento);
        let link = `https://api.alexflipnote.dev/supreme?text=${txt}`;
        if (!argumento) return embedResponse('Escribe algo!')
        let embed = new Discord.MessageEmbed()
            .setImage(link)
            .setColor(color)
        message.channel.send({ embed: embed })
    }
    //fin de supreme

    //inicio de captcha
    else if (command === 'captcha') {
        let argumento = args.join(' ')
        let txt = encodeURIComponent(argumento);
        let link = `https://api.alexflipnote.dev/captcha?text=${txt}`;
        if (!argumento) return embedResponse('Escribe algo!')
        let embed = new Discord.MessageEmbed()
            .setImage(link)
            .setColor(color)
        message.channel.send({ embed: embed })
    }
    //fin de captcha

    //inicio de didyoumean
    else if (command === 'didyoumean') {
        let argumento = args.join(' ').split(',|,')
        let txt = encodeURIComponent(argumento[0]);
        let texto = encodeURIComponent(argumento[1])
        let link = `https://api.alexflipnote.dev/didyoumean?top=${txt}&bottom=${texto}`;
        if (!argumento[1]) return embedResponse('Ejemplo de uso:\n```js\n' + prefix + 'didyoumean Hola ,|, Adios```')
        if (txt.length >= 45) return embedResponse('El primer argumento debe tener menos de `45`')
        if (texto.length >= 40) return embedResponse('El segundo argumento debe tener menos de `40`')
        let embed = new Discord.MessageEmbed()
            .setImage(link)
            .setColor(color)
        message.channel.send({ embed: embed })
    }

    //fin de didyoumean

    //inicio de ship
    else if (command === 'ship') {
        let mencionado = message.mentions.users.first()
        if (!mencionado) return embedResponse('Menciona a alguien!');
        message.channel.send(
            new Discord.MessageEmbed()
                .setImage(`https://api.alexflipnote.dev/ship?user=${message.author.displayAvatarURL({ format: 'png', size: 2048 })}&user2=${mencionado.displayAvatarURL({ format: 'png', size: 2048 })}",`)
                .setColor(color)
        )
    }
    //fin de ship

    else {
        let embed = new Discord.MessageEmbed()
            .setThumbnail(`https://cdn.discordapp.com/attachments/688054761706094725/714328885533343764/error.gif`)
            .setDescription(`<:ohno:721174460073377804> » El comando que escribiste no existe o esta mal escrito!\nPuedes cunsultar mis comandos con ${prefix}help.\nProblemas?\n⚙️ \`»\` [➲ Soporte](https://discord.gg/hbSahh8)`)
            .setTimestamp()
            .setColor(color)
        message.channel.send({ embed: embed })

    }
});

//?inicio de eventos
//?inicio mensajes eventos

client.on('messageUpdate', async (oldMessage, newMessage) => {
    if (!oldMessage.content) return;
    if (!newMessage.content) return;
    if (!newMessage.guild || !oldMessage.guild) return;
    await LogsModel.findOne({ id: newMessage.guild.id }, async (err, data) => {
        if (!data) return;
        if (newMessage.author.bot) return;
        if (newMessage.channel.type === 'dm') return;
        if (newMessage.content === oldMessage.content) return;
        if (!newMessage.guild.channels.cache.filter(a => a.type === "text").map(a => a.id).includes(data.channellogs)) return console.log('El canal tiene que ser del Servidor donde estas!');
        let embed = new Discord.MessageEmbed()
            .setColor(color)
            .setTitle('<:messageUpdate:723267945194586122> Message Updated')
            .addField('• Old message', oldMessage.content, true)
            .addField('• New message', newMessage.content, true)
            .addField('• Link', `[Link of the message](https://discordapp.com/channels/${newMessage.guild.id}/${newMessage.channel.id}/${newMessage.id})`, false)
            .addField('• Author', newMessage.author.tag, true)
            .addField('• Author ID', newMessage.author.id, true)
            .addField('• Author mention', `<@${newMessage.author.id}>`, false)
            .addField('• Author channel name', newMessage.channel.name, true)
            .addField('• Author channel ID', newMessage.channel.id, true)
            .addField('• Author channel mention', `<#${newMessage.channel.id}>`, false)
            .setFooter(newMessage.guild.name, newMessage.guild.iconURL({ format: 'png', size: 2048 }))
            .setTimestamp()
        if (err) return;
        else return client.channels.cache.get(`${data.channellogs}`).send({ embed: embed }).catch(error => { return; });
    });
});

client.on('messageDelete', async (message) => {
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;
    if (!message.content) return;

    let data = await SnipeModel.findOne({ id: message.channel.id });
    if (!data) {
        try {
            const configLogs = new SnipeModel({
                id: message.channel.id,
                snipe: `${message.content}${ayuda}${message.author.tag}`
            });
            configLogs.save().catch(e => { return console.log(e); });
        } catch { return; }
    } else {
        try {
            data.snipe = `${message.content}${ayuda}<@${message.author.id}>`;
            data.save().catch(e => { return console.log(e); });
        } catch { return; }
    }

});
client.on('messageDelete', async (message) => {
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;
    if (!message.content) return;
    await LogsModel.findOne({ id: message.guild.id }, async (err, data) => {
        if (!data) return;
        if (!message.guild.channels.cache.filter(a => a.type === "text").map(a => a.id).includes(data.channellogs)) return console.log('El canal tiene que ser del Servidor donde estas!');
        let embed = new Discord.MessageEmbed()
            .setColor(color)
            .setTitle('<:messageDelete:723270093475414026> Message Deleted')
            .addField('• Message', message.content)
            .addField('• Author', message.author.tag, true)
            .addField('• Author ID', message.author.id, true)
            .addField('• Author mention', `<@${message.author.id}>`, false)
            .addField('• Author channel name', message.channel.name, true)
            .addField('• Author channel ID', message.channel.id, true)
            .addField('• Author channel mention', `<#${message.channel.id}>`, false)
            .setFooter(message.guild.name, message.guild.iconURL({ format: 'png', size: 2048 }))
            .setTimestamp()
        if (err) return;
        else return client.channels.cache.get(`${data.channellogs}`).send({ embed: embed }).catch(error => { return; });
    });
});
//!fin mensajes eventos
//?inicio de roles eventos

client.on('roleUpdate', async (oldRole, newRole) => {
    let listaAddeds = []
    let listaRemoveds = []
    if (!oldRole.permissions.has('ADMINISTRATOR') && newRole.permissions.has('ADMINISTRATOR')) listaAddeds.push('Administrator');
    if (oldRole.permissions.has('ADMINISTRATOR') && !newRole.permissions.has('ADMINISTRATOR')) listaRemoveds.push('Administrator');

    if (!oldRole.permissions.has('CREATE_INSTANT_INVITE') && newRole.permissions.has('CREATE_INSTANT_INVITE')) listaAddeds.push('Create instant invite');
    if (oldRole.permissions.has('CREATE_INSTANT_INVITE') && !newRole.permissions.has('CREATE_INSTANT_INVITE')) listaRemoveds.push('Create instant invite');

    if (!oldRole.permissions.has('KICK_MEMBERS') && newRole.permissions.has('KICK_MEMBERS')) listaAddeds.push('Kick members');
    if (oldRole.permissions.has('KICK_MEMBERS') && !newRole.permissions.has('KICK_MEMBERS')) listaRemoveds.push('Kick members');

    if (!oldRole.permissions.has('BAN_MEMBERS') && newRole.permissions.has('BAN_MEMBERS')) listaAddeds.push('Ban members');
    if (oldRole.permissions.has('BAN_MEMBERS') && !newRole.permissions.has('BAN_MEMBERS')) listaRemoveds.push('Ban members');

    if (!oldRole.permissions.has('MANAGE_CHANNELS') && newRole.permissions.has('MANAGE_CHANNELS')) listaAddeds.push('Manage channels');
    if (oldRole.permissions.has('MANAGE_CHANNELS') && !newRole.permissions.has('MANAGE_CHANNELS')) listaRemoveds.push('Manage channels');

    if (!oldRole.permissions.has('MANAGE_GUILD') && newRole.permissions.has('MANAGE_GUILD')) listaAddeds.push('Manage guild');
    if (oldRole.permissions.has('MANAGE_GUILD') && !newRole.permissions.has('MANAGE_GUILD')) listaRemoveds.push('Manage guild');

    if (!oldRole.permissions.has('ADD_REACTIONS') && newRole.permissions.has('ADD_REACTIONS')) listaAddeds.push('Add reactions');
    if (oldRole.permissions.has('ADD_REACTIONS') && !newRole.permissions.has('ADD_REACTIONS')) listaRemoveds.push('Add reactions');

    if (!oldRole.permissions.has('VIEW_AUDIT_LOG') && newRole.permissions.has('VIEW_AUDIT_LOG')) listaAddeds.push('View audit log');
    if (oldRole.permissions.has('VIEW_AUDIT_LOG') && !newRole.permissions.has('VIEW_AUDIT_LOG')) listaRemoveds.push('View audit log');

    if (!oldRole.permissions.has('PRIORITY_SPEAKER') && newRole.permissions.has('PRIORITY_SPEAKER')) listaAddeds.push('Priority speaker');
    if (oldRole.permissions.has('PRIORITY_SPEAKER') && !newRole.permissions.has('PRIORITY_SPEAKER')) listaRemoveds.push('Priority speaker');

    if (!oldRole.permissions.has('STREAM') && newRole.permissions.has('STREAM')) listaAddeds.push('Stream');
    if (oldRole.permissions.has('STREAM') && !newRole.permissions.has('STREAM')) listaRemoveds.push('Stream');

    if (!oldRole.permissions.has('VIEW_CHANNEL') && newRole.permissions.has('VIEW_CHANNEL')) listaAddeds.push('View channel');
    if (oldRole.permissions.has('VIEW_CHANNEL') && !newRole.permissions.has('VIEW_CHANNEL')) listaRemoveds.push('View channel');

    if (!oldRole.permissions.has('SEND_MESSAGES') && newRole.permissions.has('SEND_MESSAGES')) listaAddeds.push('Send messages');
    if (oldRole.permissions.has('SEND_MESSAGES') && !newRole.permissions.has('SEND_MESSAGES')) listaRemoveds.push('Send messages');

    if (!oldRole.permissions.has('SEND_TTS_MESSAGES') && newRole.permissions.has('SEND_TTS_MESSAGES')) listaAddeds.push('Send tts messages');
    if (oldRole.permissions.has('SEND_TTS_MESSAGES') && !newRole.permissions.has('SEND_TTS_MESSAGES')) listaRemoveds.push('Send tts messages');

    if (!oldRole.permissions.has('MANAGE_EMOJIS') && newRole.permissions.has('MANAGE_EMOJIS')) listaAddeds.push('Manage emojis');
    if (oldRole.permissions.has('MANAGE_EMOJIS') && !newRole.permissions.has('MANAGE_EMOJIS')) listaRemoveds.push('Manage emojis');

    if (!oldRole.permissions.has('MANAGE_MESSAGES') && newRole.permissions.has('MANAGE_MESSAGES')) listaAddeds.push('Manage messages');
    if (oldRole.permissions.has('MANAGE_MESSAGES') && !newRole.permissions.has('MANAGE_MESSAGES')) listaRemoveds.push('Manage messages');

    if (!oldRole.permissions.has('EMBED_LINKS') && newRole.permissions.has('EMBED_LINKS')) listaAddeds.push('Embed links');
    if (oldRole.permissions.has('EMBED_LINKS') && !newRole.permissions.has('EMBED_LINKS')) listaRemoveds.push('Embed links');

    if (!oldRole.permissions.has('ATTACH_FILES') && newRole.permissions.has('ATTACH_FILES')) listaAddeds.push('Attach files');
    if (oldRole.permissions.has('ATTACH_FILES') && !newRole.permissions.has('ATTACH_FILES')) listaRemoveds.push('Attach files');

    if (!oldRole.permissions.has('READ_MESSAGE_HISTORY') && newRole.permissions.has('READ_MESSAGE_HISTORY')) listaAddeds.push('Read message history');
    if (oldRole.permissions.has('READ_MESSAGE_HISTORY') && !newRole.permissions.has('READ_MESSAGE_HISTORY')) listaRemoveds.push('Read message history');

    if (!oldRole.permissions.has('MENTION_EVERYONE') && newRole.permissions.has('MENTION_EVERYONE')) listaAddeds.push('Mention everyone');
    if (oldRole.permissions.has('MENTION_EVERYONE') && !newRole.permissions.has('MENTION_EVERYONE')) listaRemoveds.push('Mention everyone');

    if (!oldRole.permissions.has('USE_EXTERNAL_EMOJIS') && newRole.permissions.has('USE_EXTERNAL_EMOJIS')) listaAddeds.push('Use external emojis');
    if (oldRole.permissions.has('USE_EXTERNAL_EMOJIS') && !newRole.permissions.has('USE_EXTERNAL_EMOJIS')) listaRemoveds.push('Use external emojis');

    if (!oldRole.permissions.has('VIEW_GUILD_INSIGHTS') && newRole.permissions.has('VIEW_GUILD_INSIGHTS')) listaAddeds.push('View guild insigths');
    if (oldRole.permissions.has('VIEW_GUILD_INSIGHTS') && !newRole.permissions.has('VIEW_GUILD_INSIGHTS')) listaRemoveds.push('View guild insigths');

    if (!oldRole.permissions.has('CONNECT') && newRole.permissions.has('CONNECT')) listaAddeds.push('Connect');
    if (oldRole.permissions.has('CONNECT') && !newRole.permissions.has('CONNECT')) listaRemoveds.push('Connect');

    if (!oldRole.permissions.has('SPEAK') && newRole.permissions.has('SPEAK')) listaAddeds.push('Speak');
    if (oldRole.permissions.has('SPEAK') && !newRole.permissions.has('SPEAK')) listaRemoveds.push('Speak');

    if (!oldRole.permissions.has('MUTE_MEMBERS') && newRole.permissions.has('MUTE_MEMBERS')) listaAddeds.push('Mute members');
    if (oldRole.permissions.has('MUTE_MEMBERS') && !newRole.permissions.has('MUTE_MEMBERS')) listaRemoveds.push('Mute members');

    if (!oldRole.permissions.has('DEAFEN_MEMBERS') && newRole.permissions.has('DEAFEN_MEMBERS')) listaAddeds.push('Defen members');
    if (oldRole.permissions.has('DEAFEN_MEMBERS') && !newRole.permissions.has('DEAFEN_MEMBERS')) listaRemoveds.push('Defen members');

    if (!oldRole.permissions.has('MOVE_MEMBERS') && newRole.permissions.has('MOVE_MEMBERS')) listaAddeds.push('Move members');
    if (oldRole.permissions.has('MOVE_MEMBERS') && !newRole.permissions.has('MOVE_MEMBERS')) listaRemoveds.push('Move members');

    if (!oldRole.permissions.has('USE_VAD') && newRole.permissions.has('USE_VAD')) listaAddeds.push('Use vad');
    if (oldRole.permissions.has('USE_VAD') && !newRole.permissions.has('USE_VAD')) listaRemoveds.push('Use vad');

    if (!oldRole.permissions.has('CHANGE_NICKNAME') && newRole.permissions.has('CHANGE_NICKNAME')) listaAddeds.push('Change nickname');
    if (oldRole.permissions.has('CHANGE_NICKNAME') && !newRole.permissions.has('CHANGE_NICKNAME')) listaRemoveds.push('Change nickname');

    if (!oldRole.permissions.has('MANAGE_NICKNAMES') && newRole.permissions.has('MANAGE_NICKNAMES')) listaAddeds.push('Manage nicknames');
    if (oldRole.permissions.has('MANAGE_NICKNAMES') && !newRole.permissions.has('MANAGE_NICKNAMES')) listaRemoveds.push('Manage nicknames');

    if (!oldRole.permissions.has('MANAGE_ROLES') && newRole.permissions.has('MANAGE_ROLES')) listaAddeds.push('Manage roles');
    if (oldRole.permissions.has('MANAGE_ROLES') && !newRole.permissions.has('MANAGE_ROLES')) listaRemoveds.push('Manage roles');

    if (!oldRole.permissions.has('MANAGE_WEBHOOKS') && newRole.permissions.has('MANAGE_WEBHOOKS')) listaAddeds.push('Manage webhooks');
    if (oldRole.permissions.has('MANAGE_WEBHOOKS') && !newRole.permissions.has('MANAGE_WEBHOOKS')) listaRemoveds.push('Manage webhooks');

    await LogsModel.findOne({ id: newRole.guild.id }, async (err, data) => {
        if (!data) return;

        if (oldRole.permissions.bitfield === newRole.permissions.bitfield) return;

        if (!newRole.guild.channels.cache.filter(a => a.type === "text").map(a => a.id).includes(data.channellogs)) return console.log('El canal tiene que ser del Servidor donde estas!');
        let embed = new Discord.MessageEmbed()
            .setTitle('• Role Updated')
            .addField('• Addeds permissions', listaAddeds.length >= 1 ? listaAddeds.join(', ') : '\u200b', true)
            .addField('• Removeds permissions', listaRemoveds.length >= 1 ? listaRemoveds.join(', ') : '\u200b', true)
            .addField('• Role', `${newRole.name}(${newRole.id})`)
            .setTimestamp()
            .setFooter(newRole.guild.name, newRole.guild.iconURL({ format: 'png', size: 2048 }))
            .setColor(color)
        if (err) return;
        else return client.channels.cache.get(`${data.channellogs}`).send({ embed: embed }).catch(error => { return; });
    });
});

client.on('roleUpdate', async (oldRole, newRole) => {
    await LogsModel.findOne({ id: newRole.guild.id }, async (err, data) => {
        if (!data) return;
        if (oldRole.name === newRole.name) return;
        if (!newRole.guild.channels.cache.filter(a => a.type === "text").map(a => a.id).includes(data.channellogs)) return console.log('El canal tiene que ser del Servidor donde estas!');
        let embed = new Discord.MessageEmbed()
            .setTitle('• Role Updated')
            .addField('• Old name', oldRole.name, true)
            .addField('• New name', newRole.name, true)
            .addField('• Role ID', newRole.id, true)
            .setTimestamp()
            .setFooter(newRole.guild.name, newRole.guild.iconURL({ format: 'png', size: 2048 }))
            .setColor(color)
        if (err) return;
        else return client.channels.cache.get(`${data.channellogs}`).send({ embed: embed }).catch(error => { return; });
    });
});

client.on('roleUpdate', async (oldRole, newRole) => {
    await LogsModel.findOne({ id: newRole.guild.id }, async (err, data) => {
        if (!data) return;
        if (oldRole.hoist === newRole.hoist && oldRole.mentionable === newRole.mentionable) return;
        if (!newRole.guild.channels.cache.filter(a => a.type === "text").map(a => a.id).includes(data.channellogs)) return console.log('El canal tiene que ser del Servidor donde estas!');
        let embed = new Discord.MessageEmbed()
            .setTitle('• Role Updated')
            .addField('• Hoist role', newRole.hoist, true)
            .addField('• Mentionable role', newRole.mentionable, true)
            .addField('• Role', `${newRole.name}(${newRole.id})`, true)
            .setTimestamp()
            .setFooter(newRole.guild.name, newRole.guild.iconURL({ format: 'png', size: 2048 }))
            .setColor(color)
        if (err) return;
        else return client.channels.cache.get(`${data.channellogs}`).send({ embed: embed }).catch(error => { return; });
    });
});


client.on('roleUpdate', async (oldRole, newRole) => {
    await LogsModel.findOne({ id: newRole.guild.id }, async (err, data) => {
        if (!data) return;
        if (oldRole.hexColor === newRole.hexColor) return;
        if (!newRole.guild.channels.cache.filter(a => a.type === "text").map(a => a.id).includes(data.channellogs)) return console.log('El canal tiene que ser del Servidor donde estas!');
        let embed = new Discord.MessageEmbed()
            .setTitle('• Role Updated')
            .addField('• Old color', oldRole.hexColor, true)
            .addField('• New color', newRole.hexColor, true)
            .addField('• Role', `${newRole.name}(${newRole.id})`, true)
            .setTimestamp()
            .setFooter(newRole.guild.name, newRole.guild.iconURL({ format: 'png', size: 2048 }))
            .setColor(color)
        if (err) return;
        else return client.channels.cache.get(`${data.channellogs}`).send({ embed: embed }).catch(error => { return; });
    });
});

client.on('roleUpdate', async (oldRole, newRole) => {

    await LogsModel.findOne({ id: newRole.guild.id }, async (err, data) => {
        if (!data) return;
        if (oldRole.position === newRole.position) return;
        if (!newRole.guild.channels.cache.filter(a => a.type === "text").map(a => a.id).includes(data.channellogs)) return console.log('El canal tiene que ser del Servidor donde estas!');
        let embed = new Discord.MessageEmbed()
            .setTitle('• Role Updated')
            .addField('• Old position', oldRole.position, true)
            .addField('• New position', newRole.position, true)
            .addField('• Role', `${newRole.name}(${newRole.id})`, true)
            .setTimestamp()
            .setFooter(newRole.guild.name, newRole.guild.iconURL({ format: 'png', size: 2048 }))
            .setColor(color)
        if (err) return console.log(err);
        else return client.channels.cache.get(`${data.channellogs}`).send({ embed: embed }).catch(error => { return; });
    });
});

client.on('roleCreate', async (role) => {
    await LogsModel.findOne({ id: role.guild.id }, async (err, data) => {
        if (!data) return;
        if (!role.guild.channels.cache.filter(a => a.type === "text").map(a => a.id).includes(data.channellogs)) return console.log('El canal tiene que ser del Servidor donde estas!');
        let embed = new Discord.MessageEmbed()
            .setTitle('• Role Created')
            .addField('• Role name', role.name, true)
            .addField('• Role ID', role.id, true)
            .addField('• Role color', role.hexColor, true)
            .setTimestamp()
            .setFooter(role.guild.name, role.guild.iconURL({ format: 'png', size: 2048 }))
            .setColor(color)
        if (err) return;
        else return client.channels.cache.get(`${data.channellogs}`).send({ embed: embed }).catch(error => { return; });
    });
});

client.on('roleDelete', async (role) => {
    await LogsModel.findOne({ id: role.guild.id }, async (err, data) => {
        if (!data) return;
        if (!role.guild.channels.cache.filter(a => a.type === "text").map(a => a.id).includes(data.channellogs)) return console.log('El canal tiene que ser del Servidor donde estas!');
        let embed = new Discord.MessageEmbed()
            .setTitle('• Role Deleted')
            .addField('• Role name', `${role.name}`, true)
            .addField('• Role ID', role.id, true)
            .addField('• Role color', role.hexColor, true)
            .setTimestamp()
            .setFooter(role.guild.name, role.guild.iconURL({ format: 'png', size: 2048 }))
            .setColor(color)
        if (err) return;
        else return client.channels.cache.get(`${data.channellogs}`).send({ embed: embed }).catch(error => { return; });
    });
});


//!fin de roles eventos
//?inicio servidor eventos
client.on('guildUpdate', async (oldGuild, newGuild) => {
    await LogsModel.findOne({ id: newGuild.id }, async (err, data) => {
        if (!data) return;
        if (oldGuild.name === newGuild.name) return;
        if (!newGuild.channels.cache.filter(a => a.type === "text").map(a => a.id).includes(data.channellogs)) return console.log('El canal tiene que ser del Servidor donde estas!');
        let embed = new Discord.MessageEmbed()
            .setTitle('• Guild Updated')
            .addField('• Old name', oldGuild.name, true)
            .addField('• New name', newGuild.name, true)
            .addField('• Guild ID', newGuild.id, true)
            .setTimestamp()
            .setFooter(newGuild.name, newGuild.iconURL({ format: 'png', size: 2048 }))
            .setColor(color)
        if (err) return;
        else return client.channels.cache.get(`${data.channellogs}`).send({ embed: embed }).catch(error => { return; });
    });
});

client.on('guildUpdate', async (oldGuild, newGuild) => {
    await LogsModel.findOne({ id: newGuild.id }, async (err, data) => {
        if (!data) return;
        if (oldGuild.systemChannelID === newGuild.systemChannelID) return;
        if (!newGuild.channels.cache.filter(a => a.type === "text").map(a => a.id).includes(data.channellogs)) return console.log('El canal tiene que ser del Servidor donde estas!');
        let embed = new Discord.MessageEmbed()
            .setTitle('• Guild Updated')
            .addField('• Old channel', `<#${oldGuild.systemChannelID}>(${newGuild.systemChannelID})`, true)
            .addField('• New channel', `<#${newGuild.systemChannelID}>(${newGuild.systemChannelID})`, true)
            .addField('• Guild', `${newGuild.name}(${newGuild.id})`, true)
            .setTimestamp()
            .setFooter(newGuild.name, newGuild.iconURL({ format: 'png', size: 2048 }))
            .setColor(color)
        if (err) return;
        else return client.channels.cache.get(`${data.channellogs}`).send({ embed: embed }).catch(error => { return; });
    });
});

client.on('guildUpdate', async (oldGuild, newGuild) => {
    await LogsModel.findOne({ id: newGuild.id }, async (err, data) => {
        if (!data) return;
        if (oldGuild.verificationLevel === newGuild.verificationLevel) return;
        if (!newGuild.channels.cache.filter(a => a.type === "text").map(a => a.id).includes(data.channellogs)) return console.log('El canal tiene que ser del Servidor donde estas!');
        let embed = new Discord.MessageEmbed()
            .setTitle('• Guild Updated')
            .addField('• Old verification level', capitalize(oldGuild.verificationLevel), true)
            .addField('• New verification level', capitalize(newGuild.verificationLevel), true)
            .addField('• Guild', `${newGuild.name}(${newGuild.id})`, true)
            .setTimestamp()
            .setFooter(newGuild.name, newGuild.iconURL({ format: 'png', size: 2048 }))
            .setColor(color)
        if (err) return;
        else return client.channels.cache.get(`${data.channellogs}`).send({ embed: embed }).catch(error => { return; });
    });
});
//!fin servidor eventos
//?inicio canales eventos

client.on('channelCreate', async (channel) => {
    if (!channel.guild) return;
    await LogsModel.findOne({ id: channel.guild.id }, async (err, data) => {
        if (!data) return;
        if (!channel.guild.channels.cache.filter(a => a.type === "text").map(a => a.id).includes(data.channellogs)) return;
        let embed = new Discord.MessageEmbed()
            .setTitle('• Channel Created')
            .addField('• Channel name', channel.name, true)
            .addField('• Channel ID', channel.id, true)
            .setTimestamp()
            .setFooter(channel.guild.name, channel.guild.iconURL({ format: 'png', size: 2048 }))
            .setColor(color)
        if (err) return;
        else return client.channels.cache.get(`${data.channellogs}`).send({ embed: embed }).catch(error => { return; });
    });
});

client.on('channelDelete', async (channel) => {
    if (!channel.guild) return;
    await LogsModel.findOne({ id: channel.guild.id }, async (err, data) => {
        if (!data) return;
        if (!channel.guild.channels.cache.filter(a => a.type === "text").map(a => a.id).includes(data.channellogs)) return;
        let embed = new Discord.MessageEmbed()
            .setTitle('• Channel Deleted')
            .addField('• Channel name', channel.name, true)
            .addField('• Channel ID', channel.id, true)
            .setTimestamp()
            .setFooter(channel.guild.name, channel.guild.iconURL({ format: 'png', size: 2048 }))
            .setColor(color)
        if (err) return;
        else return client.channels.cache.get(`${data.channellogs}`).send({ embed: embed }).catch(error => { return; }); // doc.channellogs o como hayas definido el canal de logs (supongo que para eso estás usando esta config)
    });
});

client.on('channelUpdate', async (oldChannel, newChannel) => {
    if (!oldChannel.guild || !newChannel.guild) return;
    await LogsModel.findOne({ id: newChannel.guild.id }, async (err, data) => {
        if (!data) return;
        if (oldChannel.name === newChannel.name) return;
        if (!newChannel.guild.channels.cache.filter(a => a.type === "text").map(a => a.id).includes(data.channellogs)) return console.log('El canal tiene que ser del Servidor donde estas!');
        let embed = new Discord.MessageEmbed()
            .setTitle('• Channel Updated')
            .addField('• Old name', oldChannel.name, true)
            .addField('• New name', newChannel.name, true)
            .addField('• Channel ID', `${newChannel.id}`, true)
            .setTimestamp()
            .setFooter(newChannel.guild.name, newChannel.guild.iconURL({ format: 'png', size: 2048 }))
            .setColor(color)
        if (err) return;
        else return client.channels.cache.get(`${data.channellogs}`).send({ embed: embed }).catch(error => { console.log('Error: ' + error + '') });
    });
});

client.on('channelUpdate', async (oldChannel, newChannel) => {
    await LogsModel.findOne({ id: newChannel.guild.id }, async (err, data) => {
        if (!data) return;
        if (oldChannel.rateLimitPerUser === newChannel.rateLimitPerUser) return;
        if (!newChannel.guild.channels.cache.filter(a => a.type === "text").map(a => a.id).includes(data.channellogs)) return console.log('El canal tiene que ser del Servidor donde estas!');
        let embed = new Discord.MessageEmbed()
            .setTitle('• Channel Updated')
            .addField('• Old cooldown', oldChannel.rateLimitPerUser + 's', true)
            .addField('• New cooldown', newChannel.rateLimitPerUser + 's', true)
            .addField('• Channel', `${newChannel.name}(${newChannel.id})`, true)
            .setTimestamp()
            .setFooter(newChannel.guild.name, newChannel.guild.iconURL({ format: 'png', size: 2048 }))
            .setColor(color)
        if (err) return;
        else return client.channels.cache.get(`${data.channellogs}`).send({ embed: embed }).catch(error => { console.log('Error: ' + error + '') });
    });
});


client.on('channelUpdate', async (oldChannel, newChannel) => {
    await LogsModel.findOne({ id: newChannel.guild.id }, async (err, data) => {
        if (!data) return;
        if (oldChannel.topic === newChannel.topic) return;
        if (!newChannel.guild.channels.cache.filter(a => a.type === "text").map(a => a.id).includes(data.channellogs)) return console.log('El canal tiene que ser del Servidor donde estas!');
        let embed = new Discord.MessageEmbed()
            .setTitle('• Channel Updated')
            .addField('• Old topic', !oldChannel.topic ? '\u200b' : oldChannel.topic, true)
            .addField('• New topic', !newChannel.topic ? '\u200b' : newChannel.topic, true)
            .addField('• Channel', `${newChannel.name}(${newChannel.id})`, true)
            .setTimestamp()
            .setFooter(newChannel.guild.name, newChannel.guild.iconURL({ format: 'png', size: 2048 }))
            .setColor(color)
        if (err) return;
        else return client.channels.cache.get(`${data.channellogs}`).send({ embed: embed }).catch(error => { console.log('Error: ' + error + '') });
    });
});
//!fin canales eventos

//?inicio usuarios eventos
client.on('guildMemberUpdate', async (oldUser, newUser) => {
    await LogsModel.findOne({ id: newUser.guild.id }, async (err, data) => {
        if (!data) return;
        if (oldUser.nickname === newUser.nickname) return;
        let nickname1;
        let nickname2;
        if (oldUser.nickname === null) nickname1 = '\u200b';
        else nickname1 = oldUser.nickname;
        if (newUser.nickname === null) nickname2 = '\u200b';
        else nickname2 = newUser.nickname;
        if (!newUser.guild.channels.cache.filter(a => a.type === "text").map(a => a.id).includes(data.channellogs)) return console.log('El canal tiene que ser del Servidor donde estas!');
        let embed = new Discord.MessageEmbed()
            .setTitle('• User Updated')
            .addField('• Old nickname', nickname1, true)
            .addField('• New nickname', nickname2, true)
            .addField('• User', `${newUser.user.username}(${newUser.user.id})`, true)
            .setTimestamp()
            .setFooter(newUser.guild.name, newUser.guild.iconURL({ format: 'png', size: 2048 }))
            .setColor(color)
        if (err) return;
        else return client.channels.cache.get(`${data.channellogs}`).send({ embed: embed }).catch(error => { console.log('Error: ' + error + '') });
    });
});
//!fin usuarios eventos
//!fin de eventos

client.on('error', async (error) => {
    client.users.cache.get('507367752391196682').send(error)
})

client.on('message', async (msg) => {
    msg.channel.messages.fetch({ limit: 3 }).then(m => {
        let a = m.filter(E => !E.author.bot).array()
        let e = m.filter(E => !E.author.bot).array()
        if (!a[0]) return;
        if (!a[1]) return;
        if (!a[2]) return;
        if (a[0].content.toLowerCase() === a[1].content.toLowerCase() && a[1].content.toLowerCase() === a[2].content.toLowerCase() && e[0].author.id !== e[1].author.id && e[1].author.id !== e[2].author.id) {
            msg.channel.send(a[2].content)
        }
    })
})
client.login(process.env.BOT_TOKEN);

mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("[MongoDB]: Conectado a la base de datos Mongodb.");
}).catch((err) => {
    console.log(`[Error]: No se puede conectar a la base de datos de Mongodb. Error: ${err}`);
});

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};