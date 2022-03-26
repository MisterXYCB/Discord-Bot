module.exports = {
    name: 'test',
    permissions: [],
    description: "test command",
    category: "devonly",
    adminonly: false,
    activ: true,
    async execute(client, message, args, cmd, Discord, text, profileData, serverData){
        console.log(args)
        if(message.author.id !== '722790461751689327') return;
        const embed1 = new Discord.MessageEmbed() .setDescription(`Loading ...`) .addField("test", "test2", false) .setColor('DARK_RED') .setTimestamp();
        const embed2 = new Discord.MessageEmbed() .setDescription(text.translate["test"]["TEST_ANSWER"][serverData.language]) .setColor('DARK_RED') .setTimestamp() .setImage('https://gyazo.com/a51c108bdacca431da0e4a5c9d31f646.png');
        const embed3 = new Discord.MessageEmbed() .setDescription("3")
        const msg = await message.channel.send({content: "test", embeds: [embed1]});
        setTimeout(() =>{msg.edit({content: " ", embeds: [embed2]})}, 5000)
        setTimeout(() =>{msg.edit({content: "\u200b", embeds: [embed3]})}, 10000)
    }
}