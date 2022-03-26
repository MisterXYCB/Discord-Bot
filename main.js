const Discord = require('discord.js');
const client = new Discord.Client({ partials: ['GUILD_MEMBER', 'USER', 'MESSAGE', 'CHANNEL', 'REACTION'], intents: 32767 });
const mongoose = require('mongoose');

client.commands = new Discord.Collection();

client.events = new Discord.Collection();

client.buttons = new Discord.Collection();

client.slashcommands = new Discord.Collection();

['text_command', 'slash_command', 'button', 'event'].forEach(handler =>{
    try{
        require(`./handlers/${handler}_handler`)(client, Discord)
    }catch(err){
        console.log(err || no)
    } 
    console.log("├─> " + handler.toUpperCase() + " handler successfully loaded!\n├────────────────────────────────────────────────────────────────────────────────────");
})

mongoose.connect(process.env.MONGODB_SRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log('Connected to the Database')
}).catch((err) =>{
    console.log(err)
});

client.login(process.env.TOKEN);