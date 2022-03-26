module.exports = {
    name: 'slashdelete',
    permissions: [],
    description: "test command",
    category: "devonly",
    adminonly: false,
    activ: true,
    async execute(client, message, args, cmd, Discord, text, profileData, serverData){
        const guilds = await client.guilds.fetch()
        guilds.forEach(async guild => {
            const commands = await client.guilds.cache.get(guild.id)?.commands.fetch()
            commands.forEach(async command => {
                console.log(`${guild.name}: Fetched command with name: ${command.name}\n`)
                await command.delete().catch(console.error);
                console.log(`${guild.name}: Deleted command with name: ${command.name}\n`)
            });
        })
    }
}