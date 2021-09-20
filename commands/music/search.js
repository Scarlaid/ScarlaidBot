module.exports = {
    name: 'search',
    aliases: ['sr'],
    category: 'Music',
    utilisation: '{prefix}search [name/URL]',

    execute(client, message, args) {
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - Bạn cần vào một kênh voice để sử dụng bot, hãy thử lại sau.`)
        .then(msg => {
            setTimeout(() => msg.delete(), 15000)
          });

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`Không có nhạc nào đang được phát!`)
        .then(msg => {
            setTimeout(() => msg.delete(), 15000)
          });

        if (!args[0]) return message.channel.send(`${client.emotes.error} - Vui lòng nhập tên bài hát bạn muốn phát`)
        .then(msg => {
            setTimeout(() => msg.delete(), 15000)
          });

        client.player.play(message, args.join(" "));
    },
};