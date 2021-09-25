module.exports = (client, message, track, playlist) => {
  message.channel.send({
    embed: {
        color: `${message.member.displayHexColor}`,
        title: "Đã thêm ang phát danh sách nhạc",
        url: playlist.url,
        footer: { text: `Requested by: ${message.author.tag}` },
        description: 'Có lỗi phát hay bất kì vấn đề nào phát sinh hãy nhắn tin cho người dùng sau trên Discord: Scarlaid#9122 \nĐể lấy link playlist, bấm vào dòng chữ xanh ở đầu sẽ dẫn thẳng đến Youtube',
        fields: [
          {name: 'Tên playlist', value: playlist.title, inline: true },
          {name: 'Số lượng bài', value: playlist.tracks.length, inline: true },
        ],
        thumbnail: { url: playlist.thumbnail },
        timestamp: new Date()
      },
    })
    .then(msg => {
        setTimeout(() => msg.delete(), 20000)
      }) 

};