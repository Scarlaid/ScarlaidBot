

module.exports = {
    name: 'holohelp',
    aliases: ['hlh', 'hhelp'],
    category: 'helpanel',
    utilisation: '{prefix}holohelp <command name>',

    execute(client, message, args) {
        
        if (!args[0]) {

            message.channel.send({
                embed: {
                    color: 'RANDOM',
                    author: { name: 'Bảng hỗ trợ' },
                    footer: { text: 'Powered by Scarlaid' },
                    fields: [
                        {name: 'Hololive Gen 0', value: '`Sora`, `Roboco`, `Miko`, `Suisei`, `AZKi`' },
                        {name: 'Holilive 1st Gen', value: '`Mel`, `Fubuki`, `Matsuri`, `Rosenthal`, `Haato`, `Chris`' },
                        {name: 'Hololive 2nd Gen', value: '`Aqua`, `Shion`,`Ayame`, `Choco`,`Subaru`' }, 
                        {name: 'Hololive GAMERS', value: '`Fubuki`, `Mio`, `Okayu`, `Korone`'},
                        {name: 'hololive 3rd Gen', value: '`Pekora`, `Rushia`, `Flare`, `Noel`, `Marine`'},
                        {name: 'Hololive 4th Gen', value: '`Kanata`, `Watame`,`Towa`, `Luna`, `Coco`' },
                        {name: 'Hololive 5th Gen', value: '`Lamy`, `Nene`, `Botan`, `Polka`, `Aloe`'},
                        {name: 'INoNaKaM MUSIC', value: '`AZKi`'},
                        {name: 'Hololive ID 1st Gen', value: '`Risu`, `Moona`, `Iofi`'},
                        {name: 'Hololive ID 2nd Gen', value: '`Ollie`, `Melfissa`, `Reine`'},
                        {name: 'Hololive EN -Myth-', value: '`Calliope`, `Kiara`, `Ina`, `Gura`, `Amelia`'},
                        {name: 'Hololive EN [HOPE]', value: '`Irys`'},
                        {name: 'Hololive EN -Council', value: '`Sana`, `Fauna`, `Kronii`, `Mumei`, `Baelz`'},
                        {name: 'Hololive CN 1st Gen', value: '`Yogiri`, `Civia`, `Spade`'},
                        {name: 'Hololive CN 2nd Gen', value: '`Doris`, `Rosalyn`, `Artia`'},
                    ],
                    timestamp: new Date(),
                    description: `Với nhân vật Hololive, lệnh có chữ cái đầu không viết hoa. 
                    Mọi bức ảnh đều được lấy từ Danbooru (Random NSFW/SFW)`,
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
    