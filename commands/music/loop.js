module.exports = {
    name: 'loop',
    aliases: ['lp', 'repeat'],
    category: 'Music',
    utilisation: '{prefix}loop',

    execute(client, message, args) {
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - Bạn cần vào một kênh voice để sử dụng bot, hãy thử lại sau.`)
        .then(msg => {
            setTimeout(() => msg.delete(), 15000)
          });

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`Bot đang được sử dụng ở một kênh khác`)
        .then(msg => {
            setTimeout(() => msg.delete(), 15000)
          });
        
        if (!client.player.getQueue(message)) return message.channel.send(`Không có bài nào đang được phát trong Queue`)
        .then(msg => {
            setTimeout(() => msg.delete(), 15000)
          });

        if (args.join(" ").toLowerCase() === 'queue') {
            if (client.player.getQueue(message).loopMode) {
                client.player.setLoopMode(message, false);
                return message.channel.send(`${client.emotes.success} - Chế độ lặp lại: **Disabled**`)
                .then(msg => {
                    setTimeout(() => msg.delete(), 15000)
                  });
            } else {
                client.player.setLoopMode(message, true);
                return message.channel.send(`:repeat: - Chế độ lặp lại: **Enabled** | Toàn bộ queue sẽ được lặp lại liên tục.`)
                .then(msg => {
                    setTimeout(() => msg.delete(), 15000)
                  });
            };
        } else {
            if (client.player.getQueue(message).repeatMode) {
                client.player.setRepeatMode(message, false);
                return message.channel.send(`Chế độ lặp lại: **Disabled**`)
                .then(msg => {
                    setTimeout(() => msg.delete(), 15000)
                  });
            } else {
                client.player.setRepeatMode(message, true);
                return message.channel.send(`:repeat_one: - Chế độ lặp lại: **Enabled** | Bài hát hiện tại sẽ được lặp lại liên tục.`)
                .then(msg => {
                    setTimeout(() => msg.delete(), 15000)
                  });
            };
        };
    },
};