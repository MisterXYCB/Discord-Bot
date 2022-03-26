const ms = require('ms')
const { SlashCommandBuilder } = require(`@discordjs/builders`);

module.exports = {
    name: `slowmode`,
    category: "moderation",
	data: new SlashCommandBuilder()
	.setName(`slowmode`)
	.setDescription(`Let's you change the slowmode of a channel!`)
    .addSubcommand(subcommand => 
        subcommand.setName(`off`)
        .setDescription(`Turns the slowmode off!`)
        .addChannelOption(option =>
            option.setName(`channel`)
            .setDescription(`The user that will be kicked!`)))
    .addSubcommand(subcommand => 
            subcommand.setName(`on`)
            .setDescription(`Turns the slowmode on!`)
        .addStringOption(option =>
            option.setName(`time`)
            .setDescription(`The time the slowmode should be set to!`)
            .setRequired(true))
        .addChannelOption(option =>
            option.setName(`channel`)
            .setDescription(`The user that will be kicked!`))),
    /*...*/
	async execute(client, interaction, Discord, text, profileData, serverData){
        await interaction.deferReply({ephemeral: true});
        if(!interaction.member.permissions.has("ADMINISTRATOR") && !interaction.member.permissions.has("MANAGE_CHANNELS") && !interaction.member.roles.cache.has(serverData.modRole) && !interaction.member.roles.cache.has(serverData.adminRole)) return interaction.editReply(`${text.translate["general"]["NO_PERMISSION"][serverData.language]}`)
        if(interaction.options.getSubcommand() == "on"){
            let channel;
            if(interaction.options.getChannel(`channel`) && interaction.options.getChannel(`channel`).type == "GUILD_TEXT") channel = interaction.options.getChannel(`channel`);
            else channel = interaction.channel;
            const time = ms(interaction.options.getString(`time`))/1000
            try{    
                channel.setRateLimitPerUser(time)
            }catch(err){
                console.log(err)
                interaction.editReply(`${text.translate["general"]["ERROR"][serverData.language]}`)
                return
            }
            const successEmbed = new Discord.MessageEmbed() .setDescription(`${text.translate["slowmode"]["ON"][serverData.language].replace("bot.channel", channel).replace("bot.time", ms(1000 * time))}`) .setColor('25FE25') .setTimestamp()
            interaction.editReply({embeds: [successEmbed], ephemeral: true});
        }else if(interaction.options.getSubcommand() == "off"){
            let channel;
            if(interaction.options.getChannel(`channel`) && interaction.options.getChannel(`channel`).type == "GUILD_TEXT") channel = interaction.options.getChannel(`channel`);
            else channel = interaction.channel;
            try{    
                channel.setRateLimitPerUser(0)
            }catch(err){
                console.log(err)
                interaction.editReply(`${text.translate["general"]["ERROR"][serverData.language]}`)
                return
            }
            const successEmbed = new Discord.MessageEmbed() .setDescription(`${text.translate["slowmode"]["OFF"][serverData.language].replace("bot.channel", channel)}`) .setColor('25FE25') .setTimestamp()
            interaction.editReply({embeds: [successEmbed], ephemeral: true});
        }
    },
};