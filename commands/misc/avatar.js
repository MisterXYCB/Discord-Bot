module.exports = {
    name: 'avatar',
    aliases: ['icon', 'pfp', 'profilepic'],
    permissions: [],
    cooldown: 10,
    description: 'Return a user(s) avatar picture!',category: "misc",
    adminonly: false,
    activ: true,
    execute(client, message, args, cmd, Discord, profileData, roleData, prefix) {
        const { guild } = message

        if (!message.mentions.users.size) {
            return message.channel.send(`**Dein Avatar:** ${message.author.displayAvatarURL({ dynamic: true })}`);
        }

        const avatar_list = message.mentions.users.map(user => {
            return `**${user.username}'s Avatar: ** ${user.displayAvatarURL({ dynamic: true })}`;
        });

        message.channel.send({content: `${avatar_list}`});
    }
}