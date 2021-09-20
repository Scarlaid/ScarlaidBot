module.exports = (client, error, message, ...args) => {
    switch (error) {
        case 'NotPlaying':
            message.channel.send(`${client.emotes.off} - Không có bài nào đang được phát cả`)
            .then(msg => {
                setTimeout(() => msg.delete(), 15000)
              });
            break;
        case 'NotConnected':
            message.channel.send(`${client.emotes.error} - Bạn cần vào một kênh voice để sử dụng bot, hãy thử lại sau.`)
            .then(msg => {
                setTimeout(() => msg.delete(), 15000)
              });
            break;
        case 'UnableToJoin':
            message.channel.send(`${client.emotes.off} - Bot không thể vào kênh vì thiếu **Permission.**`)
            .then(msg => {
                setTimeout(() => msg.delete(), 15000)
              });
            break;
        case 'VideoUnavailable':
            message.channel.send(`${client.emotes.error} Không thể phát **${args[0].title}**. Đang chuyển sang bài khác...`)
            .then(msg => {
                setTimeout(() => msg.delete(), 15000)
              });
            break;
        case 'MusicStarting':
            message.channel.send(`Bot đang chuẩn bị phát nhạc, hãy kiên nhẫn :pensive:.`)
            .then(msg => {
                setTimeout(() => msg.delete(), 15000)
              });
            break;
        default:
            message.channel.send(`${client.emotes.error} - Lỗi hoạt động: **${error}**`)
            .then(msg => {
                setTimeout(() => msg.delete(), 15000)
              });
    };
};
