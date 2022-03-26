module.exports = {
    name: 'voicechannel',
    aliases: ['vc', 'addvc', 'addvoicechannel'],
    permissions: ['CONNECT', 'SPEAK'],
    cooldown: 1800,
    description: "voicechannel command",
    category: "utility",
    adminonly: false,
    activ: false,
    async execute(client, message, args, cmd, Discord){
        if(!args[1]) return message.reply('Baue den Command so auf ')
        
        const name = args.slice(1).join(" ")
        const user = args[0]
        const channel = await message.guild.channels.create(name, {type: 'voice'});
        const parent = message.guild.channels.cache.find(c => c.name === `Eure VC'S`);
        if(parent) channel.setParent(parent)
        channel.setUserLimit(user)
    }
}