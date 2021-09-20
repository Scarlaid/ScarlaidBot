module.exports = (client, message, query) => {
    message.channel.send(`${client.emotes.error} - Không tìm thấy kết quả nào trên YouYube là **${query}** !`)
    .then(msg => {
        setTimeout(() => msg.delete(), 15000)
      });
};