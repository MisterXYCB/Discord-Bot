const fs = require('fs');

module.exports = (client, Discord) =>{
    const button_folders = fs.readdirSync('./bot/interactions/buttons/');

    for (const folder of button_folders) {
        const button_files = fs.readdirSync(`./bot/interactions/buttons/${folder}`).filter(file => file.endsWith('.js'));
        console.log("├───> " + folder.toUpperCase() + " button folder successfully loaded!\n│")

        for (const file of button_files) {
            const button = require(`../interactions/buttons/${folder}/${file}`);

            if (button.id && button.activ == true) {
                client.buttons.set(button.id, button);
            } else {
                continue;
            }
        }
    }
}