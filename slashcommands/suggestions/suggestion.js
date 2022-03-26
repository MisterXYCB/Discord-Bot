const { SlashCommandBuilder } = require(`@discordjs/builders`);
const suggestionModel = require('../../models/suggestionSchema')

module.exports = {
    name: `suggestion`,
    category: "suggestions",
	data: new SlashCommandBuilder()
	.setName(`suggestion`)
	.setDescription(`With this command you can approve, reject and comment suggestions!`)
    .addSubcommand(subcommand =>
        subcommand.setName(`approve`)
        .setDescription(`The command to approve a suggestion!`)
        .addStringOption(option =>
            option.setName(`id`)
            .setDescription(`The id of the suggestion you want to approve!`)
            .setRequired(true))
        .addStringOption(option =>
            option.setName(`comment`)
            .setDescription(`Here you can comment the suggestion!`)))
    .addSubcommand(subcommand =>
        subcommand.setName(`reject`)
        .setDescription(`The command to reject a suggestion!`)
        .addStringOption(option =>
            option.setName(`id`)
            .setDescription(`The id of the suggestion you want to approve!`)
            .setRequired(true))
        .addStringOption(option =>
            option.setName(`comment`)
            .setDescription(`Here you can comment the suggestion!`)))
    .addSubcommand(subcommand =>
        subcommand.setName(`comment`)
        .setDescription(`The command to comment a suggestion!`)
        .addStringOption(option =>
            option.setName(`id`)
            .setDescription(`The id of the suggestion you want to approve!`)
            .setRequired(true))
        .addStringOption(option =>
            option.setName(`comment`)
            .setDescription(`Your comment for the suggestion!`)
            .setRequired(true)))
    .addSubcommand(subcommand =>
        subcommand.setName(`initialization`)
        .setDescription(`The command to initialize the suggestions channels!`)),
    /*...*/
	async execute(client, interaction, Discord, text, profileData, serverData){
        await interaction.deferReply({ephemeral: true})
        if(!interaction.member.permissions.has("ADMINISTRATOR") && !interaction.member.roles.cache.has(serverData.modRole) && !interaction.member.roles.cache.has(serverData.adminRole)) return interaction.editReply(`${text.translate["general"]["NO_PERMISSION"][serverData.language]}`)
        if(interaction.options.getSubcommand() == "approve"){
            const channel = interaction.guild.channels.cache.get(serverData.acceptedChannel);
        
            const channelEmbed = new Discord.MessageEmbed() .setDescription(text.translate["approve"]["NO_CHANNEL"][serverData.language]) .setColor('DARK_RED') .setTimestamp();
            if(!channel) return interaction.editReply({embeds: [channelEmbed]});
            
            const suggestionData = await suggestionModel.findOne({ messageID: interaction.options.getString(`id`) })
            if(!suggestionData) return interaction.editReply(`${text.translate["approve"]["NO_ID"][serverData.language]}`)
            const author = client.users.cache.get(suggestionData.authorID)
            const channel2 = client.channels.cache.get(serverData.suggestionChannel)
            await channel2.messages.fetch(suggestionData.embedID)
            const oldEmbed = channel2.messages.cache.get(suggestionData.embedID)
            const likes = await oldEmbed.reactions.cache.get("✅")
            const dislikes = await oldEmbed.reactions.cache.get("❌")

            const embed = new Discord.MessageEmbed()
            .setColor('25FF25')
            .setAuthor(author.tag, author.displayAvatarURL({ dynamic: true }))
            .addFields(
                {name: "Suggestion:", value: suggestionData.suggestion},
                {name: `${text.translate["approve"]["REACTION"][serverData.language]}`, value: "✅ = " + (likes.count - 1) + "\n❌ = " + (dislikes.count - 1)}
            )
            .setTimestamp();
            
            if(interaction.options.getString(`comment`) || suggestionData.comment !== "") embed.addField(`${text.translate["approve"]["COMMENT"][serverData.language]}`, interaction.options.getString(`comment`) || suggestionData.comment)


            channel.send({ content: `${text.translate["approve"]["APPROVED"][serverData.language].replace("bot.member", suggestionData.authorID)}`, embeds: [embed] })
            oldEmbed.delete()
            const replyEmbed = new Discord.MessageEmbed() .setDescription(text.translate["approve"]["ANSWER"][serverData.language]) .setColor('25FE25') .setTimestamp();
            interaction.editReply({ embeds: [replyEmbed]})
            await suggestionData.remove()
        }else if(interaction.options.getSubcommand() == "reject"){
            const channel = interaction.guild.channels.cache.get(serverData.deniedChannel);
        
            const channelEmbed = new Discord.MessageEmbed() .setDescription(text.translate["reject"]["NO_CHANNEL"][serverData.language]) .setColor('DARK_RED') .setTimestamp();
            if(!channel) return interaction.editReply({embeds: [channelEmbed]});
            
            const suggestionData = await suggestionModel.findOne({ messageID: interaction.options.getString(`id`) })
            if(!suggestionData) return interaction.editReply(`${text.translate["reject"]["NO_ID"][serverData.language]}`)
            const author = client.users.cache.get(suggestionData.authorID)
            const channel2 = client.channels.cache.get(serverData.suggestionChannel)
            await channel2.messages.fetch(suggestionData.embedID)
            const oldEmbed = channel2.messages.cache.get(suggestionData.embedID)
            const likes = await oldEmbed.reactions.cache.get("✅")
            const dislikes = await oldEmbed.reactions.cache.get("❌")

            const embed = new Discord.MessageEmbed()
            .setColor('DARK_RED')
            .setAuthor(author.tag, author.displayAvatarURL({ dynamic: true }))
            .addFields(
                {name: "Suggestion:", value: suggestionData.suggestion},
                {name: `${text.translate["reject"]["REACTION"][serverData.language]}`, value: "✅ = " + (likes.count - 1) + "\n❌ = " + (dislikes.count - 1)}
            )
            .setTimestamp();
            
            if(interaction.options.getString(`comment`) || suggestionData.comment !== "") embed.addField(`${text.translate["reject"]["COMMENT"][serverData.language]}`, interaction.options.getString(`comment`) || suggestionData.comment)


            channel.send({content: `${text.translate["reject"]["REJECTED"][serverData.language].replace("bot.member", suggestionData.authorID)}`, embeds: [embed]})
            oldEmbed.delete()
            const replyEmbed = new Discord.MessageEmbed() .setDescription(text.translate["reject"]["ANSWER"][serverData.language]) .setColor('25FE25') .setTimestamp();
            interaction.editReply({ embeds: [replyEmbed]})
            await suggestionData.remove()
        }else if(interaction.options.getSubcommand() == "comment"){
            const channel = interaction.guild.channels.cache.get(serverData.suggestionChannel);
        
            const channelEmbed = new Discord.MessageEmbed() .setDescription(text.translate["comment"]["NO_CHANNEL"][serverData.language]) .setColor('DARK_RED') .setTimestamp();
            if(!channel) return interaction.editReply({embeds: [channelEmbed]});
            
            const suggestionData = await suggestionModel.findOne({ messageID: interaction.options.getString(`id`) })
            if(!suggestionData) return interaction.editReply(`${text.translate["comment"]["NO_ID"][serverData.language]}`)
            const author = client.users.cache.get(suggestionData.authorID)
            await channel.messages.fetch(suggestionData.embedID)
            const oldEmbed = channel.messages.cache.get(suggestionData.embedID)

            const embed = new Discord.MessageEmbed()
            .setColor('304281')
            .setAuthor(author.tag, author.displayAvatarURL({ dynamic: true }))
            .setDescription(suggestionData.suggestion)
            .addField(`${text.translate["comment"]["COMMENT"][serverData.language]}`, interaction.options.getString(`comment`))
            .setFooter("ID:" + suggestionData.messageID)
            .setTimestamp()

            oldEmbed.edit({embeds: [embed]})
            const replyEmbed = new Discord.MessageEmbed() .setDescription(text.translate["comment"]["ANSWER"][serverData.language]) .setColor('25FE25') .setTimestamp();
            interaction.editReply({embeds: [replyEmbed]})
            await suggestionData.updateOne({$set: {comment: interaction.options.getString(`comment`)}})
        }else if(interaction.options.getSubcommand() == "initialization"){
            let suggestionChannel = interaction.guild.channels.cache.get(serverData.suggestionChannel);
            let suggestionCategory = interaction.guild.channels.cache.get(serverData.suggestionCategory);
            let deniedChannel = interaction.guild.channels.cache.get(serverData.deniedChannel);
            let acceptedChannel = interaction.guild.channels.cache.get(serverData.acceptedChannel);
            
            if(!suggestionChannel){
                suggestionChannel = await interaction.guild.channels.create("suggestions", {type: 'GULD_TEXT'});
                await serverData.updateOne({ $set: { suggestionChannel: suggestionChannel.id }})
                if(suggestionCategory){
                    await suggestionChannel.setParent(suggestionCategory)
                }
            }
            
            if(!acceptedChannel){
                acceptedChannel = await interaction.guild.channels.create("✅ accepted-suggestions", {type: 'GUILD_TEXT', });
                await serverData.updateOne({ $set: { acceptedChannel: acceptedChannel.id }})
                if(suggestionCategory){
                    await acceptedChannel.setParent(suggestionCategory)
                    acceptedChannel.permissionOverwrites.create(interaction.guild.roles.everyone, {
                        SEND_MESSAGES: false
                    })
                }
            }
            
            if(!deniedChannel){
                deniedChannel = await interaction.guild.channels.create("❌ denied-suggestions", {type: 'GUILD_TEXT',});
                await serverData.updateOne({ $set: { deniedChannel: deniedChannel.id }})
                if(suggestionCategory){
                    await deniedChannel.setParent(suggestionCategory)
                    deniedChannel.permissionOverwrites.create(interaction.guild.roles.everyone, {
                        SEND_MESSAGES: false
                    })
                }
            }
            
            if(!suggestionCategory){
                suggestionCategory = await interaction.guild.channels.create("Suggestions", {type: 'GUILD_CATEGORY'});
                await serverData.updateOne({ $set: { suggestionCategory: suggestionCategory.id }})
                await suggestionChannel.setParent(suggestionCategory)
                await acceptedChannel.setParent(suggestionCategory)
                await deniedChannel.setParent(suggestionCategory)
                deniedChannel.permissionOverwrites.create(interaction.guild.roles.everyone, {
                    SEND_MESSAGES: false
                })
                acceptedChannel.permissionOverwrites.create(interaction.guild.roles.everyone, {
                    SEND_MESSAGES: false
                })
            }
            const embed = new Discord.MessageEmbed() .setDescription(text.translate["suggestioninit"]["ANSWER"][serverData.language]) .setColor('25FE25') .setTimestamp()
            interaction.editReply({embeds: [embed]})
        }
    },
};