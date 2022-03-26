const { SlashCommandBuilder } = require(`@discordjs/builders`);
const reactionRoleModel = require('../../models/reactionRoleSchema')

module.exports = {
    name: `welcome`,
	data: new SlashCommandBuilder()
	.setName(`welcome`)
	.setDescription(`The welcome plugin`)
    .addSubcommand(subcommand =>
        subcommand.setName(`message`)
        .setDescription(`Lets you add a reaction role to an already existing message!`)
        .addStringOption(option =>
            option.setName(`message`)
                .setDescription(`The message that will be send! Supported vars: {user.mention}, {user.name} {server.name}`)
                .setRequired(true)))
    .addSubcommand(subcommand =>
        subcommand.setName(`channel`)
        .setDescription(`The channel where the message will be send to!`)
        .addChannelOption(option =>
            option.setName(`channel`)
                .setDescription(`The channel where the message will be send to!`)
                .setRequired(true)))
    .addSubcommandGroup(subcommandgroup =>
        subcommandgroup.setName(`roles`)
        .setDescription("Automatically assign user roles")
        .addSubcommand(subcommand =>
            subcommand.setName(`add`)
                .setDescription(`TEST`)
                .addRoleOption(option =>
                    option.setName(`role`)
                    .setDescription(`TEST`)
                    .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand.setName(`remove`)
                .setDescription(`TEST`)
                .addRoleOption(option =>
                    option.setName(`role`)
                    .setDescription(`TEST`)
                    .setRequired(true)))),
    /*...*/
	async execute(client, interaction, Discord, text, profileData, serverData){
        await interaction.deferReply({ephemeral: true})
        if(!interaction.member.permissions.has("ADMINISTRATOR") && !interaction.member.roles.has(serverData.adminRole)) return interaction.editReply(`${text.translate["general"]["NO_PERMISSION"][serverData.language]}`)

        if(interaction.options.getSubcommand() == "withoutmessage"){
            const channelID = interaction.options.getString("messagelink").split(`${interaction.guild.id}/`)[1].split("/")[0]
            const msgID = interaction.options.getString("messagelink").split(`${interaction.guild.id}/`)[1].split("/")[1]
            const channel = await client.channels.fetch(channelID)
            const msg = await channel.messages.fetch(msgID)
            if(!msg) return interaction.editReply(`${text.translate["reactionrole"]["NO_MESSAGE"][serverData.language]}`)
            if(!interaction.options.getString(`emoji`).match(/<:.+?:\d+>/g)) return interaction.editReply(`${text.translate["reactionrole"]["NO_EMOJI"][serverData.language]}`)
            msg.react(interaction.options.getString(`emoji`))

            await reactionRoleModel.create({
                messageID: msg.id,
                reaction: interaction.options.getString(`emoji`),
                roleID: interaction.options.getRole(`role`).id
            })
            interaction.editReply(`${text.translate["reactionrole"]["SUCCESS"][serverData.language]}`)
        }else if(interaction.options.getSubcommand() == "withmessage"){
            return interaction.editReply(`${text.translate["general"]["LATER"][serverData.language]}`)
        }else if(interaction.options.getSubcommand() == "remove"){
            const channelID = interaction.options.getString("messagelink").split(`${interaction.guild.id}/`)[1].split("/")[0]
            const msgID = interaction.options.getString("messagelink").split(`${interaction.guild.id}/`)[1].split("/")[1]
            const channel = await client.channels.fetch(channelID)
            const msg = await channel.messages.fetch(msgID)
            if(!interaction.options.getString(`emoji`).match(/<:.+?:\d+>/g)) return interaction.editReply(`${text.translate["reactionrole"]["NO_EMOJI"][serverData.language]}`)
            const reactionData = await reactionRoleModel.findOne({messageID: msgID, reaction: interaction.options.getString(`emoji`)})
            if(!reactionData) interaction.editReply(`${text.translate["reactionrole"]["NO_DATA"][serverData.language]}`)
            console.log(interaction.options.getString(`emoji`).split(":")[2].split(">")[0])
            msg.reactions.resolve(interaction.options.getString(`emoji`).split(":")[2].split(">")[0]).remove()
            await reactionData.delete()
            interaction.editReply(`${text.translate["reactionrole"]["REMOVED"][serverData.language]}`)
        }
    },
};