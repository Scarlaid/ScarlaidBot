module.exports = {
    name: 'pause',
    aliases: ['ps'],
    category: 'Music',
    utilisation: '{prefix}pause',

    execute(client, message) {
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - Bạn cần vào một kênh voice để sử dụng bot, hãy thử lại sau.`)
        .then(msg => {
            setTimeout(() => msg.delete(), 15000)
          });

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - Bot đang được sử dụng ở một kênh khác!`)
        .then(msg => {
            setTimeout(() => msg.delete(), 15000)
          });
        
        if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} - Bạn cần vào một kênh voice để sử dụng bot, hãy thử lại sau.`)
        .then(msg => {
            setTimeout(() => msg.delete(), 15000)
          });

        if (client.player.getQueue(message).paused) return message.channel.send(`${client.emotes.success} - Bot đã dừng phát nhạc.`)
        .then(msg => {
            setTimeout(() => msg.delete(), 15000)
          });

        const success = client.player.pause(message);

        if (success) message.channel.send(`${client.emotes.success} - Đã dừng ${client.player.getQueue(message).playing.title}`)
        .then(msg => {
            setTimeout(() => msg.delete(), 15000)
          });
    },
};