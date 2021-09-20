module.exports = (client, message, queue, track) => {
    message.channel.send(`**${track.title}** đã được thêm vào danh sách phát.`)
    .then(msg => {
        setTimeout(() => msg.delete(), 15000)
      });
};