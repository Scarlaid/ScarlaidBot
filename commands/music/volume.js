module.exports = {
    name: 'volume',
    aliases: ['v','vol'],
    category: 'Music',
    utilisation: '{prefix}volume [1-100]',

    execute(client, message, args) {
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - Bạn cần vào một kênh voice để sử dụng bot, hãy thử lại sau.!`)
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

        if (!args[0] || isNaN(args[0]) || args[0] === 'Infinity') return message.channel.send(`${client.emotes.error} - Hãy nhập số phù hợp!`)
        .then(msg => {
            setTimeout(() => msg.delete(), 15000)
          });

        if (Math.round(parseInt(args[0])) < 1 || Math.round(parseInt(args[0])) > 100) return message.channel.send(`${client.emotes.error} - Hãy chọn một con số (giữa 1 đến 100) !`)
        .then(msg => {
            setTimeout(() => msg.delete(), 15000)
          });

        const success = client.player.setVolume(message, parseInt(args[0]));

        if (success) message.channel.send(`${client.emotes.success} - Âm lượng: **${parseInt(args[0])}%** !`)
        .then(msg => {
          setTimeout(() => msg.delete(), 15000)
        });
    },
};