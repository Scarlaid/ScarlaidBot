module.exports = {
    name: 'resume',
    aliases: ['rs'],
    category: 'Music',
    utilisation: '{prefix}resume',

    execute(client, message) {
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.off} - Bạn cần vào một kênh voice để sử dụng bot, hãy thử lại sau.`)
        .then(msg => {
            setTimeout(() => msg.delete(), 15000)
          });

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - Bot đang được sử dụng ở một kênh khác.`)
        .then(msg => {
            setTimeout(() => msg.delete(), 15000)
          });
        
        if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.off} - Không có nhạc nào đang được phát!`)
        .then(msg => {
            setTimeout(() => msg.delete(), 15000)
          });

        if (!client.player.getQueue(message).paused) return message.channel.send(`${client.emotes.success} - Bot đã bắt đầu phát nhạc tiếp.`)
        .then(msg => {
            setTimeout(() => msg.delete(), 15000)
          });

        const success = client.player.resume(message);

        if (success) message.channel.send(`${client.emotes.notes} - Tiếp tục phát ${client.player.getQueue(message).playing.title}`)
        .then(msg => {
            setTimeout(() => msg.delete(), 15000)
          });
    },
};