const { SlashCommandBuilder } = require(`@discordjs/builders`);
const reactionRoleModel = require('../../models/reactionRoleSchema')

module.exports = {
    name: `reactionrole`,
	data: new SlashCommandBuilder()
	.setName(`reactionrole`)
	.setDescription(`add a category`)
    .addSubcommand(subcommand =>
        subcommand.setName(`withoutmessage`)
        .setDescription(`Lets you add a reaction role to an already existing message!`)
        .addStringOption(option =>
            option.setName(`messagelink`)
                .setDescription(`The link of the message you want to add the reaction role`)
                .setRequired(true))
        .addStringOption(option =>
            option.setName(`emoji`)
                .setDescription(`The reaction that will need to be clicked`)
                .setRequired(true))
        .addRoleOption(option =>
            option.setName(`role`)
                .setDescription(`The role that will be added`)
                .setRequired(true)))
    .addSubcommand(subcommand =>
        subcommand.setName(`withmessage`)
        .setDescription(`Lets you add a reaction role with a custom message already existing message!`)
        .addStringOption(option =>
            option.setName(`message`)
                .setDescription(`The text in the embed`)
                .setRequired(true))
        .addStringOption(option =>
            option.setName(`emoji`)
                .setDescription(`The reaction that will need to be clicked`)
                .setRequired(true))
        .addStringOption(option =>
            option.setName(`color`)
                .setDescription(`The color of the embed`)
                .setRequired(true))
        .addRoleOption(option =>
            option.setName(`role`)
            .setDescription(`The role that will be added`)
            .setRequired(true)))
    .addSubcommand(subcommand =>
        subcommand.setName(`remove`)
        .setDescription("Remove a reaction role")
        .addStringOption(option =>
            option.setName(`messagelink`)
                .setDescription(`The link of the message you want to add the reaction role`)
                .setRequired(true))
        .addStringOption(option =>
            option.setName(`emoji`)
                .setDescription(`The reaction that will need to be clicked`)
                .setRequired(true))),
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