module.exports = {
    config: {
        name: "reset",
        alias: ['offbot'],
        description: "reset",
        usage: "z!reset",
        category: 'developer'
    },
    // eslint-disable-next-line no-unused-vars
    run: ({ client, message, args, embedResponse, Hora }) => {

        if ('507367752391196682' !== message.author.id)
            return embedResponse('No puedes usar este comando!')

        try {

            require('child_process').execSync(`git pull && pm2 restart all`).toString();

        } catch (err) {

            message.channel.send(err, { code: 'js' }).catch(() => { })

        }
    }
}
