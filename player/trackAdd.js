module.exports = (client, message, queue, track) => {
  message.channel.send({
    embed: {
        color: `${message.member.displayHexColor}`,
        title: "Thêm vào danh sách",
        url: track.url,
        footer: { text: `Requested by: ${message.author.tag}` },
        description: 'Có lỗi phát hay bất kì vấn đề nào phát sinh hãy nhắn tin cho người dùng sau trên Discord: Scarlaid#9122 \nĐể lấy link video, bấm vào dòng chữ xanh ở đầu sẽ dẫn thẳng đến Youtube',
        fields: [
          {name: `Tiêu đề`, value: track.title},
          {name: `Tác giả`, value: track.author, inline: true},
          {name: `Thời lương phát`, value: track.duration, inline: true},
        ],
        thumbnail: { url: track.thumbnail },
        timestamp: new Date()
      },
    })
    .then(msg => {
        setTimeout(() => msg.delete(), 20000)
      }) 

};