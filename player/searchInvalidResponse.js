module.exports = (client, message, query, tracks, content, collector) => {
    if (content === 'cancel') {
        collector.stop();
        return message.channel.send(`${client.emotes.success} - Lựa chọn đã bị hủy bỏ!`);
    } else message.channel.send(`${client.emotes.error} - Bạn phải chọn một con số giữa **1** và **${tracks.length}** !`)
    .then(msg => {
        setTimeout(() => msg.delete(), 15000)
      });
};