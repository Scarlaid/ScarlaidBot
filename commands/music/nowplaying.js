module.exports = {
    name: 'nowplaying',
    aliases: ['np'],
    category: 'Music',
    utilisation: '{prefix}nowplaying',

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

        const track = client.player.nowPlaying(message);
        const filters = [];

        Object.keys(client.player.getQueue(message).filters).forEach((filterName) => client.player.getQueue(message).filters[filterName]) ? filters.push(filterName) : false;

        message.channel.send({
            embed: {
                color: 'RED',
                author: { name: track.title, url: track.url },
                footer: { text: '24/7 Uptime by Scarlaid' },
                fields: [
                    { name: 'Kênh', value: track.author, inline: true },
                    { name: 'Requested by', value: track.requestedBy.username, inline: true },
                    { name: 'Từ playlist', value: track.fromPlaylist ? 'Yes' : 'No', inline: true },

                    { name: 'Lượt xem', value: track.views, inline: true },
                    { name: 'Thời lượng phát', value: track.duration, inline: true },
                    { name: 'Filters được chạy', value: filters.length + '/' + client.filters.length, inline: true },

                    { name: 'Âm lượng', value: client.player.getQueue(message).volume, inline: true },
                    { name: 'Chế độ lặp lại', value: client.player.getQueue(message).repeatMode ? 'Yes' : 'No', inline: true },
                    { name: 'Hiện tại tạm dừng', value: client.player.getQueue(message).paused ? 'Yes' : 'No', inline: true },

                    { name: 'Progress Bar', value: client.player.createProgressBar(message, { timecodes: true }), inline: true }
                ],
                thumbnail: { url: track.thumbnail },
                timestamp: new Date(),
            },
        })
        .then(msg => {
            setTimeout(() => msg.delete(), 15000)
          });
    },
};