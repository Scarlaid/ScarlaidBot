module.exports = (client, message, queue, playlist) => {
    message.channel.send(`${client.emotes.success} - **${playlist.title}** đã được thêm vào playist (**${playlist.tracks.length}** bài đang được phát)`)
    .then(msg => {
        setTimeout(() => msg.delete(), 15000)
      });
};