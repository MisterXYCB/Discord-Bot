const path = require('path');
const profileModel = require('../../models/profileSchema');
const serverModel = require('../../models/serverSchema');
const text = require('../../lang.json')

module.exports = async (Discord, client, interaction) => {
    if(interaction){
        let serverData;
        try{
            serverData = await serverModel.findOne({ serverID: interaction.guild.id });
            if(!serverData){
            let serverCreate = await serverModel.create({
                serverID: interaction.guild.id
            });
            serverCreate.save();
            serverData = await serverModel.findOne({ serverID: interaction.guild.id });
            }
        }catch(err){
            console.log(err)
        }
        
        let profileData;
        try{
        profileData = await profileModel.findOne({ userID: interaction.member.id, serverID: interaction.guild.id });
        if(!profileData){
            let profile = await profileModel.create({
            userID: interaction.member.id,
            serverID: interaction.guild.id
        });
        profile.save();
        profileData = await profileModel.findOne({ userID: interaction.member.id, serverID: interaction.guild.id });
        }
        }catch(err){
        console.log(err)
        }

        if(interaction.isButton()){

            const folder = interaction.customId.split("/")[0]
            const file = interaction.customId.split("/")[1]
            const button = require(`../../interactions/buttons/${folder}/${file}`)
            try{
                button.execute(client, interaction, Discord, text, profileData, serverData)
            }catch(err){
                console.error(err)
            }
        }
        if(interaction.isCommand()){
            const command = client.slashcommands.get(interaction.commandName);

            try{
                command.execute(client, interaction, Discord, text, profileData, serverData)
                console.log(command.name)
            }catch(err){
                console.error(err)
            }
        }
        if(interaction.isSelectMenu()){
            const folder = interaction.customId.split("/")[0]
            const file = interaction.customId.split("/")[1]
            const menu = require(`../../interactions/menu/${folder}/${file}`)
            try{
                menu.execute(client, interaction, Discord, text, profileData, serverData)
            }catch(err){
                console.error(err)
            }
        }
    }
}