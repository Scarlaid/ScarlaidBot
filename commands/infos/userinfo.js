
const { MessageEmbed } = require('discord.js');


module.exports = {
    name: 'userinfo',
    aliases: ['ui'],
    category: 'Infos',
    utilisation: '{prefix}userinfo',
        execute: (client, message, args) => {
		const user =			message.mentions.members.first()
			|| message.guild.members.cache.get(args[0])
			|| message.member;

		let status;

		const embed = new MessageEmbed()
			.setTitle(`Thông tin về ${user.user.username}`)
			.setColor('RANDOM')
			.setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
			.addFields(
				{
					name: '**Tên: **',
					value: `${user.user.username}#${user.user.discriminator}`,
					inline: true,
				},
				{
					name: '**Biệt danh**',
					value: `${user.nickname}`,
					inline: true,

				},
				{
					name: '**ID: **',
					value: user.user.id,
				},
				{
					name: 'Roles',
					value: user.roles.cache.map((role) => role.toString()).join(' '),
					inline: true,
				},
				{
					name: 'Ảnh đại diện: ',
					value: `[Click Here](${user.user.displayAvatarURL()})`,
				},
				{
					name: 'Ngày tạo tài khoản',
					value: user.user.createdAt.toLocaleDateString('vi-vn'),
					inline: true,
				},
				{
					name: 'Ngày tham gia server',
					value: user.joinedAt.toLocaleDateString('vi-vn'),
					inline: true,
				},
				

			);
		return message.channel.send(embed)
		.then(msg => {
            setTimeout(() => msg.delete(), 15000)
          });
	},
};
