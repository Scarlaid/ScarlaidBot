const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'serverinfo',
    aliases: ['si'],
    category: 'Infos',
    utilisation: '{prefix}serverinfo',
        execute: (client, message, args) => {
		const user =			message.mentions.members.first()
			|| message.guild.members.cache.get(args[0])
			|| message.member;

		const embed = new MessageEmbed()
			.setThumbnail(message.guild.iconURL({ dynamic: true }))
			.setColor('RANDOM')
			.setTitle(`Thông tin về ${message.guild.name}`)
			.addFields(

				{
					name: 'Chủ server: ',
					value: '<@699512154004652093>',
					inline: true
				},	
				{	
					name: 'Số thành viên: ',
					value: `có ${message.guild.memberCount} thành viên`,
					inline: true,
				},
				{
					name: 'Ngày tạo: ',
					value: message.guild.createdAt.toLocaleDateString('vi-vn'),
					inline: true,
				},
				{
					name: 'Số lượng role: ',
					value: `có tất cả ${message.guild.roles.cache.size} roles trong server.`,
					inline: true,
				},
				{
					name: 'Lượng Boosters: ',
					value: message.guild.premiumSubscriptionCount >= 1 ? `Server có ${message.guild.premiumSubscriptionCount}/30 Boosts` : 'Server không có booster nào',
					inline: true,
				},

			);
		return message.channel.send(embed)
		.then(msg => {
            setTimeout(() => msg.delete(), 15000)
          });
	},
};