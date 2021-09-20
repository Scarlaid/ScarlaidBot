module.exports = (client, message, queue) => {
    message.channel.send(`${client.emotes.off} - **Nhạc đã dừng phát vì không có bài nào trong danh sách phát.**`)
    .then(msg => {
        setTimeout(() => msg.delete(), 15000)
      });
};