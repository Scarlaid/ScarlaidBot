module.exports = (client, message, track, playlist) => {
  message.channel.send({
    embed: {
        color: `${message.member.displayHexColor}`,
        author: { name: track.title, url: track.url },
        footer: { text: `Requested by: ${message.author.tag}` },
        fields: [
          {name: `Danh sách phát: ${playlist.title}`, value: `Danh sách phát đã được thêm. \nHiện tại đang có **${playlist.tracks.length}** bài nhạc đang chờ đợi được phát` },
        ],
        thumbnail: { url: playlist.thumbnail },
        timestamp: new Date()
      },
    })
    .then(msg => {
        setTimeout(() => msg.delete(), 20000)
      }) 

};