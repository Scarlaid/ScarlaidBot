module.exports = (client, message, track) => {
  message.channel.send({
    embed: {
        color: `${message.member.displayHexColor}`,
        author: { name: track.title, url: track.url },
        footer: { text: `Requested by: ${message.author.tag}` },
        fields: [
          {name: `Tác giả: ${track.author}`, value: 'Bài hát đã được thêm vào danh sách phát, nếu có lỗi phát hãy nhắn tin cho Scarlaid#9122' },
        ],
        thumbnail: { url: track.thumbnail },
        timestamp: new Date()
      },
    })
    .then(msg => {
        setTimeout(() => msg.delete(), 20000)
      }) 

};