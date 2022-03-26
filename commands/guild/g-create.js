const guildModel = require ('../../models/guildSchema')
const profileModel = require ('../../models/profileSchema')
module.exports = {
    name: 'g-create',
    aliases: [],
    permissions: [],
    cooldown: 6,
    description: "guild create command",
    category: "guild",
    adminonly: false,
    activ: false,
    async execute(client, message, args, cmd, Discord, profileData){
      const name = args[0]

      const exist = await guildModel.findOne({
        name: name,
        serverID: message.guild.id
      })
      if(exist) return message.reply(`Eine Gilde namens ${name} existiert schon!`)

      const ammount = 25000

      if(!name){
           return message.reply("Bitte schreibe einen Namen")
       }
        if(ammount > profileData.bank) return message.reply(`Du brauchst ${ammount} auf der Bank!`)
        if(profileData.guild !== "") return message.reply('Du bist schon in einer Gilde!')
        
        const toCollect = ["ja"];

        const filter = (m) => {
            return toCollect.some((answer) => answer.toLowerCase() === m.content.toLowerCase()) && m.author.id === message.author.id;
        };

        const COLLECTOR = message.channel.createMessageCollector(filter, { max: 1, time: 10000 });
        
        COLLECTOR.on("collect", async (m) => {
            await guildModel.create({
              name: name,
              serverID: message.guild.id
            })
            await profileModel.findOneAndUpdate({
              userID: message.author.id,
              serverID: message.guild.id,
            }, {
              $inc: {
                bank: -ammount,
              }, $set: {
                guild: name,
              }
            })
          const role = await message.guild.roles.create({data: {name: name}})
          const modRole = await message.guild.roles.create({data: {name: name + "mod"}})
          const ownerRole = await message.guild.roles.create({data: {name: name + "owner"}})
          const addRole = await message.guild.roles.cache.find(role => role.name === name)
          const addModRole = await message.guild.roles.cache.find(role => role.name === name + "mod")
          const addOwnerRole = await message.guild.roles.cache.find(role => role.name === name + "owner")
          const category = await message.guild.channels.create(name, {type: 'category'});
          await category.updateOverwrite(message.guild.id, {
            VIEW_CHANNEL: false
          })
          await category.updateOverwrite(role, {
            VIEW_CHANNEL: true
          })
          await category.updateOverwrite(modRole, {
            VIEW_CHANNEL: true
          })
          await category.updateOverwrite(ownerRole, {
            VIEW_CHANNEL: true
          })
          const infoChannel = await message.guild.channels.create(name + "-info", {type: 'text'})
          const requestChannel = await message.guild.channels.create(name + "-requests", {type: 'text'})
          const textChannel = await message.guild.channels.create(name + "-chat", {type: 'tetx'});
          const voiceChannel = await message.guild.channels.create(name + "-talk", {type: 'voice'});
          await textChannel.setParent(category)
          await voiceChannel.setParent(category)
          await infoChannel.setParent(category)
          await requestChannel.setParent(category)
          const member = await message.guild.members.cache.get(message.author.id)
          await member.roles.add(addRole.id)
          member.roles.add(addModRole.id)
          member.roles.add(addOwnerRole.id)
            
          infoChannel.send(`Nutze ${process.env.PREFIX}g-help für infos`)
          requestChannel.send(`Aktuell können nur mods requests annehmen!`)
          message.reply(`Deine Gilde(${name}) wurde erstellt!`)
    });
    
    COLLECTOR.on("end", (collected) => {
        if (collected.size == 0) {
          return message.channel.send("Da du nicht mit \`ja\` geantwortet hast wurde der Vorgang abgebrochen!");
        }
      });

    message.channel.send(`Willst du wirklich eine Gilde names ${name} erstellen? Dies kostet dich 25000!`)

    }
}