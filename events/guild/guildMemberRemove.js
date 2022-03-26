module.exports = async (Discord, client, guildMember) =>{
    const log = await guildMember.guild.fetchAuditLogs({
		limit: 1,
		type: 'MEMBER_KICK',
	});

    const kickLog = log.entries.first();
    if (!kickLog) {
      guildMember.guild.channels.cache.get(`825062516853440554`).send({embeds: [new Discord.MessageEmbed() .setDescription(`${guildMember} left the server!`)]});
    }

    const { executor, target } = kickLog;
    if (target.id === guildMember.id) {
		guildMember.guild.channels.cache.get(`825062516853440554`).send({embeds: [new Discord.MessageEmbed() .setDescription(`${target} was banned by ${executor}!`)]});
	} else {
		guildMember.guild.channels.cache.get(`825062516853440554`).send({embeds: [new Discord.MessageEmbed() .setDescription(`${guildMember} left the server!`)]});
	}
}