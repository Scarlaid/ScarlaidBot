module.exports = {
    name: 'shuffle',
    aliases: ['sh'],
    category: 'Music',
    utilisation: '{prefix}shuffle',

    execute(client, message) {
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - Bạn cần vào một kênh voice để sử dụng bot, hãy thử lại sau.`)
        .then(msg => {
            setTimeout(() => msg.delete(), 15000)
          });

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - Bot đang được sử dụng ở một kênh khác!`)
        .then(msg => {
            setTimeout(() => msg.delete(), 15000)
          });

        if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} - Không có nhạc nào đang được phát!`)
        .then(msg => {
            setTimeout(() => msg.delete(), 15000)
          });

        const success = client.player.shuffle(message);

        if (success) message.channel.send(`${client.emotes.success} - Đã đảo lộn **${client.player.getQueue(message).tracks.length}** bài nhạc!`)
        .then(msg => {
            setTimeout(() => msg.delete(), 15000)
          });
    },
};