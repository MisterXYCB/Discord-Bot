module.exports = {
    name: 'creeper',
    aliases: [],
    permissions: [],
    description: "easteregg command",
    category: "misc",
    adminonly: false,
    activ: false,
    execute(client, message, args, cmd, Discord){
       message.channel.send('aww man')
    }
}