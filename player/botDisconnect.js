module.exports = (client, message, queue) => {
    message.channel.send(`${client.emotes.goodbye} - Nhạc đã dừng và bot đã rời khỏi kênh.`)
    .then(msg => {
        setTimeout(() => msg.delete(), 15000)
      });
};