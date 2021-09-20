module.exports = (client, message, track) => {
    message.channel.send(`:musical_note: - Đang phát **${track.title}**`)
    .then(msg => {
        setTimeout(() => msg.delete(), 15000)
      });
};