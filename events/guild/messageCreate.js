require('dotenv').config();
const text = require('../../lang.json')
const profileModel = require('../../models/profileSchema');
const serverModel = require('../../models/serverSchema');
const cooldowns = new Map();
const { suggestion, level, bannedwords } = require('../../functions/messageCreate');

module.exports = async (Discord, client, message) => {
  bannedwords(Discord, message)
  if(message.author.bot) return;
  let serverData;
  try{
    serverData = await serverModel.findOne({ serverID: message.guild.id });
    if(!serverData){
      let serverCreate = await serverModel.create({
        serverID: message.guild.id
    });
    serverCreate.save();
    serverData = await serverModel.findOne({ serverID: message.guild.id });
    }
  }catch(err){
    console.log(err)
  }
  console.log(serverData.selfRoleCategorys)
  if(serverData.selfRoleCategorys.length == 0){
    await serverModel.findOneAndUpdate({serverID: message.guild.id}, {selfRoleCategorys: ["none"]}, {upsert: true})
  }
  
  if(message.channel.id == serverData.suggestionChannel && !message.author.bot) return suggestion(Discord, client, message, serverData)
  const mention = message.mentions.users.first()

  if(mention){
    let mentionData = await profileModel.findOne({ userID: mention.id, serverID: message.guild.id });
    if(mentionData && mentionData.afk === "true"){
      let reason = `${text.translate["messageCreate"]["AFKREASON"][serverData.language]}`;
      if(mentionData.afkReason != "") reason = mentionData.afkReason;
      const afkEmbed = new Discord.MessageEmbed() .setDescription(`<@${mention.id}>, is afk! Reason: ${reason}`) .setColor("DARK_RED") .setTimestamp()
      message.reply({embeds: [afkEmbed]}).then(m => {setTimeout(() => {m.delete()}, 5000)})
    }
  }

    let profileData;
    try{
      profileData = await profileModel.findOne({ userID: message.author.id, serverID: message.guild.id });
      if(!profileData){
        let profile = await profileModel.create({
          userID: message.author.id,
          serverID: message.guild.id
      });
      profile.save();
      profileData = await profileModel.findOne({ userID: message.author.id, serverID: message.guild.id });
      }
    }catch(err){
      console.log(err)
    }
    
    if(!message.content.startsWith(serverData.prefix)) level(Discord, client, message, profileData, serverData)
  

    if(profileData.afk === "true"){
      message.reply({ content: `I removed your AFK status`}).then(m => {setTimeout(() => {m.delete()}, 5000)})
      await profileData.updateOne({ $set:{afk: "false", afkReason: ""}})
      const member = message.guild.members.cache.get(message.author.id)
      member.setNickname("").catch(console.error());
    }
    
    if(mention){
      if(!message.content.startsWith(serverData.prefix) && mention.id !== "818539916488081408") return;
    }else
      if(!message.content.startsWith(serverData.prefix)) return;

    const args = message.content.slice(serverData.prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();
    
    if(mention && mention.id === "818539916488081408" && !args[0]) return message.channel.send(`Der Prefix ist grade ${serverData.prefix}\nNutze ${serverData.prefix}help für weitere Infos!`)
    if(mention && mention.id === "818539916488081408" && args[0]) return 
    if(cmd === "" && message.author.bot) return
    const command = client.commands.get(cmd) || client.commands.find((a) => a.aliases && a.aliases.includes(cmd));
    if(!command) return;
    if(command.replaced == true) return message.reply(`${text.translate["general"]["REPLACED"][serverData.language].replace("bot.command", command.name)}`)
    
    const validPermissions = [
        "CREATE_INSTANT_INVITE",
        "KICK_MEMBERS",
        "BAN_MEMBERS",
        "ADMINISTRATOR",
        "MANAGE_CHANNELS",
        "MANAGE_GUILD",
        "ADD_REACTIONS",
        "VIEW_AUDIT_LOG",
        "PRIORITY_SPEAKER",
        "STREAM",
        "VIEW_CHANNEL",
        "SEND_MESSAGES",
        "SEND_TTS_MESSAGES",
        "MANAGE_MESSAGES",
        "EMBED_LINKS",
        "ATTACH_FILES",
        "READ_MESSAGE_HISTORY",
        "MENTION_EVERYONE",
        "USE_EXTERNAL_EMOJIS",
        "VIEW_GUILD_INSIGHTS",
        "CONNECT",
        "SPEAK",
        "MUTE_MEMBERS",
        "DEAFEN_MEMBERS",
        "MOVE_MEMBERS",
        "USE_VAD",
        "CHANGE_NICKNAME",
        "MANAGE_NICKNAMES",
        "MANAGE_ROLES",
        "MANAGE_WEBHOOKS",
        "MANAGE_EMOJIS",
      ];
    
      if(command.permissions.length) {
        let invalidPerms = [];
        for(const perm of command.permissions){
          if(!validPermissions.includes(perm)){
            return console.log(`Invalid Permissions ${perm}`);
          }
          if(!message.member.permissions.has(perm)){
            invalidPerms.push(perm);
          }
        }
        if(invalidPerms.length){
          let permText = "";
          for(let i = 0; i < invalidPerms.length; i++){
            if((i + 1) == invalidPerms.length)permText += invalidPerms[i].toUpperCase().slice(0, 1) + invalidPerms[i].slice(1).toLowerCase()
            else permText += invalidPerms[i].toUpperCase().slice(0, 1) + invalidPerms[i].slice(1).toLowerCase() + ", "
        }
          return message.channel.send(`Fehlende Berechtigungen: \`${permText}\``);
        }
      }

      if(!cooldowns.has(command.name)){
        cooldowns.set(command.name, new Discord.Collection());
    }

    const current_time = Date.now();
    const time_stamps = cooldowns.get(command.name);
    const cooldown_amount = (command.cooldown) * 1000;

    if(time_stamps.has(message.author.id)){
      const expiration_time = time_stamps.get(message.author.id) + cooldown_amount;

        if(current_time < expiration_time){
          const time_left = (expiration_time - current_time) / 60000;
          if(time_left < 1){
            const seconds = (time_left * 60)
            const secondsEmbed = new Discord.MessageEmbed() .setDescription(`<@${message.author.id}>, du musst noch ${seconds.toFixed(1)} Sekunden warten bevor du den ${command.name} Command ausführen kannst!`) .setColor('DARK_RED');
            message.channel.send({embeds: [secondsEmbed]});
            return
          }else {
            const minuteEmbed = new Discord.MessageEmbed() .setDescription(`<@${message.author.id}>, du musst noch ${time_left.toFixed(1)} Minuten warten bevor du den ${command.name} Command ausführen kannst!`) .setColor('DARK_RED');
            return message.channel.send({embeds: [minuteEmbed]});
          }
        }
    }

    time_stamps.set(message.author.id, current_time);
    setTimeout(() => time_stamps.delete(message.author.id), cooldown_amount);

    if(command){
      try{
        command.execute(client, message, args, cmd, Discord, text, profileData, serverData)
      }catch(err){
        console.error(err)
      }
  };
}
