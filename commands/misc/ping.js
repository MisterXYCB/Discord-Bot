module.exports = {
    name: 'ping',
    aliases: [],
    permissions: [],
    description: "ping command",
    category: "misc",
    adminonly: false,
    activ: true,
    execute(client, message, args, cmd, Discord, text, profileData, serverData){
        message.channel.send(`Ws: ${client.ws.ping}ms\nBot: ${Math.floor(Date.now() - message.createdAt)}ms`)
    }
}