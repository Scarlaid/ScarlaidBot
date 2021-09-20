module.exports = (client, message, queue) => {
    message.channel.send(`${client.emotes.goodbye} - Bot đã rời khỏi kênh vì không có ai trong kênh cả.`)
    .then(msg => {
        setTimeout(() => msg.delete(), 15000)
      });
};