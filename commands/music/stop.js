module.exports = {
    name: 'stop',
    aliases: ['dc','disconnect'],
    category: 'Music',
    utilisation: '{prefix}stop',

    execute(client, message) {
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - Bạn cần vào một kênh voice để sử dụng bot, hãy thử lại sau.`)
        .then(msg => {
            setTimeout(() => msg.delete(), 15000)
          });

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - Bot đang được sử dụng ở một kênh khác!`)
        .then(msg => {
            setTimeout(() => msg.delete(), 15000)
          });

        if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} - Không có nhạc đang được phát`)
        .then(msg => {
            setTimeout(() => msg.delete(), 15000)
          });

        client.player.setRepeatMode(message, false);
        const success = client.player.stop(message);

        if (success) message.channel.send(`${client.emotes.goodbye} - **Stopped**. Bot đã dừng phát nhạc và rời khỏi kênh.`)
        .then(msg => {
            setTimeout(() => msg.delete(), 15000)
          });
    },
};