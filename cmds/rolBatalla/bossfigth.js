const statusA = new Map();
let vidas = new Map();
const Discord = require('discord.js');
module.exports = {
    config: {
        name: "bossfigth",//Nombre del cmd
        alias: [], //Alias
        description: "Pelear con el jefe", //Descripción (OPCIONAL)
        usage: "z!bossfigth",
        category: 'rol'

    }, run: async ({ client, message, args, embedResponse, Hora }) => {

           let data = await client.getData({ id: message.author.id }, 'demonios')
        let { monstruos, nivelenemigo, nivelespada, nivelusuario, xpusuario, cooldown } = data;

        if (cooldown > Date.now())
            return embedResponse('No puedo ir a la batalla ahora.\n\nTiempo restante: ' + require('ms')(cooldown - Date.now()))

            if (!statusA.get(message.author.id)) {

                statusA.set(message.author.id, { status: true });
    
            }
    
            else {
                return embedResponse('Ya estas peleando contra el jefe!')
            }

            embedResponse('Comienzas tu.');

        await client.updateData({ id: message.author.id }, { cooldown: Date.now() + require('ms')('30s') }, 'demonios');

        let dinero = Math.floor(Math.random() * 50) + 1;

        let exp = Math.floor(Math.random() * 7) + 1;

        let col = new Discord.MessageCollector(message.channel, m => m.author.id == message.author.id, { max: 999 })

        let cold = new Set();

        col.on('collect', async (c) => {

            let enem = Math.floor(Math.random() * nivelenemigo) + 1;

            let user = Math.floor(Math.random() * nivelespada) + 1;

            if (!vidas.get(message.author.id))
                vidas.set(message.author.id, { turno: true, vidaenem: (nivelenemigo * 3) + 5, vidauser: (nivelespada * 3) + 5 });

            let { turno, vidaenem, vidauser } = vidas.get(message.author.id);

            if (cold.has(message.author.id))
                return embedResponse('Cooldown');

            else {
                if (!turno)
                    return;

                vidas.get(message.author.id).vidaenem = vidaenem - user

                vidas.get(message.author.id).turno = false;

                if (vidaenem <= 0) {
                    statusA.delete(message.author.id);
                    let datazo = await client.updateData({ id: message.author.id }, { $inc: { jefes: 1, nivelenemigo: 1 } }, 'demonios')
                    col.stop()
                    vidas.delete(message.author.id)
                    return embedResponse(`Le has ganado al Jefe!\n\nJefes derrotados: ${datazo.jefes}`)
                }

                await embedResponse(`Hicisite ${user} de daño, ahora el enemigo tiene ${vidaenem} de vida`).then(a => {
                    if (a.deletable) a.delete({ timeout: 3000 });
                })
                    .catch(e => { })

                await Discord.Util.delayFor(2000);

                vidas.get(message.author.id).vidauser = vidauser - enem

                if (vidauser <= 0) {
                    statusA.delete(message.author.id);
                    col.stop()
                    vidas.delete(message.author.id)
                    return embedResponse(`Has perdido contra el enemigo.`)
                }

                await embedResponse('El jefe hizo ' + enem + ' de daño, ahora tienes ' + vidauser + " de vida")
                    .then(a => {
                        if (a.deletable) a.delete({ timeout: 3000 });
                    })
                    .catch(e => { })

                vidas.get(message.author.id).turno = true;

            }
        })
    }
}