module.exports = {
    name: 'clear-queue',
    aliases: ['cq','clear'],
    category: 'Music',
    utilisation: '{prefix}clearqueue',

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

        if (client.player.getQueue(message).tracks.length <= 1) return message.channel.send(`${client.emotes.error} - Bạn chỉ có một bài hát trong Queue, hãy tìm thêm bài và thử lại.`)
        .then(msg => {
            setTimeout(() => msg.delete(), 15000)
          });

        client.player.clearQueue(message);

        message.channel.send(`${client.emotes.success} - Queue đã được **xóa bỏ** !`)
        .then(msg => {
            setTimeout(() => msg.delete(), 15000)
          });
    },
};