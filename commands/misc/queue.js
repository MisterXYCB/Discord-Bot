const { server_queue } = require('./play')
module.exports = {
    name: 'queue',
    aliases: [],
    permissions: [],
    description: "queue command",
    category: "misc",
    adminonly: false,
    activ: false,
    execute(client, message, args, cmd, Discord){
        message.channel.send(`${server_queue}`)
    }
}