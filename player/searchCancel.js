module.exports = (client, message, query, tracks) => {
    message.channel.send(`${client.emotes.error} - **Lệnh không tồn tại, -help để biết thêm chi tiết.**`)
    .then(msg => {
        setTimeout(() => msg.delete(), 15000)
      });
};