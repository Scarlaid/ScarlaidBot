

module.exports = {
    name: 'akaneko',
    aliases: ['akahelp', 'akah'],
    category: 'helpanel',
    utilisation: '{prefix}akaneko <command name>',

    execute(client, message, args) {
        
        if (!args[0]) {
            const sfwimg = message.client.akanekoimage.filter(x => x.category == 'sfw').map((x) => '`' + x.name + '`').join(', ');
            const lewdimg = message.client.akanekoimage.filter(x => x.category == 'lewd').map((x) => '`' + x.name + '`').join(', ');

            message.channel.send({
                embed: {
                    color: 'RANDOM',
                    author: { name: 'Bảng hỗ trợ' },
                    footer: { text: 'Powered by Scarlaid' },
                    fields: [
                        { name: '**NSFW**', value: lewdimg },
                        { name: '**SFW**', value: sfwimg },                        
                    ],
                    timestamp: new Date(),
                    description: `Ảnh dựa theo Akaneko API, chúc vui vẻ`,
                },
              
                
            })
            .then(msg => {
                setTimeout(() => msg.delete(), 15000)
              });
        } else {
            const command = message.client.commands.get(args.join(" ").toLowerCase()) || message.client.commands.find(x => x.aliases && x.aliases.includes(args.join(" ").toLowerCase()));

            if (!command) return message.channel.send(`${client.emotes.error} - Lệnh không tồn tại, vui lòng thử lại.`)
            .then(msg => {
                setTimeout(() => msg.delete(), 15000)
              });

            message.channel.send({
                embed: {
                    color: 'RANDOM',
                    author: { name: 'Bảng hỗ trợ' },
                    footer: { text: 'Powered by Scarlaid' },
                    fields: [
                        { name: 'Name', value: command.name, inline: true },
                        { name: 'Category', value: command.category, inline: true },
                        { name: 'Aliase(s)', value: command.aliases.length < 1 ? 'None' : command.aliases.join(', '), inline: true },
                        { name: 'Utilisation', value: command.utilisation.replace('{prefix}', client.config.discord.prefix), inline: true },
                    ],
                    timestamp: new Date(),
                    description: 'Tìm thông tin về lệnh được đặt ra.',
                }
            })
            .then(msg => {
                setTimeout(() => msg.delete(), 15000)
              });
        };
    },
};
    