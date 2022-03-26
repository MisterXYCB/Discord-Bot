const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
require('dotenv').config()
const controller = new AbortController()
const { signal } = controller

module.exports = async (client, Discord) => {

    const commands = new Array()
    const commandFolders = fs.readdirSync('./bot/slashcommands')
    for(const folder of commandFolders){
        const commandFiles = fs.readdirSync(`./bot/slashcommands/${folder}`).filter(file => file.endsWith('.js'));
        console.log("├───> " + folder.toUpperCase() + " slash command folder successfully loaded!\n│")
        for (const file of commandFiles) {
            const command = require(`../slashcommands/${folder}/${file}`);
            commands.push(command.data.toJSON());
            client.slashcommands.set(command.name, command)
        }
    }
    
    const guilds = await client.guilds.fetch()
    console.log("Started reloading application slash commands!")
    guilds.forEach(async guild =>{

        const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);
    
        (async () => {
            try {
                await rest.put(
                    Routes.applicationGuildCommands("818539916488081408", guild.id),
                    { body: commands },
                );

                console.log(`${guild.name}: Successfully reloaded application slash commands!`);
            } catch (error) {
                console.error(error);
            }
        })()
    })
}
