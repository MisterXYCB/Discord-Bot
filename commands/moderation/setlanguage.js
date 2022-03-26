module.exports = {
    name: 'setlanguage',
    aliases: ['setlang'],
    permissions: [],
    category: "moderation",
    adminonly: false,
    activ: true,
    replaced: true,
    async execute(client, message, args, cmd, Discord, text, profileData, serverData){
        if(message.member.roles.cache.has(serverData.adminRole) || message.member.permissions.has("ADMINISTRATOR")){
            const validLanguages = ["english", "deutsch"];
            let languageText = "";
            for(let i = 0; i < validLanguages.length; i++){
                if((i + 1) == validLanguages.length)languageText += validLanguages[i].toUpperCase().slice(0, 1) + validLanguages[i].slice(1).toLowerCase();
                else languageText += validLanguages[i].toUpperCase().slice(0, 1) + validLanguages[i].slice(1).toLowerCase() + ", ";
            }
            const embed1 = new Discord.MessageEmbed() .setDescription(`${text.translate["setlanguage"]["NO_ARGS"][serverData.language]}`) .setColor('DARK_RED') .setTimestamp();
            const embed2 = new Discord.MessageEmbed() .setDescription(`${text.translate["setlanguage"]["VALID"][serverData.language]} \`${languageText}\``) .setColor('DARK_RED') .setTimestamp();
            const embed3 = new Discord.MessageEmbed() .setDescription(`${text.translate["setlanguage"]["DONE"][args[0].toLowerCase()]}`) .setColor('25FE25') .setTimestamp();
            if(!args[0]) return message.reply({ embeds: [embed1] });
            if(!validLanguages.some(validLanguage => args[0].toLowerCase().includes(validLanguage))) return message.reply({ embeds: [embed2] });
            await serverData.updateOne({ $set: { language: args[0].toLowerCase() }});
            message.reply({ embeds: [embed3] });
        }else{ 
        const embed4 = new Discord.MessageEmbed() .setDescription(`${text.translate["setlanguage"]["NO_PERMISSION"][serverData.language]}`) .setColor('DARK_RED') .setTimestamp(); 
        message.reply({ embeds: [embed4] });
        }
    }
}