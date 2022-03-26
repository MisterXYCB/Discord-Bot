module.exports = (Discord, client) =>{
    console.log(`${client.user.tag} is online!`);
    client.user.setActivity({name: "Development of the Bot!", type: "STREAMING", url: "https://twitch.tv/xy_cbot"})
    require('../../../dashboard-backend/index.js')(Discord, client)
}