

module.exports = {
    name: 'help',
    aliases: ['h'],
    category: 'Core',
    utilisation: '{prefix}help <command name>',

    execute(client, message, args) {
        
        if (!args[0]) {
            const infos = message.client.commands.filter(x => x.category == 'Infos').map((x) => '`' + x.name + '`').join(', ');
            const music = message.client.commands.filter(x => x.category == 'Music').map((x) => '`' + x.name + '`').join(', ');
            const helpanel = message.client.helpanel.map((x) => '`' + x.name + '`').join(', ');

            message.channel.send({
                embed: {
                    color: 'RANDOM',
                    author: { name: 'Bảng hỗ trợ' },
                    footer: { text: 'Powered by Scarlaid' },
                    fields: [
                        { name: '**General**', value: infos },
                        { name: '**Music**', value: music },
                        { name: '**Others**', value: helpanel },
                        { name: '**Filter**', value: client.filters.map((x) => '`' + x + '`').join(', ') },
                    ],
                    timestamp: new Date(),
                    description: `Để dùng filters, ${client.config.discord.prefix}filter (loại filter). Ví dụ: ${client.config.discord.prefix}filter 8D. 
                    Với nhân vật Hololive, lệnh có chữ cái đầu không viết hoa (Random NSFW/SFW)`,
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
    