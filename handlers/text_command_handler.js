const fs = require('fs');

module.exports = (client, Discord) =>{
    const command_folders = fs.readdirSync('./bot/commands/');

    for (const folder of command_folders) {
        const command_files = fs.readdirSync(`./bot/commands/${folder}`).filter(file => file.endsWith('.js'));
        console.log("├───> " + folder.toUpperCase() + " text command folder successfully loaded!\n│")

        for (const file of command_files) {
            const command = require(`../commands/${folder}/${file}`);

            if (command.name && command.activ == true) {
                client.commands.set(command.name, command);
            } else {
                continue;
            }
        }
    }
}