module.exports = (client, message, track) => {
  message.channel.send({
    embed: {
        color: `${message.member.displayHexColor}`,
        author: { name: track.title, url: track.url },
        footer: { text: 'This bot edit by shiki' },
        fields: [
          {name: `${client.emotes.success} - **${playlist.title}** đã được thêm vào playist. Hiện tại đang có (**${playlist.tracks.length}** bài nhạc đang được phát` },
        ],
        thumbnail: { url: track.thumbnail },
        timestamp: new Date()
      },
    })
    .then(msg => {
        setTimeout(() => msg.delete(), 20000)
      }) 

};