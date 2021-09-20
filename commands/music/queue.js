module.exports = {
    name: 'queue',
    aliases: ['q'],
    category: 'Music',
    utilisation: '{prefix}queue',

    execute(client, message) {
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - Bạn cần vào một kênh voice để sử dụng bot, hãy thử lại sau.`)
        .then(msg => {
            setTimeout(() => msg.delete(), 15000)
          });

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - Bot đang được sử dụng ở một kênh khác!`)
        .then(msg => {
            setTimeout(() => msg.delete(), 15000)
          });

        const queue = client.player.getQueue(message);

        if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} - Không có bài nào để chơi`)
        .then(msg => {
            setTimeout(() => msg.delete(), 15000)
          });

        message.channel.send(`**Danh sách nhạc - ${message.guild.name} ${client.emotes.queue} ${client.player.getQueue(message).loopMode ? '(Lặp lại)' : ''}**\nHiện tại : ${queue.playing.title} | ${queue.playing.author}\n\n` + (queue.tracks.map((track, i) => {
            return `**#${i + 1}** - ${track.title} | ${track.author} (Requested by : ${track.requestedBy.username})`
        }).slice(0, 5).join('\n') + `\n\n${queue.tracks.length > 5 ? `Và **${queue.tracks.length - 5}** bài nhạc...` : `Trong playlist **${queue.tracks.length}** bài nhạc...`}`))
        .then(msg => {
            setTimeout(() => msg.delete(), 15000)
          });
    },
};